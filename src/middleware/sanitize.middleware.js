const xss = require('xss');

const sanitizeData = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(sanitizeData);
    }

    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = sanitizeData(obj[key]);
            return acc;
        }, {});
    }

    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = sanitizeData(obj[key]);
            return acc;
        }, {});
    }

    if (typeof obj === 'string') {
        return xss(obj);
    }

    return obj;
}

const sanitize = (req, res, next) => {
    req.body = sanitizeData(req.body);
    req.query = sanitizeData(req.query);
    req.params = sanitizeData(req.params);
    next();
}

module.exports = sanitize;