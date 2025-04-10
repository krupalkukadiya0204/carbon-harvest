import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Settings.css';

const Settings = () => {
    const { user } = useContext(AuthContext);
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: true,
        language: 'en',
        theme: 'light',
        twoFactorAuth: false
    });

    const [message, setMessage] = useState({ type: '', content: '' });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO: Implement API call to save settings
            setMessage({
                type: 'success',
                content: 'Settings saved successfully'
            });
        } catch (error) {
            setMessage({
                type: 'error',
                content: error.message || 'Failed to save settings'
            });
        }
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            {message.content && (
                <div className={`message ${message.type}`}>
                    {message.content}
                </div>
            )}
            <form onSubmit={handleSubmit} className="settings-form">
                <div className="settings-section">
                    <h2>Notifications</h2>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleChange}
                            />
                            Email Notifications
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="smsNotifications"
                                checked={settings.smsNotifications}
                                onChange={handleChange}
                            />
                            SMS Notifications
                        </label>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Preferences</h2>
                    <div className="form-group">
                        <label>Language</label>
                        <select
                            name="language"
                            value={settings.language}
                            onChange={handleChange}
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="mr">Marathi</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Theme</label>
                        <select
                            name="theme"
                            value={settings.theme}
                            onChange={handleChange}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Security</h2>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="twoFactorAuth"
                                checked={settings.twoFactorAuth}
                                onChange={handleChange}
                            />
                            Enable Two-Factor Authentication
                        </label>
                    </div>
                </div>

                {user?.userType === 'FARMER' && (
                    <div className="settings-section">
                        <h2>Farmer Settings</h2>
                        {/* Add farmer-specific settings here */}
                    </div>
                )}

                {user?.userType === 'INDUSTRY' && (
                    <div className="settings-section">
                        <h2>Industry Settings</h2>
                        {/* Add industry-specific settings here */}
                    </div>
                )}

                {user?.userType === 'REGULATOR' && (
                    <div className="settings-section">
                        <h2>Regulator Settings</h2>
                        {/* Add regulator-specific settings here */}
                    </div>
                )}

                <button type="submit" className="save-button">
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default Settings;
