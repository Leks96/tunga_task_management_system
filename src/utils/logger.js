const logger = require('../config/logger');

exports.logError = (error) => {
    logger.error(error.message);
};

exports.logInfo = (message) => {
    logger.info(message);
}