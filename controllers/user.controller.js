const User = require('../models/user.model');
const result = require('../util/result');
const Daos = require('../daos');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  Daos.getById(User, id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.currentPage - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 10, currentPage = 1 } = req.query;
  Daos.list(User, +limit, (currentPage - 1) * limit)
      .then(datas => {
        console.log('获取User成功--');
        const userList = datas[1].map(user => {
          return result.formatResData(user, ['mobileNumber', 'avatar', 'introduction', 'name', '_id']); 
        });
        result.success(res, {
          list: userList,
          currentPage: +currentPage,
          limit: limit,
          pageSize: Math.ceil(datas[0] / limit)
        });
      })
      .catch(e => { 
        console.log(`获取列表报错了：${e}`);
        next(e);
      });
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports =  { load, get, create, update, list, remove };
