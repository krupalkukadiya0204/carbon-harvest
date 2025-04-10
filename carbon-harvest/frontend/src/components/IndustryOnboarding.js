/**
 * @file Industry Onboarding Component - Handles industry registration and onboarding
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaChartLine, FaFileUpload, FaCheckCircle } from 'react-icons/fa';
import './IndustryOnboarding.css';

/**
 * IndustryOnboarding Component - Multi-step form for industry registration
 * @returns {JSX.Element} Industry onboarding form component
 */
const IndustryOnboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Company Details
        companyName: '',
        cin: '',
        sector: '',
        patStatus: '',
        registeredAddress: '',
        contactPerson: '',
        email: '',
        phone: '',
        
        // Emissions Data
        baselineYear: '',
        baselineEmissions: '',
        currentEmissions: '',
        emissionsUnit: 'tCO2e',
        reportingPeriod: '',
        emissionsReport: null,
        
        // Compliance Goals
        targetYear: '',
        reductionTarget: '',
        preferredProjects: [],
        budgetRange: '',
        complianceStrategy: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sectors = [
        'Power Generation',
        'Steel Manufacturing',
        'Cement Production',
        'Chemical Industry',
        'Textile Manufacturing',
        'Paper & Pulp',
        'Food Processing',
        'Other'
    ];

    const projectTypes = [
        'Agroforestry',
        'Renewable Energy',
        'Energy Efficiency',
        'Waste Management',
        'Sustainable Agriculture',
        'Forest Conservation'
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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setErrors(prev => ({
                    ...prev,
                    emissionsReport: 'File size should be less than 5MB'
                }));
                return;
            }
            setFormData(prev => ({
                ...prev,
                emissionsReport: file
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
                if (!formData.companyName) newErrors.companyName = 'Company name is required';
                if (!formData.cin) newErrors.cin = 'CIN is required';
                if (!formData.sector) newErrors.sector = 'Sector is required';
                if (!formData.email) newErrors.email = 'Email is required';
                if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    newErrors.email = 'Invalid email format';
                }
                if (!formData.phone) newErrors.phone = 'Phone number is required';
                if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
                    newErrors.phone = 'Invalid phone number';
                }
                break;
            
            case 2:
                if (!formData.baselineYear) newErrors.baselineYear = 'Baseline year is required';
                if (!formData.baselineEmissions) newErrors.baselineEmissions = 'Baseline emissions are required';
                if (!formData.currentEmissions) newErrors.currentEmissions = 'Current emissions are required';
                if (!formData.emissionsReport) newErrors.emissionsReport = 'Emissions report is required';
                break;
            
            case 3:
                if (!formData.targetYear) newErrors.targetYear = 'Target year is required';
                if (!formData.reductionTarget) newErrors.reductionTarget = 'Reduction target is required';
                if (formData.preferredProjects.length === 0) {
                    newErrors.preferredProjects = 'Select at least one project type';
                }
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
        if (validateStep(3)) {
            setIsSubmitting(true);
            try {
                const formDataToSend = new FormData();
                Object.keys(formData).forEach(key => {
                    if (key === 'emissionsReport') {
                        formDataToSend.append(key, formData[key]);
                    } else if (Array.isArray(formData[key])) {
                        formDataToSend.append(key, JSON.stringify(formData[key]));
                    } else {
                        formDataToSend.append(key, formData[key]);
                    }
                });

                const response = await fetch('/api/industry/register', {
                    method: 'POST',
                    body: formDataToSend
                });
                
                if (response.ok) {
                    setCurrentStep(4); // Success step
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
                        <h3>Company Details</h3>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Enter company name"
                            />
                            {errors.companyName && <span className="error">{errors.companyName}</span>}
                        </div>
                        <div className="form-group">
                            <label>Corporate Identity Number (CIN)</label>
                            <input
                                type="text"
                                name="cin"
                                value={formData.cin}
                                onChange={handleInputChange}
                                placeholder="Enter CIN"
                            />
                            {errors.cin && <span className="error">{errors.cin}</span>}
                        </div>
                        <div className="form-group">
                            <label>Sector</label>
                            <select
                                name="sector"
                                value={formData.sector}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Sector</option>
                                {sectors.map(sector => (
                                    <option key={sector} value={sector}>{sector}</option>
                                ))}
                            </select>
                            {errors.sector && <span className="error">{errors.sector}</span>}
                        </div>
                        <div className="form-group">
                            <label>PAT Compliance Status</label>
                            <select
                                name="patStatus"
                                value={formData.patStatus}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Status</option>
                                <option value="compliant">Compliant</option>
                                <option value="non-compliant">Non-Compliant</option>
                                <option value="not-applicable">Not Applicable</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleInputChange}
                                placeholder="Enter contact person name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email address"
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                            />
                            {errors.phone && <span className="error">{errors.phone}</span>}
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
                        <h3>Emissions Data</h3>
                        <div className="form-group">
                            <label>Baseline Year</label>
                            <input
                                type="number"
                                name="baselineYear"
                                value={formData.baselineYear}
                                onChange={handleInputChange}
                                placeholder="Enter baseline year"
                                min="2000"
                                max={new Date().getFullYear()}
                            />
                            {errors.baselineYear && <span className="error">{errors.baselineYear}</span>}
                        </div>
                        <div className="form-group">
                            <label>Baseline Emissions</label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="baselineEmissions"
                                    value={formData.baselineEmissions}
                                    onChange={handleInputChange}
                                    placeholder="Enter baseline emissions"
                                />
                                <select
                                    name="emissionsUnit"
                                    value={formData.emissionsUnit}
                                    onChange={handleInputChange}
                                >
                                    <option value="tCO2e">tCO2e</option>
                                    <option value="ktCO2e">ktCO2e</option>
                                    <option value="MtCO2e">MtCO2e</option>
                                </select>
                            </div>
                            {errors.baselineEmissions && <span className="error">{errors.baselineEmissions}</span>}
                        </div>
                        <div className="form-group">
                            <label>Current Emissions</label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="currentEmissions"
                                    value={formData.currentEmissions}
                                    onChange={handleInputChange}
                                    placeholder="Enter current emissions"
                                />
                                <span className="unit">{formData.emissionsUnit}</span>
                            </div>
                            {errors.currentEmissions && <span className="error">{errors.currentEmissions}</span>}
                        </div>
                        <div className="form-group">
                            <label>Upload Emissions Report</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                                    onChange={handleFileUpload}
                                    id="emissionsReport"
                                />
                                <label htmlFor="emissionsReport" className="file-upload-label">
                                    <FaFileUpload />
                                    {formData.emissionsReport 
                                        ? formData.emissionsReport.name 
                                        : 'Choose file (PDF, DOC, XLS)'}
                                </label>
                            </div>
                            {errors.emissionsReport && <span className="error">{errors.emissionsReport}</span>}
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
                        <h3>Compliance Goals</h3>
                        <div className="form-group">
                            <label>Target Year</label>
                            <input
                                type="number"
                                name="targetYear"
                                value={formData.targetYear}
                                onChange={handleInputChange}
                                placeholder="Enter target year"
                                min={new Date().getFullYear()}
                                max={new Date().getFullYear() + 30}
                            />
                            {errors.targetYear && <span className="error">{errors.targetYear}</span>}
                        </div>
                        <div className="form-group">
                            <label>Emission Reduction Target (%)</label>
                            <input
                                type="number"
                                name="reductionTarget"
                                value={formData.reductionTarget}
                                onChange={handleInputChange}
                                placeholder="Enter reduction target"
                                min="0"
                                max="100"
                            />
                            {errors.reductionTarget && <span className="error">{errors.reductionTarget}</span>}
                        </div>
                        <div className="form-group">
                            <label>Preferred Project Types</label>
                            <div className="checkbox-grid">
                                {projectTypes.map(project => (
                                    <label key={project} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.preferredProjects.includes(project)}
                                            onChange={() => handleMultiSelect('preferredProjects', project)}
                                        />
                                        {project}
                                    </label>
                                ))}
                            </div>
                            {errors.preferredProjects && <span className="error">{errors.preferredProjects}</span>}
                        </div>
                        <div className="form-group">
                            <label>Annual Carbon Credit Budget Range</label>
                            <select
                                name="budgetRange"
                                value={formData.budgetRange}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Budget Range</option>
                                <option value="0-100k">₹0 - ₹1 Lakh</option>
                                <option value="100k-1m">₹1 Lakh - ₹10 Lakh</option>
                                <option value="1m-10m">₹10 Lakh - ₹1 Crore</option>
                                <option value="10m+">Above ₹1 Crore</option>
                            </select>
                        </div>
                    </motion.div>
                );
            
            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="success-step"
                    >
                        <div className="success-icon">
                            <FaCheckCircle />
                        </div>
                        <h2>Registration Successful!</h2>
                        <p>Welcome to CarbonHarvest. Your journey towards carbon neutrality begins now.</p>
                        <button
                            className="primary-button"
                            onClick={() => navigate('/industry-dashboard')}
                        >
                            Go to Dashboard
                        </button>
                    </motion.div>
                );
        }
    };

    return (
        <div className="industry-onboarding">
            <div className="onboarding-container">
                <div className="progress-bar">
                    {[1, 2, 3].map(step => (
                        <div
                            key={step}
                            className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
                        >
                            <div className="step-icon">
                                {step === 1 && <FaBuilding />}
                                {step === 2 && <FaChartLine />}
                                {step === 3 && <FaCheckCircle />}
                            </div>
                            <span className="step-label">
                                {step === 1 && 'Company Details'}
                                {step === 2 && 'Emissions Data'}
                                {step === 3 && 'Compliance Goals'}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="form-container">
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>

                    {currentStep < 4 && (
                        <div className="form-navigation">
                            {currentStep > 1 && (
                                <button
                                    className="secondary-button"
                                    onClick={handlePrevious}
                                >
                                    Previous
                                </button>
                            )}
                            {currentStep < 3 ? (
                                <button
                                    className="primary-button"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    className="primary-button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

IndustryOnboarding.propTypes = {
  onSubmit: PropTypes.func,
  onStepChange: PropTypes.func,
  initialData: PropTypes.shape({
    companyName: PropTypes.string,
    cin: PropTypes.string,
    sector: PropTypes.string,
    patStatus: PropTypes.string,
    registeredAddress: PropTypes.string,
    contactPerson: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    baselineYear: PropTypes.string,
    baselineEmissions: PropTypes.string,
    currentEmissions: PropTypes.string,
    emissionsUnit: PropTypes.string,
    reportingPeriod: PropTypes.string,
    targetYear: PropTypes.string,
    reductionTarget: PropTypes.string,
    preferredProjects: PropTypes.arrayOf(PropTypes.string),
    budgetRange: PropTypes.string,
    complianceStrategy: PropTypes.string
  })
};

IndustryOnboarding.defaultProps = {
  onSubmit: () => {},
  onStepChange: () => {},
  initialData: {}
};

export default IndustryOnboarding;
