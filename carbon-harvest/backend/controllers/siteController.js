const SiteSettings = require('../models/SiteSettings');

// Get footer data
const getFooterData = async (req, res) => {
    try {
        const footerData = await SiteSettings.findOne({ type: 'footer' });
        if (!footerData) {
            return res.status(404).json({
                status: 'error',
                message: 'Footer data not found'
            });
        }
        res.json({
            status: 'success',
            data: footerData
        });
    } catch (error) {
        console.error('Error fetching footer data:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching footer data'
        });
    }
};

// Update footer data
const updateFooterData = async (req, res) => {
    try {
        const updatedData = await SiteSettings.findOneAndUpdate(
            { type: 'footer' },
            { $set: { ...req.body } },
            { new: true, upsert: true }
        );
        res.json({
            status: 'success',
            data: updatedData
        });
    } catch (error) {
        console.error('Error updating footer data:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating footer data'
        });
    }
};

module.exports = {
    getFooterData,
    updateFooterData
};
