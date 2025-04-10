import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { FaUser, FaCamera } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
    const defaultProfilePic = <FaUser size={100} />;
    const [previewUrl, setPreviewUrl] = useState(null);
    const { user, setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        phone: '',
        userType: '',
        profilePicture: null,
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        farmSize: '',
        farmType: '',
        cropTypes: '',
        certifications: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        panNumber: '',
        gstNumber: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get('/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.data || !response.data.user) {
                    throw new Error('Invalid response from server');
                }

                const userData = response.data.user;
                setFormData({
                    name: userData.name || '',
                    email: userData.email || '',
                    organization: userData.organization || '',
                    phone: userData.phone || '',
                    userType: userData.userType || '',
                    profilePicture: userData.profilePicture || null
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
                if (error.response?.status === 401) {
                    setMessage({
                        type: 'error',
                        content: 'Your session has expired. Please log in again.'
                    });
                    window.location.href = '/login';
                } else {
                    setMessage({
                        type: 'error',
                        content: error.response?.data?.message || 'Error loading profile data. Please try again.'
                    });
                }
            }
        };

        if (user && user.id) {
            fetchProfile();
        } else {
            setMessage({
                type: 'error',
                content: 'No user information found. Please log in again.'
            });
            window.location.href = '/login';
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setMessage({
                    type: 'error',
                    content: 'File size should be less than 5MB'
                });
                return;
            }

            if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
                setMessage({
                    type: 'error',
                    content: 'Only JPG, JPEG, and PNG files are allowed'
                });
                return;
            }

            setFormData(prev => ({
                ...prev,
                profilePicture: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', content: '' });

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const formDataToSend = new FormData();
            
            if (formData.name !== user.name) {
                formDataToSend.append('name', formData.name);
            }
            if (formData.organization !== user.organization) {
                formDataToSend.append('organization', formData.organization);
            }
            if (formData.phone !== user.phone) {
                formDataToSend.append('phone', formData.phone);
            }
            if (formData.profilePicture instanceof File) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }

            if ([...formDataToSend.entries()].length === 0) {
                setMessage({
                    type: 'info',
                    content: 'No changes detected'
                });
                return;
            }

            const { data } = await axios.put('/api/users/profile', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.user) {
                setUser(data.user);
                setMessage({ 
                    type: 'success', 
                    content: data.message || 'Profile updated successfully!'
                });
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response?.status === 401) {
                setMessage({
                    type: 'error',
                    content: 'Your session has expired. Please log in again.'
                });
                window.location.href = '/login';
            } else {
                setMessage({ 
                    type: 'error', 
                    content: error.response?.data?.message || 'Error updating profile. Please try again.'
                });
            }
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile Settings</h2>
            
            {message.content && (
                <div className={`message ${message.type}`}>
                    {message.content}
                </div>
            )}

            <div className="profile-picture-container">
                {previewUrl || formData.profilePicture ? (
                    <img 
                        src={previewUrl || formData.profilePicture} 
                        alt="Profile" 
                        className="profile-picture"
                    />
                ) : (
                    <div className="default-profile-picture">
                        {defaultProfilePic}
                    </div>
                )}
                {isEditing && (
                    <div className="profile-picture-upload">
                        <label htmlFor="profile-picture-input" className="upload-label">
                            <FaCamera size={20} />
                            <span>Change Picture</span>
                        </label>
                        <input
                            id="profile-picture-input"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={true}
                    />
                </div>

                <div className="form-group">
                    <label>Organization:</label>
                    <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your organization"
                    />
                </div>

                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="button-group">
                    {!isEditing ? (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="edit-button"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button type="submit" className="save-button">Save Changes</button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setPreviewUrl(null);
                                    setFormData(prev => ({
                                        ...prev,
                                        profilePicture: user.profilePicture || null
                                    }));
                                }}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Profile;