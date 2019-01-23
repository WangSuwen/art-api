const Menu = require('../models/menu.model');
const result = require('../util/result');
const Daos = require('../daos');

/**
 * Create new Menu
 * @property {string} req.body.menuName - The userId of Menu.
 * @property {string} req.body.menuValue - The menus of Menu.
 * @returns {Menu}
 */
function create(req, res, next) {
  const menu = new Menu({
    menuName: req.body.menuName,
    menuValue: req.body.menuValue
  });

  menu.save()
    .then(savedMenu => result.success(res, savedMenu))
    .catch(e => {
      console.log(`添加菜单时报错了：${e}`);
      next(e)
    });
}


/**
 * Get menu list.
 * @returns {Menu[]}
 */
function list(req, res, next) {
  Daos.getAll(Menu)
      .then(datas => {
        console.log('获取Menu成功--');
        result.success(res, datas ? datas : []);
      })
      .catch(e => { 
        console.log(`获取列表报错了：${e}`);
        next(e);
      });
}


module.exports =  { create, list };
