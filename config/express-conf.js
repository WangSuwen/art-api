const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const helmet = require('helmet');
const winstonInstance = require('./winston');
const routes = require('../routes/index');
const config = require('./env');
const APIError = require('../helpers/APIError');
const socketIO = require('../socket');

const app = express();
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Headers', 'X-Token');
//   next();
// });

/**
 * SocketIO ---START
 */
socketIO.init(app);
/**
 * SocketIO ---END
 */

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

/**
 * 跨域设置 -- START
 */
let getterOrigin;
const whitelist = ['loveruoxi.com', 'http://localhost:9527', 'http://127.0.0.1:9527'];
var corsOptions = {
  origin: function (origin, callback) {
    let reg;
    let isCORS = false;
    for (let i = 0; i < whitelist.length; i++) {
      if (reg = new RegExp(whitelist[i]), reg.test(getterOrigin)) {
        isCORS = false;
        callback(null, true);
        break;
      } else {
        isCORS = true;
      }
    }
    isCORS && callback(new Error('Not allowed by CORS'))  
  },
  methods: ['OPTION', 'GET', 'PUT', 'POST'],
  credentials: true
};

app.use(function (req, res, next) {
  getterOrigin = req.headers.origin || req.headers.referer;
  next();
}, cors(corsOptions));

/**
 * 跨域设置 -- END
 */

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on /api path
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    msg: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {},
    code: err.status,
    data: null
  })
);

module.exports = app;