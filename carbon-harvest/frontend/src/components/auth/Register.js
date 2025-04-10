import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        organization: '',
        phone: '',
        userType: '',
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
        setError('');
        setLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                organization: formData.organization,
                phone: formData.phone,
                userType: formData.userType,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                // Redirect to appropriate onboarding page based on user type
                switch (formData.userType) {
                    case 'Farmer':
                        navigate('/onboarding/farmer');
                        break;
                    case 'Industry':
                        navigate('/onboarding/industry');
                        break;
                    case 'Regulator':
                        navigate('/onboarding/regulator');
                        break;
                    default:
                        navigate('/profile');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form-wrapper">
                <h2>Join Carbon Harvest</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password *</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <label>Organization</label>
                        <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>User Type *</label>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select User Type</option>
                            <option value="Farmer">Farmer</option>
                            <option value="Industry">Industry</option>
                            <option value="Regulator">Regulator</option>
                        </select>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
