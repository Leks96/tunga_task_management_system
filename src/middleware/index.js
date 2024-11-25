const compression = require('compression');
const pagination = require('./pagination.middleware');

module.exports = {
    auth: require('./auth.middleware'),
    validate: require('./validate.middleware'),
    error: require('./error.middleware'),
    rateLimiter: require('./rateLimter.middleware'),
    logger: require('./logger.middleware'),
    sanitize: require('./sanitize.middleware'),
    pagination: require('./pagination.middleware'),
    cors: require('./cors.middleware'),
    compression: require('./compression.middleware')
};