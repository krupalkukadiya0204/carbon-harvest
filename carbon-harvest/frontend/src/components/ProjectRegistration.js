/**
 * @file Project Registration Component - Handles carbon credit project registration
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectRegistration.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';

/**
 * ProjectRegistration Component - Form for registering new carbon credit projects
 * @returns {JSX.Element} Project registration form component
 */
const ProjectRegistration = () => {
    const [projectType, setProjectType] = useState('');
    const [landDocuments, setLandDocuments] = useState(null);
    const [iotDevice, setIotDevice] = useState('');
    const [earningsEstimate, setEarningsEstimate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filePreview, setFilePreview] = useState('');

    const handleProjectTypeChange = (e) => {
        setProjectType(e.target.value);
    };

    const handleLandDocumentsChange = (e) => {
        const file = e.target.files[0];
        setLandDocuments(file);
        if (file) {
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleIotDeviceChange = (e) => {
        setIotDevice(e.target.value);
    };

    const handleEstimateEarnings = () => {
        setLoading(true);
        // Placeholder for AI-generated earnings estimate logic
        setTimeout(() => {
            const estimatedEarnings = '₹1.2L'; // Example static value
            setEarningsEstimate(estimatedEarnings);
            setLoading(false);
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Logic to submit project registration
        setTimeout(() => {
            console.log('Project Registered:', { projectType, landDocuments, iotDevice });
            alert('Project registered successfully!');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="project-registration container">
            <h2 className="text-center my-4">Project Registration</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="projectType">Project Type</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="projectType" 
                        value={projectType} 
                        onChange={handleProjectTypeChange} 
                        required 
                        aria-required="true"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="landDocuments">Land Documents</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="landDocuments" 
                        onChange={handleLandDocumentsChange} 
                        required 
                        aria-required="true"
                    />
                    {filePreview && <img src={filePreview} alt="Land Document Preview" className="img-thumbnail mt-2" style={{ maxHeight: '200px' }} />}
                </div>
                <div className="form-group">
                    <label htmlFor="iotDevice">IoT Device</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="iotDevice" 
                        value={iotDevice} 
                        onChange={handleIotDeviceChange} 
                        required 
                        aria-required="true"
                    />
                </div>
                <button type="button" className="btn btn-info btn-block mb-3" onClick={handleEstimateEarnings} disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Estimate Earnings'}
                </button>
                {earningsEstimate && <p className="text-center">Estimated Earnings: {earningsEstimate}</p>}
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Register Project'}
                </button>
            </form>
        </div>
    );
};

ProjectRegistration.propTypes = {
  onSubmit: PropTypes.func,
  onEstimateEarnings: PropTypes.func,
  initialData: PropTypes.shape({
    projectType: PropTypes.string,
    iotDevice: PropTypes.string
  }),
  maxFileSize: PropTypes.number,
  allowedFileTypes: PropTypes.arrayOf(PropTypes.string)
};

ProjectRegistration.defaultProps = {
  onSubmit: () => {},
  onEstimateEarnings: () => {},
  initialData: {
    projectType: '',
    iotDevice: ''
  },
  maxFileSize: 5242880, // 5MB
  allowedFileTypes: ['.pdf', '.jpg', '.png', '.doc', '.docx']
};

export default ProjectRegistration;