/**
 * @file Credit Controller - Handles all carbon credit related operations
 * @module creditController
 */

const Credit = require('../models/Credit');
const User = require('../models/User');
const client = require('../server');
const { body, param, validationResult } = require('express-validator');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const ActivityLog = require('../models/ActivityLog');
const { getAsync, setAsync } = require('../server');
const BlockchainService = require('../blockchain/blockchainService');

/**
 * Error messages for credit operations
 * @constant {Object}
 */
const ERROR_MESSAGES = {
  INVALID_DATA: 'Invalid request data',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  DB_CONNECTION: 'Database connection failed. Please try again later.',
  NOT_FOUND: 'Credit not found',
  UNAUTHORIZED: 'Unauthorized access'
};

/**
 * Calculates sustainability metrics based on credit type and amount
 * @param {string} creditType - Type of carbon credit (e.g., 'Soil Carbon', 'Renewable Energy')
 * @param {number} amount - Amount of carbon credits
 * @returns {object} Calculated sustainability metrics
 */
const calculateSustainabilityMetrics = (creditType, amount) => {
    const baseMetrics = {
        carbonReduction: amount * 0.5,
        waterSaved: amount * 2.5,
        soilHealth: 75,
        biodiversityScore: 65
    };

    switch (creditType) {
        case 'Soil Carbon':
            baseMetrics.soilHealth += 15;// Increase soil health for 'Soil Carbon' credits
            baseMetrics.biodiversityScore += 10;// Increase biodiversity score for 'Soil Carbon' credits
            break;
        case 'Renewable Energy':
            baseMetrics.carbonReduction *= 1.5;
            break;
        case 'Agroforestry':
            baseMetrics.biodiversityScore += 20;
            baseMetrics.waterSaved *= 1.3;
            break;
        case 'Sustainable Agriculture':
            baseMetrics.soilHealth += 10;
            baseMetrics.waterSaved *= 1.2;
            break;
    }

    return baseMetrics;
};

// Rate Limiting for adding credits
const addCreditLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per 15 minutes
    message: 'Too many credits added from this IP, please try again after 15 minutes',
    headers: true,
    keyGenerator: (req) => req.ip, // Rate limit by IP
    handler: (req, res) => res.status(429).json({ message: 'Too many requests' }),
};

/**
 * Creates a new carbon credit entry
 * @async
 * @param {object} req - Express request object
 * @param {object} req.body - Request body containing credit details
 * @param {number} req.body.amount - Amount of carbon credits
 * @param {number} req.body.price - Price per credit
 * @param {string} req.body.creditType - Type of carbon credit
 * @param {string} req.body.location - Geographic location
 * @param {object} req.user - Authenticated user object
 * @param {string} req.user.id - User ID
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const addCredit = async (req, res) => {
    const blockchainService = new BlockchainService();
    // Sanitize inputs
    req.body.amount = xss().clean(req.body.amount);
    req.body.price = xss().clean(req.body.price);
    req.body.creditType = xss().clean(req.body.creditType);
    req.body.location = xss().clean(req.body.location);


    // Input Validation
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    const { amount, price, creditType, location } = req.body;
    const farmer = req.user.id;

    try {
        // Calculate sustainability metrics using the helper function

        const sustainabilityMetrics = calculateSustainabilityMetrics(creditType, amount);

        const newCredit = new Credit({
            farmer,
            amount,
            price,
            creditType,
            location,
            sustainabilityMetrics,
            status: 'Available',
        });
        // Create credit in the blockchain
        const blockchainCredit = await blockchainService.IssueCredit({
            creditId: newCredit._id,
            amount,
            price,
            creditType,
            location,
            farmer
        });
        console.log("blockchainCredit:", blockchainCredit);
        newCredit.verificationDetails = {
            verificationDetails: {
                verificationMethod: 'Pending Verification',
                verificationDate: new Date(),
            }
        });

        client.del('credits');
        await newCredit.save();

        //add activity log
        await ActivityLog.create({
            userId: req.user.id,
            action: 'credit added',
            details: `New credit of type ${creditType} added by user ${req.user.id}`,
        });

        // Populate farmer details
        await newCredit.populate('farmer', 'name location');

        res.status(201).json(newCredit);
    } catch (error) {

        console.error('Error adding credit:', error);

        res.status(500).json({ message: 'Failed to add credit. Please try again later.', error: error.message });
    }
};

/**
 * Retrieves all carbon credits
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const getCredits = async (req, res) => {

  try {
    const cacheKey = 'credits';
        // Check if credits are cached
    const cachedCredits = await getAsync(cacheKey);

    if (cachedCredits) {
        console.log('Credits data served from cache');
        return res.status(200).json(JSON.parse(cachedCredits));
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Sanitize inputs
    req.query.status = xss().clean(req.query.status);
    req.query.type = xss().clean(req.query.type);
    req.query.userId = xss().clean(req.query.userId);
    req.query.startDate = xss().clean(req.query.startDate);
    req.query.endDate = xss().clean(req.query.endDate);

    const skip = (page - 1) * limit;// Calculate how many documents to skip

    const { status, type, userId, startDate, endDate } = req.query;

    // Build the filter object
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.creditType = type;
    if (userId) filter.farmer = userId;

    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const totalCredits = await Credit.countDocuments();
    const totalPages = Math.ceil(totalCredits / limit);

    const credits = await Credit.find(filter)
        .skip(skip)
      .limit(limit);

    const data = {
        credits,
        pagination: {
            totalCredits,
            totalPages,
            currentPage: page,
            creditsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    };

    await setAsync(cacheKey, JSON.stringify(data), 'EX', 60);// Cache for 60 seconds

    res.status(200).json(data);
  } catch (error) {
        console.error('Error fetching credits:', error);
        // Improved error logging
        
        res.status(500).json({ message: 'Failed to fetch credits. Please try again later.', error: error.message });
  }
};

/**
 * Retrieves aggregated statistics for carbon credits
 * @async
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
const getCreditStats = async (req, res) => {

    try {
        const stats = await Credit.aggregate([
            {
                $group: {
                    _id: null,
                    totalCredits: { $sum: '$amount' },
                    averagePrice: { $avg: '$price' },
                    totalTrades: { $sum: { $size: '$tradingHistory' } },
                    totalCarbon: { $sum: '$sustainabilityMetrics.carbonReduction' },
                    totalWater: { $sum: '$sustainabilityMetrics.waterSaved' }
                }
            }
        ]);

        const creditsByType = await Credit.aggregate([
            {
                $group: {
                    _id: '$creditType',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        const stateDistribution = await Credit.aggregate([
            {
                $group: {
                    _id: '$location.state',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        res.json({
            overview: stats[0],
            creditsByType,
            stateDistribution
        });
    } catch (error) {
        console.error('Error fetching credit stats:', error);
        res.status(500).json({ message: 'Failed to fetch credit statistics' });
    }
};

const buyCreditLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per 15 minutes
    message: 'Too many credits bought from this IP, please try again after 15 minutes',
    headers: true,
    keyGenerator: (req) => req.ip, // Rate limit by IP
    handler: (req, res) => res.status(429).json({ message: 'Too many requests' }),
});
/**
 *
 * @param req
 * @param res
 */
