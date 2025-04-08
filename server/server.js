const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const revenueRoutes = require('./routes/revenueRoutes');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');
const logger = require('./middleware/logger'); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
    logger.logMessage('info', `Request: ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/revenue', revenueRoutes);

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown
const shutdown = (signal) => {
    logger.logMessage('warn', `Received ${signal}. Shutting down gracefully...`);
    // Close server and database connections here if needed
    process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Start the server
const PORT = config.PORT || 3000; // Default to 3000 if PORT is not set
app.listen(PORT, () => {
    logger.logMessage('info', `Server is running on port ${PORT}`);
});