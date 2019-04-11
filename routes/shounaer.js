const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const result = require('../util/result');
const shounaerController = require('../controllers/shounaer.controller');

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

module.exports = router;
