/**
 * @file Authentication Middleware - Validates JWT tokens for protected routes
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
        User.findById(decoded.id).then(user=>{
            if(!user){
                return res.status(401).json({ message: AUTH_MIDDLEWARE_ERRORS.INVALID_TOKEN });
            }
            req.user = user;
            next();
        }).catch(error=>{
            console.error('Token verification error:', error.message);
            res.status(401).json({ message: AUTH_MIDDLEWARE_ERRORS.INVALID_TOKEN });
        })
    } catch (error) { 
        console.error('Token verification error:', error.message);
        res.status(401).json({ message: AUTH_MIDDLEWARE_ERRORS.INVALID_TOKEN });
    }
};

/**
 * Middleware to authorize requests based on user roles
 * @param {string[]} roles - An array of roles that are allowed to access the route
 * @returns {function} Express middleware function
 */
const authorize = (roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: AUTH_MIDDLEWARE_ERRORS.NO_TOKEN });
    }
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden. Insufficient privileges.' });
    }
    next();
};
module.exports = { protect, authorize };