import { useState, useEffect, useCallback } from 'react';
import { tokenManager, encryptionUtils } from '../utils/security';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize authentication state
  useEffect(() => {
    const token = tokenManager.getAccessToken();
    if (token && !tokenManager.isTokenExpired(token)) {
      setIsAuthenticated(true);
      // Decrypt and set user data
      const encryptedUser = localStorage.getItem('ch_user_data');
      if (encryptedUser) {
        const userData = encryptionUtils.decryptData(encryptedUser, process.env.REACT_APP_ENCRYPTION_KEY);
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      // Make API call to login endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { accessToken, refreshToken, user: userData } = await response.json();

      // Store tokens
      tokenManager.setTokens(accessToken, refreshToken);

      // Encrypt and store user data
      const encryptedUser = encryptionUtils.encryptData(
        userData,
        process.env.REACT_APP_ENCRYPTION_KEY
      );
      localStorage.setItem('ch_user_data', encryptedUser);

      setIsAuthenticated(true);
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    tokenManager.clearTokens();
    localStorage.removeItem('ch_user_data');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    try {
      const refresh = tokenManager.getRefreshToken();
      if (!refresh) {
        throw new Error('No refresh token available');
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refresh }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { accessToken, refreshToken: newRefreshToken } = await response.json();
      tokenManager.setTokens(accessToken, newRefreshToken);

      return { success: true };
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return { success: false, error: error.message };
    }
  }, [logout]);

  // Update user profile
  const updateProfile = useCallback(async (userData) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenManager.getAccessToken()}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedUser = await response.json();
      
      // Update encrypted user data
      const encryptedUser = encryptionUtils.encryptData(
        updatedUser,
        process.env.REACT_APP_ENCRYPTION_KEY
      );
      localStorage.setItem('ch_user_data', encryptedUser);
      
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    refreshToken,
    updateProfile,
  };
};

export default useAuth;
