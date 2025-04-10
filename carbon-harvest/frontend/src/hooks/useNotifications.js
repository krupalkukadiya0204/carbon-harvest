import { useState, useEffect } from 'react';

/**
 * Hook that manages notification data
 * @returns {Array} Array of notification objects containing id, title, message, time, and unread status
 */
const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Mock notifications data
        setNotifications([
            {
                id: 1,
                title: 'New Carbon Credit Offer',
                message: 'You have received a new carbon credit offer.',
                time: '2h ago',
                unread: true
            },
            {
                id: 2,
                title: 'Project Verification Complete',
                message: 'Your project verification has been completed.',
                time: '1d ago',
                unread: false
            }
        ]);
    }, []);

    return notifications;
};

export default useNotifications;
