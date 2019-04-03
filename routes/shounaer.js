const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const result = require('../util/result');

const addRemind = require('../mock/add-remind');
const remindList = require('../mock/remind-list');
const remindDetail = require('../mock/remind-detail');
const categories = require('../mock/categories');


// POST 添加提醒
router.post('/api/app/v350/remind', (req, res) => {
  result.success(res, addRemind);
});

// DELETE 删除某个提醒
router.delete('/api/app/v350/remind', (req, res) => {
  result.success(res, result.REMIND_NOT_EXIST);
});

// POST 修改 某一个 提醒
router.post('/api/app/v350/remind-update', (req, res) => {
  result.success(res, {"ok": 1});
});
// GET 获取提醒列表（根据提醒完成类型进行分页查询）
router.get('/api/app/v350/remind-list', (req, res) => {
  result.success(res, remindList);
});
// GET 获取提醒详情
router.get('/api/app/v350/remind-detail', (req, res) => {
  result.success(res, remindDetail);
});
// GET 提醒标记为已完成
router.get('/api/app/v350/remind-done', (req, res) => {
  result.success(res, {"ok": 1});
});
// GET 判断是否需要弹框
router.get('/api/app/v350/remind-dialog', (req, res) => {
  result.success(res, {"ok": 1});
});
// GET 添加提醒 -- 关联物品时获取 已添加的分类列表
router.get('/api/app/v350/categories', (req, res) => {
    result.success(res, categories);
});


module.exports = router;
