import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import './FooterLeft.css';

export default function FooterLeft(props) {
  const { username, description, song } = props;

  return (
    <div className="footer-left">
      <div className="username">
        <h4>@{username}</h4>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="song">
        <FontAwesomeIcon icon={faMusic} />
        <p className="marquee">{song}</p>
      </div>
    </div>
  );
}
