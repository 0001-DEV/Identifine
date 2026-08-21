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
          // Autoplay was prevented; retry on first user interaction
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
      
      // Calculate smooth zoom distance
      const zoomDistance = Math.min(Math.max(window.innerHeight * 0.6, 350), 550);
      const rawProgress = scrollY / zoomDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      
      // Organic smooth curve
      const easedProgress = Math.pow(progress, 0.95);
      
      // Starts from a clean 88% width and expands to 100% full-width on scroll
      const minScale = 0.88;
      const currentScale = minScale + easedProgress * (1 - minScale);
      
      // Direct GPU transform update
      if (zoomWrapperRef.current) {
        zoomWrapperRef.current.style.transform = `scale3d(${currentScale}, ${currentScale}, 1)`;
      }

      if (innerCardRef.current) {
        const radius = Math.round(32 - easedProgress * 12);
        innerCardRef.current.style.borderRadius = `${radius}px`;
        const shadowAlpha = (0.15 + easedProgress * 0.1).toFixed(2);
        innerCardRef.current.style.boxShadow = `0 20px 50px rgba(0, 0, 0, ${shadowAlpha})`;
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
    <div ref={containerRef} className="w-full flex justify-center py-6 sm:py-10 overflow-hidden items-center bg-transparent">
      <div 
        ref={zoomWrapperRef}
        className="w-full max-w-[92rem] px-0 sm:px-2 origin-center will-change-transform bg-transparent"
        style={{ 
          transform: 'scale3d(0.88, 0.88, 1)'
        }}
      >
        <div 
          ref={innerCardRef}
          className="relative aspect-[16/9] w-full overflow-hidden select-none bg-[#0D0D0D] border border-black/10 shadow-2xl"
          style={{
            borderRadius: '32px'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover bg-[#0D0D0D]"
          >
            <source src={heroVideoFile} type="video/mp4" />
            <source src="/assets/herovideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
