import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import './TopNavbar.css';

const TopNavbar = ({ onSearch, onClearSearch }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <>
      <div className="top-navbar">
        <div className="nav-logo">
          <FontAwesomeIcon icon={faTv} />
        </div>

        <div className="nav-center">
          <span className="active">Following</span>
          <span>For You</span>
        </div>

        <button
          className="nav-search"
          onClick={() => setShowSearchBar(!showSearchBar)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <SearchBar
        isOpen={showSearchBar}
        onClose={() => setShowSearchBar(false)}
        onSearch={(hashtag) => {
          onSearch(hashtag);
          setShowSearchBar(false);
        }}
        onClear={() => {
          onClearSearch();
          setShowSearchBar(false);
        }}
      />
    </>
  );
};

export default TopNavbar;
