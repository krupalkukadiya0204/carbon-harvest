const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const settingsController = require('../controllers/settingsController'); 
const { validateUpdateSettings } = require('../controllers/settingsController');

// @route   GET /api/settings
// @desc    Get user settings
// @access  Private
router.get('/', auth, settingsController.getSettings);

// @route   PUT /api/settings
// @desc    Update user settings
// @access  Private
router.put('/', auth, validateUpdateSettings, settingsController.updateSettings);

module.exports = router;
