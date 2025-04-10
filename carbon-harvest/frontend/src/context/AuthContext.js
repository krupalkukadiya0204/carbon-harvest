/**
 * @file Authentication Context - Manages user authentication state
 */

import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

/**
 * Authentication Context - Provides user authentication state and methods
 */
const AuthContext = createContext({
    user: null,
    setUser: () => {},
    login: () => {},
    logout: () => {},
    error: null
});

/**
 * Authentication Provider Component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Auth provider component
 */
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setUser(decoded);
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            localStorage.removeItem('token');
            setUser(null);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const { token } = response.data;
            
            try {
                const decoded = jwtDecode(token);
                localStorage.setItem('token', token);
                setUser(decoded);
                setError(null);

                // Redirect based on user type
                const userType = decoded.userType;
                let redirectPath = '/';
                
                switch(userType.toLowerCase()) {
                    case 'farmer':
                        redirectPath = '/farmer/dashboard';
                        break;
                    case 'industry':
                        redirectPath = '/industry/dashboard';
                        break;
                    case 'regulator':
                        redirectPath = '/regulator/dashboard';
                        break;
                    default:
                        redirectPath = '/';
                }
                
                window.location.href = redirectPath;
            } catch (decodeError) {
                console.error('Token decode error:', decodeError);
                setError('Invalid token received from server');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials and try again.');
        } 
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { AuthContext, AuthProvider };
export default AuthContext;