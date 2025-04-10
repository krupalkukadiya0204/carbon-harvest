const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const reportsController = require('../controllers/reportsController');

// @route   GET /api/reports
// @desc    Get reports with filters
// @access  Private
router.get('/', auth, reportsController.getReports);

// @route   GET /api/reports/:reportId/download
// @desc    Download a specific report
// @access  Private
router.get('/:reportId/download', auth, reportsController.downloadReport);

module.exports = router;
