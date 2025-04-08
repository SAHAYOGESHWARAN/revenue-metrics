const mongoose = require('mongoose');

// Define the revenue schema
const revenueSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be a positive number'], 
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD'],
    },
    date: {
        type: Date,
        default: Date.now,
        index: true, s
    },
}, {
    timestamps: true, 
});


revenueSchema.index({ amount: 1, date: -1 });

// Export the Revenue model
module.exports = mongoose.model('Revenue', revenueSchema);