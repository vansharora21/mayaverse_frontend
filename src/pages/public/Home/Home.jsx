import React, { useEffect, useState, useRef } from 'react';
import HeroScroll from '../../../components/home/HeroScroll';
import RingScroll from '../../../components/home/RingScroll';
import Events from '../../public/Events/Events';
import Sponsors from '../../public/Sponsors/Sponsors';
import Merchandise from '../../public/Merchandise/Merchandise';
import ParallaxIntro from '../../../components/home/ParallaxIntro'; // Import Intro

const Home = () => {
  const [showIntro, setShowIntro] = useState(true); // Default to showing intro
  const [isFading, setIsFading] = useState(false); // New fading state
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoRemoved, setVideoRemoved] = useState(false);
  const videoRef = useRef(null);

  // Ensure we start at top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIntroClick = () => {
    if (isFading) return; // Prevent double clicks

    setIsFading(true); // Start fade out

    // Wait for fade animation (2s) before starting video
    setTimeout(() => {
      setShowIntro(false);
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Video play failed", e));
      }
    }, 2000);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setTimeout(() => {
      setVideoRemoved(true);
    }, 1000);
  };

  return (
    <div className="home-container" style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>

      {/* 0a. Parallax Intro Overlay */}
      {showIntro && <ParallaxIntro onStart={handleIntroClick} isFading={isFading} />}

      {/* 0b. Video Overlay */}
      {!videoRemoved && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1000,
          backgroundColor: 'black',
          opacity: videoEnded ? 0 : 1,
          transition: 'opacity 1s ease-out',
          pointerEvents: videoEnded ? 'none' : 'auto',
          // Video visible behind intro
          visibility: 'visible'
        }}>
          <video
            ref={videoRef}
            src="/intro-assets/portal_travel.mp4"
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      {/* 1. Hero Scroll Section */}
      <HeroScroll />

      {/* 2. Ring Scroll Section */}
      <RingScroll />

      {/* 3. Content Sections */}
      <div className="content-sections" style={{ position: 'relative', zIndex: 10, backgroundColor: 'black' }}>
        <Events />
        <Sponsors />
        <Merchandise />
      </div>
    </div>
  );
};

export default Home;