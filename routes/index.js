const express = require('express');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const menuRoutes = require('./menu');
const monitorRoutes = require('./monitor');
const { loginCheck } = require('./loginStatusCheck');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('I`m alive！！！')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// 侧边栏菜单
router.use('/menu', loginCheck, menuRoutes);
// 错误监控
router.use('/monitor', monitorRoutes);

module.exports = router;
