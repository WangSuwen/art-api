const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Monitor Schema
 */
const MenuSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  // 权限
  menus: {
    type: Array,
    default: [] // ['/login', '/abcd', '/efg']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Methods
 */
MenuSchema.method({
});

/**
 * Statics
 */
MenuSchema.statics = {
  /**
   * Get menu
   * @param {ObjectId} id - The objectId of menu.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((menu) => {
        if (menu) {
          return menu;
        }
        const err = new APIError('No such menu exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Menu', MenuSchema);
