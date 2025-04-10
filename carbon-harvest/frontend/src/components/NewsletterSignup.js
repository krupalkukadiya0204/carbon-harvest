/**
 * @file NewsletterSignup.js
 * @description Newsletter signup component with form validation and submission handling
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
      setError('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <div className="newsletter-signup">
      <motion.form
        onSubmit={handleSubmit}
        className="newsletter-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address for newsletter"
            disabled={status === 'submitting'}
            className={error ? 'error' : ''}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            aria-label="Subscribe to newsletter"
          >
            {status === 'submitting' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                ⟳
              </motion.div>
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </div>
        
        {error && (
          <motion.p
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
        
        {status === 'success' && (
          <motion.p
            className="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Thank you for subscribing!
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

export default React.memo(NewsletterSignup);
