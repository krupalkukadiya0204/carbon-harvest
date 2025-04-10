const mongoose = require('mongoose');
require('dotenv').config();
const SiteSettings = require('../models/SiteSettings');

const seedFooterData = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/carbonharvest');
        console.log('Connected to MongoDB');

        const footerData = {
            type: 'footer',
            legalInfo: {
                privacyPolicy: '/privacy-policy',
                termsOfService: '/terms',
                lastUpdated: new Date()
            },
            contactInfo: {
                email: 'contact@carbonharvest.com',
                phone: '+1 (555) 123-4567',
                address: '123 Green Street, Eco City, EC 12345'
            },
            socialLinks: [
                {
                    platform: 'Twitter',
                    url: 'https://twitter.com/carbonharvest',
                    icon: 'twitter'
                },
                {
                    platform: 'LinkedIn',
                    url: 'https://linkedin.com/company/carbonharvest',
                    icon: 'linkedin'
                }
            ],
            quickLinks: [
                { title: 'Home', url: '/' },
                { title: 'About', url: '/about' },
                { title: 'Farmers Portal', url: '/farmer-dashboard' },
                { title: 'Industry Portal', url: '/industry-dashboard' },
                { title: 'Regulators Portal', url: '/regulator-dashboard' }
            ]
        };

        // Remove existing footer data if any
        await SiteSettings.deleteMany({ type: 'footer' });

        // Insert new footer data
        await SiteSettings.create(footerData);

        console.log('Footer data seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding footer data:', error);
        process.exit(1);
    }
};

seedFooterData();
