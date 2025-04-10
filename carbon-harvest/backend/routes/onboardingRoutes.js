const express = require('express');
const { handleFarmerOnboarding, handleIndustryOnboarding, handleRegulatorOnboarding } = require('../controllers/onboardingController');
const { protect: auth } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.post('/farmer-onboarding', handleFarmerOnboarding);
router.post('/industry-onboarding', handleIndustryOnboarding);
router.post('/regulator-onboarding', handleRegulatorOnboarding);

module.exports = router;
