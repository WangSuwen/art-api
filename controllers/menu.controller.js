const Menu = require('../models/menu.model');
const result = require('../util/result');
const Daos = require('../daos');

/**
 * Create new menu
 * @property {string} req.body.userId - The userId of menu.
 * @property {string} req.body.menus - The menus of menu.
 * @returns {Menu}
 */
function create(req, res, next) {
  const menu = new Menu({
    userId: req.body.userId,
    menus: req.body.menus
  });

  menu.save()
    .then(savedMenu => result.success(res, savedMenu))
    .catch(e => {
      console.log(`创建用户权限列表时报错了：${e}`);
      next(e)
    });
}

/**
 * Update existing menu
 * @property {string} req.body.menuname - The menuname of menu.
 * @property {string} req.body.mobileNumber - The mobileNumber of menu.
 * @returns {Menu}
 */
function update(req, res, next) {
  const menu = req.menu;
  menu.menuname = req.body.menuname;
  menu.mobileNumber = req.body.mobileNumber;

  menu.save()
    .then(savedMenu => res.json(savedMenu))
    .catch(e => next(e));
}

/**
 * Get menu list.
 * @property {number} req.query.currentPage - Number of menus to be skipped.
 * @property {number} req.query.limit - Limit number of menus to be returned.
 * @returns {Menu[]}
 */
function list(req, res, next) {
  const { limit = 2, currentPage = 1 } = req.query;
  Daos.list(Menu, +limit, (currentPage - 1) * limit)
      .then(datas => {
        console.log('获取Menu成功--');
        result.success(res, {
          list: datas[1],
          currentPage: +currentPage,
          limit: limit,
          pageSize: Math.ceil(datas[0] / limit)
        });
      })
      .catch(e => { 
        console.log(`获取列表报错了：${e}`);
        next(e);
      });
}

/**
 * Delete menu.
 * @returns {Menu}
 */
function remove(req, res, next) {
  const menu = req.menu;
  menu.remove()
    .then(deletedMenu => res.json(deletedMenu))
    .catch(e => next(e));
}

module.exports =  { create, update, list, remove };
