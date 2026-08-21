import React, { useState, useEffect } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import starIcon from '../assets/SVG@4x.png';

// Product Assets
import productHeroImg from '../assets/case-studies/product_catalogue_hero.png';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.png';
import elitePassGold from '../assets/ELITE_PASS_GOLD.png';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.png';
import renderOne from '../assets/RENDER 1.png';
import postProcessImg from '../assets/Post process 6.jpg';

// Partner Case Studies Images
import rainoilImg from '../assets/case-studies/rainoil.jpg';
import seplatImg from '../assets/case-studies/seplat.png';
import revolutionPlusImg from '../assets/case-studies/revolution_plus.png';
import armImg from '../assets/case-studies/arm.png';
import sterlingBankImg from '../assets/case-studies/sterling_bank.png';
import tvcImg from '../assets/case-studies/tvc.jpg';
import bank78Img from '../assets/case-studies/bank78.jpg';
import ubaImg from '../assets/case-studies/uba.png';
import optivaImg from '../assets/case-studies/optiva.png';

export const productsData = [
  {
    id: 'du-plex',
    title: 'Du-plex smart card',
    subtitle: 'Hybrid Dual-Tone Finish',
    overview: 'Some things never need to shout to be noticed. The Du-plex was created for organizations that believe confidence is quiet. Its deep, dual-layer finish, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: elitePassBlack
  },
  {
    id: 'black-matte',
    title: 'Black Matte',
    subtitle: 'Executive Stealth Finish',
    overview: 'Some things never need to shout to be noticed. The Black Matte was created for organizations that believe confidence is quiet. Its deep, non-reflective finish, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: productHeroImg
  },
  {
    id: 'de-titan',
    title: 'De-titan smart card',
    subtitle: 'Aircraft Titanium Alloy',
    overview: 'Some things never need to shout to be noticed. The De-titan was created for organizations that believe confidence is quiet. Its aerospace titanium structure, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: elitePassSilver
  },
  {
    id: 'gold-metal',
    title: 'Gold metal card',
    subtitle: '24K Electroplated Brass',
    overview: 'Some things never need to shout to be noticed. The Gold Metal was created for organizations that believe confidence is quiet. Its 24K electroplated finish, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: elitePassGold
  },
  {
    id: 'forte-smart',
    title: 'Forte smart card',
    subtitle: 'Carbon Fiber Weave',
    overview: 'Some things never need to shout to be noticed. The Forte was created for organizations that believe confidence is quiet. Its lightweight carbon fiber weave, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: postProcessImg
  },
  {
    id: 'membership-prestige',
    title: 'Membership prestige',
    subtitle: 'Gunmetal VIP Access',
    overview: 'Some things never need to shout to be noticed. The Membership Prestige was created for organizations that believe confidence is quiet. Its deep gunmetal finish, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: renderOne
  }
];

export const partnerCases = [
  { id: 'rainoil', name: 'Rainoil', image: rainoilImg },
  { id: 'seplat', name: 'Seplat', image: seplatImg },
  { id: 'revolution-plus', name: 'Revolution plus', image: revolutionPlusImg },
  { id: 'arm', name: 'ARM', image: armImg },
  { id: 'sterling-bank', name: 'Sterling bank', image: sterlingBankImg },
  { id: 'tvc', name: 'TVC', image: tvcImg },
  { id: 'bank-78', name: 'Bank 78', image: bank78Img },
  { id: 'uba', name: 'UBA', image: ubaImg },
  { id: 'optiva', name: 'Optiva', image: optivaImg }
];

