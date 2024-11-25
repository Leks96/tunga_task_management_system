const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new ApiError(401, 'Please authenticate');
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        

        const user = await User.findByPk(decode.id);
        if (!user) {
            throw new ApiError(401, 'Please Authenticate');
        }

        req.user = user;
        next();
    } catch (error) {
        next(new ApiError (401, 'Please authenticate'));
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.include(req.user.roles)) {
            throw new ApiError(403, 'Forbidden')
        }
        next();
    };
};

module.exports = {
    auth,
    authorize,
}