import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './SharePopup.css';

const SharePopup = ({ isOpen, onClose, videoUrl, videoTitle }) => {
  if (!isOpen) return null;

  const handleShare = (platform) => {
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(videoUrl);

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'instagram':
        alert('Open Instagram app and share manually or copy the link');
        break;
      case 'threads':
        shareUrl = `https://threads.net/intent/post?url=${encodedUrl}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="share-popup-overlay" onClick={onClose}>
      <div className="share-popup" onClick={(e) => e.stopPropagation()}>
        <div className="share-popup-header">
          <h3>Share Video</h3>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="share-options">
          {/* Facebook */}
          <button
            className="share-option facebook"
            onClick={() => handleShare('facebook')}
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span>Facebook</span>
          </button>

          {/* Instagram */}
          <button
            className="share-option instagram"
            onClick={() => handleShare('instagram')}
          >
            <FontAwesomeIcon icon={faInstagram} />
            <span>Instagram</span>
          </button>

          {/* Threads */}
          <button
            className="share-option threads"
            onClick={() => handleShare('threads')}
          >
            <span className="threads-icon">𝕏</span>
            <span>Threads</span>
          </button>

          {/* Copy Link */}
          <button
            className="share-option copy"
            onClick={() => {
              navigator.clipboard.writeText(videoUrl);
              alert('Link copied to clipboard!');
              onClose();
            }}
          >
            <span className="copy-icon">🔗</span>
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
