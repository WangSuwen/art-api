const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Monitor Schema
 */
const MonitorSchema = new mongoose.Schema({
  appKey: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  line: {
    type: String,
    required: true
  },
  col: {
    type: String,
    required: true
  },
  errorStack: {
    type: String,
    required: true
  },
  pageUrl: {
    type: String,
    required: true
  },
  // 浏览器信息
  monitorAgent: {
    type: String
  },
  // 用户IP
  reqIp: {
    type: String
  },
  /* mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  }, */
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
MonitorSchema.method({
});

/**
 * Statics
 */
MonitorSchema.statics = {
  /**
   * Get monitor
   * @param {ObjectId} id - The objectId of monitor.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((monitor) => {
        if (monitor) {
          return monitor;
        }
        const err = new APIError('No such monitor exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
};

/**
 * @typedef Monitor
 */
module.exports = mongoose.model('Monitor', MonitorSchema);
