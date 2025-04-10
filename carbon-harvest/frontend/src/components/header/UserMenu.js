import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import useClickOutside from '../../hooks/useClickOutside';

const UserMenu = ({ toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useClickOutside(menuRef, () => setIsOpen(false));

    return (
        <div className="user-menu" ref={menuRef}>
            <button 
                className="user-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="User menu"
                aria-expanded={isOpen}
            >
                <FaUser />
            </button>
            {isOpen && (
                <div className="user-dropdown">
                    <button onClick={toggleTheme}>Toggle Theme</button>
                    <Link to="/profile">Profile</Link>
                    <Link to="/settings">Settings</Link>
                </div>
            )}
        </div>
    );
};

UserMenu.propTypes = {
    toggleTheme: PropTypes.func.isRequired
};

export default React.memo(UserMenu);
