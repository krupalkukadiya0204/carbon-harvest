const { FarmerProfile, IndustryProfile, RegulatorProfile } = require('../models/UserProfile');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const completeOnboarding = async (userId) => {
    await User.findByIdAndUpdate(userId, { onboardingStatus: 'completed' });
};

const handleFarmerOnboarding = async (req, res) => {
    try {
        // Validate request body
        await Promise.all([
            body('name').notEmpty().withMessage('Name is required').run(req),
            body('phone').notEmpty().withMessage('Phone is required').isMobilePhone().withMessage('Invalid phone number').run(req),
            body('location.address').notEmpty().withMessage('Address is required').run(req),
            body('location.city').notEmpty().withMessage('City is required').run(req),
            body('location.state').notEmpty().withMessage('State is required').run(req),
            body('location.country').notEmpty().withMessage('Country is required').run(req),
            body('location.pincode').notEmpty().withMessage('Pincode is required').run(req),
            body('bankName').notEmpty().withMessage('Bank name is required').run(req),
            body('accountNumber').notEmpty().withMessage('Account number is required').run(req),
            body('ifscCode').notEmpty().withMessage('IFSC code is required').run(req),
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
        const farmerProfile = new FarmerProfile({
            userId: req.user.id,
            ...req.body
        });
        await farmerProfile.save();
        await completeOnboarding(req.user.id);
        res.status(201).json({ message: 'Farmer profile created successfully' });
    } catch (error) {
        console.error('Error in farmer onboarding:', error);
        res.status(500).json({ message: 'Failed to create farmer profile', error: error.message });
    }
};

const handleIndustryOnboarding = async (req, res) => {
    try {
        await Promise.all([
            body('name').notEmpty().withMessage('Name is required').run(req),
            body('phone').notEmpty().withMessage('Phone is required').isMobilePhone().withMessage('Invalid phone number').run(req),
            body('location.address').notEmpty().withMessage('Address is required').run(req),
            body('location.city').notEmpty().withMessage('City is required').run(req),
            body('location.state').notEmpty().withMessage('State is required').run(req),
            body('location.country').notEmpty().withMessage('Country is required').run(req),
            body('location.pincode').notEmpty().withMessage('Pincode is required').run(req),
            body('bankName').notEmpty().withMessage('Bank name is required').run(req),
            body('accountNumber').notEmpty().withMessage('Account number is required').run(req),
            body('ifscCode').notEmpty().withMessage('IFSC code is required').run(req),
            body('panNumber').notEmpty().withMessage('PAN number is required').run(req),
            body('gstNumber').notEmpty().withMessage('GST number is required').run(req),
            body('certifications').notEmpty().withMessage('Certifications are required').run(req),
        ]);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const industryProfile = new IndustryProfile({
            userId: req.user.id,
            ...req.body
        });
        await industryProfile.save();
        await completeOnboarding(req.user.id);
        res.status(201).json({ message: 'Industry profile created successfully' });
    } catch (error) {
        console.error('Error in industry onboarding:', error);
        res.status(500).json({ message: 'Failed to create industry profile', error: error.message });
    }
};

const handleRegulatorOnboarding = async (req, res) => {
    try {
         await Promise.all([
            body('name').notEmpty().withMessage('Name is required').run(req),
            body('phone').notEmpty().withMessage('Phone is required').isMobilePhone().withMessage('Invalid phone number').run(req),
            body('location.address').notEmpty().withMessage('Address is required').run(req),
            body('location.city').notEmpty().withMessage('City is required').run(req),
            body('location.state').notEmpty().withMessage('State is required').run(req),
            body('location.country').notEmpty().withMessage('Country is required').run(req),
            body('location.pincode').notEmpty().withMessage('Pincode is required').run(req),
            body('bankName').notEmpty().withMessage('Bank name is required').run(req),
            body('accountNumber').notEmpty().withMessage('Account number is required').run(req),
            body('ifscCode').notEmpty().withMessage('IFSC code is required').run(req),
            body('panNumber').notEmpty().withMessage('PAN number is required').run(req),
        ]);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const regulatorProfile = new RegulatorProfile({
            userId: req.user.id,
            ...req.body
        });
        await regulatorProfile.save();
        await completeOnboarding(req.user.id);
        res.status(201).json({ message: 'Regulator profile created successfully' });
    } catch (error) {
        console.error('Error in regulator onboarding:', error);
        res.status(500).json({ message: 'Failed to create regulator profile', error: error.message });
    }
};

module.exports = {
    handleFarmerOnboarding,
    handleIndustryOnboarding,
    handleRegulatorOnboarding
};
