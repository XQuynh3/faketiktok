import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faBookmark, faShare, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import SharePopup from './SharePopup';
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic, videoRef, videoUrl }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleSaveClick = () => {
    setSaved(!saved);
    // Copy video URL to clipboard
    navigator.clipboard.writeText(videoUrl).then(() => {
      alert('Video URL copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy URL:', err);
    });
  };

  const handleMuteClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="footer-right">
      <div className="action-button-group">
        {/* Profile Picture */}
        <div className="profile-pic-container">
          <img src={profilePic} alt="profile" className="profile-pic" />
          <button className="follow-button">+</button>
        </div>

        {/* Like Button */}
        <button className={`action-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
          <FontAwesomeIcon icon={faHeart} />
          <span>{likes}</span>
        </button>

        {/* Comment Button */}
        <button className="action-button">
          <FontAwesomeIcon icon={faCommentDots} />
          <span>{comments}</span>
        </button>

        {/* Share Button */}
        <button className="action-button" onClick={() => setShowSharePopup(true)}>
          <FontAwesomeIcon icon={faShare} />
          <span>{shares}</span>
        </button>

        {/* Save Button */}
        <button className={`action-button ${saved ? 'saved' : ''}`} onClick={handleSaveClick}>
          <FontAwesomeIcon icon={faBookmark} />
          <span>{saves}</span>
        </button>

        {/* Mute Button */}
        <button className="action-button" onClick={handleMuteClick}>
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
        </button>
      </div>

      {/* Share Popup */}
      <SharePopup
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        videoUrl={videoUrl}
        videoTitle="Check out this video!"
      />
    </div>
  );
}

export default FooterRight;
