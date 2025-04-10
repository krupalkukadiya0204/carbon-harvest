import React, { useState } from 'react';
import './Onboarding.css';

/**
 *
 */
const RegulatorOnboarding = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        governmentId: '',
        accessLevel: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const previousStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="onboarding-container">
            <h2>Regulator Onboarding</h2>
            {step === 1 && (
                <div>
                    <h3>Step 1: Government ID Verification</h3>
                    <input type="text" name="governmentId" placeholder="Government ID" onChange={handleChange} />
                    <button onClick={nextStep}>Next</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h3>Step 2: Access Level Permissions</h3>
                    <select name="accessLevel" onChange={handleChange}>
                        <option value="">Select Access Level</option>
                        <option value="view-only">View Only</option>
                        <option value="audit-rights">Audit Rights</option>
                    </select>
                    <button onClick={previousStep}>Back</button>
                    <button onClick={() => alert('Registration Complete!')}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default RegulatorOnboarding;
