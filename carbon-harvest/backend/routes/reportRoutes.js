const express = require('express');
const { getReports, downloadReport, validateGetReports, validateDownloadReport } = require('../controllers/reportsController');
const { authenticateUser, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateUser, authorize(['farmer', 'industry', 'regulator']), validateGetReports, getReports);
router.get('/:reportId', authenticateUser, authorize(['farmer', 'industry', 'regulator']), validateDownloadReport, downloadReport);

module.exports = router;