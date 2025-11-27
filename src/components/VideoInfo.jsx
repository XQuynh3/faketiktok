import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './VideoInfo.css';

const VideoInfo = ({ video, isVisible, onClose }) => {
  return (
    <div className={`video-info-panel ${isVisible ? 'visible' : ''}`}>
      <button className="close-btn" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <div className="info-content">
        <div className="creator-info">
          <img src={video.profilePic || '/placeholder.svg'} alt="creator" className="creator-pic" />
          <div>
            <h4>@{video.username}</h4>
            <p className="upload-date">Uploaded 2 days ago</p>
          </div>
        </div>

        <div className="video-stats">
          <div className="stat">
            <span className="stat-value">{video.likes}</span>
            <span className="stat-label">Likes</span>
          </div>
          <div className="stat">
            <span className="stat-value">{video.comments}</span>
            <span className="stat-label">Comments</span>
          </div>
          <div className="stat">
            <span className="stat-value">{video.shares}</span>
            <span className="stat-label">Shares</span>
          </div>
          <div className="stat">
            <span className="stat-value">{video.saves}</span>
            <span className="stat-label">Saves</span>
          </div>
        </div>

        <div className="video-description">
          <p>{video.description}</p>
        </div>

        <div className="song-info">
          <p><strong>Music:</strong> {video.song}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
