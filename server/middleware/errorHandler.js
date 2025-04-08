const winston = require('winston'); 
// Configure winston logger
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' }), // Log errors to a file
        new winston.transports.Console(), // Log errors to the console
    ],
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error stack
    logger.error(err.stack);

    // Determine the status code and message based on the error type
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Send the response
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

module.exports = errorHandler;