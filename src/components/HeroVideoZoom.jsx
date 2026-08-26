import React, { useEffect, useRef } from 'react';
import heroVideoFile from '../assets/herovideo.mp4';

/**
 * HeroVideoZoom — Lerp Physics Hero Zoom with 2 Initial Increments + Accelerated Zoom Out.
 * Removes all background box-shadows.
 * Shows 2 distinct initial width increments from 200px before zooming out faster to full width.
 */
export default function HeroVideoZoom() {
  const sectionRef   = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef     = useRef(null);

  // Calculates initial starting width (200px) and max target width (1280px) based on viewport
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

  /* ── 2 Increments + Accelerated Zoom Out Lerp Physics ── */
  useEffect(() => {
    const section = sectionRef.current;
    const wrap    = videoWrapRef.current;
    const video   = videoRef.current;
    if (!section || !wrap || !video) return;

    let currentProgress = 0;
    let targetProgress  = 0;
    let animationFrameId = null;

    const updateScrollTarget = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Starts as section enters screen (0.85 * windowHeight) and completes near top (0.15 * windowHeight)
      const startPoint = windowHeight * 0.85;
      const endPoint = windowHeight * 0.15;

      const totalDistance = startPoint - endPoint;
      const currentDistance = startPoint - rect.top;

      let progress = currentDistance / totalDistance;
      targetProgress = Math.max(0, Math.min(1, progress));
    };

    // Smooth Lerp Physics Render Loop
    const renderLoop = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < 0.0001) {
        currentProgress = targetProgress;
      } else {
        currentProgress += diff * 0.18;
      }

      // Curve: Shows 2 clear initial increments from 200px before accelerating faster into full width
      let curveProgress = currentProgress;
      if (currentProgress < 0.35) {
        curveProgress = currentProgress * 0.85; // Initial 2 distinct step increments
      } else {
        const t = (currentProgress - 0.35) / 0.65;
        curveProgress = 0.30 + Math.pow(t, 2.2) * 0.70; // Faster acceleration rate
      }

      const { startPx, endPx } = getResponsiveBounds();

      // 1. Container Width: 200px -> 2 initial increments -> 1280px
      const width = startPx + curveProgress * (endPx - startPx);
      wrap.style.width = `${width}px`;

      // 2. Border Radius Morph: 32px -> 20px (More rounded radius after expanding)
      const borderRadius = 32 - curveProgress * 12;
      wrap.style.borderRadius = `${borderRadius}px`;

      // 3. Inner Video Scale: 1.24 -> 1.00 (Camera reveal zoom-out)
      const scale = 1.24 - curveProgress * 0.24;
      video.style.transform = `scale(${scale})`;

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const handleScroll = () => {
      updateScrollTarget();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    updateScrollTarget();
    currentProgress = targetProgress;
    renderLoop();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full flex items-center justify-center px-4 sm:px-6 relative z-10"
      style={{ minHeight: '65vh', background: '#EBEAE6', padding: '3rem 0' }}
    >
      <div
        ref={videoWrapRef}
        className="overflow-hidden"
        style={{
          width:        '200px',
          maxWidth:     'calc(100vw - 32px)',
          borderRadius: '32px',
          aspectRatio:  '16 / 9',
          border:       'none',
          boxShadow:    'none',
          willChange:   'width, border-radius',
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
          style={{
            transform:  'scale(1.24)',
            willChange: 'transform',
          }}
        >
          <source src={heroVideoFile} type="video/mp4" />
          <source src="/assets/herovideo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
