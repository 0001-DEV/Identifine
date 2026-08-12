import React, { useState, useEffect, useRef } from 'react';
import heroVideoFile from '../assets/herovideo.mp4';

export default function HeroVideoZoom() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [scale, setScale] = useState(0.15);

  useEffect(() => {
    // Ensure video starts playing immediately on load
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementTop = rect.top;
      const startZoom = windowHeight * 0.98; 
      const endZoom = windowHeight * 0.25;   

      if (elementTop <= startZoom && elementTop >= endZoom) {
        const progress = (startZoom - elementTop) / (startZoom - endZoom);
        const newScale = 0.15 + Math.min(Math.max(progress, 0), 1) * 0.85;
        setScale(newScale);
      } else if (elementTop < endZoom) {
        setScale(1);
      } else {
        setScale(0.15);
      }

      // Ensure video plays continuously while scaling
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-10 overflow-hidden items-center">
      {/* Full Width Container (max-w-[92rem]) */}
      <div 
        className="w-full max-w-7xl sm:max-w-[85rem] lg:max-w-[92rem] transition-all duration-300 ease-out origin-center"
        style={{ 
          transform: `perspective(1200px) scale(${scale})`,
          opacity: Math.max(scale, 0.4)
        }}
      >
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9] w-full rounded-[32px] sm:rounded-[44px] bg-[#000000] overflow-hidden shadow-2xl border border-black/10 select-none">
          {/* PURE HTML5 HERO VIDEO ELEMENT (user's exact herovideo.mp4) */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-[32px] sm:rounded-[44px]"
          >
            <source src={heroVideoFile} type="video/mp4" />
            <source src="/assets/herovideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
