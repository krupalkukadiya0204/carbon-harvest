const { FarmerProfile, IndustryProfile, RegulatorProfile } = require('../models/UserProfile');
const User = require('../models/User');

const completeOnboarding = async (userId) => {
    await User.findByIdAndUpdate(userId, { onboardingStatus: 'completed' });
};

const handleFarmerOnboarding = async (req, res) => {
    try {
        const farmerProfile = new FarmerProfile({
            userId: req.user.id,
            ...req.body
        });
        await farmerProfile.save();
        await completeOnboarding(req.user.id);
        res.status(201).json({ message: 'Farmer profile created successfully' });
    } catch (error) {
        console.error('Error in farmer onboarding:', error);
        res.status(500).json({ message: 'Failed to create farmer profile' });
    }
};

const handleIndustryOnboarding = async (req, res) => {
    try {
        const industryProfile = new IndustryProfile({
            userId: req.user.id,
            ...req.body
        });
        await industryProfile.save();
        await completeOnboarding(req.user.id);
        res.status(201).json({ message: 'Industry profile created successfully' });
    } catch (error) {
        console.error('Error in industry onboarding:', error);
        res.status(500).json({ message: 'Failed to create industry profile' });
    }
};

const handleRegulatorOnboarding = async (req, res) => {
    try {
        const regulatorProfile = new RegulatorProfile({
            userId: req.user.id,
            ...req.body
        });
        await regulatorProfile.save();
        await completeOnboarding(req.user.id);
        res.status(201).json({ message: 'Regulator profile created successfully' });
    } catch (error) {
        console.error('Error in regulator onboarding:', error);
        res.status(500).json({ message: 'Failed to create regulator profile' });
    }
};

module.exports = {
    handleFarmerOnboarding,
    handleIndustryOnboarding,
    handleRegulatorOnboarding
};
