/**
 * @file User Controller - Handles user management operations
 * @requires module:../server
 */
const { getAsync, setAsync, client } = require('../server');
const ActivityLog = require('../models/ActivityLog');

const User = require('../models/User');
const BlockchainService = require('../blockchain/blockchainService');
const xss = require('xss-clean');
const { body, validationResult } = require('express-validator');

const {authenticate} = require('../middleware/authMiddleware');

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
    // Verify if the user is authenticated and authorized
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: USER_ERRORS.UNAUTHORIZED }); // 403 Forbidden
    }
    // Sanitize inputs
    req.body = xss(req.body);
    req.query = xss(req.query);
    req.params = xss(req.params);

        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        if (error.name === 'MongoNetworkError') {
            res.status(500).json({ message: USER_ERRORS.DB_CONNECTION });
        } else if (error.name === 'CastError') {
            res.status(400).json({ message: USER_ERRORS.INVALID_REQUEST });
        } else {
            res.status(500).json({ message: USER_ERRORS.FETCH_FAILED, error: error.message});

            console.error('Error fetching users:', error);
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
    // Verify if the user is authenticated and authorized
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: USER_ERRORS.UNAUTHORIZED }); // 403 Forbidden
    }
    const userId = req.params.id;
    // Sanitize inputs
    req.body = xss(req.body);
    req.query = xss(req.query);
    req.params = xss(req.params);


    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: USER_ERRORS.USER_NOT_FOUND });
        }

        user.verified = true;
        await user.save();

        res.status(200).json({ message: 'User verified successfully', user });
    } catch (error) {
        if (error.name === 'MongoNetworkError') {
            res.status(500).json({ message: USER_ERRORS.DB_CONNECTION });
        } else if (error.name === 'CastError') {
            res.status(400).json({ message: USER_ERRORS.INVALID_REQUEST });
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ message: USER_ERRORS.INVALID_USER_DATA });
        } else {
            res.status(500).json({ message: USER_ERRORS.VERIFY_FAILED, error: error.message });

            console.error('Error verifying user:', error);
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
    // Verify if the user is authenticated and authorized
    if (!req.user) {
        return res.status(403).json({ message: USER_ERRORS.UNAUTHORIZED }); // 403 Forbidden
    }
    // Sanitize inputs
    req.body = xss(req.body);
    req.query = xss(req.query);
    req.params = xss(req.params);

    try {
        const userId = req.user.id;
        if (!userId) {
            console.error('No user ID found in request.');
            return res.status(401).json({ message: USER_ERRORS.UNAUTHORIZED });
        }

        const cacheKey = `user-profile:${userId}`;
        const cachedProfile = await getAsync(cacheKey);

        if (cachedProfile) {
            console.log('Serving user profile from cache.');
            return res.status(200).json({ user: JSON.parse(cachedProfile) });
        }

        console.log('Fetching user profile from database.');
        const user = await User.findById(userId).select('-password');

        if (!user) {
            console.error('User not found in database for ID:', userId);
            return res.status(404).json({ message: USER_ERRORS.USER_NOT_FOUND });
        }

        await setAsync(cacheKey, JSON.stringify(user));
        console.log('User profile cached successfully.');

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: USER_ERRORS.FETCH_FAILED, error: error.message });

    }
};

