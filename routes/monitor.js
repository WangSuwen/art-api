const express = require('express');
const monitorCtrl = require('../controllers/monitor.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(monitorCtrl.list)
  .post(monitorCtrl.create);

module.exports = router;
