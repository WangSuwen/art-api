const Joi = require('joi');

module.exports =  {
  // 添加 菜单
  addMenus: {
    body: {
      menuName: Joi.string().required(),
      menuValue: Joi.string().required()
    }
  },
  // 更新 菜单
  updateMenus: {
    body: {
      _id: Joi.string().required(),
      menuName: Joi.string(),
      menuValue: Joi.string()
    }
  }
};
