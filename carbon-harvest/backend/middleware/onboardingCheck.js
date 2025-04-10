const onboardingCheck = async (req, res, next) => {
    try {
        const user = req.user;
        
        // Allow read-only operations
        if (req.method === 'GET') {
            return next();
        }

        // Check if user is pre-verified (system/government employee)
        if (user.preVerified) {
            return next();
        }

        // Check onboarding status
        if (user.onboardingStatus === 'pending') {
            // Only allow onboarding-related routes
            const allowedPaths = ['/api/onboarding', '/api/auth/verify'];
            if (!allowedPaths.some(path => req.path.startsWith(path))) {
                return res.status(403).json({
                    message: 'Please complete onboarding before performing this action',
                    onboardingRequired: true
                });
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error during onboarding check' });
    }
};

module.exports = onboardingCheck;
