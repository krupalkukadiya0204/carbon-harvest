import React, { useState, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import useClickOutside from '../../hooks/useClickOutside';
import useNotifications from '../../hooks/useNotifications';

const NotificationsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const notifications = useNotifications();

    useClickOutside(menuRef, () => setIsOpen(false));

    return (
        <div className="notifications" ref={menuRef}>
            <button 
                className="notification-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Notifications"
                aria-expanded={isOpen}
            >
                <FaBell />
                {notifications.some(n => n.unread) && (
                    <span className="notification-badge" />
                )}
            </button>
            {isOpen && (
                <div className="notifications-dropdown">
                    {notifications.length === 0 ? (
                        <div className="notification-item empty">
                            No new notifications
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div 
                                key={notification.id} 
                                className={`notification-item ${notification.unread ? 'unread' : ''}`}
                            >
                                <h4>{notification.title}</h4>
                                <p>{notification.message}</p>
                                <span className="time">{notification.time}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default React.memo(NotificationsMenu);
