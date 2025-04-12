/**
 * @file Credit Controller - Handles all carbon credit related operations
 * @module creditController
 */

const Credit = require('../models/Credit');
const User = require('../models/User');

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

    switch(creditType) {
        case 'Soil Carbon':
            baseMetrics.soilHealth += 15;
            baseMetrics.biodiversityScore += 10;
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
            verificationDetails: {
                verificationMethod: 'Pending Verification',
                verificationDate: new Date()
            }
        });

        await newCredit.save();
        
        // Populate farmer details
        await newCredit.populate('farmer', 'name location');

        res.status(201).json(newCredit);
    } catch (error) {
        console.error('Error adding credit:', error.message);
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Invalid request data', errors: error.errors });
        } else {
            res.status(500).json({ message: 'Failed to add credit. Please try again later.' });
        }
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
        const credits = await Credit.find();
        res.status(200).json(credits);
    } catch (error) {
        console.error('Error fetching credits:', error.message);
        if (error.name === 'MongoError') {
            res.status(503).json({ message: 'Database connection failed. Please try again later.' });
        } else {
            res.status(500).json({ message: 'Failed to fetch credits. Please try again later.' });
        }
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

/**
 *
 * @param req
 * @param res
 */
const buyCredit = async (req, res) => {
    try {
        const credit = await Credit.findById(req.params.id);
        if (!credit) {
            return res.status(404).json({ message: 'Credit not found' });
        }

        if (credit.status !== 'Available') {
            return res.status(400).json({ message: 'Credit is not available for purchase' });
        }

        // Update credit status and add to trading history
        credit.status = 'Sold';
        credit.owner = req.user.id;
        credit.tradingHistory.push({
            date: new Date(),
            price: credit.price,
            buyer: req.user.id,
            seller: credit.farmer
        });

        await credit.save();

        res.status(200).json({ message: 'Credit purchased successfully', credit });
    } catch (error) {
        console.error('Error buying credit:', error.message);
        res.status(500).json({ message: 'Error buying credit' });
    }
};

module.exports = {
    addCredit,
    getCredits,
    buyCredit,
    getCreditStats
};