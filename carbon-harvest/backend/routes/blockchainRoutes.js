const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const BlockchainService = require('./blockchainService');
const authMiddleware = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

const blockchainService = new BlockchainService();

// Rate Limiter for Blockchain Routes
const blockchainLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Input validation middleware
const validateInput = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ errors: errors.array() });
    };
};

// Apply rate limiting to all blockchain routes
router.use(blockchainLimiter);

// Issue Credit
router.post('/credits/issue', authMiddleware, validateInput([
    body('creditId').notEmpty().withMessage('Credit ID is required'),
    body('projectId').notEmpty().withMessage('Project ID is required'),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
]), async (req, res) => {
    try {
        const creditData = req.body;
        const result = await blockchainService.issueCredit(creditData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Transfer Credit
router.post('/credits/transfer', authMiddleware, validateInput([
    body('creditID').notEmpty().withMessage('Credit ID is required'),
    body('newOwnerID').notEmpty().withMessage('New Owner ID is required'),
]), async (req, res) => {
    try {
        const { creditID, newOwnerID } = req.body;
        const result = await blockchainService.transferCredit(creditID, newOwnerID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retire Credit
router.post('/credits/retire', authMiddleware, validateInput([
    body('creditID').notEmpty().withMessage('Credit ID is required'),
]), async (req, res) => {
    try {
        const { creditID } = req.body;
        const result = await blockchainService.retireCredit(creditID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify Credit
router.post('/credits/verify', authMiddleware, validateInput([
    body('creditID').notEmpty().withMessage('Credit ID is required'),
    body('verificationData').notEmpty().withMessage('Verification data is required'),
]), async (req, res) => {
    try {
        const { creditID, verificationData } = req.body;
        const result = await blockchainService.verifyCredit(creditID, verificationData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create Project
router.post('/projects/create', authMiddleware, validateInput([
    body('projectId').notEmpty().withMessage('Project ID is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('verificationBody').notEmpty().withMessage('Verification body is required'),
]), async (req, res) => {
    try {
        const projectData = req.body;
        const result = await blockchainService.createProject(projectData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Project
router.put('/projects/:projectId', authMiddleware, validateInput([
    body('projectId').notEmpty().withMessage('Project ID is required'),
]), async (req, res) => {
    try {
        const { projectId } = req.params;
        const updatedData = req.body;
        const result = await blockchainService.updateProject(projectId, updatedData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create User
router.post('/users/create', authMiddleware, async (req, res) => {
    try {
        const userData = req.body;
        const result = await blockchainService.createUser(userData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User
router.put('/users/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const result = await blockchainService.updateUser(userId, updatedData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;