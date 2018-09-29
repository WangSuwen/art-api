const express = require('express');
const validate = require('express-validation');
const jwt = require('jsonwebtoken');
const paramValidation = require('../param-validation/user');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/env');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .get(validate(paramValidation.login), authCtrl.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get((req, res, next) => {
    /**
     *   token 登录鉴权
     */
    jwt.verify(req.cookies.token, config.jwtSecret);
    next();
  }, authCtrl.getRandomNumber);

module.exports = router;
