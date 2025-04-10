import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const NewsletterForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setStatus('subscribing');
        
        try {
            // TODO: Implement actual newsletter subscription
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Newsletter subscription for:', email);
            
            setStatus('success');
            setEmail('');
            
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Newsletter subscription failed:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    }, [email]);

    return (
        <div className="footer-section newsletter-section">
            <h3>Stay Updated</h3>
            <p>Get the latest updates on carbon farming and sustainability.</p>
            
            <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={status === 'subscribing'}
                    aria-label="Email for newsletter"
                    required
                />
                <motion.button
                    type="submit"
                    disabled={status === 'subscribing'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Subscribe
                </motion.button>
            </form>

            {status === 'success' && (
                <p className="form-message success">
                    Thank you for subscribing!
                </p>
            )}
            {status === 'error' && (
                <p className="form-message error">
                    Subscription failed. Please try again.
                </p>
            )}
        </div>
    );
};

export default React.memo(NewsletterForm);
