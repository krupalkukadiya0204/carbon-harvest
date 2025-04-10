const express = require('express');
const { getReports, downloadReport, validateGetReports, validateDownloadReport } = require('../controllers/reportsController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateUser, validateGetReports, getReports);
router.get('/:reportId', authenticateUser, validateDownloadReport, downloadReport);

module.exports = router;