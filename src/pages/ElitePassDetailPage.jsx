import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import starIcon from '../assets/SVG@4x.png';

// Assets
import blackMatteImg from '../assets/ELITE_PASS_BLACK_MATTE.png';
import goldImg from '../assets/ELITE_PASS_GOLD.png';
import render1Img from '../assets/RENDER 1.png';
import blackMatte2Img from '../assets/ELITE_PASS_BLACK_MATTE_2.png';
import silverImg from '../assets/ELITE_PASS_SILVER.png';
import gunMetalImg from '../assets/Black matte render 2.png';
import elitePassJpg from '../assets/Elitepass.jpg';

export const elitePassData = {
  'nova': {
    id: 'nova',
    sansTitle: 'Nova',
    serifTitle: 'Pass',
    fullTitle: 'Nova Pass',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    writeup: 'Some things never need to shout to be noticed. The Nova Pass was created for organizations that believe confidence is quiet. Its deep, non-reflective finish, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    heroImage: blackMatteImg,
    galleryImages: [blackMatteImg, render1Img, elitePassJpg],
    colorScheme: 'bg-gradient-to-br from-black via-[#0D0D0D] to-zinc-950 border border-zinc-800'
  },
  'black-matte': {
    id: 'black-matte',
    sansTitle: 'Black',
    serifTitle: 'Matte',
    fullTitle: 'Black Matte',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    writeup: 'Some things never need to shout to be noticed. The Black Matte was created for organizations that believe confidence is quiet. Its deep, non-reflective finish, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    heroImage: blackMatteImg,
    galleryImages: [blackMatteImg, blackMatte2Img, render1Img],
    colorScheme: 'bg-gradient-to-br from-black via-[#0D0D0D] to-zinc-950 border border-zinc-800'
  },
  'elite-gold': {
    id: 'elite-gold',
    sansTitle: 'Elite Pass',
    serifTitle: 'Gold',
    fullTitle: 'Elite Pass Gold',
    category: 'VIP Membership Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    writeup: `Some identities are designed to stand apart.

The Elite Pass Gold was created for organizations that understand that true distinction is found in the details. Its rich gold finish, refined presence, and premium craftsmanship transform an everyday ID into something worthy of attention. It carries a sense of achievement without needing to demand it. From the first glance to the moment it rests in a wallet or hangs from a lanyard, it communicates confidence, recognition, and belonging. Because when your organization represents excellence, the identity you give your people should reflect it.`,
    heroImage: goldImg,
    galleryImages: [goldImg, elitePassJpg, silverImg],
    colorScheme: 'bg-gradient-to-br from-amber-950 via-yellow-900 to-zinc-950 border border-amber-500/40'
  },
  'titanium-steel': {
    id: 'titanium-steel',
    sansTitle: 'Titanium',
    serifTitle: 'Steel',
    fullTitle: 'Titanium Steel',
    category: 'Aerospace Grade',
    features: 'NFC, QR code, Access, Exclusive packaging',
    writeup: `Strength does not need to be loud to be felt.

The Titanium Steel Elite Pass is built for organizations that value resilience, precision, and enduring quality. Its distinctive metallic finish and robust construction give the card a sophisticated presence while maintaining an unmistakable sense of strength. It feels substantial in the hand and intentional in every detail. More than an identification card, it becomes a reflection of the people and organization it represents. Because when your standards are built to last, your identity should be too.`,
    heroImage: render1Img,
    galleryImages: [render1Img, blackMatteImg, gunMetalImg],
    colorScheme: 'bg-gradient-to-br from-stone-800 via-stone-700 to-zinc-900 border border-amber-600/30'
  },
  'gun-metal': {
    id: 'gun-metal',
    sansTitle: 'Gun',
    serifTitle: 'Metal',
    fullTitle: 'Gun Metal',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    writeup: 'Some things never need to shout to be noticed. The Gun Metal pass was created for organizations that believe confidence is quiet. Its deep gunmetal finish, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    heroImage: blackMatte2Img,
    galleryImages: [blackMatte2Img, gunMetalImg, render1Img],
    colorScheme: 'bg-gradient-to-br from-[#111827] via-[#0F172A] to-black border border-gray-700/50'
  },
  'rose-gold-metal': {
    id: 'rose-gold-metal',
    sansTitle: 'Rose Gold',
    serifTitle: 'Metal',
    fullTitle: 'Rose Gold Metal',
    category: 'Prestige VIP Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    writeup: 'Some things never need to shout to be noticed. The Rose Gold Metal pass was created for organizations that believe confidence is quiet. Its refined rose gold electroplated finish, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust.',
    heroImage: silverImg,
    galleryImages: [silverImg, goldImg, elitePassJpg],
    colorScheme: 'bg-gradient-to-br from-amber-900 via-rose-950 to-zinc-950 border border-rose-800/40'
  },
  'aircraft-metal': {
    id: 'aircraft-metal',
    sansTitle: 'Aircraft Grade',
    serifTitle: 'Metal',
    fullTitle: 'Aircraft Grade Metal',
    category: 'Military & Aerospace',
    features: 'NFC, QR code, Access, Exclusive packaging',
    writeup: 'Some things never need to shout to be noticed. The Aircraft Grade Metal pass was created for organizations that believe confidence is quiet. Its ultra-lightweight high-durability alloy finish transforms an everyday ID card into a statement of authority.',
    heroImage: gunMetalImg,
    galleryImages: [gunMetalImg, render1Img, blackMatteImg],
    colorScheme: 'bg-gradient-to-br from-slate-800 via-zinc-900 to-black border border-slate-700'
  },
  '24k-gold-plated': {
    id: '24k-gold-plated',
    sansTitle: '24K Gold',
    serifTitle: 'Plated',
    fullTitle: '24K Gold Plated',
    category: 'Prestige 24K Gold',
    features: 'NFC, QR code, Access, Exclusive packaging',
    writeup: 'Some things never need to shout to be noticed. The 24K Gold Plated pass was created for organizations that believe confidence is quiet. Its 24K electroplated gold surface and refined craftsmanship represent the highest tier of organizational identity.',
    heroImage: elitePassJpg,
    galleryImages: [elitePassJpg, goldImg, silverImg],
    colorScheme: 'bg-gradient-to-br from-yellow-950 via-amber-900 to-black border border-yellow-600/40'
  }
};

export default function ElitePassDetailPage() {
  const { id } = useParams();
  const currentSlug = id || 'nova';
  const item = elitePassData[currentSlug] || elitePassData['nova'];

  const otherPasses = Object.values(elitePassData).filter((p) => p.id !== item.id);

  return (
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-20 sm:pt-24 pb-28 selection:bg-[#E2B857] selection:text-black overflow-hidden font-sans space-y-20 sm:space-y-28">
      
      {/* ========================================================================= */}
      {/* HERO SECTION: 100% FULL BLEED EDGE-TO-EDGE PICTURE (MATCHING FRAMER NOVA) */}
      {/* ========================================================================= */}
      <div className="animate-hero-fade-1 w-full rounded-none border-0 overflow-hidden bg-[#0A0D14] h-[260px] sm:h-[480px] lg:h-[600px] relative flex items-center justify-center group mt-0">
        
        {/* Back Link Overlay */}
        <div className="absolute top-20 sm:top-28 left-4 sm:left-12 z-20">
          <NavLink
            to="/elite-pass"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase text-white/80 hover:text-white bg-black/40 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Elite Passes</span>
          </NavLink>
        </div>

        {/* Hero Product Image */}
        <img
          src={item.heroImage}
          alt={item.fullTitle}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000 ease-out select-none"
        />

        {/* Center Gradient Overlay for High Contrast Text */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />

        {/* Product Name at Exact Middle of Image */}
        <div className="absolute inset-0 text-center w-full px-4 sm:px-6 z-10 pointer-events-none flex items-center justify-center">
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-galano font-bold text-white tracking-tight drop-shadow-[0_8px_25px_rgba(0,0,0,0.9)] text-center">
            {item.sansTitle} <em className="font-swarsh italic font-normal text-white">{item.serifTitle}</em>
          </h1>
        </div>

      </div>

      {/* Main Page Content: Padded Container */}
      <div className="max-w-[94rem] mx-auto px-4 sm:px-12 space-y-16 sm:space-y-28">
        
        {/* ========================================================================= */}
        {/* OVERVIEW & SPECIFICATIONS SECTION (EXACT ALIGNMENT AS FRAMER NOVA)         */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-start text-left">
          
          {/* Overview Tagline Label */}
          <div className="animate-hero-fade-2 pt-1 shrink-0 min-w-[160px]">
            <div className="inline-flex items-center justify-start gap-2">
              <img
                src={starIcon}
                alt=""
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain brightness-0 shrink-0"
              />
              <span
                className="font-galano font-normal text-[#555555] text-xs sm:text-base uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap"
              >
                overview
              </span>
            </div>
          </div>

          {/* Narrative Content, Specs & Actions (Indented 200px from Left Margin) */}
          <div className="animate-hero-fade-3 lg:ml-[200px] space-y-8 flex-1 mt-6 lg:mt-0">
            <p className="text-lg sm:text-2xl text-[#222222] leading-relaxed font-normal max-w-5xl whitespace-pre-line">
              {item.writeup}
            </p>

            {/* Specs List (Category & Features stacked in separate rows as Framer Nova) */}
            <div className="space-y-1 max-w-5xl pt-2">
              <div className="py-4 border-b border-[#DCDAD4] flex items-center justify-between text-base sm:text-lg">
                <span className="font-galano font-medium text-[#737378]">Category:</span>
                <span className="font-galano font-semibold text-[#111111]">{item.category}</span>
              </div>
              <div className="py-4 border-b border-[#DCDAD4] flex items-center justify-between text-base sm:text-lg">
                <span className="font-galano font-medium text-[#737378]">Features:</span>
                <span className="font-galano font-semibold text-[#111111] text-right">{item.features}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 1. FULL-BLEED REDUCED-HEIGHT BANNER (EXACT SAME FULL BLEED WIDTH AS HERO) */}
      {/* ========================================================================= */}
      <div className="w-full rounded-none border-0 overflow-hidden bg-[#0A0D14] h-[200px] sm:h-[380px] lg:h-[480px] relative select-none my-12 sm:my-20">
        <img
          src={item.galleryImages[0] || item.heroImage}
          alt={`${item.fullTitle} full bleed banner`}
          className="w-full h-full object-cover object-center select-none"
          loading="lazy"
        />
      </div>

      {/* Main Page Content Container for Cards & More Elite Pass */}
      <div className="max-w-[94rem] mx-auto px-4 sm:px-12 space-y-16 sm:space-y-28">

        {/* ========================================================================= */}
        {/* GALLERY SHOWCASE: SIDE-BY-SIDE CARDS & MATCHING COMBINED WIDTH CARD       */}
        {/* ========================================================================= */}
        <div className="space-y-8 sm:space-y-16">

          {/* 2. Two images side by side with NO GAP and NOT full width of screen (max-w-[1140px]) */}
          <div className="max-w-[1140px] mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#DCDAD4] shadow-sm bg-white/40 backdrop-blur-md">
              <div className="w-full h-[220px] sm:h-[400px] lg:h-[500px] overflow-hidden border-b sm:border-b-0 sm:border-r border-[#DCDAD4]">
                <img
                  src={item.galleryImages[1] || item.heroImage}
                  alt={`${item.fullTitle} render left`}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>
              <div className="w-full h-[220px] sm:h-[400px] lg:h-[500px] overflow-hidden">
                <img
                  src={item.galleryImages[2] || item.heroImage}
                  alt={`${item.fullTitle} render right`}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* 3. Single image with the exact width of the two cards (max-w-[1140px]) */}
          <div className="max-w-[1140px] mx-auto w-full h-[220px] sm:h-[450px] lg:h-[520px] overflow-hidden rounded-2xl sm:rounded-3xl border border-[#DCDAD4] shadow-sm bg-white/40 backdrop-blur-md">
            <img
              src={item.galleryImages[0] || item.heroImage}
              alt={`${item.fullTitle} render full width cards match`}
              className="w-full h-full object-cover select-none"
              loading="lazy"
            />
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION: MORE ELITE PASS (CONTAINER CARDS AS ON FRAMER NOVA)               */}
        {/* ========================================================================= */}
        <div className="space-y-12 text-center">
          
          <div className="w-full text-center">
            <h2 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-galano font-medium text-[#111111] leading-tight tracking-tight text-center">
              More elite <em className="font-swarsh italic font-normal text-[#111111]">pass</em>
            </h2>
          </div>

          {/* Grid of Elite Pass Container Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {otherPasses.map((pass) => (
              <NavLink
                key={pass.id}
                to={`/elite-pass/${pass.id}`}
                className="group cursor-pointer block w-full rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden transition-all duration-500 hover:shadow-2xl border border-black/10 select-none bg-black h-[280px] sm:h-[360px] lg:h-[400px]"
              >
                {/* Fallback Gradient Background */}
                <div className={`absolute inset-0 opacity-90 ${pass.colorScheme}`} />

                {/* Card Image */}
                {pass.heroImage && (
                  <img
                    src={pass.heroImage}
                    alt={pass.fullTitle}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}

                {/* Dark Overlay gradient for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />

                {/* Card Title at Center */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center pointer-events-none">
                  <h3 className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight drop-shadow-md">
                    {pass.sansTitle} <em className="italic-serif text-white font-normal block">{pass.serifTitle}</em>
                  </h3>
                </div>
              </NavLink>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
