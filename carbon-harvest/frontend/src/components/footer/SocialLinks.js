import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const SOCIAL_LINKS = [
    {
        icon: FaLinkedin,
        url: 'https://linkedin.com/company/carbonharvest',
        label: 'LinkedIn',
        color: '#0077b5'
    },
    {
        icon: FaTwitter,
        url: 'https://twitter.com/carbonharvest',
        label: 'Twitter',
        color: '#1da1f2'
    },
    {
        icon: FaInstagram,
        url: 'https://instagram.com/carbonharvest',
        label: 'Instagram',
        color: '#e4405f'
    },
    {
        icon: FaFacebook,
        url: 'https://facebook.com/carbonharvest',
        label: 'Facebook',
        color: '#1877f2'
    }
];

const SocialLinks = () => (
    <nav className="social-links" aria-label="Social media links">
        {SOCIAL_LINKS.map(({ icon: Icon, url, label, color }) => (
            <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${label} page`}
                whileHover={{ scale: 1.1, color }}
                whileTap={{ scale: 0.95 }}
                style={{ color: '#fff' }}
                className="social-link"
            >
                <Icon aria-hidden="true" />
            </motion.a>
        ))}
    </nav>
);

export default React.memo(SocialLinks);
