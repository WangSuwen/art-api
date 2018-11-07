/**
 * 项目部署 API
 */
const express = require('express');
const deployCtrl = require('../controllers/deploy.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(deployCtrl.list)
  .post(deployCtrl.create);
// router.route();

module.exports = router;
