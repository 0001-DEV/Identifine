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
      className="relative z-10 bg-black text-white w-full h-screen min-h-[520px] max-h-[1080px] flex flex-col justify-center py-4 sm:py-6 lg:py-8 overflow-hidden border-t border-white/10 select-none gap-4 sm:gap-6 lg:gap-8"
    >
      <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 px-4 sm:px-8 lg:px-12 w-full shrink-0">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-2.5 sm:space-y-3.5">
          <div className="inline-flex items-center justify-center gap-2 mx-auto">
            <img src={starIcon} alt="" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain brightness-200" />
            <span
              className="font-galano font-normal text-white text-[11px] sm:text-xs md:text-sm uppercase tracking-[2px] sm:tracking-[3px] whitespace-nowrap"
            >
              Our identity catalogue
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-galano font-medium leading-tight text-[#E2B857] max-w-4xl mx-auto">
            Create an <em className="font-swarsh italic font-normal text-[#E2B857]">identity</em> so irresistible it becomes a <em className="font-swarsh italic font-normal text-[#E2B857]">culture</em>.
          </h2>

          <p className="text-xs sm:text-sm text-[#AAAAAA] max-w-2xl mx-auto leading-relaxed font-medium hidden sm:block">
            Skip the powerpoints, frameworks and short term fixes. Choose a partner with real experience instead.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
            <a
              href="https://wa.me/2349030001851"
              target="_blank"
              rel="noopener noreferrer"
              className="framer-pill-white text-[11px] sm:text-xs md:text-sm px-5 py-2.5 sm:px-6 sm:py-3 font-medium"
            >
              Make an identity enquiry
            </a>
            <NavLink
              to="/case-studies"
              className="framer-pill-gold text-[11px] sm:text-xs md:text-sm px-5 py-2.5 sm:px-6 sm:py-3 font-medium"
            >
              See more identity case studies
            </NavLink>
          </div>
        </div>

      </div>

      {/* Horizontal Cards Slider Track */}
      <div className="w-full overflow-hidden py-1 sm:py-2 shrink-0">
        <div
          ref={trackRef}
          className="flex items-center gap-[10px] sm:gap-[14px] w-max pl-4 sm:pl-12 lg:pl-16 pr-8 sm:pr-16 lg:pr-24"
          style={{ willChange: 'transform' }}
        >
          {catalogueCards.map((card) => (
            <NavLink
              key={card.id}
              to={`/product-catalogue?id=${card.id}`}
              onClick={() => onSelectCard && onSelectCard(card)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-300 w-[clamp(210px,22vw,380px)] h-[clamp(160px,28vh,320px)] shrink-0 relative border border-white/15 bg-[#111111]"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 sm:p-5 lg:p-6 flex flex-col justify-end">
                <h3 className="font-galano font-normal text-sm sm:text-lg md:text-xl lg:text-2xl text-white leading-snug">
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
