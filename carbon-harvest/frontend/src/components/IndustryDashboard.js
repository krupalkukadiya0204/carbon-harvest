/**
 * @file Industry Dashboard Component - Dashboard for industry users to manage carbon credits
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './IndustryDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Modal, Button } from 'react-bootstrap';
import ErrorDisplay from '../common/ErrorDisplay';

/**
 * IndustryDashboard Component - Displays carbon credit marketplace and purchase options
 * @returns {JSX.Element} Industry dashboard component
 */
const IndustryDashboard = () => {
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCreditId, setSelectedCreditId] = useState(null);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await axios.get('/api/credits');
                setCredits(response.data);
            } catch (err) {
                setError('Failed to fetch credits. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchCredits();
    }, []);

    const handleBuyCredit = async () => {
        if (!selectedCreditId) return;
        setLoading(true);
        setError('');
        try {
            await axios.post(`/api/credits/buy/${selectedCreditId}`);
            alert('Credit purchased successfully!');
            setCredits(credits.filter((credit) => credit.id !== selectedCreditId));
        } catch (err) {
            setError('Failed to purchase credit. Please try again later.');
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    const openModal = (creditId) => {
        setSelectedCreditId(creditId);
        setShowModal(true);
    };

    return (
        <div className="industry-dashboard container my-5">
            <h2 className="text-center my-4">Industry Dashboard</h2>
            <p className="text-center">Manage your industry credits here...</p>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <ErrorDisplay message={error} />
            ) : (
                <div className="credits-list">
                    <h3 className="text-center mb-3">Available Credits</h3>
                    <ul className="list-group">
                        {credits.map((credit) => (
                            <li key={credit.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {credit.amount} credits
                                <button className="btn btn-success" onClick={() => openModal(credit.id)}>Buy</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to purchase this credit?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleBuyCredit} disabled={loading}>
                        {loading ? 'Purchasing...' : 'Confirm Purchase'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

IndustryDashboard.propTypes = {
  companyId: PropTypes.string,
  onCreditPurchase: PropTypes.func,
  onError: PropTypes.func
};

IndustryDashboard.defaultProps = {
  companyId: '',
  onCreditPurchase: () => {},
  onError: () => {}
};

export default IndustryDashboard;