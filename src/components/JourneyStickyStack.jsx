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
            yPercent: 125 + (index - 1) * 35,
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

      // Pin section and animate cards entering the stack
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          start: 'top top+=80',
          end: () => `+=${(totalCards - 1) * 100}%`,
          scrub: 0.1,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.25, max: 0.5 },
            ease: 'power1.inOut',
          },
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
      className="relative w-full mx-auto"
      style={{
        /* Fluid width: full on mobile, capped at 1064px on large screens */
        maxWidth: '100%',
        /* Fluid height: clamp between 280px and 720px, scaling with viewport */
        height: 'clamp(280px, 65vw, 720px)',
      }}
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
        </div>
      ))}
    </div>
  );
}
