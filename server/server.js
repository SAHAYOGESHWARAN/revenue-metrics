const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const revenueRoutes = require('./routes/revenueRoutes');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/revenue', revenueRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});