import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ show, onClose, onTriggerClick }) => (
    <div className="search-container">
        <button 
            className="search-trigger"
            onClick={onTriggerClick}
            aria-label="Open search"
        >
            <FaSearch /> Search
        </button>
        {show && (
            <div className="search-overlay">
                <div className="search-modal">
                    <input 
                        type="text"
                        placeholder="Search..."
                        autoFocus
                        className="search-input"
                        onKeyDown={(e) => e.key === 'Escape' && onClose()}
                    />
                    <button 
                        className="close-search"
                        onClick={onClose}
                        aria-label="Close search"
                    >
                        ✕
                    </button>
                </div>
            </div>
        )}
    </div>
);

SearchBox.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onTriggerClick: PropTypes.func.isRequired
};

export default React.memo(SearchBox);
