const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['footer', 'header', 'general'],
        unique: true
    },
    legalInfo: {
        privacyPolicy: String,
        termsOfService: String,
        lastUpdated: Date
    },
    contactInfo: {
        email: String,
        phone: String,
        address: String
    },
    socialLinks: [{
        platform: String,
        url: String,
        icon: String
    }]
}, {
    timestamps: true
});
    quickLinks: [{
        title: String,
        url: String
    }



module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
