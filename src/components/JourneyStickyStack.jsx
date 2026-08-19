import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JourneyStickyStack({ journeySteps }) {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);

  const totalCards = journeySteps.length;
  // Each card gets 100vh of scroll distance.
  // Wrapper is totalCards × 100vh so cards have room to slide in one by one.
  const wrapperHeight = totalCards * 100; // vh

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      // Cards 2+ start off-screen below (100vh down from their sticky position)
      cards.forEach((card, i) => {
        if (i === 0) return;
        gsap.set(card, { yPercent: 100 });
      });

      cards.forEach((card, i) => {
        if (i === 0) return; // Card 1 is already in place

        // Slide this card UP from below into position
        gsap.to(card, {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            // start when i-th card's scroll slot begins, end when it finishes
            start: `${((i - 1) / totalCards) * 100}% top`,
            end:   `${(i / totalCards) * 100}% top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Previous card recedes (scale + dim) as this one slides over it
        gsap.to(cards[i - 1], {
          scale: 0.93,
          filter: 'brightness(0.5)',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: `${((i - 1) / totalCards) * 100}% top`,
            end:   `${(i / totalCards) * 100}% top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [journeySteps]);

  const topOffsets = ['top-16', 'top-16', 'top-16', 'top-16'];

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `${wrapperHeight}vh` }}
    >
      {journeySteps.map((step, idx) => (
        <div
          key={step.key || idx}
          ref={(el) => (cardRefs.current[idx] = el)}
          className={`sticky ${topOffsets[idx] || 'top-16'} w-full h-[82vh] rounded-3xl overflow-hidden shadow-2xl bg-black`}
          style={{ zIndex: idx + 10 }}
        >
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-8 sm:p-14 flex flex-col justify-end">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#E2B857] mb-2">
              0{idx + 1} — {step.title}
            </span>
            <h3 className="font-galano font-medium text-3xl sm:text-5xl text-white mb-3">
              {step.title}
            </h3>
            <p className="text-base sm:text-lg text-[#D1D5DB] max-w-2xl leading-relaxed font-medium">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
