const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');
const auth = require('../middleware/authMiddleware'); // Import authentication middleware
const { validateRevenue } = require('../middleware/validationMiddleware'); // Import validation middleware

// Get all revenue metrics with authentication
router.get('/', auth(['admin', 'user']), revenueController.getRevenueMetrics);

// Create a new revenue metric with authentication and validation
router.post('/', auth(['admin']), validateRevenue, revenueController.createRevenueMetric);

// Update a revenue metric by ID with authentication and validation
router.put('/:id', auth(['admin']), validateRevenue, revenueController.updateRevenueMetric);

// Delete a revenue metric by ID with authentication
router.delete('/:id', auth(['admin']), revenueController.deleteRevenueMetric);

module.exports = router;