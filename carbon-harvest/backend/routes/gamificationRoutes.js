const express = require('express');
const router = express.Router();
const { protect: auth, authorize } = require('../middleware/authMiddleware');
const gamificationController = require('../controllers/gamificationController');
const { validateCreateChallenge, validateUpdateChallengeProgress, validateProcessReferral } = gamificationController;

// Get user stats
router.get('/stats', auth, authorize(['farmer', 'industry']), gamificationController.getUserStats);

// Get user achievements
router.get('/achievements', auth, authorize(['farmer', 'industry']), gamificationController.getUserAchievements);

// Get leaderboard
router.get('/leaderboard', auth, authorize(['farmer', 'industry']), gamificationController.getLeaderboard);

// Update daily streak
router.post('/streak', auth, authorize(['farmer', 'industry']), gamificationController.updateDailyStreak);

// Create new challenge
router.post('/challenge', auth, authorize(['farmer', 'industry']), validateCreateChallenge, gamificationController.createChallenge);

// Update challenge progress
router.put('/challenge/progress', auth, authorize(['farmer', 'industry']), validateUpdateChallengeProgress, gamificationController.updateChallengeProgress);

// Process referral
router.post('/referral', auth, authorize(['farmer', 'industry']), validateProcessReferral, gamificationController.processReferral);

module.exports = router;
