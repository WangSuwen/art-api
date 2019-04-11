const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Monitor Schema
 */
const ShounaerapiSchema = new mongoose.Schema({
  apiName: {
    type: String,
    required: true
  },
  apiPath: {
    type: String,
    required: true
  },
  apiResponse: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
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
ShounaerapiSchema.method({
});

/**
 * @typedef Shounaerapi
 */
module.exports = mongoose.model('Shounaerapi', ShounaerapiSchema);
