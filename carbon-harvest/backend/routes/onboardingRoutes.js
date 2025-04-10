const express = require('express');
const { handleFarmerOnboarding, handleIndustryOnboarding, handleRegulatorOnboarding, validateFarmerOnboarding, validateIndustryOnboarding, validateRegulatorOnboarding } = require('../controllers/onboardingController');
const { protect: auth } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.post('/farmer-onboarding', validateFarmerOnboarding, handleFarmerOnboarding);
router.post('/industry-onboarding', validateIndustryOnboarding, handleIndustryOnboarding);
router.post('/regulator-onboarding', validateRegulatorOnboarding, handleRegulatorOnboarding);

module.exports = router;
