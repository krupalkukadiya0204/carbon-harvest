import React, { createContext, useContext, useState, useCallback } from 'react';
import { creditAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CreditContext = createContext();

/**
 *
 * @param root0
 * @param root0.children
 */
/**
 * Credit Provider Component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Credit context provider
 */
export const CreditProvider = ({ children }) => {
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const fetchCredits = useCallback(async () => {
        try {
            setLoading(true);
            const response = await creditAPI.getAllCredits();
            setCredits(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching credits:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addCredit = async (creditData) => {
        try {
            setLoading(true);
            const response = await creditAPI.addCredit({
                ...creditData,
                farmer: user._id
            });
            setCredits(prev => [...prev, response.data]);
            setError(null);
            return response.data;
        } catch (err) {
            setError(err.message);
            console.error('Error adding credit:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const buyCredit = async (creditId) => {
        try {
            setLoading(true);
            const response = await creditAPI.buyCredit(creditId);
            setCredits(prev => prev.map(credit => 
                credit._id === creditId ? response.data : credit
            ));
            setError(null);
            return response.data;
        } catch (err) {
            setError(err.message);
            console.error('Error buying credit:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        credits,
        loading,
        error,
        fetchCredits,
        addCredit,
        buyCredit
    };

    return (
        <CreditContext.Provider value={value}>
            {children}
        </CreditContext.Provider>
    );
};

/**
 *
 */
export const useCredits = () => {
    const context = useContext(CreditContext);
    if (!context) {
        throw new Error('useCredits must be used within a CreditProvider');
    }
    return context;
};

CreditProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CreditContext;
