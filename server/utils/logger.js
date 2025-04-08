const winston = require('winston'); // Importing winston for logging

// Configure winston logger
const logger = winston.createLogger({
    level: 'info', // Default log level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to logs
        winston.format.json() // Format logs as JSON
    ),
    transports: [
        new winston.transports.Console({ // Log to console
            format: winston.format.simple(), // Simple format for console
        }),
        new winston.transports.File({ // Log to a file
            filename: 'application.log', // Log file name
            level: 'error', // Only log error level messages to file
        }),
    ],
});

// Log message function with different levels
const logMessage = (level, message) => {
    switch (level) {
        case 'info':
            logger.info(message);
            break;
        case 'warn':
            logger.warn(message);
            break;
        case 'error':
            logger.error(message);
            break;
        default:
            logger.info(message); // Default to info level
    }
};

// Export the logger and logMessage function
module.exports = {
    logger,
    logMessage,
};