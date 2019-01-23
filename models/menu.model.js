const mongoose = require('mongoose');

/**
 * Monitor Schema
 */
const MenuSchema = new mongoose.Schema({
  // 菜单名
  menuName: {
    type: String,
    required: true
  },
  // 菜单值
  menuValue: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * @typedef Menu
 */
module.exports = mongoose.model('menu', MenuSchema);
