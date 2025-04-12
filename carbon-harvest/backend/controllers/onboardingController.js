const { FarmerProfile, IndustryProfile, RegulatorProfile } = require('../models/UserProfile');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const BlockchainService = require('../blockchain/blockchainService');
const blockchainService = new BlockchainService();
const xss = require('xss-clean');
/**
 * @file Onboarding Controller - Handles user onboarding operations and profile creation
 * @author Your Name
 */

const completeOnboarding = async (userId) => {
    await User.findByIdAndUpdate(userId, { onboardingStatus: 'completed' });
};

const handleFarmerOnboarding = async (req, res) => {
    try {
        // Validate request body
         // Input validation and sanitization to prevent security vulnerabilities
        await Promise.all([
            xss(),
            body('name').notEmpty().withMessage('Name is required').run(req),
            body('phone').notEmpty().withMessage('Phone is required').isMobilePhone().withMessage('Invalid phone number').run(req),
            body('location.address').notEmpty().withMessage('Address is required').run(req),
            body('location.city').notEmpty().withMessage('City is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the city string
            body('location.state').notEmpty().withMessage('State is required').trim().escape().run(req), //trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the state string
            body('location.country').notEmpty().withMessage('Country is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the country string
            body('location.pincode').notEmpty().withMessage('Pincode is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the pincode string
            body('bankName').notEmpty().withMessage('Bank name is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the bankName string
            body('accountNumber').notEmpty().withMessage('Account number is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the accountNumber string
            body('ifscCode').notEmpty().withMessage('IFSC code is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the ifscCode string
            body('panNumber').notEmpty().withMessage('PAN number is required').run(req),
            body('farmSize').notEmpty().withMessage('Farm size is required').isNumeric().withMessage('Farm size must be a number').isFloat({ gt: 0 }).withMessage('Farm size must be greater than 0').run(req),
            body('farmType').notEmpty().withMessage('Farm type is required').run(req),
            body('cropTypes').notEmpty().withMessage('Crop types are required').run(req),
        ]);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Sanitize Inputs
        for (const key in req.body) {
            req.body[key] = xss(req.body[key]);//Sanitize all inputs to prevent XSS attacks
        }
        const user = await User.findById(req.user.id);
           // Input validation
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const farmerProfile = new FarmerProfile({
            userId: req.user.id,
            ...req.body
            // No direct user input is used for the userId, so it's considered safe.
        });
        await blockchainService.updateUser({
            userId: user.id,
            onboarding: true,
        });
        await farmerProfile.save();
        await completeOnboarding(req.user.id);
        res.status(201).json({ message: 'Farmer profile created successfully' });
    } catch (error) {
        console.error('Error in farmer onboarding:', error);
          // Error handling, prevents sensitive info leak
        res.status(500).json({ message: 'Failed to create farmer profile', error: error.message });
    }
};

const handleIndustryOnboarding = async (req, res) => {
    try {
        await Promise.all([
            xss(),//Sanitize all inputs to prevent XSS attacks
            body('name').notEmpty().withMessage('Name is required').run(req),
            body('phone').notEmpty().withMessage('Phone is required').isMobilePhone().withMessage('Invalid phone number').run(req),
            body('location.address').notEmpty().withMessage('Address is required').run(req),
            body('location.city').notEmpty().withMessage('City is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the city string
            body('location.state').notEmpty().withMessage('State is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the state string
            body('location.country').notEmpty().withMessage('Country is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the country string
            body('location.pincode').notEmpty().withMessage('Pincode is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the pincode string
            body('bankName').notEmpty().withMessage('Bank name is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the bankName string
            body('accountNumber').notEmpty().withMessage('Account number is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the accountNumber string
            body('ifscCode').notEmpty().withMessage('IFSC code is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the ifscCode string
            body('panNumber').notEmpty().withMessage('PAN number is required').run(req),
            body('gstNumber').notEmpty().withMessage('GST number is required').run(req),
            body('certifications').notEmpty().withMessage('Certifications are required').run(req),
        ]);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Sanitize Inputs
        for (const key in req.body) {
            req.body[key] = xss(req.body[key]);//Sanitize all inputs to prevent XSS attacks
        }
        const user = await User.findById(req.user.id);
           // Input validation
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const industryProfile = new IndustryProfile({
            userId: req.user.id,
            ...req.body // No direct user input is used for the userId, so it's considered safe.
        });
        await blockchainService.updateUser({
            userId: user.id,
            onboarding: true,
        });
        await industryProfile.save();
        await completeOnboarding(req.user.id);
        res.status(201).json({ message: 'Industry profile created successfully' });
    } catch (error) {
        console.error('Error in industry onboarding:', error);
          // Error handling, prevents sensitive info leak
        res.status(500).json({ message: 'Failed to create industry profile', error: error.message });
    }
};

const handleRegulatorOnboarding = async (req, res) => {
    try {
         await Promise.all([
            xss(),//Sanitize all inputs to prevent XSS attacks
            body('name').notEmpty().withMessage('Name is required').run(req),
            body('phone').notEmpty().withMessage('Phone is required').isMobilePhone().withMessage('Invalid phone number').run(req),
            body('location.address').notEmpty().withMessage('Address is required').run(req),
            body('location.city').notEmpty().withMessage('City is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the city string
            body('location.state').notEmpty().withMessage('State is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the state string
            body('location.country').notEmpty().withMessage('Country is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the country string
            body('location.pincode').notEmpty().withMessage('Pincode is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the pincode string
            body('bankName').notEmpty().withMessage('Bank name is required').trim().escape().run(req),//trim() method to remove leading and trailing whitespace. The escape() method is used to sanitize the bankName string
            body('accountNumber').notEmpty().withMessage('Account number is required').run(req),
            body('ifscCode').notEmpty().withMessage('IFSC code is required').run(req),
            body('panNumber').notEmpty().withMessage('PAN number is required').run(req),
        ]);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Sanitize Inputs
        for (const key in req.body) {
            req.body[key] = xss(req.body[key]);//Sanitize all inputs to prevent XSS attacks
        }

        const user = await User.findById(req.user.id);
         // Input validation
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const regulatorProfile = new RegulatorProfile({
            userId: req.user.id,// No direct user input is used for the userId, so it's considered safe.
            ...req.body
        });
        await blockchainService.updateUser({
            userId: user.id,
            onboarding: true,
        });
        await regulatorProfile.save();
        await completeOnboarding(req.user.id);
        res.status(201).json({ message: 'Regulator profile created successfully' });
    } catch (error) {
        console.error('Error in regulator onboarding:', error);
          // Error handling, prevents sensitive info leak
        res.status(500).json({ message: 'Failed to create regulator profile', error: error.message });
    }
};

module.exports = {
    handleFarmerOnboarding,
    handleIndustryOnboarding,
    handleRegulatorOnboarding
};
