const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const User = require('../models/user.model');
const Menu = require('../models/menu.model');
const result = require('../util/result');
const Daos = require('../daos');
const Promise = require('bluebird');

const config = require('../config/env');

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  let resu = {};
  new Promise((resolve, reject) => {
    Daos.getOne(User, {$or: [{username: username}, {mobileNumber: isNaN(+username) ? 0 : +username}]})
      .then(user => {
        if (user && user.password === password) {
          const token = jwt.sign({ username: user.username }, config.jwtSecret);
          resu = {
            token,
            ...result.formatResData(user, ['avatar', 'name', 'role'])
          };
          return resolve({resu, uId: user._id});
        }
        const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
        next(err);
      })
      .catch(e => reject(e));
  }).then(resuUser => {
    return new Promise((reso, rej) => {
      Daos.getOne(Menu, {userId: resuUser.uId})
      .then(menus => {
        res.cookie('access-token', resuUser.token,  { expires: new Date(Date.now() + 900000), httpOnly: true });
        return result.success(res, {
          ...resuUser.resu,
          menus: menus._doc.menus
        });
      })
      .catch(e => rej(e));
    });
  }).catch(e => {
    console.log(`登录时报错--${e.message}`);
    next(e);
  });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    num: Math.random() * 100
  });
}

module.exports =  { login, getRandomNumber };
