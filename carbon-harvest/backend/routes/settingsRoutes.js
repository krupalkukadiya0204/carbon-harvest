const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/authMiddleware');
const settingsController = require('../controllers/settingsController'); 
const { validateUpdateSettings } = require('../controllers/settingsController');

// @route   GET /api/settings
// @desc    Get user settings
// @access  Private
router.get('/', auth, authorize(['farmer', 'industry', 'regulator']), settingsController.getSettings);

// @route   PUT /api/settings
// @desc    Update user settings
// @access  Private
router.put('/', auth, authorize(['farmer', 'industry', 'regulator']), validateUpdateSettings, settingsController.updateSettings);

module.exports = router;
