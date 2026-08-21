import React, { useEffect, useRef } from 'react';
import heroVideoFile from '../assets/herovideo.mp4';

export default function HeroVideoZoom() {
  const containerRef = useRef(null);
  const zoomWrapperRef = useRef(null);
  const innerCardRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay retry on touch/scroll/click
          const handleFirstInteraction = () => {
            if (video) video.play().catch(() => {});
            window.removeEventListener('touchstart', handleFirstInteraction);
            window.removeEventListener('scroll', handleFirstInteraction);
            window.removeEventListener('click', handleFirstInteraction);
          };
          window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
          window.addEventListener('scroll', handleFirstInteraction, { passive: true });
          window.addEventListener('click', handleFirstInteraction, { passive: true });
        });
      }
    }

    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isMobile = window.innerWidth < 640;
      
      // Zoom scroll travel distance
      const zoomDistance = isMobile ? 360 : Math.min(Math.max(window.innerHeight * 0.7, 450), 650);
      const rawProgress = scrollY / zoomDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      
      // Organic smooth easing curve
      const easedProgress = Math.pow(progress, 0.92);
      
      // Starts from very tiny (0.18 on mobile, 0.22 on desktop) and smoothly expands to 1.0 (100% full width)
      const minScale = isMobile ? 0.18 : 0.22;
      const currentScale = minScale + easedProgress * (1 - minScale);
      
      // Direct GPU transform update for 60fps/120fps hardware acceleration
      if (zoomWrapperRef.current) {
        zoomWrapperRef.current.style.transform = `scale3d(${currentScale}, ${currentScale}, 1)`;
      }

      if (innerCardRef.current) {
        const radius = Math.round(12 + easedProgress * (isMobile ? 12 : 24));
        innerCardRef.current.style.borderRadius = `${radius}px`;
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
    window.addEventListener('touchmove', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial calculation on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center py-4 sm:py-8 overflow-hidden items-center bg-transparent">
      <div 
        ref={zoomWrapperRef}
        className="w-full max-w-[92rem] px-0 sm:px-2 origin-center will-change-transform bg-transparent"
        style={{ 
          transform: 'scale3d(0.18, 0.18, 1)'
        }}
      >
        <div 
          ref={innerCardRef}
          className="relative aspect-[16/9] w-full overflow-hidden select-none bg-transparent border-0 shadow-none"
          style={{
            borderRadius: '12px',
            boxShadow: 'none',
            border: 'none',
            background: 'transparent'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover bg-transparent rounded-none"
          >
            <source src={heroVideoFile} type="video/mp4" />
            <source src="/assets/herovideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
