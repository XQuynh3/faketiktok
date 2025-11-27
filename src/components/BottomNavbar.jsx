import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faPlus, faInbox, faUser } from '@fortawesome/free-solid-svg-icons';
import './BottomNavbar.css';

function BottomNavbar() {
  return (
    <div className="bottom-navbar">
      <button className="nav-item active">
        <FontAwesomeIcon icon={faHouse} />
      </button>
      <button className="nav-item">
        <FontAwesomeIcon icon={faUserFriends} />
      </button>
      <button className="nav-item">
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <button className="nav-item">
        <FontAwesomeIcon icon={faInbox} />
      </button>
      <button className="nav-item">
        <FontAwesomeIcon icon={faUser} />
      </button>
    </div>
  );
}

export default BottomNavbar;