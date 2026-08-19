import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import starIcon from '../assets/SVG@4x.png';

export default function CataloguePinnedHorizontalDeck({ catalogueCards, onSelectCard }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      const maxScroll = Math.max(0, trackRef.current.scrollWidth - windowWidth + (windowWidth < 640 ? 24 : 48));
      if (maxScroll <= 0) {
        setTranslateX(0);
        return;
      }

      // Smooth scroll translation mapping as section passes through viewport
      // Progress = 0 when section top enters near 85% of viewport
      // Progress = 1 when section moves up
      const startPoint = windowHeight * 0.85;
      const endPoint = -rect.height * 0.25;
      const totalRange = startPoint - endPoint;
      const currentPos = startPoint - rect.top;
      
      const rawProgress = Math.max(0, Math.min(1, currentPos / totalRange));
      
      // Initial delay buffer so cards slide in a little time after getting to section
      const startBuffer = 0.12;
      const initialOffset = windowWidth < 640 ? 80 : 140;

      if (rawProgress < startBuffer) {
        // Soft slide into initial position (+initialOffset -> 0)
        const p = rawProgress / startBuffer;
        setTranslateX(initialOffset * (1 - p));
      } else {
        // Gentle to fast acceleration across track
        const activeProgress = (rawProgress - startBuffer) / (1 - startBuffer);
        const easedProgress = Math.pow(activeProgress, 1.5);
        setTranslateX(-easedProgress * maxScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 bg-black text-white w-full py-20 sm:py-28 overflow-hidden border-t border-white/10 select-none"
    >
      <div className="max-w-7xl mx-auto space-y-12 px-6 sm:px-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center justify-center gap-2.5">
            <img src={starIcon} alt="" className="w-4 h-4 object-contain brightness-200" />
            <span
              className="font-galano font-normal text-white text-xs sm:text-sm md:text-base capitalize"
              style={{ letterSpacing: '5.2px' }}
            >
              Our identity catalogue
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[4rem] font-galano font-medium leading-tight text-[#E2B857] max-w-5xl mx-auto">
            Create an <em className="font-swarsh italic font-normal text-[#E2B857]">identity</em> so irresistible it becomes a <em className="font-swarsh italic font-normal text-[#E2B857]">culture</em>.
          </h2>

          <p className="text-sm sm:text-base text-[#AAAAAA] max-w-2xl mx-auto leading-relaxed font-medium hidden sm:block">
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

        {/* Horizontal Cards Slider Track */}
        <div className="w-full overflow-hidden py-4">
          <div
            ref={trackRef}
            style={{
              transform: `translateX(${translateX}px)`,
              willChange: 'transform',
              transition: 'transform 0.12s ease-out'
            }}
            className="flex items-center gap-[8px] w-max pl-6 sm:pl-12 pr-6 sm:pr-12"
          >
            {catalogueCards.map((card) => (
              <div
                key={card.id}
                onClick={() => onSelectCard(card)}
                className="group cursor-pointer rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl hover:scale-[1.03] transition-all duration-300 w-[286px] sm:w-[376px] md:w-[436px] h-[280px] sm:h-[350px] md:h-[390px] shrink-0 relative border border-white/15 bg-[#111111]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                  <span className="text-xs font-mono text-[#E2B857] uppercase tracking-wider mb-1">
                    {card.subtitle}
                  </span>
                  <h3 className="font-galano font-normal text-lg sm:text-2xl text-white group-hover:text-[#E2B857] transition-colors leading-snug">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}







