/**
 * 前端错误上报
 */

const Monitor = require('../models/monitor.model');
const result = require('../util/result');

// /**
//  * Get user
//  * @returns {User}
//  */
// function get(req, res) {
//   return res.json(req.user);
// }

/**
 * Create new Monitor
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const monitor = new Monitor({
      appKey: req.body.appKey,
      msg: req.body.msg,
      url: req.body.url,
      line: req.body.line,
      col: req.body.col,
      errorStack: req.body.errorStack,
      pageUrl: req.body.pageUrl,
      userAgent: req.headers['user-agent'],
      reqIp: req.ip
    });

  monitor.save()
    .then(savedMonitor => result.success(res, savedMonitor))
    .catch(e => {
      console.log(`报错了：${e}`);
      next(e)
    });
}

// /**
//  * Update existing user
//  * @property {string} req.body.username - The username of user.
//  * @property {string} req.body.mobileNumber - The mobileNumber of user.
//  * @returns {User}
//  */
// function update(req, res, next) {
//   const user = req.user;
//   user.username = req.body.username;
//   user.mobileNumber = req.body.mobileNumber;

//   user.save()
//     .then(savedMonitor => res.json(savedMonitor))
//     .catch(e => next(e));
// }

/**
 * Get Monitor list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 10, skip = 0 } = req.query;
  Monitor.list({ limit, skip })
    .then(monitors => {
      console.log('获取Monitor成功--');
      result.success(res, monitors);
    })
    .catch(e => { 
      console.log(`获取Monitor列表报错了：${e}`);
      next(e);
    });
}

// /**
//  * Delete user.
//  * @returns {User}
//  */
// function remove(req, res, next) {
//   const user = req.user;
//   user.remove()
//     .then(deletedUser => res.json(deletedUser))
//     .catch(e => next(e));
// }

module.exports =  { /* load, get,  */list, create/* , update, remove */ };
