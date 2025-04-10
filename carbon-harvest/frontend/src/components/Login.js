/**
 * @file Login Component - Handles user authentication
 * @typedef {import('react').JSX} JSX
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorDisplay from '../common/ErrorDisplay';
import PageLayout from './layouts/PageLayout';
import './Login.css';

/**
 * Login Component - Provides login form with email and password fields
 * @returns {JSX.Element} Login form component
 */
const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout title="Welcome Back">
            <div className="content-section">
                {error && <ErrorDisplay message={error} />}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            aria-required="true"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="password-input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                aria-required="true"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Dont have an account?{' '}
                            <Link to="/register" className="text-blue-600 hover:text-blue-700">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
};

Login.propTypes = {
    onLoginSuccess: PropTypes.func,
    onLoginError: PropTypes.func,
    redirectPath: PropTypes.string,
};

Login.defaultProps = {
    redirectPath: '/',
    showForgotPassword: true,
    showRegisterLink: true
};

export default Login;