const Revenue = require('../models/Revenue');
const Joi = require('joi'); 

// Define a schema for revenue validation
const revenueSchema = Joi.object({
    amount: Joi.number().required(),
    currency: Joi.string().valid('USD', 'EUR', 'GBP').required(), // Example currencies
    date: Joi.date().iso().required(),
});

// Get all revenue metrics with pagination
exports.getRevenueMetrics = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    try {
        const revenueData = await Revenue.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Revenue.countDocuments();

        res.status(200).json({
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: revenueData,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching revenue data', error: error.message });
    }
};

// Create a new revenue metric
exports.createRevenueMetric = async (req, res) => {
    const { error } = revenueSchema.validate(req.body); // Validate request body

    if (error) {
        return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    const { amount, currency, date } = req.body;

    try {
        const newRevenue = new Revenue({ amount, currency, date });
        await newRevenue.save();
        res.status(201).json(newRevenue);
    } catch (error) {
        res.status(500).json({ message: 'Error creating revenue metric', error: error.message });
    }
};

// Update a revenue metric by ID
exports.updateRevenueMetric = async (req, res) => {
    const { id } = req.params;
    const { error } = revenueSchema.validate(req.body); // Validate request body

    if (error) {
        return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    try {
        const updatedRevenue = await Revenue.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRevenue) {
            return res.status(404).json({ message: 'Revenue metric not found' });
        }
        res.status(200).json(updatedRevenue);
    } catch (error) {
        res.status(500).json({ message: 'Error updating revenue metric', error: error.message });
    }
};

// Delete a revenue metric by ID
exports.deleteRevenueMetric = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRevenue = await Revenue.findByIdAndDelete(id);
        if (!deletedRevenue) {
            return res.status(404).json({ message: 'Revenue metric not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: 'Error deleting revenue metric', error: error.message });
    }
};