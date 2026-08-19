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

      // Cards 2+ start below separated by a distinct gap
      cards.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, { yPercent: 125 + (index - 1) * 35 });
        }
      });

      // Pin the section when Card 1 reaches top of viewport
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

        const prevCard = cards[index - 1];

        tl.to(
          card,
          {
            yPercent: 0,
            ease: 'none',
            duration: 1,
          },
          `step-${index}`
        ).to(
          prevCard,
          {
            scale: 0.96,
            ease: 'none',
            duration: 1,
          },
          `step-${index}`
        );
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
      className="relative w-full max-w-5xl mx-auto h-[72vh] sm:h-[78vh] min-h-[480px] max-h-[700px]"
    >
      {journeySteps.map((step, idx) => (
        <div
          key={step.key || idx}
          ref={(el) => (cardRefs.current[idx] = el)}
          className="absolute inset-0 w-full h-full rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl bg-stone-900/10 border border-white/20 transform-gpu"
          style={{ zIndex: idx + 10 }}
        >
          {/* Full Bright Image */}
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




