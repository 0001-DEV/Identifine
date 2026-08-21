import React, { useRef, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import starIcon from '../assets/SVG@4x.png';

gsap.registerPlugin(ScrollTrigger);

export default function CataloguePinnedHorizontalDeck({ catalogueCards, onSelectCard }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        const extraOffset = windowWidth < 640 ? 32 : 64;
        return -(trackWidth - windowWidth + extraOffset);
      };

      gsap.to(track, {
        x: () => getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${Math.max(250, Math.abs(getScrollAmount()) * 0.45)}`,
          scrub: 0.2,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [catalogueCards]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 bg-black text-white w-full h-[100dvh] sm:h-screen min-h-[550px] sm:min-h-[650px] max-h-[900px] flex flex-col justify-start sm:justify-between gap-20 sm:gap-0 pt-10 sm:pt-16 pb-12 sm:pb-16 overflow-hidden border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 px-6 sm:px-12 w-full shrink-0">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-5 sm:space-y-4">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <img src={starIcon} alt="" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain brightness-200" />
            <span
              className="font-galano font-normal text-white text-xs sm:text-sm uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap"
            >
              Our identity catalogue
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[3.5rem] font-galano font-medium leading-relaxed sm:leading-tight text-[#E2B857] max-w-5xl mx-auto">
            Create an <em className="font-swarsh italic font-normal text-[#E2B857]">identity</em> so irresistible it becomes a <em className="font-swarsh italic font-normal text-[#E2B857]">culture</em>.
          </h2>

          <p className="text-xs sm:text-sm text-[#AAAAAA] max-w-2xl mx-auto leading-relaxed font-medium hidden sm:block">
            Skip the powerpoints, frameworks and short term fixes. Choose a partner with real experience instead.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
            <a
              href="https://wa.me/2349030001851"
              target="_blank"
              rel="noopener noreferrer"
              className="framer-pill-white text-xs sm:text-sm px-6 py-3 font-medium"
            >
              Make an identity enquiry
            </a>
            <NavLink
              to="/case-studies"
              className="framer-pill-gold text-xs sm:text-sm px-6 py-3 font-medium"
            >
              See more identity case studies
            </NavLink>
          </div>
        </div>

      </div>

      {/* Horizontal Cards Slider Track */}
      <div className="w-full overflow-hidden py-2 shrink-0">
        <div
          ref={trackRef}
          className="flex items-center gap-[8px] w-max pl-6 sm:pl-16 pr-12 sm:pr-24"
          style={{ willChange: 'transform' }}
        >
          {catalogueCards.map((card) => (
            <NavLink
              key={card.id}
              to={`/product-catalogue?id=${card.id}`}
              onClick={() => onSelectCard && onSelectCard(card)}
              className="group cursor-pointer rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl hover:scale-[1.03] transition-all duration-300 w-[280px] sm:w-[360px] md:w-[420px] h-[260px] sm:h-[330px] md:h-[370px] shrink-0 relative border border-white/15 bg-[#111111]"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <h3 className="font-galano font-normal text-lg sm:text-2xl text-white leading-snug">
                  {card.title}
                </h3>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

    </section>
  );
}
