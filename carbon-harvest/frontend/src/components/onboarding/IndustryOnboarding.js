import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Onboarding.css';

const IndustryOnboarding = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        industryType: '',
        companySize: '',
        annualEmissions: '',
        sustainabilityPrograms: '',
        carbonReductionGoals: '',
        interestedInPurchasing: false
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
            await axios.post('/api/onboarding/industry-onboarding', formData, {
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
                <h2>Complete Your Industry Profile</h2>
                <p className="onboarding-description">
                    Help us understand your companys sustainability goals and carbon credit needs.
                </p>

                <form onSubmit={handleSubmit} className="onboarding-form">
                    <div className="form-group">
                        <label>Industry Type *</label>
                        <select
                            name="industryType"
                            value={formData.industryType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Industry Type</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Energy">Energy</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Construction">Construction</option>
                            <option value="Technology">Technology</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Company Size (employees) *</label>
                        <select
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Company Size</option>
                            <option value="1-50">1-50</option>
                            <option value="51-200">51-200</option>
                            <option value="201-1000">201-1000</option>
                            <option value="1001-5000">1001-5000</option>
                            <option value="5000+">5000+</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Annual Carbon Emissions (metric tons CO2e) *</label>
                        <input
                            type="number"
                            name="annualEmissions"
                            value={formData.annualEmissions}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label>Current Sustainability Programs</label>
                        <textarea
                            name="sustainabilityPrograms"
                            value={formData.sustainabilityPrograms}
                            onChange={handleChange}
                            placeholder="Describe your current sustainability initiatives..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Carbon Reduction Goals *</label>
                        <textarea
                            name="carbonReductionGoals"
                            value={formData.carbonReductionGoals}
                            onChange={handleChange}
                            placeholder="What are your carbon reduction targets?"
                            required
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="interestedInPurchasing"
                                checked={formData.interestedInPurchasing}
                                onChange={handleChange}
                            />
                            Interested in Purchasing Carbon Credits
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

export default IndustryOnboarding;
