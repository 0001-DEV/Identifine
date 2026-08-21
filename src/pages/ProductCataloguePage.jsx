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
  { id: 'uba', name: 'UBA', image: ubaImg }
];

export default function ProductCataloguePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || searchParams.get('card') || 'du-plex';
  
  const [selectedId, setSelectedId] = useState(initialId);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const idParam = searchParams.get('id') || searchParams.get('card');
    if (idParam) {
      setSelectedId(idParam);
    }
  }, [searchParams]);

  // Active product
  const activeProduct = productsData.find((p) => p.id === selectedId) || productsData[0];

  return (
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-20 sm:pt-24 pb-28 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black overflow-hidden font-sans">
      <div className="max-w-[94rem] mx-auto space-y-20 sm:space-y-28">
        
        {/* ========================================================================= */}
        {/* HERO SECTION: FULL SCREEN WIDTH PICTURE (NO MARGIN TOP, +12PX HEIGHT)     */}
        {/* ========================================================================= */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 rounded-none overflow-hidden bg-[#0A0D14] border-b border-[#DCDAD4] shadow-xl h-[370px] sm:h-[470px] lg:h-[530px] flex items-center justify-center group mt-0">
          
          {/* Hero Product Image */}
          <img
            src={activeProduct.image}
            alt={activeProduct.title}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000 ease-out select-none"
          />

          {/* Bottom Gradient Overlay for High Contrast Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* Product Name at the Center Bottom of the Picture */}
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 text-center w-full px-6 z-10 pointer-events-none">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-galano font-bold text-white tracking-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
              {activeProduct.title}
            </h1>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* OVERVIEW & SPECIFICATIONS SECTION                                         */}
        {/* ========================================================================= */}
        <div className="max-w-6xl space-y-8 text-left">
          
          {/* Overview Tagline Label (Aligned Left) */}
          <div className="inline-flex items-center justify-start gap-2.5">
            <img
              src={starIcon}
              alt=""
              className="w-4 h-4 object-contain brightness-0"
            />
            <span
              className="font-galano font-normal text-[#555555] text-xs sm:text-sm uppercase"
              style={{ letterSpacing: '6px' }}
            >
              Overview
            </span>
          </div>

          {/* Narrative Content, Specs & Actions (Indented 120px from Left) */}
          <div className="lg:ml-[120px] space-y-8">
            <p className="text-lg sm:text-2xl text-[#222222] leading-relaxed font-normal max-w-5xl">
              {activeProduct.overview}
            </p>

            {/* Specs List */}
            <div className="pt-6 border-t border-[#DCDAD4] grid grid-cols-1 sm:grid-cols-2 gap-6 text-base sm:text-lg max-w-4xl">
              <div>
                <span className="font-semibold text-[#111111]">Category: </span>
                <span className="text-[#555555]">{activeProduct.category}</span>
              </div>
              <div>
                <span className="font-semibold text-[#111111]">Features: </span>
                <span className="text-[#555555]">{activeProduct.features}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/2349030001851"
                target="_blank"
                rel="noopener noreferrer"
                className="framer-pill-button text-sm px-8 py-4 font-semibold shadow-md"
              >
                Make an identity enquiry
              </a>
              <NavLink
                to="/contact"
                className="bg-white border border-[#DCDAD4] text-black text-sm px-8 py-4 font-semibold rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
              >
                Book a consultation
              </NavLink>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION: PARTNERS USING OUR FLAGSHIP                                      */}
        {/* ========================================================================= */}
        <div className="pt-12 sm:pt-16 border-t border-[#DCDAD4] space-y-12 text-left">
          
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-galano font-medium text-[#111111] leading-tight tracking-tight">
              Partners using our {activeProduct.title} flagship
            </h2>
          </div>

          {/* 8 Partner Cards Grid with Real Framer Case Study Assets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {partnerCases.slice(0, visibleCount).map((partner) => (
              <NavLink
                key={partner.id}
                to="/case-studies"
                className="group cursor-pointer space-y-4 block text-left"
              >
                {/* Card Image Container */}
                <div className="relative aspect-[16/11] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white border border-[#DCDAD4] shadow-sm group-hover:shadow-xl group-hover:border-[#111111]/40 transition-all duration-500 transform group-hover:-translate-y-1.5">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-white text-xs font-mono tracking-wider uppercase">
                      ✦ View Case Study
                    </span>
                  </div>
                </div>

                {/* Title & Arrow Row */}
                <div className="flex items-center justify-between pt-1 px-1">
                  <h3 className="text-xl sm:text-2xl font-galano font-medium text-[#111111] group-hover:text-[#E2B857] transition-colors tracking-tight">
                    {partner.name}
                  </h3>
                  <div className="w-9 h-9 rounded-full bg-white border border-[#DCDAD4] group-hover:bg-black group-hover:text-white group-hover:border-black flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </NavLink>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center pt-8">
            <button
              onClick={() => setVisibleCount((prev) => (prev === 8 ? 8 : 8))}
              className="group relative overflow-hidden inline-flex items-center justify-center text-sm sm:text-base font-semibold px-10 py-4 rounded-full bg-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[54px]"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                  <span className="block">Load More</span>
                  <span className="block">Load More</span>
                </span>
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
