const express = require('express');
const router = express.Router();
const { protect: auth } = require('../middleware/authMiddleware');
const gamificationController = require('../controllers/gamificationController');
const { validateCreateChallenge, validateUpdateChallengeProgress, validateProcessReferral } = gamificationController;

// Get user stats
router.get('/stats', auth, gamificationController.getUserStats);

// Get user achievements
router.get('/achievements', auth, gamificationController.getUserAchievements);

// Get leaderboard
router.get('/leaderboard', auth, gamificationController.getLeaderboard);

// Update daily streak
router.post('/streak', auth, gamificationController.updateDailyStreak);

// Create new challenge
router.post('/challenge', auth, validateCreateChallenge, gamificationController.createChallenge);

// Update challenge progress
router.put('/challenge/progress', auth, validateUpdateChallengeProgress, gamificationController.updateChallengeProgress);

// Process referral
router.post('/referral', auth, validateProcessReferral, gamificationController.processReferral);

module.exports = router;
