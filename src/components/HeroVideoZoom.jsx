import React, { useEffect, useRef } from 'react';
import heroVideoFile from '../assets/Header_Hero Section.mp4';

/**
 * HeroVideoZoom — Lerp Physics Hero Zoom, fully responsive.
 *
 * Per-breakpoint design:
 *  ┌─────────────────┬──────────┬───────────┬──────────┐
 *  │ Breakpoint      │ startPx  │ triggerPx │ margin   │
 *  ├─────────────────┼──────────┼───────────┼──────────┤
 *  │ Small mobile    │  40px    │  110px    │ 16px × 2 │
 *  │ (<480px)        │          │           │          │
 *  │ Mobile          │  50px    │  140px    │ 20px × 2 │
 *  │ (<640px)        │          │           │          │
 *  │ Tablet          │  70px    │  220px    │ 36px × 2 │
 *  │ (<1024px)       │          │           │          │
 *  │ Small desktop   │  20px    │  250px    │ 64px × 2 │
 *  │ (1024–1439px)   │          │           │          │
 *  │ Large desktop   │  20px    │  250px    │ 64px × 2 │
 *  │ (≥1440px)       │          │           │          │
 *  └─────────────────┴──────────┴───────────┴──────────┘
 *
 * PIVOT formula: (triggerPx − startPx) / ((endPx − startPx) × 0.85)
 * Border-radius start = min(startPx / 2, maxRadius) so it always looks like
 * a clean pill/dot and never a broken rectangle.
 */
