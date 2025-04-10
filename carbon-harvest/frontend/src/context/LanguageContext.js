import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

/**
 * Language Context for managing application-wide language settings
 * @type {React.Context}
 */
const LanguageContext = createContext();

/**
 * Available languages in the application
 * @type {Object.<string, string>}
 */
export const languages = {
  english: 'English',
  hindi: 'हिंदी',
  gujarati: 'ગુજરાતી',
  marathi: 'मराठी',
  punjabi: 'ਪੰਜਾਬੀ',
  tamil: 'தமிழ்',
  telugu: 'తెలుగు',
  bengali: 'বাংলা',
  kannada: 'ಕನ್ನಡ',
  malayalam: 'മലയാളം',
  odia: 'ଓଡ଼ିଆ',
  assamese: 'অসমীয়া',
  urdu: 'اردو',
  sanskrit: 'संस्कृतम्'
};

/**
 *
 * @param root0
 * @param root0.children
 */
/**
 * Language Provider Component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Language context provider
 */
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('english');

  const value = {
    currentLanguage,
    setLanguage: (lang) => { 
      setCurrentLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
    },
    languages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 *
 */
/**
 * Custom hook to access language context
 * @returns {object} Language context value containing currentLanguage and setLanguage function
 * @throws {Error} If used outside of LanguageProvider
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default LanguageContext;
