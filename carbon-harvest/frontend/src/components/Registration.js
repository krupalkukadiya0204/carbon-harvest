/**
 * @file Registration Component - User registration and type selection
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Registration.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import ErrorDisplay from '../common/ErrorDisplay';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaIndustry, FaUserTie } from 'react-icons/fa';

/**
 * Registration Component - Multi-step registration form with user type selection
 * @returns {JSX.Element} Registration form component
 */
const Registration = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');

    const userTypes = [
        {
            id: 'Farmer',
            title: 'Farmer',
            icon: <FaUser className="type-icon" />,
            description: 'Register your farm, track carbon credits, and earn from sustainable practices',
            path: '/farmer-onboarding'
        },
        {
            id: 'Industry',
            title: 'Industry',
            icon: <FaIndustry className="type-icon" />,
            description: 'Manage your carbon footprint and trade carbon credits',
            path: '/industry-onboarding'
        },
        {
            id: 'Regulator',
            title: 'Regulator',
            icon: <FaUserTie className="type-icon" />,
            description: 'Monitor and verify carbon credit transactions',
            path: '/regulator-onboarding'
        }
    ];

    const handleTypeSelect = (type) => {
        setSelectedType(type.id);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value.length < 6) {
            setPasswordStrength('Weak');
        } else if (value.length < 10) {
            setPasswordStrength('Moderate');
        } else {
            setPasswordStrength('Strong');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('/api/auth/register', {
                name,
                email,
                password,
                userType: selectedType,
            });

            const { preVerified } = response.data;
            
            if (preVerified) {
                alert('Welcome! As a pre-verified user, you have immediate access to all features.');
                navigate('/dashboard');
            } else {
                alert('Registration successful! Please complete the onboarding process.');
                navigate(`/onboarding/${selectedType.toLowerCase()}`);
            }
        } catch (error) {
            console.error('Error during registration:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Registration failed. Please try again later.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut'
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut'
            }
        }
    };

    return (
        <div className="registration-container">
            <motion.div
                className="registration-content"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <h1>Choose Your Role</h1>
                <p className="subtitle">Select the type of account that best describes you</p>

                <div className="type-grid">
                    {userTypes.map((type) => (
                        <motion.div
                            key={type.id}
                            className={`type-card ${selectedType === type.id ? 'selected' : ''}`}
                            variants={cardVariants}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleTypeSelect(type)}
                        >
                            <div className="type-icon-wrapper">
                                {type.icon}
                            </div>
                            <h3>{type.title}</h3>
                            <p>{type.description}</p>
                        </motion.div>
                    ))}
                </div>

                {selectedType && (
                    <motion.div 
                        className="registration-form"
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                    >
                        <h2 className="text-center my-4">Register</h2>
                        {error && <ErrorDisplay message={error} />}
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                    <div className="progress mb-4">
                                        <div 
                                            className="progress-bar bg-success" 
                                            role="progressbar" 
                                            style={{
                                                width: `${[
                                                    name.length > 0,
                                                    email.length > 0,
                                                    password.length > 0,
                                                    confirmPassword.length > 0
                                                ].filter(Boolean).length * 25}%`
                                            }}
                                            aria-valuenow="0" 
                                            aria-valuemin="0" 
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="name" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="password" 
                                            value={password} 
                                            onChange={handlePasswordChange} 
                                            required 
                                        />
                                        {password && <small className={`text-${passwordStrength === 'Strong' ? 'success' : passwordStrength === 'Moderate' ? 'warning' : 'danger'}`}>{passwordStrength} Password</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="confirmPassword" 
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <motion.button 
                                        type="submit" 
                                        className="btn btn-primary btn-block" 
                                        disabled={loading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}>
                                        {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            Loading...
                                        </>
                                    ) : (
                                        'Register'
                                    )}
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

Registration.propTypes = {
  onRegister: PropTypes.func,
  onTypeSelect: PropTypes.func,
  initialUserType: PropTypes.oneOf(['Farmer', 'Industry', 'Regulator']),
  customRedirectPaths: PropTypes.shape({
    farmer: PropTypes.string,
    industry: PropTypes.string,
    regulator: PropTypes.string
  }),
  passwordRequirements: PropTypes.shape({
    minLength: PropTypes.number,
    requireNumbers: PropTypes.bool,
    requireSpecialChars: PropTypes.bool,
    requireUppercase: PropTypes.bool
  })
};

Registration.defaultProps = {
  onRegister: () => {},
  onTypeSelect: () => {},
  initialUserType: null,
  customRedirectPaths: {
    Farmer: '/farmer-onboarding',
    Industry: '/industry-onboarding',
    Regulator: '/regulator-onboarding'
  },
  passwordRequirements: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialChars: true,
    requireUppercase: true
  }
};

export default Registration;