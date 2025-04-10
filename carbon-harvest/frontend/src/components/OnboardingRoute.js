import React from 'react';
import { Navigate } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';

const OnboardingRoute = ({ children }) => {
    const { onboardingStatus, preVerified, loading } = useOnboarding();

    if (loading) {
        return <div>Loading...</div>;
    }

    // Pre-verified users can access all routes
    if (preVerified) {
        return children;
    }

    // If onboarding is pending, redirect to onboarding
    if (onboardingStatus === 'pending') {
        return <Navigate to="/onboarding" replace />;
    }

    // If onboarding is completed or bypassed, allow access
    return children;
};

export default OnboardingRoute;
