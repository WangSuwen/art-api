const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../param-validation/user');
const menuCtrl = require('../controllers/menu.controller');
const config = require('../config/env');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(validate(paramValidation.menu), menuCtrl.create);

router.get('/list', validate(paramValidation.menuList), menuCtrl.list);

module.exports = router;
