const UserMenu = require('../models/userMenu.model');
const result = require('../util/result');
const Daos = require('../daos');

/**
 * Create new userMenu
 * @property {string} req.body.userId - The userId of userMenu.
 * @property {string} req.body.menus - The menus of userMenu.
 * @returns {UserMenu}
 */
function create(req, res, next) {
  const userMenu = new UserMenu({
    userId: req.body.userId,
    menus: req.body.menus
  });

  userMenu.save()
    .then(savedMenu => result.success(res, savedMenu))
    .catch(e => {
      console.log(`创建用户权限列表时报错了：${e}`);
      next(e)
    });
}


/**
 * Get menu list.
 * @property {String} userId 用户ID
 * @returns {UserMenu[]}
 */
function list(req, res, next) {
  Daos.getOne(UserMenu, {userId: req.query.userId})
      .then(datas => {
        console.log('获取用户有权限的 Menu成功--');
        result.success(res, datas ? result.formatResData(datas, ['menus']) : []);
      })
      .catch(e => { 
        console.log(`获取列表报错了：${e}`);
        next(e);
      });
}


module.exports =  { create, list };
