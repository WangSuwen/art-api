const mongoose = require('mongoose');

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
 * @typedef Menu
 */
module.exports = mongoose.model('Menu', MenuSchema);