/**
 * Update user profile
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const updateProfileValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('phone').notEmpty().withMessage('Phone is required').isMobilePhone().withMessage('Invalid phone number'),
    body('bankName').notEmpty().withMessage('Bank Name is required'),
    body('accountNumber').notEmpty().withMessage('Account Number is required'),
    body('ifscCode').notEmpty().withMessage('IFSC Code is required'),
    body('panNumber').notEmpty().withMessage('PAN Number is required'),
    body('gstNumber').optional().notEmpty().withMessage('GST Number is required'),
    body('farmSize').optional().isNumeric().withMessage('Farm Size must be a number'),
    body('farmType').optional().notEmpty().withMessage('Farm Type is required'),
    body('cropTypes').optional().notEmpty().withMessage('Crop Types is required'),
    body('certifications').optional().notEmpty().withMessage('Certifications is required'),
    body('location').optional().isObject().withMessage('Location must be an object'),
    body('location.address').optional().notEmpty().withMessage('Location address is required'),
    body('location.city').optional().notEmpty().withMessage('Location city is required'),
    body('location.state').optional().notEmpty().withMessage('Location state is required'),
    body('location.country').optional().notEmpty().withMessage('Location country is required'),
    body('location.pincode').optional().notEmpty().withMessage('Location pincode is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        //check if the is error
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
        }
        next();
    },
];
// Update the user profile
const updateProfile = [updateProfileValidation, async (req, res) => {
  try {
      // Sanitize inputs
    req.body = xss(req.body);
    req.query = xss(req.query);
    req.params = xss(req.params);
    //get the user id
    const userId = req.user.id;
    const {
      name,
      organization,
      phone,
      bankName,
      accountNumber,
      ifscCode,
      panNumber,
      gstNumber,
      farmSize,
      farmType,
      cropTypes,
      certifications,
      location
    } = req.body;

    // Get the user in the database
    const user = await User.findById(userId);
    // Check if the user exist
    if (!user) {
      return res.status(404).json({ message: USER_ERRORS.USER_NOT_FOUND });
    }

    // Check if the user is an industry
    if (user.userType === 'Industry') {
      requiredFields.push('gstNumber', 'certifications');
    }

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }
    // Handle profile picture upload if present
    if (req.file) {
        user.profilePicture = req.file.path;
    }

    // Update user profile
    user.name = name;
    user.organization = organization;
    user.phone = phone;
    user.bankName = bankName;
    user.accountNumber = accountNumber;
    user.ifscCode = ifscCode;
    user.panNumber = panNumber;

    // Update location if provided
    if (location) {
        user.location = { ...user.location, ...location };
    }
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
    
    // Invalidate the cache
    const cacheKey = `user-profile:${userId}`;
    if (client.connected) {
        await client.del(cacheKey);
    }
    await user.save();
        // Add activity log
    const activityLog = new ActivityLog({
        userId: user._id,
        action: 'user updated profile',
    });

    await activityLog.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: USER_ERRORS.UPDATE_FAILED, error: error.message });
      }
}];

/**
 * Create user
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const createUser = async (req, res) => {
    // Verify if the user is authenticated and authorized
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: USER_ERRORS.UNAUTHORIZED }); // 403 Forbidden
    }

    try {
        // Sanitize inputs
        req.body = xss(req.body);
        req.query = xss(req.query);
        req.params = xss(req.params);
        // create an instance of the blockchain service
        const blockchainService = new BlockchainService();
        const {userId, publicKey, role} = req.body;
        // Create user in blockchain
        const userBlockchain = await blockchainService.CreateUser({"userId":userId, "publicKey":publicKey, "role":role})

        if(!userBlockchain.success){
          return res.status(500).json({ message: 'Failed to create user in blockchain', error: userBlockchain.error });
        }

        // Create user in database
        const userDb = new User(req.body);
        await userDb.save();


        res.status(201).json({ message: 'User created successfully', userDb, userBlockchain });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: USER_ERRORS.UPDATE_FAILED, error: error.message });
    }
};

/**
 * Update user
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const updateUser = async (req, res) => {
    // Verify if the user is authenticated and authorized
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: USER_ERRORS.UNAUTHORIZED }); // 403 Forbidden
    }
    try {
        // Sanitize inputs
        req.body = xss(req.body);
        req.query = xss(req.query);
        req.params = xss(req.params);
        // Create an instance of the blockchain service
        const blockchainService = new BlockchainService();
        const {userId, publicKey, role} = req.body;
        // Get the user in database
        const userDb = await User.findById(userId);
        if (!userDb) {
            return res.status(404).json({ message: USER_ERRORS.USER_NOT_FOUND });
        }
        // Update user in blockchain
        const userBlockchain = await blockchainService.UpdateUser({"userId":userId, "publicKey":publicKey, "role":role})
        if(!userBlockchain.success){
          return res.status(500).json({ message: 'Failed to update user in blockchain', error: userBlockchain.error });
        }

        // Update the user in database
        
        userDb.set(req.body);
        await userDb.save();

        res.status(200).json({ message: 'User updated successfully', userDb, userBlockchain });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: USER_ERRORS.UPDATE_FAILED, error: error.message });
    }
};
//export the function
module.exports = { getUsers, verifyUser, updateProfile, getUserProfile, createUser, updateUser};