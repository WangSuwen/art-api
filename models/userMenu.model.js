const mongoose = require('mongoose');

/**
 * Monitor Schema
 */
const UserMenuSchema = new mongoose.Schema({
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
 * @typedef UserMenu
 */
module.exports = mongoose.model('user_menu', UserMenuSchema);
