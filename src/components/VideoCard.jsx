import React, { useRef, useEffect } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const videoRef = useRef(null);
  const { setVideoRef, url, username, description, song, likes, comments, saves, shares, profilePic } = props;

  useEffect(() => {
    if (setVideoRef) {
      setVideoRef(videoRef.current);
    }
  }, [setVideoRef]);

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        className="video"
        src={url}
        loop
        muted
      />
      <div className="footer">
        <FooterLeft username={username} description={description} song={song} />
        <FooterRight
          likes={likes}
          comments={comments}
          saves={saves}
          shares={shares}
          profilePic={profilePic}
          videoRef={videoRef}
          videoUrl={window.location.href}
        />
      </div>
    </div>
  );
};

export default VideoCard;
