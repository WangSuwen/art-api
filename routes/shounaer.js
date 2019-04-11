const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const result = require('../util/result');
const shounaerController = require('../controllers/shounaer.controller');

const addRemind = require('../mock/add-remind');
const remindList = require('../mock/remind-list');
const remindDetail = require('../mock/remind-detail');
const categories = require('../mock/categories');
const remindAuto = require('../mock/remind-auto');
const objectList = require('../mock/object-list');

// 获取api 列表
router.get('/managementApiList', shounaerController.managementApiList);
// 添加 api
router.post('/managementAddApi', shounaerController.managementAddApi);
// 更新 api
router.post('/managementUpdateApi', shounaerController.managementUpdateApi);

/**
 * 收哪儿 MOCK
 * 自动匹配所有的 接口，以req.params 的方式来取值。
 */
router.all('/*', shounaerController.shounaer);
// POST 添加提醒
/* router.post('/api/app/v350/remind', (req, res) => {
  result.success(res, addRemind);
}); */

// POST 删除某个提醒
/* router.post('/api/app/v350/remind-delete', (req, res) => {
  result.success(res, {ok: 1});
}); */

// POST 修改 某一个 提醒
/* router.post('/api/app/v350/remind-update', (req, res) => {
  result.success(res, {"ok": 1});
}); */
// GET 获取提醒列表（根据提醒完成类型进行分页查询）
/* router.get('/api/app/v350/remind-list', (req, res) => {
  result.success(res, remindList);
}); */
// GET 获取提醒详情
/* router.get('/api/app/v350/remind-detail', (req, res) => {
  result.success(res, remindDetail);
}); */
// GET 提醒标记为已完成
/* router.get('/api/app/v350/remind-done', (req, res) => {
  result.success(res, {"ok": 1});
}); */
// GET 判断是否需要弹框
/* router.get('/api/app/v350/remind-dialog', (req, res) => {
  result.success(res, {"ok": 1});
}); */
// GET 添加提醒 -- 关联物品时获取 已添加的分类列表
/* router.get('/api/app/v350/categories', (req, res) => {
    result.success(res, categories);
}); */
// GET 添加提醒 -- 物品列表
/* router.get('/api/app/v350/object-list', (req, res) => {
    result.success(res, objectList);
}); */
// GET 自动添加提醒
/* router.get('/api/app/v350/remind-auto', (req, res) => {
  result.success(res, remindAuto);
}); */

module.exports = router;
