const express = require('express');
const router = express.Router();
const { getFooterData, updateFooterData, validateFooterData } = require('../controllers/siteController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public route to get footer data
router.get('/footer', getFooterData);

// Protected routes for updating footer data (admin only)
router.put('/footer', protect, authorize(['admin']), updateFooterData);
router.put('/footer', protect, authorize(['admin']), validateFooterData, updateFooterData);
module.exports = router;
