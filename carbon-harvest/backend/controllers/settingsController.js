const User = require("../models/User");

// Controller functions
const getSettings = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("settings");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ settings: user.settings });
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateSettings = async (req, res) => {
    try {
        const { emailNotifications, smsNotifications, language, theme, twoFactorAuth } = req.body;

        // Validate language
        if (language && !["en", "hi", "mr"].includes(language)) {
            return res.status(400).json({ message: "Invalid language selection" });
        }

        // Validate theme
        if (theme && !["light", "dark"].includes(theme)) {
            return res.status(400).json({ message: "Invalid theme selection" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update settings
        user.settings = {
            ...user.settings,
            ...(emailNotifications !== undefined && { emailNotifications }),
            ...(smsNotifications !== undefined && { smsNotifications }),
            ...(language && { language }),
            ...(theme && { theme }),
            ...(twoFactorAuth !== undefined && { twoFactorAuth })
        };

        await user.save();
        res.json({ settings: user.settings });
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
