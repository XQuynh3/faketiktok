import React, { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import VideoInfo from './components/VideoInfo';

// This array holds information about different videos
const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: 'https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchHashtag, setSearchHashtag] = useState('');
  const [showVideoInfo, setShowVideoInfo] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseStartY, setMouseStartY] = useState(0);
  const videoRefs = useRef([]);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    setVideos(videoUrls);
    setFilteredVideos(videoUrls);
  }, []);

  // Exercise 7: Filter videos by hashtag
  useEffect(() => {
    if (searchHashtag) {
      const filtered = videos.filter(video =>
        video.description.toLowerCase().includes(`#${searchHashtag.toLowerCase()}`)
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  }, [searchHashtag, videos]);

  // Exercise 7: Search handler
  const handleSearch = (hashtag) => {
    setSearchHashtag(hashtag);
  };

  const handleClearSearch = () => {
    setSearchHashtag('');
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredVideos]);

  // Exercise 3: Mouse drag navigation handlers
  const containerRef = useRef(null);
  
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setMouseStartY(e.clientY);
  };

  const handleMouseMove = useCallback((e) => {
    if (!isMouseDown) return;

    const deltaY = e.clientY - mouseStartY;

    // Drag down (positive delta) -> go to previous video
    if (deltaY > 50) {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          top: -window.innerHeight,
          behavior: 'smooth'
        });
      }
      setIsMouseDown(false);
    } 
    // Drag up (negative delta) -> go to next video
    else if (deltaY < -50) {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
      setIsMouseDown(false);
    }
  }, [isMouseDown, mouseStartY]);

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  // Exercise 5: Scroll handler for video info
  useEffect(() => {
    const handleScroll = () => {
      setShowVideoInfo(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setShowVideoInfo(false);
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Exercise 5: Keyboard handler for right arrow
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        setShowVideoInfo(!showVideoInfo);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showVideoInfo]);

  // Exercise 3: Attach mouse event listeners to container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [handleMouseMove]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  return (
    <div className="app">
      <div className="container" ref={containerRef}>
        <TopNavbar
          onSearch={handleSearch}
          onClearSearch={handleClearSearch}
        />

        {/* Exercise 5: Video Info Panel */}
        {filteredVideos.length > 0 && (
          <VideoInfo
            video={filteredVideos[0]}
            isVisible={showVideoInfo}
            onClose={() => setShowVideoInfo(false)}
          />
        )}

        {/* Search Results Header */}
        {searchHashtag && (
          <div className="search-results-header">
            Search results for: <strong>#{searchHashtag}</strong>
            {filteredVideos.length === 0 && (
              <p>No videos found with this hashtag.</p>
            )}
          </div>
        )}

        {/* Video Container */}
        <div className="video-container">
          {filteredVideos.map((video, index) => (
            <VideoCard
              key={index}
              username={video.username}
              description={video.description}
              song={video.song}
              likes={video.likes}
              saves={video.saves}
              comments={video.comments}
              shares={video.shares}
              url={video.url}
              profilePic={video.profilePic}
              setVideoRef={handleVideoRef(index)}
              autoplay={index === 0}
            />
          ))}
        </div>

        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;
