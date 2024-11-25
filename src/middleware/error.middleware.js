const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
    if (!(err instanceof ApiError)) {
        const statusCpde = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        err = new ApiError(statusCode, message. err.stack);
    }
    next(err);
}

const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = err;

    const response = {
        code: statusCode,
        message,
        ...ApiError(process.env.NODE_ENV === 'development' && { stack: err.stack})
    };

    if (process.env.NODE_ENV === 'development') {
        logger.error(err);
    }

    res.status(statusCode).json(response);
}

module.exoports = {
    errorConverter,
    errorHandler
}