export default function ProductCataloguePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || searchParams.get('card') || 'du-plex';
  
  const [selectedId, setSelectedId] = useState(initialId);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const idParam = searchParams.get('id') || searchParams.get('card');
    if (idParam) {
      setSelectedId(idParam);
    }
  }, [searchParams]);

  // Active product
  const activeProduct = productsData.find((p) => p.id === selectedId) || productsData[0];

  // Specific height pattern matching the two lines:
  // Line 1: 200px, 300px, 200px, 300px, 200px
  // Line 2: 300px, 250px, 200px, 300px
  const heightPattern = [
    'h-[200px]', // 1. Rainoil
    'h-[300px]', // 2. Seplat
    'h-[200px]', // 3. Revolution plus
    'h-[300px]', // 4. ARM
    'h-[200px]', // 5. Sterling bank
    'h-[300px]', // 6. TVC
    'h-[250px]', // 7. Bank 78
    'h-[200px]', // 8. UBA
    'h-[300px]'  // 9. Optiva
  ];

  return (
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-20 sm:pt-24 pb-28 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black overflow-hidden font-sans">
      <div className="max-w-[94rem] mx-auto space-y-20 sm:space-y-28">
        
        {/* ========================================================================= */}
        {/* HERO SECTION: PICTURE (NO MARGIN TOP, FULL CONTAINER WIDTH)               */}
        {/* ========================================================================= */}
        <div className="animate-hero-fade-1 w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0D14] border border-[#DCDAD4] shadow-xl h-[370px] sm:h-[470px] lg:h-[540px] relative flex items-center justify-center group mt-0">
          
          {/* Hero Product Image */}
          <img
            src={activeProduct.image}
            alt={activeProduct.title}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000 ease-out select-none"
          />

          {/* Bottom Gradient Overlay for High Contrast Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* Product Name at the Center Bottom of the Picture */}
          <div className="absolute bottom-8 sm:bottom-12 left-0 text-center w-full px-6 z-10 pointer-events-none">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-galano font-bold text-white tracking-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
              {activeProduct.title}
            </h1>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* OVERVIEW & SPECIFICATIONS SECTION (OVERVIEW LABEL ALIGNED ON FIRST LINE)  */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-start text-left">
          
          {/* Overview Tagline Label (Enlarged, Lowercase, Aligned with first line of narrative) */}
          <div className="animate-hero-fade-2 pt-1 shrink-0 min-w-[160px]">
            <div className="inline-flex items-center justify-start gap-2.5">
              <img
                src={starIcon}
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0"
              />
              <span
                className="font-galano font-normal text-[#555555] text-base sm:text-lg lg:text-xl lowercase"
                style={{ letterSpacing: '5px' }}
              >
                overview
              </span>
            </div>
          </div>

          {/* Narrative Content, Specs & Actions (Indented 200px from Left Margin) */}
          <div className="animate-hero-fade-3 lg:ml-[200px] space-y-8 flex-1 mt-6 lg:mt-0">
            <p className="text-lg sm:text-2xl text-[#222222] leading-relaxed font-normal max-w-5xl">
              {activeProduct.overview}
            </p>

            {/* Specs List - Bottom line directly under category and features */}
            <div className="pt-6 pb-6 border-t border-b border-[#DCDAD4] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-base sm:text-lg max-w-5xl">
              <div>
                <span className="font-semibold text-[#111111]">Category: </span>
                <span className="text-[#555555]">{activeProduct.category}</span>
              </div>
              <div className="sm:text-right">
                <span className="font-semibold text-[#111111]">Features: </span>
                <span className="text-[#555555]">{activeProduct.features}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION: PARTNERS USING OUR FLAGSHIP (SINGLE LINE HEADING)                 */}
        {/* ========================================================================= */}
        <div className="space-y-10 text-left">
          
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-galano font-medium text-[#111111] leading-tight tracking-tight whitespace-nowrap">
              Partners using our {activeProduct.title} flagship
            </h2>
          </div>

          {/* 5 Partners per line: Line 1 (200, 300, 200, 300, 200), Line 2 (300, 250, 200, 300) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-[8px] gap-y-[140px] items-start">
            {partnerCases.slice(0, visibleCount).map((partner, idx) => {
              const heightClass = heightPattern[idx] || 'h-[200px]';

              return (
                <NavLink
                  key={partner.id}
                  to={`/case-studies/${partner.id}`}
                  className="group cursor-pointer block w-full space-y-2 text-left"
                >
                  {/* Card Image Container (Top Aligned, No border radius, Glassmorphism Background) */}
                  <div className={`relative ${heightClass} w-full rounded-none overflow-hidden bg-white/40 backdrop-blur-md border border-white/60 shadow-sm group-hover:shadow-xl group-hover:border-black/20 transition-all duration-500 transform group-hover:-translate-y-1`}>
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none rounded-none"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="pt-1 px-0.5">
                    <h3 className="text-sm font-galano font-medium text-[#111111] group-hover:text-[#E2B857] transition-colors tracking-tight truncate">
                      {partner.name}
                    </h3>
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* Load More Button (Pure Glassmorphism Background, Reduced Radius, Gray-to-Black Hover) */}
          <div className="text-center pt-8">
            <button
              onClick={() => setVisibleCount((prev) => (prev >= partnerCases.length ? 5 : partnerCases.length))}
              className="inline-flex items-center justify-center text-xs font-semibold px-6 py-2.5 rounded-xl bg-black/[0.03] backdrop-blur-xl text-[#444444] border border-[#111111]/20 hover:bg-black/[0.08] hover:text-black hover:border-black/60 shadow-sm transition-all duration-300 select-none"
            >
              Load More
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
