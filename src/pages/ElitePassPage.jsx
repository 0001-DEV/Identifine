import React, { useState } from 'react';
import CardShowcaseModal from '../components/CardShowcaseModal';

// User's exact render assets from src/assets
import blackMatteImg from '../assets/ELITE_PASS_BLACK_MATTE.png';
import goldImg from '../assets/ELITE_PASS_GOLD.png';
import render1Img from '../assets/RENDER 1.png';
import blackMatte2Img from '../assets/ELITE_PASS_BLACK_MATTE_2.png';
import silverImg from '../assets/ELITE_PASS_SILVER.png';
import gunMetalImg from '../assets/Black matte render 2.png';
import elitePassJpg from '../assets/Elitepass.jpg';

export default function ElitePassPage() {
  const [selectedPass, setSelectedPass] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Initial 4 Cards
  const initialPasses = [
    {
      id: 'black-matte',
      sansTitle: 'Black',
      serifTitle: 'Matte',
      fullTitle: 'Black Matte',
      image: blackMatteImg,
      colorScheme: 'bg-gradient-to-br from-black via-[#0D0D0D] to-zinc-950 border border-zinc-800'
    },
    {
      id: 'elite-gold',
      sansTitle: 'Elite Pass',
      serifTitle: 'Gold',
      fullTitle: 'Elite Pass Gold',
      image: goldImg,
      colorScheme: 'bg-gradient-to-br from-amber-950 via-yellow-900 to-zinc-950 border border-amber-500/40'
    },
    {
      id: 'titanium-steel',
      sansTitle: 'Titanium',
      serifTitle: 'Steel',
      fullTitle: 'Titanium Steel',
      image: render1Img,
      colorScheme: 'bg-gradient-to-br from-stone-800 via-stone-700 to-zinc-900 border border-amber-600/30'
    },
    {
      id: 'gun-metal',
      sansTitle: 'Gun',
      serifTitle: 'Metal',
      fullTitle: 'Gun Metal',
      image: blackMatte2Img,
      colorScheme: 'bg-gradient-to-br from-[#111827] via-[#0F172A] to-black border border-gray-700/50'
    }
  ];

  // 3 Additional Cards (loaded when Load More is clicked)
  const additionalPasses = [
    {
      id: 'rose-gold-metal',
      sansTitle: 'Rose Gold',
      serifTitle: 'Metal',
      fullTitle: 'Rose Gold Metal',
      image: silverImg,
      colorScheme: 'bg-gradient-to-br from-amber-900 via-rose-950 to-zinc-950 border border-rose-800/40'
    },
    {
      id: 'aircraft-metal',
      sansTitle: 'Aircraft Grade',
      serifTitle: 'Metal',
      fullTitle: 'Aircraft Grade Metal',
      image: gunMetalImg,
      colorScheme: 'bg-gradient-to-br from-slate-800 via-zinc-900 to-black border border-slate-700'
    },
    {
      id: '24k-gold-plated',
      sansTitle: '24K Gold',
      serifTitle: 'Plated',
      fullTitle: '24K Gold Plated',
      image: elitePassJpg,
      colorScheme: 'bg-gradient-to-br from-yellow-950 via-amber-900 to-black border border-yellow-600/40'
    }
  ];

  const renderCard = (pass, isExtra = false, extraIndex = 0) => (
    <div
      key={pass.id}
      onClick={() => setSelectedPass(pass)}
      className={`group cursor-pointer aspect-[16/10] min-h-[350px] sm:min-h-[420px] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden transition-all duration-500 hover:shadow-2xl border border-black/10 select-none ${
        isExtra
          ? `transform transition-all duration-700 ease-out ${
              isExpanded
                ? 'translate-y-0 opacity-100 scale-100'
                : '-translate-y-10 opacity-0 scale-95 pointer-events-none'
            }`
          : ''
      }`}
      style={{
        backgroundColor: '#000000',
        transitionDelay: isExtra && isExpanded ? `${extraIndex * 150}ms` : '0ms'
      }}
    >
      {/* Fallback Gradient Background */}
      <div className={`absolute inset-0 opacity-90 ${pass.colorScheme}`} />

      {/* Card Image layer with extension fallbacks (.png -> .jpg -> .jpeg -> .webp) */}
      {pass.image && (
        <img
          src={pass.image}
          alt={pass.fullTitle}
          className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            const img = e.currentTarget;
            const src = img.src;
            if (src.endsWith('.png')) {
              img.src = src.replace('.png', '.jpg');
            } else if (src.endsWith('.jpg')) {
              img.src = src.replace('.jpg', '.jpeg');
            } else if (src.endsWith('.jpeg')) {
              img.src = src.replace('.jpeg', '.webp');
            } else {
              img.style.display = 'none';
            }
          }}
        />
      )}

      {/* Dark Overlay gradient for high contrast readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none" />

      {/* Title Text Content (No captions/subtitles) */}
      <div className="relative z-10 pointer-events-none">
        <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight drop-shadow-md">
          {pass.sansTitle} <em className="italic-serif text-white font-normal block">{pass.serifTitle}</em>
        </h2>
      </div>
    </div>
  );

  return (
    <div className="bg-[#EBEAE6] min-h-screen pt-64 sm:pt-72 pb-28 px-6 sm:px-12">
      <div className="max-w-[88rem] mx-auto space-y-16">
        
        {/* Header with Page-Load Entrance Animation */}
        <div className="text-center max-w-5xl mx-auto space-y-6 sm:space-y-8 mt-6 sm:mt-10">
          <h1 className="animate-hero-fade-1 text-5xl sm:text-7xl lg:text-[4.75rem] font-sans font-bold text-[#111111] leading-[1.18] tracking-tight">
            Identifine <em className="italic-serif text-[#111111] font-normal">for</em> the elite
          </h1>
          <p className="animate-hero-fade-2 text-sm sm:text-base text-[#666666] leading-relaxed">
            A luxury identity collection that transforms the ordinary act of introduction into an unforgettable experience.
          </p>
        </div>

        {/* Initial 4-Card 2-Column Grid */}
        <div className="animate-hero-fade-3 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {initialPasses.map((pass) => renderCard(pass, false))}
        </div>

        {/* Smooth Accordion Drop-Down for 3 Additional Images */}
        <div className={isExpanded ? 'accordion-dropdown-open' : 'accordion-dropdown-closed'}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 pb-4">
              {additionalPasses.map((pass, idx) => renderCard(pass, true, idx))}
            </div>
          </div>
        </div>

        {/* Show More Button with Text-Roll Hover Animation */}
        <div className="text-center pt-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative inline-flex items-center justify-center overflow-hidden bg-white border border-[#CCCCCC] hover:border-[#111111] shadow-sm rounded-2xl px-10 py-4 text-xs font-bold tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5 select-none"
          >
            <div className="h-4 relative overflow-hidden flex items-center justify-center min-w-[95px]">
              {/* Default Gray Text (Moves UP out of view on hover) */}
              <span className="text-[#777777] transition-transform duration-300 ease-out group-hover:-translate-y-full block whitespace-nowrap">
                {isExpanded ? 'Show Less' : 'Show More'}
              </span>

              {/* Hover Black Text (Moves UP into view from below on hover) */}
              <span className="text-[#111111] absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 font-extrabold whitespace-nowrap">
                {isExpanded ? 'Show Less' : 'Show More'}
              </span>
            </div>
          </button>
        </div>

      </div>

      {selectedPass && (
        <CardShowcaseModal
          card={{
            title: selectedPass.fullTitle,
            description: selectedPass.fullTitle,
            colorScheme: selectedPass.colorScheme,
            tag: selectedPass.sansTitle.toUpperCase()
          }}
          onClose={() => setSelectedPass(null)}
          onEnquire={(c) => {
            setSelectedPass(null);
            window.open(`https://wa.me/2349030001851?text=Inquiry%20regarding%20${encodeURIComponent(c.title)}`, '_blank');
          }}
        />
      )}
    </div>
  );
}
