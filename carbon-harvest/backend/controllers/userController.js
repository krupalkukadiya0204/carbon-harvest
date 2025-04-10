/**
 * @file User Controller - Handles user management operations
 */

const User = require('../models/User');

/**
 * Error messages for user operations
 * @constant {Object}
 */
const USER_ERRORS = {
    DB_CONNECTION: 'Failed to connect to database. Please try again later.',
    INVALID_REQUEST: 'Invalid request. Please check your request parameters.',
    INVALID_USER_DATA: 'Invalid user data. Please check your request parameters.',
    FETCH_FAILED: 'Failed to fetch users. Please try again later.',
    USER_NOT_FOUND: 'User not found',
    VERIFY_FAILED: 'Failed to verify user. Please try again later.',
    UPDATE_FAILED: 'Failed to update profile. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.'
};

/**
 * Get all users
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        if (error.name === 'MongoNetworkError') {
            res.status(500).json({ message: USER_ERRORS.DB_CONNECTION });
        } else if (error.name === 'CastError') {
            res.status(400).json({ message: USER_ERRORS.INVALID_REQUEST });
        } else {
            res.status(500).json({ message: USER_ERRORS.FETCH_FAILED });
        }
    }
}; 

/**
 *
 * @param req
 * @param res
 */
/**
 * Verify a user's account
 * @async
 * @param {object} req - Express request object
 * @param {object} req.params - Request parameters
 * @param {string} req.params.id - User ID to verify
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const verifyUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: USER_ERRORS.USER_NOT_FOUND });
        }

        user.verified = true;
        await user.save();

        res.status(200).json({ message: 'User verified successfully', user });
    } catch (error) {
        console.error('Error verifying user:', error.message);
        if (error.name === 'MongoNetworkError') {
            res.status(500).json({ message: USER_ERRORS.DB_CONNECTION });
        } else if (error.name === 'CastError') {
            res.status(400).json({ message: USER_ERRORS.INVALID_REQUEST });
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ message: USER_ERRORS.INVALID_USER_DATA });
        } else {
            res.status(500).json({ message: USER_ERRORS.VERIFY_FAILED });
        }
    }
};

/**
 * Get user profile
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const getUserProfile = async (req, res) => {
    try {
        console.log('Getting user profile for user ID:', req.user?.id);
        if (!req.user || !req.user.id) {
            console.error('No user ID found in request');
            return res.status(401).json({ message: USER_ERRORS.UNAUTHORIZED });
        }

        const user = await User.findById(req.user.id).select('-password');
        console.log('Found user:', user ? 'Yes' : 'No');

        if (!user) {
            console.error('User not found in database for ID:', req.user.id);
            return res.status(404).json({ message: USER_ERRORS.USER_NOT_FOUND });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', {
            message: error.message,
            stack: error.stack,
            userId: req.user?.id
        });
        res.status(500).json({ message: USER_ERRORS.FETCH_FAILED });
    }
};

/**
 * Update user profile
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            name,
            organization,
            phone,
            address,
            city,
            state,
            country,
            pincode,
            bankName,
            accountNumber,
            ifscCode,
            panNumber,
            gstNumber,
            farmSize,
            farmType,
            cropTypes,
            certifications
        } = req.body;

        // Get the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: USER_ERRORS.USER_NOT_FOUND });
        }

        // Validate required fields based on user type
        const requiredFields = [
            'name', 'phone', 'address', 'city', 'state',
            'country', 'pincode', 'bankName', 'accountNumber',
            'ifscCode', 'panNumber'
        ];

        if (user.userType === 'Farmer') {
            requiredFields.push('farmSize', 'farmType', 'cropTypes');
        }

        if (user.userType === 'Industry') {
            requiredFields.push('gstNumber', 'certifications');
        }

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Handle profile picture upload if present
        let profilePicture = user.profilePicture;
        if (req.file) {
            profilePicture = req.file.path;
        }

        // Update user profile
        user.name = name;
        user.organization = organization;
        user.phone = phone;
        user.address = address;
        user.city = city;
        user.state = state;
        user.country = country;
        user.pincode = pincode;
        user.bankName = bankName;
        user.accountNumber = accountNumber;
        user.ifscCode = ifscCode;
        user.panNumber = panNumber;
        user.profilePicture = profilePicture;

        // Update user type specific fields
        if (user.userType === 'Farmer') {
            user.farmSize = farmSize;
            user.farmType = farmType;
            user.cropTypes = cropTypes;
        }

        if (user.userType === 'Industry') {
            user.gstNumber = gstNumber;
            user.certifications = certifications;
        }

        // Save the updated user
        await user.save();

        // Return success response
        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                name: user.name,
                organization: user.organization,
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                country: user.country,
                pincode: user.pincode,
                profilePicture: user.profilePicture,
                userType: user.userType,
                // Include type-specific fields
                ...(user.userType === 'Farmer' && {
                    farmSize: user.farmSize,
                    farmType: user.farmType,
                    cropTypes: user.cropTypes
                }),
                ...(user.userType === 'Industry' && {
                    gstNumber: user.gstNumber,
                    certifications: user.certifications
                })
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: USER_ERRORS.UPDATE_FAILED });
    }
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: USER_ERRORS.USER_NOT_FOUND });
        }

        // Update fields if they exist in the request
        const { name, organization, phone } = req.body;
        if (name) user.name = name;
        if (organization) user.organization = organization;
        if (phone) user.phone = phone;

        // Handle profile picture upload
        if (req.file) {
            user.profilePicture = `/api/uploads/profiles/${req.file.filename}`;
        }

        await user.save();

        // Return updated user without password
        const updatedUser = await User.findById(user._id).select('-password');
        res.status(200).json({ 
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: USER_ERRORS.UPDATE_FAILED });
    }
};

module.exports = { getUsers, verifyUser, updateProfile, getUserProfile };