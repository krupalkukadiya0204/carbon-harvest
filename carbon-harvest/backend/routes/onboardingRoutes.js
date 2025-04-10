const express = require('express');
const { handleFarmerOnboarding, handleIndustryOnboarding, handleRegulatorOnboarding, validateFarmerOnboarding, validateIndustryOnboarding, validateRegulatorOnboarding } = require('../controllers/onboardingController');
const { protect: auth, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.post('/farmer-onboarding', authorize(['farmer']), validateFarmerOnboarding, handleFarmerOnboarding);
router.post('/industry-onboarding', authorize(['industry']), validateIndustryOnboarding, handleIndustryOnboarding);
router.post('/regulator-onboarding', authorize(['regulator']), validateRegulatorOnboarding, handleRegulatorOnboarding);

module.exports = router;

module.exports = router;
