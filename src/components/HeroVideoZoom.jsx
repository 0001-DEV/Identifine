import React, { useEffect, useRef } from 'react';
import heroVideoFile from '../assets/herovideo.mp4';

export default function HeroVideoZoom() {
  const containerRef = useRef(null);
  const zoomWrapperRef = useRef(null);
  const innerCardRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      
      // Calculate zoom distance
      const zoomDistance = Math.min(Math.max(window.innerHeight * 0.75, 450), 650);
      const rawProgress = scrollY / zoomDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      
      // Organic easing curve
      const easedProgress = Math.pow(progress, 0.95);
      
      const minScale = 0.05;
      const currentScale = minScale + easedProgress * (1 - minScale);
      
      // Direct GPU transform update - zero React re-renders, 60fps/120fps smooth
      if (zoomWrapperRef.current) {
        zoomWrapperRef.current.style.transform = `scale3d(${currentScale}, ${currentScale}, 1)`;
      }

      if (innerCardRef.current) {
        const radius = Math.round(16 + currentScale * 20);
        innerCardRef.current.style.borderRadius = `${radius}px`;
        if (currentScale > 0.95) {
          innerCardRef.current.style.boxShadow = 'none';
        } else {
          const yOff = Math.round(10 + currentScale * 20);
          const blur = Math.round(20 + currentScale * 30);
          const alpha = (0.08 + currentScale * 0.12).toFixed(3);
          innerCardRef.current.style.boxShadow = `0 ${yOff}px ${blur}px rgba(0, 0, 0, ${alpha})`;
        }
      }

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
        ref={zoomWrapperRef}
        className="w-full max-w-[92rem] px-0 sm:px-2 origin-center will-change-transform bg-transparent"
        style={{ 
          transform: 'scale3d(0.05, 0.05, 1)'
        }}
      >
        <div 
          ref={innerCardRef}
          className="relative aspect-[16/9] w-full overflow-hidden select-none bg-transparent"
          style={{
            borderRadius: '16px'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover bg-transparent"
          >
            <source src={heroVideoFile} type="video/mp4" />
            <source src="/assets/herovideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
