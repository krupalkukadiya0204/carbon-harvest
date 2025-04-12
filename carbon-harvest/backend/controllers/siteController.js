const SiteSettings = require('../models/SiteSettings');
const { body, validationResult } = require('express-validator');
const xss = require('xss');

// Get footer data
const getFooterData = async (req, res) => {
    try {
        const footerData = await SiteSettings.findOne({ type: 'footer' });
        if (!footerData) {
            return res.status(404).json({
                status: 'error',
                message: 'Footer data not found'
            });
        }
        res.json({
            status: 'success',
            data: footerData
        });
    } catch (error) {
        console.error('Error fetching footer data:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching footer data', error: error.message
        });
    }
};

const validateFooterData = [
    body('contactUs').notEmpty().withMessage('Contact Us is required'),
    body('aboutUs').notEmpty().withMessage('About Us is required'),
    body('privacyPolicy').notEmpty().withMessage('Privacy Policy is required').isURL().withMessage('Privacy Policy must be a valid URL'),
    body('termsOfService').notEmpty().withMessage('Terms of Service is required').isURL().withMessage('Terms of Service must be a valid URL'),
    body('socialMedia.facebook').optional().isURL().withMessage('Facebook link must be a valid URL'),
    body('socialMedia.twitter').optional().isURL().withMessage('Twitter link must be a valid URL'),
    body('socialMedia.instagram').optional().isURL().withMessage('Instagram link must be a valid URL'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Update footer data
const updateFooterData =  async (req, res) => {
    // Sanitize all fields
    const sanitizedData = {};
    for (const key in req.body) {
        sanitizedData[key] = xss(req.body[key]);
    }

    try {
        const updatedData = await SiteSettings.findOneAndUpdate(
            { type: 'footer' },
            { $set: { ...sanitizedData } },
            { new: true, upsert: true }
        );
        res.json({
            status: 'success',
            data: updatedData
        });
    } catch (error) {
        console.error('Error updating footer data:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating footer data', error: error.message
        });
    }
};

module.exports = {
    getFooterData,
    updateFooterData,
    validateFooterData
};
