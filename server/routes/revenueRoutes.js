const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');

// Get all revenue metrics
router.get('/', revenueController.getRevenueMetrics);

// Create a new revenue metric
router.post('/', revenueController.createRevenueMetric);

module.exports = router;