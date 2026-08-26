import React, { useEffect, useRef } from 'react';
import heroVideoFile from '../assets/herovideo.mp4';

/**
 * HeroVideoZoom — Sticky 1:1 Scroll-Linked Video Zoom
 * 180vh section height with sticky centering.
 * As you scroll down, video expands 200px -> 1280px.
 * As you scroll up, video shrinks 1280px -> 200px.
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
    const startPx = isMobile ? Math.min(160, Math.floor(screenWidth * 0.45)) : 200;

    return { startPx, endPx };
  };

  /* ── Autoplay video ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  /* ── Sticky 1:1 Scroll-Linked Zoom ── */
  useEffect(() => {
    const section = sectionRef.current;
    const wrap    = videoWrapRef.current;
    if (!section || !wrap) return;

    let animationFrameId = null;

    const updateZoom = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      // rect.top goes from 0 (when sticky begins) to -totalScrollableDistance (when sticky ends)
      let progress = -rect.top / totalScrollableDistance;
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
      className="w-full relative z-10"
      style={{ height: '180vh', background: '#EBEAE6' }}
    >
      {/* Sticky Centered Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6">
        <div
          ref={videoWrapRef}
          className="overflow-hidden shadow-2xl"
          style={{
            width:        '200px',
            maxWidth:     'calc(100vw - 32px)',
            borderRadius: '16px',
            aspectRatio:  '16 / 9',
            border:       '2px solid rgba(0,0,0,0.15)',
            transition:   'none', // Direct scroll linking, zero lag
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
    </div>
  );
}
