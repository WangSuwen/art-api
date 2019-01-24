const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../param-validation/menu');
const menuCtrl = require('../controllers/menu.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(validate(paramValidation.addMenus), menuCtrl.create)
  .get(menuCtrl.list);

router.post('/update', validate(paramValidation.updateMenus), menuCtrl.update);

module.exports = router;
