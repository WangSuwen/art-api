const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../param-validation/user');
const menuCtrl = require('../controllers/menu.controller');
const config = require('../config/env');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/createMenu')
  .post(validate(paramValidation.menu), menuCtrl.create);

module.exports = router;