const buyCredit = async (req, res) => {

        // Validate request parameters
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const blockchainService = new BlockchainService();
    // Sanitize input
    req.params.id = xss().clean(req.params.id);

    try {
        const credit = await Credit.findById(req.params.id);
        if (!credit) {
            return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND });
        }

        if (credit.status !== 'Available') {
            return res.status(400).json({ message: 'Credit is not available for purchase' });
        }

        credit.status = 'Sold';
        credit.owner = req.user.id;
        credit.tradingHistory.push({
            date: new Date(),
            price: credit.price,
            buyer: req.user.id,
            seller: credit.farmer
        });
        // Transfer the credit in the blockchain
        await blockchainService.TransferCredit({
            creditId: req.params.id,
            price: credit.price,
            buyer: req.user.id,
            seller: credit.farmer
        });

        client.del('credits');
        await credit.save();

        //add activity log
        await ActivityLog.create({
            userId: req.user.id,
            action: 'credit buyed',
            details: `Credit ${credit.id} buyed by user ${req.user.id}`,
        });


        res.status(200).json({ message: 'Credit purchased successfully', credit });
    } catch (error) {
        console.error('Error buying credit:', error);
        res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR, error: error.message });
    }
};

// Define the validation rules
const validateAddCredit = [
    body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number').trim().escape(),// Ensure amount is a positive number
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number').trim().escape(),// Ensure price is a positive number
    body('creditType').isIn(['Soil Carbon', 'Renewable Energy', 'Agroforestry', 'Sustainable Agriculture']).withMessage('Invalid credit type').trim().escape(),// Ensure creditType is one of the allowed values
    body('location').isObject().withMessage('Location must be an object').trim().escape(),// Validate location is an object
    body('location.address').notEmpty().withMessage('Location address is required').trim().escape(),// Validate location address is not empty
    body('location.city').notEmpty().withMessage('Location city is required').trim().escape(),// Validate location city is not empty
    body('location.state').notEmpty().withMessage('Location state is required').trim().escape(),// Validate location state is not empty
    body('location.country').notEmpty().withMessage('Location country is required').trim().escape(),// Validate location country is not empty
    body('location.pincode').notEmpty().withMessage('Location pincode is required').trim().escape(),// Validate location pincode is not empty
];

// Define the validation rules
const validateBuyCredit = [
    param('id').isMongoId().withMessage('Invalid credit ID'),
];


module.exports = {
    addCredit,
    getCredits,
    buyCredit,
    getCreditStats,
    validateAddCredit,
    validateBuyCredit,
    addCreditLimiter,
    buyCreditLimiter