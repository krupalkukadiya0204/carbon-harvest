/**
 * @file Authentication Controller - Handles user registration and login
 */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');


const User = require('../models/User');

/**
 * Error messages for authentication operations
 * @constant {Object}
 */
const AUTH_ERRORS = {
    USER_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    REGISTRATION_FAILED: 'Registration failed. Please check your details and try again.',
    LOGIN_FAILED: 'Login failed. Please check your credentials and try again.'
};


const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('userType').notEmpty().withMessage('User type is required'),
    body('organization').notEmpty().withMessage('Organization is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('phone').matches(/^[\d\+\-\(\) ]+$/).withMessage('Invalid phone number'),
];

const validateAuth = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
];


/**
 * Register a new user
 * @async
 * @param {object} req - Express request object
 * @param {object} req.body - Request body
 * @param {string} req.body.name - User's name
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @param {string} req.body.userType - Type of user (farmer, industry, regulator)
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const register = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { name, email, password, userType, organization, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: AUTH_ERRORS.USER_EXISTS });
        }

        const hashedPassword = await bcrypt.hash(password, 12); 

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType,
            organization,
            phone,
        });

        await newUser.save();

        const accessToken = jwt.sign(
            { id: newUser._id, userType: newUser.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = crypto.randomBytes(40).toString('hex');
        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({
             accessToken,
             refreshToken,
              user: newUser 
            });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: AUTH_ERRORS.REGISTRATION_FAILED, error: error.message });
    }
};

/**
 * Login user
 * @async
 * @param {object} req - Express request object
 * @param {object} req.body - Request body
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
        // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: AUTH_ERRORS.USER_NOT_FOUND });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: AUTH_ERRORS.INVALID_CREDENTIALS });
        }

        // Create a user object without sensitive data
        const userForToken = {
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            organization: user.organization,
            phone: user.phone
        };

        const accessToken = jwt.sign(
            userForToken,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        const refreshToken = crypto.randomBytes(40).toString('hex');
        user.refreshToken = refreshToken;
        await user.save();

        // Return user data without password
        const userResponse = { ...userForToken };
        res.status(200).json({
             accessToken,
             refreshToken,
              user: userResponse
             });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: AUTH_ERRORS.LOGIN_FAILED, error: error.message });
    }
};


const validateRefreshToken = [
    body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];

const refreshToken = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { refreshToken } = req.body;

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const userForToken = {
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            organization: user.organization,
            phone: user.phone
        };

        const newAccessToken = jwt.sign(
            userForToken,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Error refreshing token:', error.message);
        res.status(500).json({ message: 'Error refreshing token', error: error.message });
    }
};



module.exports = { register, login, validateRegister, validateLogin };