export default function HeroVideoZoom() {
  const sectionRef   = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef     = useRef(null);

  const getResponsiveBounds = () => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const isSmallMobile = vw < 480;
    const isMobile      = vw < 640;
    const isTablet      = vw < 1024;

    // Per-breakpoint config
    let startPx, triggerPx, margin, startRadius, endRadius;

    if (isSmallMobile) {
      startPx     = 40;
      triggerPx   = 110;
      margin      = 16;
      startRadius = Math.min(20, startPx / 2);
      endRadius   = 10;
    } else if (isMobile) {
      startPx     = 50;
      triggerPx   = 140;
      margin      = 20;
      startRadius = Math.min(25, startPx / 2);
      endRadius   = 12;
    } else if (isTablet) {
      startPx     = 70;
      triggerPx   = 220;
      margin      = 36;
      startRadius = Math.min(30, startPx / 2);
      endRadius   = 14;
    } else {
      // Desktop (small, medium, large — all same feel)
      startPx     = 20;
      triggerPx   = 250;
      margin      = 64;
      startRadius = Math.min(32, startPx / 2);
      endRadius   = 20;
    }

    // End width: full viewport minus symmetric margin, capped at 1280px
    const endPx = Math.min(1280, vw - margin * 2);

    // PIVOT: normalized scroll progress at which zoom-out acceleration kicks in
    // Clamp to [0.05, 0.8] so there's always both a slow and fast phase
    const pivot = Math.min(0.8, Math.max(0.05,
      (triggerPx - startPx) / ((endPx - startPx) * 0.85)
    ));

    return { startPx, endPx, startRadius, endRadius, pivot };
  };

  /* ── Autoplay (muted required by all mobile browsers) ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  /* ── Lerp Physics Scroll Animation ── */
  useEffect(() => {
    const section = sectionRef.current;
    const wrap    = videoWrapRef.current;
    const video   = videoRef.current;
    if (!section || !wrap || !video) return;

    let currentProgress  = 0;
    let targetProgress   = 0;
    let animationFrameId = null;
    let isAnimating      = false;
    let isIntersecting   = true;

    // Maps raw scroll progress → easing curve progress using per-breakpoint pivot
    const getCurveProgress = (p) => {
      const { pivot } = getResponsiveBounds();
      const pc = pivot * 0.85;  // curveProgress at the pivot point
      return p < pivot
        ? p * 0.85
        : pc + Math.pow((p - pivot) / (1 - pivot), 2.2) * (1 - pc);
    };

    // Applies computed curveProgress → DOM width, borderRadius
    const applyBounds = (cp) => {
      const { startPx, endPx, startRadius, endRadius } = getResponsiveBounds();
      wrap.style.width        = `${startPx + cp * (endPx - startPx)}px`;
      wrap.style.borderRadius = `${startRadius - cp * (startRadius - endRadius)}px`;
    };

    const renderLoop = () => {
      if (!isAnimating || !isIntersecting) return;

      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < 0.0005) {
        currentProgress = targetProgress;
        const cp = getCurveProgress(currentProgress);
        applyBounds(cp);
        video.style.transform = `scale(${1.24 - cp * 0.24})`;
        isAnimating = false;
        animationFrameId = null;
        return;
      }

      currentProgress += diff * 0.18;
      const cp = getCurveProgress(currentProgress);
      applyBounds(cp);

      // Inner video scale: 1.24 → 1.00 (camera reveal)
      video.style.transform = `scale(${1.24 - cp * 0.24})`;

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const startAnimation = () => {
      if (!isAnimating && isIntersecting) {
        isAnimating = true;
        renderLoop();
      }
    };

    const updateScrollTarget = () => {
      if (!isIntersecting) return;
      const rect         = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Triggers as section enters at 85vh, completes when section top reaches 15vh
      const startPoint = windowHeight * 0.85;
      const endPoint   = windowHeight * 0.15;
      const progress   = (startPoint - rect.top) / (startPoint - endPoint);
      targetProgress   = Math.max(0, Math.min(1, progress));
      startAnimation();
    };

    const handleScroll = () => updateScrollTarget();

    // Resize / orientation-change: always re-anchor to fresh bounds at current progress
    const handleResize = () => {
      if (!isIntersecting) return;
      updateScrollTarget();
      applyBounds(getCurveProgress(currentProgress));
    };

    // IntersectionObserver to pause scroll calculations and video playback when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            updateScrollTarget();
          } else {
            video.pause();
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
            isAnimating = false;
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(section);

    window.addEventListener('scroll',            handleScroll, { passive: true });
    window.addEventListener('resize',            handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Seed DOM before first paint
    updateScrollTarget();
    currentProgress = targetProgress;
    const { startPx, startRadius } = getResponsiveBounds();
    wrap.style.width        = `${startPx}px`;
    wrap.style.borderRadius = `${startRadius}px`;

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll',            handleScroll);
      window.removeEventListener('resize',            handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full flex items-center justify-center relative z-10"
      style={{
        background:    '#EBEAE6',
        paddingTop:    'clamp(1.5rem, 4vw, 3.5rem)',
        paddingBottom: 'clamp(1.5rem, 4vw, 3.5rem)',
        /**
         * minHeight tracks the fully-expanded video height (16:9) at each breakpoint:
         *   mobile  margin = 40px  → (vw - 40)  × 0.5625
         *   tablet  margin = 72px  → (vw - 72)  × 0.5625
         *   desktop margin = 128px → min(1280, vw - 128) × 0.5625
         * We use the tightest (mobile) formula as the preferred value;
         * on larger screens the section naturally grows with the video.
         * Max = 720px + padding (largest possible 16:9 video at 1280px wide).
         */
        minHeight: 'clamp(180px, calc((100vw - 40px) * 0.5625 + 3rem), calc(720px + 7rem))',
      }}
    >
      <div
        ref={videoWrapRef}
        className="overflow-hidden"
        style={{
          maxWidth:    'calc(100vw - 24px)',   // hard safety cap: 12px clearance each side
          aspectRatio: '16 / 9',
          border:      'none',
          boxShadow:   'none',
          willChange:  'width, border-radius',
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
          style={{ transform: 'scale(1.24)', willChange: 'transform' }}
        >
          <source src={heroVideoFile} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
