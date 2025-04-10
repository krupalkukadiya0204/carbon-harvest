/**
 * @file Farmer Onboarding Component - Handles farmer registration and onboarding
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaSeedling, FaCheck } from 'react-icons/fa';
import { IoCloud } from 'react-icons/io5';
import './FarmerOnboarding.css';
/**
 * FarmerOnboarding Component - Collects and validates farmer registration information
 * @returns {JSX.Element} Farmer onboarding form component
 */
const FarmerOnboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [language, setLanguage] = useState('en');
    const [formData, setFormData] = useState({
        // Basic Details
        name: '',
        mobile: '',
        aadhar: '',
        village: '',
        district: '',
        state: '',
        
        // Land Details
        landSize: '',
        landUnit: 'acres',
        cropTypes: [],
        gpsCoordinates: '',
        
        // Project Details
        projectType: '',
        currentPractices: [],
        proposedPractices: [],
        
        // IoT Setup
        deviceId: '',
        sensorType: '',
        installationDate: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const translations = {
        en: {
            title: 'Join CarbonHarvest',
            subtitle: 'Start earning from sustainable farming',
            next: 'Next',
            previous: 'Previous',
            submit: 'Submit'
        },
        hi: {
            title: 'कार्बन हार्वेस्ट में शामिल हों',
            subtitle: 'टिकाऊ खेती से कमाई शुरू करें',
            next: 'आगे',
            previous: 'पीछे',
            submit: 'जमा करें'
        },
        gu: {
            title: 'કાર્બન હાર્વેસ્ટમાં જોડાઓ',
            subtitle: 'ટકાઉ ખેતીમાંથી કમાણી શરૂ કરો',
            next: 'આગળ',
            previous: 'પાછળ',
            submit: 'સબમિટ'
        }
    };

    const cropOptions = [
        'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Pulses',
        'Vegetables', 'Fruits', 'Other'
    ];

    const practiceOptions = [
        'Zero Tillage',
        'Crop Rotation',
        'Organic Farming',
        'Agroforestry',
        'Mulching',
        'Drip Irrigation'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleMultiSelect = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};
        
        switch(step) {
            case 1:
                if (!formData.name) newErrors.name = 'Name is required';
                if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
                if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile)) {
                    newErrors.mobile = 'Invalid mobile number';
                }
                if (!formData.aadhar) newErrors.aadhar = 'Aadhar number is required';
                if (formData.aadhar && !/^[0-9]{12}$/.test(formData.aadhar)) {
                    newErrors.aadhar = 'Invalid Aadhar number';
                }
                break;
            
            case 2:
                if (!formData.landSize) newErrors.landSize = 'Land size is required';
                if (!formData.gpsCoordinates) newErrors.gpsCoordinates = 'GPS coordinates are required';
                if (formData.cropTypes.length === 0) newErrors.cropTypes = 'Select at least one crop';
                break;
            
            case 3:
                if (!formData.projectType) newErrors.projectType = 'Project type is required';
                if (formData.proposedPractices.length === 0) {
                    newErrors.proposedPractices = 'Select at least one sustainable practice';
                }
                break;
            
            case 4:
                if (!formData.deviceId) newErrors.deviceId = 'Device ID is required';
                if (!formData.sensorType) newErrors.sensorType = 'Sensor type is required';
                break;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        if (validateStep(4)) {
            setIsSubmitting(true);
            try {
                // API call to submit farmer data
                const response = await fetch('/api/farmers/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    setCurrentStep(5); // Success step
                } else {
                    throw new Error('Registration failed');
                }
            } catch (error) {
                setErrors({ submit: 'Failed to register. Please try again.' });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="form-step"
                    >
                        <h3>Basic Details</h3>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                placeholder="10-digit mobile number"
                            />
                            {errors.mobile && <span className="error">{errors.mobile}</span>}
                        </div>
                        <div className="form-group">
                            <label>Aadhar Number</label>
                            <input
                                type="text"
                                name="aadhar"
                                value={formData.aadhar}
                                onChange={handleInputChange}
                                placeholder="12-digit Aadhar number"
                            />
                            {errors.aadhar && <span className="error">{errors.aadhar}</span>}
                        </div>
                    </motion.div>
                );
            
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="form-step"
                    >
                        <h3>Land Details</h3>
                        <div className="form-group">
                            <label>Land Size</label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="landSize"
                                    value={formData.landSize}
                                    onChange={handleInputChange}
                                    placeholder="Enter land size"
                                />
                                <select
                                    name="landUnit"
                                    value={formData.landUnit}
                                    onChange={handleInputChange}
                                >
                                    <option value="acres">Acres</option>
                                    <option value="hectares">Hectares</option>
                                </select>
                            </div>
                            {errors.landSize && <span className="error">{errors.landSize}</span>}
                        </div>
                        <div className="form-group">
                            <label>Crop Types</label>
                            <div className="checkbox-grid">
                                {cropOptions.map(crop => (
                                    <label key={crop} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.cropTypes.includes(crop)}
                                            onChange={() => handleMultiSelect('cropTypes', crop)}
                                        />
                                        {crop}
                                    </label>
                                ))}
                            </div>
                            {errors.cropTypes && <span className="error">{errors.cropTypes}</span>}
                        </div>
                        <div className="form-group">
                            <label>GPS Coordinates</label>
                            <button
                                type="button"
                                className="gps-button"
                                onClick={() => {
                                    if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition(
                                            (position) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    gpsCoordinates: `${position.coords.latitude},${position.coords.longitude}`
                                                }));
                                            },
                                            () => {
                                                setErrors(prev => ({
                                                    ...prev,
                                                    gpsCoordinates: 'Failed to get location'
                                                }));
                                            }
                                        );
                                    }
                                }}
                            >
                                <FaMapMarkerAlt /> Get Current Location
                            </button>
                            <input
                                type="text"
                                name="gpsCoordinates"
                                value={formData.gpsCoordinates}
                                onChange={handleInputChange}
                                placeholder="Latitude,Longitude"
                                readOnly
                            />
                            {errors.gpsCoordinates && <span className="error">{errors.gpsCoordinates}</span>}
                        </div>
                    </motion.div>
                );
            
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="form-step"
                    >
                        <h3>Project Registration</h3>
                        <div className="form-group">
                            <label>Project Type</label>
                            <select
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Project Type</option>
                                <option value="soil-carbon">Soil Carbon Enhancement</option>
                                <option value="agroforestry">Agroforestry</option>
                                <option value="sustainable-rice">Sustainable Rice Cultivation</option>
                                <option value="organic">Organic Farming Transition</option>
                            </select>
                            {errors.projectType && <span className="error">{errors.projectType}</span>}
                        </div>
                        <div className="form-group">
                            <label>Sustainable Practices</label>
                            <div className="checkbox-grid">
                                {practiceOptions.map(practice => (
                                    <label key={practice} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.proposedPractices.includes(practice)}
                                            onChange={() => handleMultiSelect('proposedPractices', practice)}
                                        />
                                        {practice}
                                    </label>
                                ))}
                            </div>
                            {errors.proposedPractices && <span className="error">{errors.proposedPractices}</span>}
                        </div>
                    </motion.div>
                );
            
            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="form-step"
                    >
                        <h3>IoT Device Setup</h3>
                        <div className="form-group">
                            <label>Device ID</label>
                            <input
                                type="text"
                                name="deviceId"
                                value={formData.deviceId}
                                onChange={handleInputChange}
                                placeholder="Enter IoT device ID"
                            />
                            {errors.deviceId && <span className="error">{errors.deviceId}</span>}
                        </div>
                        <div className="form-group">
                            <label>Sensor Type</label>
                            <select
                                name="sensorType"
                                value={formData.sensorType}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Sensor Type</option>
                                <option value="soil">Soil Carbon Sensor</option>
                                <option value="weather">Weather Station</option>
                                <option value="moisture">Moisture Sensor</option>
                                <option value="combo">Combination Unit</option>
                            </select>
                            {errors.sensorType && <span className="error">{errors.sensorType}</span>}
                        </div>
                        <div className="form-group">
                            <label>Installation Date</label>
                            <input
                                type="date"
                                name="installationDate"
                                value={formData.installationDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </motion.div>
                );
            
            case 5:
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="success-step"
                    >
                        <div className="success-icon">
                            <FaCheck />
                        </div>
                        <h2>Registration Successful!</h2>
                        <p>Welcome to CarbonHarvest. Your journey towards sustainable farming begins now.</p>
                        <button
                            className="primary-button"
                            onClick={() => navigate('/farmer-dashboard')}
                        >
                            Go to Dashboard
                        </button>
                    </motion.div>
                );
        }
    };

    return (
        <div className="farmer-onboarding">
            <div className="language-selector">
                <button
                    className={language === 'en' ? 'active' : ''}
                    onClick={() => setLanguage('en')}
                >
                    English
                </button>
                <button
                    className={language === 'hi' ? 'active' : ''}
                    onClick={() => setLanguage('hi')}
                >
                    हिंदी
                </button>
                <button
                    className={language === 'gu' ? 'active' : ''}
                    onClick={() => setLanguage('gu')}
                >
                    ગુજરાતી
                </button>
            </div>

            <div className="onboarding-container">
                <div className="progress-bar">
                    {[1, 2, 3, 4].map(step => (
                        <div
                            key={step}
                            className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
                        >
                            <div className="step-icon">
                                {step === 1 && <FaUser />}
                                {step === 2 && <FaMapMarkerAlt />}
                                {step === 3 && <FaSeedling />}
                                {step === 4 && <IoCloud />}
                            </div>
                            <span className="step-label">
                                {step === 1 && 'Basic Details'}
                                {step === 2 && 'Land Info'}
                                {step === 3 && 'Project'}
                                {step === 4 && 'IoT Setup'}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="form-container">
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>

                    {currentStep < 5 && (
                        <div className="form-navigation">
                            {currentStep > 1 && (
                                <button
                                    className="secondary-button"
                                    onClick={handlePrevious}
                                >
                                    {translations[language].previous}
                                </button>
                            )}
                            {currentStep < 4 ? (
                                <button
                                    className="primary-button"
                                    onClick={handleNext}
                                >
                                    {translations[language].next}
                                </button>
                            ) : (
                                <button
                                    className="primary-button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : translations[language].submit}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FarmerOnboarding;
