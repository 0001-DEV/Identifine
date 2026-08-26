import React, { useEffect, useRef } from 'react';
import heroVideoFile from '../assets/herovideo.mp4';

/**
 * HeroVideoZoom — Authentic Framer-Style Lerp Physics Hero Zoom
 * Features:
 *  1. Smooth Lerp Spring Physics (0.24 factor) for buttery Framer motion
 *  2. Container Width Expansion: 200px -> 1280px
 *  3. Border Radius Morphing: 24px -> 12px
 *  4. Inner Camera Lens Zoom-Out Reveal: Scale 1.30x -> 1.00x
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

  /* ── Authentic Framer-Style Lerp Physics Scroll Zoom ── */
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

      // Expansion starts at 0.85 * windowHeight and reaches full width faster at 0.20 * windowHeight
      const startPoint = windowHeight * 0.85;
      const endPoint = windowHeight * 0.20;

      const totalDistance = startPoint - endPoint;
      const currentDistance = startPoint - rect.top;

      let progress = currentDistance / totalDistance;
      targetProgress = Math.max(0, Math.min(1, progress));
    };

    // Silky Smooth Lerp Physics Render Loop (Framer Spring Motion)
    const renderLoop = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < 0.0001) {
        currentProgress = targetProgress;
      } else {
        // 0.10 lerp factor for buttery, liquid-smooth physics tracking
        currentProgress += diff * 0.10;
      }

      // Apply gentle easeOutCubic curve for silky smooth expansion/shrink
      const eased = 1 - Math.pow(1 - currentProgress, 2.5);

      const { startPx, endPx } = getResponsiveBounds();

      // 1. Container Width: startPx -> endPx
      const width = startPx + eased * (endPx - startPx);
      wrap.style.width = `${width}px`;

      // 2. Border Radius Morph: 24px -> 12px
      const borderRadius = 24 - eased * 12;
      wrap.style.borderRadius = `${borderRadius}px`;

      // 3. Inner Video Scale: 1.24 -> 1.00 (Silky camera reveal zoom-out)
      const scale = 1.24 - eased * 0.24;
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
        className="overflow-hidden shadow-2xl"
        style={{
          width:        '200px',
          maxWidth:     'calc(100vw - 32px)',
          borderRadius: '24px',
          aspectRatio:  '16 / 9',
          border:       'none',
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
            transform:  'scale(1.30)',
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
