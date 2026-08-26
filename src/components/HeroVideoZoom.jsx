import React, { useEffect, useRef } from 'react';
import heroVideoFile from '../assets/herovideo.mp4';

/**
 * HeroVideoZoom — Direct 1:1 Scroll-Linked Video Expansion & Shrink.
 * Zero timers, zero delays. Responds instantly to scroll movement in real-time.
 */
export default function HeroVideoZoom() {
  const sectionRef   = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef     = useRef(null);

  // Calculates initial starting width and max target width based on viewport
  const getResponsiveBounds = () => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const isMobile = screenWidth < 640;
    const isTablet = screenWidth < 1024;

    const margin = isMobile ? 32 : isTablet ? 48 : 64;
    const endPx = Math.min(1280, screenWidth - margin);
    const startPx = isMobile ? Math.min(140, Math.floor(screenWidth * 0.45)) : 150;

    return { startPx, endPx };
  };

  /* ── Autoplay video ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  /* ── Direct 1:1 Scroll-Linked Zoom (Instant, zero lag) ── */
  useEffect(() => {
    const section = sectionRef.current;
    const wrap    = videoWrapRef.current;
    if (!section || !wrap) return;

    let animationFrameId = null;

    const updateZoom = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Expansion starts after section enters screen so initial 200px size is clearly visible
      const startPoint = windowHeight * 0.75;
      const endPoint = windowHeight * 0.15; // Reaches full width near top

      const totalDistance = startPoint - endPoint;
      const currentDistance = startPoint - rect.top;

      let progress = currentDistance / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      const { startPx, endPx } = getResponsiveBounds();
      const currentWidth = startPx + progress * (endPx - startPx);

      wrap.style.width = `${currentWidth}px`;
    };

    const handleScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateZoom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateZoom(); // Initial calculation

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full flex items-center justify-center px-4 sm:px-6 relative z-10"
      style={{ minHeight: '80vh', background: '#EBEAE6', padding: '6rem 0' }}
    >
      <div
        ref={videoWrapRef}
        className="overflow-hidden"
        style={{
          width:        '150px',
          maxWidth:     'calc(100vw - 32px)',
          borderRadius: '16px',
          aspectRatio:  '16 / 9',
          border:       '2px solid rgba(0,0,0,0.15)',
          transition:   'none', // Direct scroll linking, no CSS delay
          willChange:   'width',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover block"
        >
          <source src={heroVideoFile} type="video/mp4" />
          <source src="/assets/herovideo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
