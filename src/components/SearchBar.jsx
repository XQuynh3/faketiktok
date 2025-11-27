import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ isOpen, onClose, onSearch, onClear }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      const hashtag = searchInput.trim().replace(/^#/, '');
      onSearch(hashtag);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-bar-container">
      <div className="search-bar-input-group">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          placeholder="Search #hashtag"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleSearch}
          autoFocus
          className="search-input"
        />
        {searchInput && (
          <button
            className="clear-btn"
            onClick={() => setSearchInput('')}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
      <button className="close-btn" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default SearchBar;
