const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const result = require('../util/result');

const addRemind = require('../mock/add-remind');
const remindList = require('../mock/remind-list');
const remindDetail = require('../mock/remind-detail');


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
    result.success(res, [
        {
            "code": "7D5EB6CB2FB7BCECC288FA6984A28E80",
            "name": "日用居家"
        },
        {
            "code": "D4192B0A74A68F2B6691DFB1A045F930",
            "name": "玩乐.生活"
        },
        {
            "code": "8B371E41EC3BABAC0CE557A1B0BAE407",
            "name": "其它"
        },
        {
            "code": "388F901CA397BC871903C528AE11A78B",
            "name": "衣装打扮"
        },
        {
            "code": "972AA8FA2102E959A352D96EAE32C14D",
            "name": "健身/运动"
        },
        {
            "code": "05969B27564BC0E9B1DB832C95D60A0A",
            "name": "单板"
        },
        {
            "code": "8973C24EF754738C3233A3B49D275DCB",
            "name": "年代/时间"
        }
    ]);
});


module.exports = router;
