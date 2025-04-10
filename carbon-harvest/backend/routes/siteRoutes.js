const express = require('express');
const router = express.Router();
const { getFooterData, updateFooterData } = require('../controllers/siteController');
const { protect, validateAdmin } = require('../middleware/authMiddleware');

// Public route to get footer data
router.get('/footer', getFooterData);

// Protected routes for updating footer data (admin only)
router.put('/footer', protect, validateAdmin, updateFooterData);

module.exports = router;
