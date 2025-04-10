import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Onboarding.css';

const RegulatorOnboarding = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        department: '',
        jurisdiction: '',
        role: '',
        regulatoryFramework: '',
        verificationProcess: '',
        monitoringApproach: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/users/regulator-onboarding', formData, {
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
                <h2>Complete Your Regulator Profile</h2>
                <p className="onboarding-description">
                    Help us understand your role in carbon credit verification and monitoring.
                </p>

                <form onSubmit={handleSubmit} className="onboarding-form">
                    <div className="form-group">
                        <label>Department/Agency *</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Jurisdiction *</label>
                        <input
                            type="text"
                            name="jurisdiction"
                            value={formData.jurisdiction}
                            onChange={handleChange}
                            placeholder="e.g., State, Federal, International"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Role/Position *</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Regulatory Framework *</label>
                        <textarea
                            name="regulatoryFramework"
                            value={formData.regulatoryFramework}
                            onChange={handleChange}
                            placeholder="Describe the regulatory framework you operate under..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Verification Process *</label>
                        <textarea
                            name="verificationProcess"
                            value={formData.verificationProcess}
                            onChange={handleChange}
                            placeholder="Describe your carbon credit verification process..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Monitoring Approach *</label>
                        <textarea
                            name="monitoringApproach"
                            value={formData.monitoringApproach}
                            onChange={handleChange}
                            placeholder="Describe your approach to monitoring carbon credit projects..."
                            required
                        />
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

export default RegulatorOnboarding;
