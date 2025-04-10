/**
 * @file Authentication Middleware - Validates JWT tokens for protected routes
 */

const jwt = require('jsonwebtoken');

/**
 * Error messages for authentication middleware
 * @constant {Object}
 */
const AUTH_MIDDLEWARE_ERRORS = {
    NO_TOKEN: 'No token, authorization denied',
    INVALID_TOKEN: 'Token is not valid'
};

/**
 * Middleware to authenticate requests using JWT
 * @async
 * @param {object} req - Express request object
 * @param {object} req.headers - Request headers
 * @param {string} req.headers.authorization - Authorization header containing JWT
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {void}
 */
const protect = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: AUTH_MIDDLEWARE_ERRORS.NO_TOKEN });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) { 
        console.error('Token verification error:', error.message);
        res.status(401).json({ message: AUTH_MIDDLEWARE_ERRORS.INVALID_TOKEN });
    }
};

const validateAdmin = (req, res, next) => {
    if (!req.user || req.user.userType !== 'Regulator') {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
};

module.exports = { protect, validateAdmin };