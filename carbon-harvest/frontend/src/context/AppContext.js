import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';
import { newsAPI, creditAPI } from '../services/api';

const AppContext = createContext();

const initialState = {
  marketStats: null,
  latestNews: [],
  notifications: [],
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MARKET_STATS':
      return { ...state, marketStats: action.payload };
    case 'SET_LATEST_NEWS':
      return { ...state, latestNews: action.payload };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications].slice(0, 10)
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated } = useAuth();

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch market statistics
        const statsResponse = await creditAPI.getStats();
        dispatch({ type: 'SET_MARKET_STATS', payload: statsResponse.data });

        // Fetch latest news
        const newsResponse = await newsAPI.getFeaturedNews();
        dispatch({ type: 'SET_LATEST_NEWS', payload: newsResponse.data });

        // Load user preferences from localStorage
        const savedPreferences = localStorage.getItem('ch_user_preferences');
        if (savedPreferences) {
          dispatch({
            type: 'UPDATE_PREFERENCES',
            payload: JSON.parse(savedPreferences)
          });
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    if (isAuthenticated) {
      fetchInitialData();
    }
  }, [isAuthenticated]);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ch_user_preferences', JSON.stringify(state.preferences));
  }, [state.preferences]);

  const addNotification = (notification) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...notification
      }
    });
  };

  const clearNotification = (notificationId) => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
      payload: notificationId
    });
  };

  const updatePreferences = (newPreferences) => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: newPreferences
    });
  };

  const value = {
    ...state,
    addNotification,
    clearNotification,
    updatePreferences
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppContext;
