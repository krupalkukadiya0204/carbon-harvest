import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const OnboardingContext = createContext();

export const useOnboarding = () => {
    return useContext(OnboardingContext);
};

export const OnboardingProvider = ({ children }) => {
    const [onboardingStatus, setOnboardingStatus] = useState('pending');
    const [preVerified, setPreVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get('/api/auth/onboarding-status', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setOnboardingStatus(response.data.onboardingStatus);
                setPreVerified(response.data.preVerified);
            } catch (error) {
                console.error('Error checking onboarding status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkOnboardingStatus();
    }, []);

    const value = {
        onboardingStatus,
        preVerified,
        loading,
        setOnboardingStatus
    };

    return (
        <OnboardingContext.Provider value={value}>
            {children}
        </OnboardingContext.Provider>
    );
};
