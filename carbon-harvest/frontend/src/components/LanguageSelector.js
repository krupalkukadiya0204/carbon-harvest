/**
 * @file Language Selector Component - Handles language selection and switching
 */

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaLanguage } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

/**
 * LanguageSelector Component - Dropdown for selecting application language
 * @returns {JSX.Element} Language selector component
 */
const LanguageSelector = () => {
  const { currentLanguage, setLanguage, languages } = useLanguage();

  return (
    <motion.div 
      className="language-selector"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FaLanguage className="language-icon" />
      <select
        value={currentLanguage}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </motion.div>
  );
};

LanguageSelector.propTypes = {
  onLanguageChange: PropTypes.func,
  initialLanguage: PropTypes.string,
  availableLanguages: PropTypes.objectOf(PropTypes.string)
};

LanguageSelector.defaultProps = {
  onLanguageChange: () => {},
  initialLanguage: 'en',
  availableLanguages: {
    en: 'English',
    hi: 'हिंदी',
    gu: 'ગુજરાતી'
  }
};

export default LanguageSelector;
