const compression = require('compression');

const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        return false;
    }
    return compression.filter(req, res);
};

const compressionMiddleware = compression({
    filter: shouldCompress,
    level: 6, // Default compression level
    threshold: 1024 // Only compress response that are longer than 1KB
})

module.exports = compressionMiddleware;