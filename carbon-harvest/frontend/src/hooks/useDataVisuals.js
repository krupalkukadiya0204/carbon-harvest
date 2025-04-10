import { useState, useEffect } from 'react';
import { creditAPI } from '../services/api';

/**
 *
 */
export const useDataVisuals = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        creditStats: null,
        tradingHistory: [],
        sustainabilityMetrics: null,
        stateDistribution: [],
        creditTypes: []
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [
                statsResponse,
                historyResponse,
                sustainabilityResponse
            ] = await Promise.all([
                creditAPI.getStats(),
                creditAPI.getTradingHistory(),
                creditAPI.getSustainabilityMetrics()
            ]);

            setData({
                creditStats: statsResponse.data.overview,
                tradingHistory: historyResponse.data.map(item => ({
                    ...item,
                    date: new Date(item.tradingHistory.date).toLocaleDateString()
                })),
                sustainabilityMetrics: sustainabilityResponse.data,
                stateDistribution: statsResponse.data.stateDistribution.map(item => ({
                    name: item._id,
                    value: item.totalAmount
                })),
                creditTypes: statsResponse.data.creditsByType.map(item => ({
                    name: item._id,
                    value: item.totalAmount
                }))
            });
        } catch (err) {
            setError(err.message);
            console.error('Error fetching visualization data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const transformData = {
        // Transform trading history for line chart
        getTradingTrends: () => {
            return data.tradingHistory.reduce((acc, item) => {
                const month = new Date(item.tradingHistory.date).getMonth();
                if (!acc[month]) {
                    acc[month] = {
                        name: new Date(item.tradingHistory.date).toLocaleString('default', { month: 'short' }),
                        volume: 0,
                        value: 0
                    };
                }
                acc[month].volume += item.amount;
                acc[month].value += item.tradingHistory.price;
                return acc;
            }, []);
        },

        // Transform sustainability metrics for radar chart
        getSustainabilityRadar: () => {
            const metrics = data.sustainabilityMetrics;
            if (!metrics) return [];
            return [
                { name: 'Carbon Reduction', value: metrics.totalCarbonReduction },
                { name: 'Water Saved', value: metrics.totalWaterSaved },
                { name: 'Soil Health', value: metrics.avgSoilHealth },
                { name: 'Biodiversity', value: metrics.avgBiodiversity }
            ];
        },

        // Transform state distribution for treemap
        getStateTreemap: () => {
            return data.stateDistribution.map(item => ({
                name: item.name,
                value: item.value,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`
            }));
        },

        // Transform credit types for pie chart
        getCreditTypePie: () => {
            return data.creditTypes;
        }
    };

    return {
        loading,
        error,
        data,
        transformData,
        refreshData: fetchData
    };
};

export default useDataVisuals;
