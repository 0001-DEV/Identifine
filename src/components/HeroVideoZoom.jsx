import React, { useState, useEffect, useRef } from 'react';
import heroVideoFile from '../assets/herovideo.mp4';

export default function HeroVideoZoom() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [scale, setScale] = useState(0.05);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      
      // Calculate zoom distance (smoothest feel across 500px - 600px of scroll)
      const zoomDistance = Math.min(Math.max(window.innerHeight * 0.75, 450), 650);
      
      const rawProgress = scrollY / zoomDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      
      // Smooth easing so expansion feels organic and responsive to scroll
      const easedProgress = Math.pow(progress, 0.95);
      
      // Starts from a very small compact size (0.05 / 5%) and grows bit by bit to 1.0 (full size)
      const minScale = 0.05;
      const currentScale = minScale + easedProgress * (1 - minScale);
      
      setScale(currentScale);

      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial calculation on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-4 sm:py-8 overflow-hidden items-center bg-transparent">
      <div 
        className="w-full max-w-[92rem] px-0 sm:px-2 origin-center will-change-transform bg-transparent"
        style={{ 
          transform: `scale(${scale})`,
          transition: 'transform 0.08s ease-out'
        }}
      >
        <div 
          className="relative aspect-[16/9] w-full overflow-hidden select-none bg-transparent"
          style={{
            borderRadius: `${Math.round(16 + scale * 20)}px`,
            boxShadow: scale > 0.95 ? 'none' : `0 ${Math.round(10 + scale * 20)}px ${Math.round(20 + scale * 30)}px rgba(0, 0, 0, ${0.08 + scale * 0.12})`
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover bg-transparent"
            style={{
              borderRadius: `${Math.round(16 + scale * 20)}px`
            }}
          >
            <source src={heroVideoFile} type="video/mp4" />
            <source src="/assets/herovideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

