const express = require('express');
const { addCredit, getCredits, buyCredit, getCreditStats, validateAddCredit, validateBuyCredit } = require('../controllers/creditController');
const { protect: authMiddleware, authorize } = require('../middleware/authMiddleware');
const Credit = require('../models/Credit');

const router = express.Router();

// Get credit statistics
router.get('/stats', authMiddleware, authorize(['farmer', 'industry']), getCreditStats);

// Get credits by type
router.get('/by-type/:type', authMiddleware, authorize(['farmer', 'industry']), async (req, res) => {
    try {
        const credits = await Credit.find({ creditType: req.params.type })
            .populate('user', 'name location')
            .sort('-createdAt');
        res.json(credits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching credits by type' });
    }
});
router.get('/', getCredits);
// Get credits by state
router.get('/by-state/:state', authMiddleware, authorize(['farmer', 'industry']), async (req, res) => {
    try {
        const credits = await Credit.find({ 'location.state': req.params.state })
            .populate('user', 'name location')
            .sort('-createdAt');
           
        res.json(credits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching credits by state' });
    }
});

// Get trading history
router.get('/trading-history', authMiddleware, authorize(['farmer', 'industry']), async (req, res) => {
    try {
        const history = await Credit.aggregate([
            { $unwind: '$tradingHistory' },
            { $sort: { 'tradingHistory.date': -1 } },
            { $limit: 50 }
        ]);
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trading history' });
    }
});

// Get sustainability metrics
router.get('/sustainability', authMiddleware, authorize(['farmer', 'industry']), async (req, res) => {
    try {
        const metrics = await Credit.aggregate([
            {
                $group: {
                    _id: null,
                    totalCarbonReduction: { $sum: '$sustainabilityMetrics.carbonReduction' },
                    totalWaterSaved: { $sum: '$sustainabilityMetrics.waterSaved' },
                    avgSoilHealth: { $avg: '$sustainabilityMetrics.soilHealth' },
                    avgBiodiversity: { $avg: '$sustainabilityMetrics.biodiversityScore' }
                }
            }
        ]);
        res.json(metrics[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sustainability metrics' });
    }
});

// Add a new credit
router.post('/', authMiddleware, authorize(['farmer']), validateAddCredit, addCredit);


// Buy a credit
router.post('/buy/:id', authMiddleware, authorize(['industry']), validateBuyCredit, buyCredit);

module.exports = router; 