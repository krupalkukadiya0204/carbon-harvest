const User = require("../models/User");
const { body, validationResult } = require('express-validator');

// Controller functions
const getSettings = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("settings");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ settings: user.settings });
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateSettings = async (req, res) =>  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { emailNotifications, smsNotifications, language, theme, twoFactorAuth } = req.body;

        const user = await User.findById(req.user.id);
        
       
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update settings
        user.settings = {
            ...user.settings,
            ...(emailNotifications !== undefined && { emailNotifications }),
            ...(smsNotifications !== undefined && { smsNotifications }),
            ...(language && { language }),
            ...(theme && { theme }),
            ...(twoFactorAuth !== undefined && { twoFactorAuth })
        };

        await user.save();
        res.json({ settings: user.settings });
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const validateSettings = [
    body('emailNotifications').optional().isBoolean().withMessage('emailNotifications must be a boolean'),
    body('smsNotifications').optional().isBoolean().withMessage('smsNotifications must be a boolean'),
    body('language').optional().isIn(['en', 'hi', 'mr']).withMessage('Invalid language selection'),
    body('theme').optional().isIn(['light', 'dark']).withMessage('Invalid theme selection'),
    body('twoFactorAuth').optional().isBoolean().withMessage('twoFactorAuth must be a boolean'),
];



module.exports = {
    getSettings,
    updateSettings,
    validateSettings
};

