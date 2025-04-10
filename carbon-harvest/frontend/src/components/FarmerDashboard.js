/**
 * @file Farmer Dashboard Component - Dashboard for farmers to manage their carbon credits
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmerDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import ErrorDisplay from '../common/ErrorDisplay';
/**
 * FarmerDashboard Component - Displays farmer's carbon credit statistics and management tools
 * @returns {JSX.Element} Farmer dashboard component
 */
const FarmerDashboard = () => {
    const [credits, setCredits] = useState([]);
    const [newCredit, setNewCredit] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCredits = async () => {
            setLoading(true);
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

    const handleAddCredit = async () => {
        if (!newCredit || isNaN(newCredit) || newCredit <= 0) {
            setError('Please enter a valid credit amount.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/credits', { amount: newCredit });
            setCredits([...credits, response.data]);
            setNewCredit('');
        } catch (err) {
            setError('Failed to add credit. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="farmer-dashboard container my-5">
            <h2 className="text-center my-4">Farmer Dashboard</h2>
            <p className="text-center">Manage your credits and tasks here...</p>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
                    {error && <ErrorDisplay message={error} />}
                    <div className="add-credit mb-4">
                        <input 
                            type="number" 
                            value={newCredit} 
                            onChange={(e) => setNewCredit(e.target.value)} 
                            placeholder="Add Carbon Credit" 
                            className="form-control mb-2"
                            aria-label="Add Carbon Credit"
                            required
                        />
                        <button className="btn btn-primary w-100" onClick={handleAddCredit} disabled={loading}>Add Credit</button>
                    </div>
                    <div className="credits-list">
                        <h3 className="text-center mb-3">Your Credits</h3>
                        <ul className="list-group">
                            {credits.map((credit, index) => (
                                <li key={index} className="list-group-item">
                                    Credit Amount: {credit.amount}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmerDashboard;