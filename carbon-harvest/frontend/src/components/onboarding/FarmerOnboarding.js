import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Onboarding.css';

const FarmerOnboarding = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        farmSize: '',
        cropTypes: '',
        farmingPractices: '',
        location: '',
        sustainabilityGoals: '',
        carbonCreditsInterest: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/users/farmer-onboarding', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save onboarding information');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-form-wrapper">
                <h2>Complete Your Farmer Profile</h2>
                <p className="onboarding-description">
                    Help us understand your farming practices to better assist you with carbon credit opportunities.
                </p>

                <form onSubmit={handleSubmit} className="onboarding-form">
                    <div className="form-group">
                        <label>Farm Size (in acres) *</label>
                        <input
                            type="number"
                            name="farmSize"
                            value={formData.farmSize}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label>Primary Crop Types *</label>
                        <input
                            type="text"
                            name="cropTypes"
                            value={formData.cropTypes}
                            onChange={handleChange}
                            placeholder="e.g., Wheat, Corn, Soybeans"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Current Farming Practices *</label>
                        <textarea
                            name="farmingPractices"
                            value={formData.farmingPractices}
                            onChange={handleChange}
                            placeholder="Describe your current farming practices..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Farm Location *</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="City, State"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Sustainability Goals</label>
                        <textarea
                            name="sustainabilityGoals"
                            value={formData.sustainabilityGoals}
                            onChange={handleChange}
                            placeholder="What are your sustainability goals for the next 5 years?"
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="carbonCreditsInterest"
                                checked={formData.carbonCreditsInterest}
                                onChange={handleChange}
                            />
                            Interested in Carbon Credits Program
                        </label>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Complete Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FarmerOnboarding;
