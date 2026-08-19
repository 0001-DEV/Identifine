import React from 'react';
import { NavLink } from 'react-router-dom';
import starIcon from '../assets/SVG@4x.png';

export default function CataloguePinnedHorizontalDeck({ catalogueCards, onSelectCard }) {
  return (
    <section className="relative z-10 bg-[#000000] text-white w-full py-16 px-0 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-6 mb-10">
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center justify-center gap-2.5">
            <img src={starIcon} alt="" className="w-4 h-4 object-contain brightness-200" />
            <span
              className="font-galano font-normal text-white text-sm sm:text-base md:text-lg capitalize"
              style={{ letterSpacing: '5.2px' }}
            >
              Our identity catalogue
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[4rem] font-galano font-medium leading-tight text-[#E2B857] max-w-5xl mx-auto">
            Create an <em className="font-swarsh italic font-normal text-[#E2B857]">identity</em> so irresistible it becomes a <em className="font-swarsh italic font-normal text-[#E2B857]">culture</em>.
          </h2>

          <p className="text-sm sm:text-base text-[#AAAAAA] max-w-2xl mx-auto leading-relaxed font-medium">
            Skip the powerpoints, frameworks and short term fixes. Choose a partner with real experience instead.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/2349030001851"
              target="_blank"
              rel="noopener noreferrer"
              className="framer-pill-white text-xs sm:text-sm px-7 py-3.5 font-medium"
            >
              Make an identity enquiry
            </a>
            <NavLink
              to="/case-studies"
              className="framer-pill-gold text-xs sm:text-sm px-7 py-3.5 font-medium"
            >
              See more identity case studies
            </NavLink>
          </div>
        </div>
      </div>

      {/* Horizontally scrollable cards — no freeze, no pin */}
      <div className="w-full overflow-x-auto scrollbar-hide pb-4">
        <div className="flex items-center gap-2 sm:gap-3 w-max pl-[5vw] pr-[10vw]">
          {catalogueCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectCard(card)}
              className="group cursor-pointer rounded-[40px] overflow-hidden shadow-2xl hover:z-20 hover:scale-[1.03] transition-all duration-300 w-[310px] sm:w-[365px] md:w-[415px] h-[310px] sm:h-[360px] md:h-[415px] shrink-0 relative border border-white/10"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-7 flex flex-col justify-end">
                <h3 className="font-galano font-normal text-lg sm:text-xl text-white group-hover:text-[#E2B857] transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#CCCCCC] font-normal mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
