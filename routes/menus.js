const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../param-validation/user');
const menuCtrl = require('../controllers/menu.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(validate(paramValidation.addMenus), menuCtrl.create)
  .get(menuCtrl.list);

module.exports = router;
