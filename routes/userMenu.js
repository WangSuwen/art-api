const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../param-validation/user');
const userMenuCtrl = require('../controllers/userMenu.controller');
// const config = require('../config/env');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(validate(paramValidation.userMenu), userMenuCtrl.create);

router.get('/list', validate(paramValidation.userMenuList), userMenuCtrl.list);

module.exports = router;
