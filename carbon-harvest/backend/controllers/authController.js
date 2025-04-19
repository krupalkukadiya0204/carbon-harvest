 /**
 * @module authController
 * @file Authentication Controller - Handles user registration and login
 */
import { sendPasswordResetEmail, generateVerificationToken, sendVerificationEmail } from '../services/verificationService.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import xss from 'xss-clean/lib/index.js';
import { body, validationResult } from 'express-validator';


import ActivityLog from '../models/ActivityLog.js';
import User from '../models/User.js';


/**
 * Error messages for authentication operations
 * @constant {Object}
 */
const AUTH_ERRORS = {
    USER_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    REGISTRATION_FAILED: 'Registration failed. Please check your details and try again.',
    LOGIN_FAILED: 'Login failed. Please check your credentials and try again.',


const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
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
export const register = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password, userType, organization, phone } = req.body;

    // Sanitize inputs
    name = xss.clean(name);
    email = xss.clean(email);
    password = xss.clean(password);
    userType = xss.clean(userType);
    organization = xss.clean(organization);
    phone = xss.clean(phone);

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
            isVerified: false
        });

        const verificationToken = generateVerificationToken(newUser._id);
        await sendVerificationEmail(newUser.email, verificationToken);

        // Save the user
        const savedUser = await newUser.save();

        // Log the activity
        await ActivityLog.create({
            userId: newUser._id,
            action: 'user registered',
            details: `User ${newUser.name} registered with email ${newUser.email}`
        });

        const accessToken = jwt.sign(
            { id: newUser._id, userType: newUser.userType },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = crypto.randomBytes(40).toString('hex');
        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({
            secure: true, // Set to true if using HTTPS
            httpOnly: true,
            accessToken, refreshToken,
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
export const login = async (req, res) => {
        // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { email, password } = req.body;

    // Sanitize inputs
    email = xss.clean(email);
    password = xss.clean(password);

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
        res.status(200).cookie('refreshToken', refreshToken, {
            secure: true,
        }).json({
            accessToken,
            refreshToken,
            user: userResponse
        });
        // Log the activity
        await ActivityLog.create({
            httpOnly: true 
        }).json({
            accessToken,

             refreshToken,
              user: userResponse
             });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: AUTH_ERRORS.LOGIN_FAILED, error: error.message });
    }
};

/**
 * Forgot password
 * @async
 * @param {object} req - Express request object
 * @param {object} req.body - Request body
 * @param {string} req.body.email - User's email
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
export const forgotPassword = async (req, res) => {
    let { email } = req.body;
    // Sanitize inputs
    email = xss.clean(email);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: AUTH_ERRORS.USER_NOT_FOUND });
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        await user.save();
         try {
            await sendPasswordResetEmail(user.email, resetToken, user.name);
        } catch (error) {
            console.error('Error sending password reset email:', error);
             // Log the activity
             await ActivityLog.create({
                userId: user._id,
                action: 'password reset email sent failed',
                details: `User ${user.name} email sent failed`
            });
            return res.status(500).json({ message: 'Failed to send password reset email' });

                // Log the activity
                await ActivityLog.create({
                    userId: user._id,
                    action: 'user requested password reset',
                    details: `User ${user.name} requested a password reset with email ${user.email}`
                });
        res.status(200).json({ message: 'Password reset email sent' });
        }

    } catch (error) {
        
        console.error('Error during forgot password:', error.message);
        res.status(500).json({ message: 'Error during forgot password', error: error.message });    }
};
export const validateRefreshToken = [
    body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];

export const refreshToken = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { refreshToken } = req.body;
    // Sanitize inputs
    refreshToken = xss.clean(refreshToken);

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

/**
 * Verify email
 * @async
 * @param {object} req - Express request object
 * @param {object} req.params - Request parameters
 * @param {string} req.params.token - Verification token
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
export const verifyEmail = async (req, res) => {
    let { token } = req.params;
    // Sanitize inputs
    token = xss.clean(token);
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({ message: 'Email verified' });
    } catch (error) {
        console.error('Error verifying email:', error.message);
        res.status(500).json({ message: 'Error verifying email', error: error.message });
    }
};

/**
 * Reset password
 * @async
 * @param {object} req - Express request object
 * @param {object} req.body - Request body
 * @param {string} req.body.token - Password reset token
 * @param {string} req.body.password - New password
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
export const resetPassword = async (req, res) => {
    let { token, password } = req.body;
    // Sanitize inputs
    token = xss.clean(token);
    password = xss.clean(password);
    try {
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // Log the activity
        await ActivityLog.create({
            userId: user._id,
            action: 'user reset password',
            details: `User ${user.name} reset password`
        });
        res.status(200).json({ message: 'Password updated' });
    } catch (error) {
        console.error('Error during password reset:', error.message);
        res.status(500).json({ message: 'Error during password reset', error: error.message });
    }
};
