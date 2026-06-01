const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);

// GET /api/dashboard — statistik dashboard sesuai role
router.get('/', DashboardController.getStats);

module.exports = router;
