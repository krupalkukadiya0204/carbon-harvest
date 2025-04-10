/**
 * @file Authentication Controller - Handles user registration and login
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

        const token = jwt.sign(
            { id: newUser._id, userType: newUser.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: AUTH_ERRORS.REGISTRATION_FAILED });
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

        const token = jwt.sign(
            userForToken,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return user data without password
        const userResponse = { ...userForToken };
        res.status(200).json({ token, user: userResponse });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: AUTH_ERRORS.LOGIN_FAILED });
    }
};

module.exports = { register, login };