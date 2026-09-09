import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JourneyStickyStack({ journeySteps }) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards || cards.length === 0) return;

      const totalCards = cards.length;

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      // Start position: exactly just below the viewport (4px offscreen) so movement is instant on scroll with zero dead-zone
      const getOffscreenY = () => {
        if (typeof window === 'undefined') return 1000;
        const rect = containerRef.current ? containerRef.current.getBoundingClientRect() : null;
        const pinTop = rect ? rect.top : (isMobile ? 60 : 80);
        return Math.max(window.innerHeight - pinTop + 4, window.innerHeight);
      };

      // Set initial positions: first card visible, subsequent cards completely hidden (autoAlpha: 0) and offscreen below
      cards.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, {
            y: getOffscreenY(),
            yPercent: 0,
            scale: 1,
            rotation: 0,
            autoAlpha: 0,
            transformOrigin: '50% 50%',
            force3D: true,
          });
        } else {
          gsap.set(card, {
            y: 0,
            yPercent: 0,
            scale: 1,
            rotation: 0,
            autoAlpha: 1,
            transformOrigin: '50% 50%',
            force3D: true,
          });
        }
      });

      // Calibrated scroll distance: generous scroll travel so cards glide smoothly without rushing
      const scrollPerCard = isMobile ? 650 : 850;
      const dwellScroll = isMobile ? 320 : 450;
      const totalScrollDistance = (totalCards - 1) * scrollPerCard + dwellScroll;

      // Pin section and animate cards sliding straight up at a controlled, luxurious pace
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: isMobile ? 'top top+=60' : 'top top+=80',
          end: () => `+=${totalScrollDistance}`,
          scrub: isMobile ? 0.3 : 0.35,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        // Slide incoming card from under (offscreen below) straight up onto the previous card.
        // Zero dead zone: begins visibly entering from bottom of screen immediately.
        tl.fromTo(
          card,
          {
            y: () => getOffscreenY(),
            yPercent: 0,
            rotation: 0,
            scale: 1,
            autoAlpha: 1,
          },
          {
            y: 0,
            yPercent: 0,
            rotation: 0,
            scale: 1,
            autoAlpha: 1,
            ease: 'none',
            duration: 1,
            force3D: true,
            immediateRender: false,
          },
          `step-${index}`
        );
      });

      // Dedicated dwell hold so 'Evolve' lands first and settles completely before Insights & Inspiration shows
      tl.to({}, { duration: 0.8 }, 'dwell');
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [journeySteps]);

  if (!journeySteps || journeySteps.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto h-[65vh] sm:h-[75vh] min-h-[450px] max-h-[720px]"
    >
      {journeySteps.map((step, idx) => (
        <div
          key={step.key || idx}
          ref={(el) => (cardRefs.current[idx] = el)}
          className="absolute inset-0 w-full h-full overflow-hidden bg-[#111111] transform-gpu shadow-2xl"
          style={{
            zIndex: (idx + 1) * 10,
            borderRadius: 'clamp(16px, 3vw, 36px)',
            visibility: idx === 0 ? 'visible' : 'hidden',
            opacity: idx === 0 ? 1 : 0,
            transform: idx === 0 ? 'none' : 'translate3d(0, 110vh, 0)',
            willChange: 'transform',
          }}
        >
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover object-center select-none pointer-events-none"
            loading={idx === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />

          {/* Dark gradient + center-aligned text overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-6 sm:pb-12 text-center flex flex-col items-center justify-end space-y-3 pointer-events-none">
            <h3 className="font-galano font-semibold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight drop-shadow-md">
              {step.title}
            </h3>
            <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto leading-relaxed font-normal drop-shadow-sm">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
