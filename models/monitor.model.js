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
  userAgent: {
    type: String
  },
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
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef Monitor
 */
module.exports = mongoose.model('Monitor', MonitorSchema);
