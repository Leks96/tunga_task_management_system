const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { ROLES } = require('../config/constants');

const auth = (role) => async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);

        if (!req.user || (role && req.user.role !== role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = auth;