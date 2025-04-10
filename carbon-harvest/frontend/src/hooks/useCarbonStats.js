import { useState, useEffect } from 'react';

/**
 * Hook that manages carbon statistics data
 * @returns {Object|null} Carbon statistics data containing totalCarbon, activeProjects, and farmersEngaged
 */
const useCarbonStats = () => {
    const [carbonStats, setCarbonStats] = useState(null);

    useEffect(() => {
        const fetchCarbonStats = async () => {
            // Simulate API call
            const mockStats = {
                totalCarbon: '1.2M',
                activeProjects: 156,
                farmersEngaged: 2500
            };
            setCarbonStats(mockStats);
        };

        fetchCarbonStats();
    }, []);

    return carbonStats;
};

export default useCarbonStats;
