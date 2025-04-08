const winston = require('winston'); 

// Configure winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(), 
        winston.format.json() 
    ),
    transports: [
        new winston.transports.Console({ 
            format: winston.format.simple(), 
        }),
        new winston.transports.File({ 
            filename: 'application.log', 
            level: 'error', 
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
            logger.info(message); 
    }
};

// Export the logger and logMessage function
module.exports = {
    logger,
    logMessage,
};