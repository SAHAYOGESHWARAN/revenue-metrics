const Revenue = require('../models/Revenue');

// Get all revenue metrics
exports.getRevenueMetrics = async (req, res) => {
    try {
        const revenueData = await Revenue.find();
        res.status(200).json(revenueData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching revenue data', error });
    }
};

// Create a new revenue metric
exports.createRevenueMetric = async (req, res) => {
    const { amount, currency, date } = req.body;

    try {
        const newRevenue = new Revenue({ amount, currency, date });
        await newRevenue.save();
        res.status(201).json(newRevenue);
    } catch (error) {
        res.status(500).json({ message: 'Error creating revenue metric', error });
    }
};