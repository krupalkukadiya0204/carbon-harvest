import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegulatorDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Modal, Button } from 'react-bootstrap';
import ErrorDisplay from '../common/ErrorDisplay';

/**
 *
 */
const RegulatorDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleVerifyUser = async () => {
        if (!selectedUserId) return;
        setLoading(true);
        try {
            await axios.post(`/api/users/verify/${selectedUserId}`);
            alert('User verified successfully!');
            setUsers(users.map((user) => (user.id === selectedUserId ? { ...user, verified: true } : user)));
        } catch (err) {
            setError('Failed to verify user. Please try again later.');
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
    };

    return (
        <div className="regulator-dashboard container">
            <h2 className="text-center my-4">Regulator Dashboard</h2>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <ErrorDisplay message={error} />
            ) : (
                <div className="users-list">
                    <h3 className="text-center mb-3">Users</h3>
                    <ul className="list-group">
                        {users.map((user) => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{user.name} - {user.userType} - {user.verified ? 'Verified' : 'Not Verified'}</span>
                                {!user.verified && (
                                    <button className="btn btn-primary" onClick={() => openModal(user.id)} aria-label={`Verify ${user.name}`}>
                                        Verify
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to verify this user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleVerifyUser} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegulatorDashboard;