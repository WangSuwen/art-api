const express = require('express');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const monitorRoutes = require('./monitor');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('I`m alive！！！')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);
// 错误监控
router.use('/monitor', monitorRoutes);

module.exports = router;
