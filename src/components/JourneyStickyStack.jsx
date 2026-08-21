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
      const verticalPeekOffset = 24; // Exposure offset so upper part of previous cards remains visible

      // Set initial positions, rotation angles, and full opacity
      cards.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, {
            yPercent: 120 + (index - 1) * 30,
            y: 0,
            scale: 1,
            rotation: index % 2 === 1 ? 1.8 : -1.8,
            opacity: 1,
            transformOrigin: '50% 50%'
          });
        } else {
          gsap.set(card, {
            yPercent: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            transformOrigin: '50% 50%'
          });
        }
      });

      // Pin section and animate cards entering the stack seamlessly with buttery smooth scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: 'top top+=80',
          end: () => `+=${(totalCards - 1) * 100}%`,
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        // Current incoming card slides up and lands with vertical offset & organic tilt
        const currentRot = index % 2 === 1 ? 1.5 : -1.5;
        const currentY = index * verticalPeekOffset;

        tl.to(
          card,
          {
            yPercent: 0,
            y: currentY,
            rotation: currentRot,
            opacity: 1,
            ease: 'none',
            duration: 1,
          },
          `step-${index}`
        );

        // Animate all underlying cards to scale, shift up, tilt, and fade lightly
        for (let i = 0; i < index; i++) {
          const prevCard = cards[i];
          const depth = index - i; // distance beneath top card
          const prevY = i * verticalPeekOffset;
          const prevScale = Math.max(0.86, 1 - depth * 0.045);
          const prevRot = (i % 2 === 0 ? -2.8 : 2.8) * (1 + (depth - 1) * 0.4);
          const prevOpacity = Math.max(0.45, 0.7 - (depth - 1) * 0.12); // Fades lightly as cards get covered

          tl.to(
            prevCard,
            {
              scale: prevScale,
              rotation: prevRot,
              y: prevY,
              opacity: prevOpacity,
              ease: 'none',
              duration: 1,
            },
            `step-${index}`
          );
        }
      });
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
          className="absolute inset-0 w-full h-full overflow-hidden bg-[#111111] transform-gpu"
          style={{
            zIndex: idx + 10,
            borderRadius: 'clamp(16px, 3vw, 40px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.50)',
          }}
        >
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover object-center select-none"
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
