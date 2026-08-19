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

    const updateScale = () => {
      if (!containerRef.current) {
        ticking = false;
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementTop = rect.top;
      const startZoom = windowHeight * 1.0; 
      const endZoom = windowHeight * 0.18;   

      if (elementTop <= startZoom && elementTop >= endZoom) {
        const rawProgress = (startZoom - elementTop) / (startZoom - endZoom);
        const clamped = Math.min(Math.max(rawProgress, 0), 1);
        // Easing cubic curve for smooth start/stop
        const eased = 1 - Math.pow(1 - clamped, 3);
        const minScale = 0.05;
        const newScale = minScale + eased * (1 - minScale);
        setScale(newScale);
      } else if (elementTop < endZoom) {
        setScale(1);
      } else {
        setScale(0.05);
      }

      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScale);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScale();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-6 sm:py-10 overflow-hidden items-center">
      <div 
        className="w-full max-w-[92rem] px-2 sm:px-6 transition-transform duration-150 ease-out origin-center"
        style={{ 
          transform: `perspective(1200px) scale(${scale})`,
          opacity: Math.min(1, 0.25 + (scale * 0.75))
        }}
      >
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9] w-full rounded-[24px] sm:rounded-[44px] bg-[#000000] overflow-hidden shadow-2xl border border-black/10 select-none">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-[24px] sm:rounded-[44px]"
          >
            <source src={heroVideoFile} type="video/mp4" />
            <source src="/assets/herovideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
