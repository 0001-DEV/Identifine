import React, { useState, useEffect } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import starIcon from '../assets/SVG@4x.png';

// Product Assets
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.png';
import elitePassGold from '../assets/ELITE_PASS_GOLD.png';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.png';
import blackMatteRender from '../assets/Black matte render 2.png';
import renderOne from '../assets/RENDER 1.png';
import postProcessImg from '../assets/Post process 6.jpg';

export const productsData = [
  {
    id: 'black-matte',
    title: 'Black Matte',
    subtitle: 'Executive Stealth Finish',
    headingStart: 'Black',
    headingItalic: 'Matte',
    overview: 'Some things never need to shout to be noticed. The Black Matte was created for organizations that believe confidence is quiet. Its deep, non-reflective finish, premium feel, and refined craftsmanship transform an everyday ID card into a statement of professionalism and trust. The moment it leaves the wallet or rests on a lanyard, it communicates intention. It says your brand values quality, your people belong, and every detail matters. Because an identity card should do more than identify. It should represent the standard your organization stands for.',
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: blackMatteRender,
    partners: [
      { name: 'Rainoil' },
      { name: 'Seplat' },
      { name: 'Revolution plus' },
      { name: 'ARM' },
      { name: 'Sterling bank' },
      { name: 'TVC' },
      { name: 'Bank 78' },
      { name: 'UBA' }
    ]
  },
  {
    id: 'du-plex',
    title: 'Du-plex smart card',
    subtitle: 'Hybrid Dual-Tone Finish',
    headingStart: 'Du-plex',
    headingItalic: 'smart card',
    overview: 'Engineered for executive teams seeking the perfect blend of digital connectivity and tactile distinction. The Du-plex features a dual-layer composite design, seamless NFC integration, and high-contrast branding surfaces that command respect in every corporate meeting.',
    category: 'Smart Credentials',
    features: 'Dual-tone finish, Instant NFC Share, Cloud Profile, VIP Access',
    image: elitePassBlack,
    partners: [
      { name: 'Rainoil' },
      { name: 'Seplat' },
      { name: 'ARM' },
      { name: 'Sterling bank' },
      { name: 'Bank 78' },
      { name: 'UBA' }
    ]
  },
  {
    id: 'de-titan',
    title: 'De-titan smart card',
    subtitle: 'Aircraft Titanium Alloy',
    headingStart: 'De-titan',
    headingItalic: 'smart card',
    overview: 'Forged from aerospace-grade titanium alloy. The De-titan offers extraordinary weight, indestructible durability, and effortless contact-free profile sharing. It is built for executives and visionaries who redefine standards.',
    category: 'Titanium Series',
    features: 'Aerospace Metal, Encrypted NFC, Custom Laser Engraving, Exclusive Access',
    image: elitePassSilver,
    partners: [
      { name: 'Seplat' },
      { name: 'TVC' },
      { name: 'Bank 78' },
      { name: 'UBA' },
      { name: 'Rainoil' },
      { name: 'Sterling bank' }
    ]
  },
  {
    id: 'gold-metal',
    title: 'Gold metal card',
    subtitle: '24K Electroplated Brass',
    headingStart: 'Gold',
    headingItalic: 'metal card',
    overview: 'An exquisite statement card crafted with 24K gold electroplating over solid precision metal. Designed for VIP members, top C-suite leaders, and high-net-worth identity ecosystems where first impressions are paramount.',
    category: 'Luxury Metal',
    features: '24K Gold Plating, Tactile Weight, Exclusive NFC Chip, Gift Packaging',
    image: elitePassGold,
    partners: [
      { name: 'Revolution plus' },
      { name: 'ARM' },
      { name: 'Sterling bank' },
      { name: 'Bank 78' },
      { name: 'UBA' }
    ]
  },
  {
    id: 'forte-smart',
    title: 'Forte smart card',
    subtitle: 'Carbon Fiber Weave',
    headingStart: 'Forte',
    headingItalic: 'smart card',
    overview: 'Constructed from lightweight high-grade carbon fiber weave. The Forte smart card delivers futuristic style, ultimate scratch resistance, and instantaneous digital profile networking across iOS & Android devices.',
    category: 'Executive Tech',
    features: 'Carbon Weave, Scratch Resistance, Cloud NFC, Member Security',
    image: postProcessImg,
    partners: [
      { name: 'Rainoil' },
      { name: 'TVC' },
      { name: 'Bank 78' },
      { name: 'ARM' }
    ]
  },
  {
    id: 'membership-prestige',
    title: 'Membership prestige',
    subtitle: 'Gunmetal VIP Access',
    headingStart: 'Membership',
    headingItalic: 'prestige',
    overview: 'A premier credential created for elite private clubs, executive boards, and exclusive member networks. Blending gunmetal aesthetic with multi-factor RFID/NFC security.',
    category: 'Prestige Pass',
    features: 'Gunmetal Alloy, Access Control, Member Portal, Custom Branding',
    image: renderOne,
    partners: [
      { name: 'UBA' },
      { name: 'Seplat' },
      { name: 'Revolution plus' },
      { name: 'Sterling bank' }
    ]
  }
];

export default function ProductCataloguePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || searchParams.get('card') || 'black-matte';
  
  const [selectedId, setSelectedId] = useState(initialId);
  const [displayedPartnersCount, setDisplayedPartnersCount] = useState(8);

  useEffect(() => {
    const idParam = searchParams.get('id') || searchParams.get('card');
    if (idParam) {
      setSelectedId(idParam);
    }
  }, [searchParams]);

  // Find active product object or fallback to Black Matte
  const activeProduct = productsData.find((p) => p.id === selectedId) || productsData[0];

  const handleSelectProduct = (id) => {
    setSelectedId(id);
    setSearchParams({ id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-36 sm:pt-44 pb-28 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black overflow-hidden">
      <div className="max-w-[94rem] mx-auto space-y-20 sm:space-y-28">
        
        {/* Top Product Selector Pills */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap max-w-5xl mx-auto pb-2">
          {productsData.map((prod) => {
            const isSelected = prod.id === activeProduct.id;
            return (
              <button
                key={prod.id}
                onClick={() => handleSelectProduct(prod.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? 'bg-black text-white font-semibold shadow-lg scale-105'
                    : 'bg-white text-[#555555] border border-[#DCDAD4] hover:border-[#111111] hover:text-[#111111] shadow-sm'
                }`}
              >
                {prod.title}
              </button>
            );
          })}
        </div>

        {/* Hero Section: Product Title & 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Product Info & Details */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Tagline */}
            <div className="inline-flex items-center justify-start gap-2.5">
              <img
                src={starIcon}
                alt=""
                className="w-4 h-4 object-contain brightness-0"
              />
              <span
                className="font-galano font-normal text-[#555555] text-xs sm:text-sm uppercase"
                style={{ letterSpacing: '4.5px' }}
              >
                Our identity catalogue
              </span>
            </div>

            {/* H1 Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-galano font-medium tracking-tight text-[#111111] leading-[1.05]">
              {activeProduct.headingStart} <em className="font-swarsh italic font-normal text-[#111111] px-1">{activeProduct.headingItalic}</em>
            </h1>

            {/* Overview Card */}
            <div className="bg-white border border-[#DCDAD4] p-8 sm:p-10 rounded-[28px] shadow-sm space-y-6">
              
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#F5F4F0] border border-[#DCDAD4] text-xs font-semibold text-[#111111] uppercase tracking-wider">
                Overview
              </div>

              <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-normal">
                {activeProduct.overview}
              </p>

              {/* Specs Grid */}
              <div className="pt-4 border-t border-[#DCDAD4] grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#666666] uppercase tracking-wider">Category:</div>
                  <div className="text-base font-bold text-[#111111]">{activeProduct.category}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#666666] uppercase tracking-wider">Features:</div>
                  <div className="text-base font-semibold text-[#111111]">{activeProduct.features}</div>
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

          {/* Right Column: High-Res Card Image Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[32px] overflow-hidden bg-white border border-[#DCDAD4] p-6 sm:p-10 shadow-md min-h-[480px] sm:min-h-[580px] flex items-center justify-center group">
              
              <img
                src={activeProduct.image}
                alt={activeProduct.title}
                className="w-full max-h-[520px] object-contain drop-shadow-xl group-hover:scale-[1.03] transition-transform duration-700 ease-out select-none relative z-10"
              />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
                <div className="px-4 py-2 rounded-full bg-[#F5F4F0] border border-[#DCDAD4] text-xs font-mono text-[#444444] shadow-sm">
                  ✦ {activeProduct.subtitle}
                </div>
                <div className="w-9 h-9 rounded-full bg-[#111111] text-[#E2B857] flex items-center justify-center font-bold text-xs shadow-md">
                  ID
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Section 2: Partners using our flagship */}
        <div className="pt-16 sm:pt-24 border-t border-[#DCDAD4] space-y-12 text-center">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-galano font-medium text-[#111111] leading-tight">
              Partners using our <em className="font-swarsh italic font-normal text-[#111111]">{activeProduct.title}</em> flagship
            </h2>
            <p className="text-base sm:text-lg text-[#555555] max-w-xl mx-auto font-normal">
              Trusted by leading enterprises, financial institutions, and executive teams across Africa.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {activeProduct.partners.slice(0, displayedPartnersCount).map((partner, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#DCDAD4] rounded-2xl p-6 sm:p-8 flex items-center justify-center hover:border-[#111111] hover:shadow-md transition-all duration-300 group shadow-sm"
              >
                <span className="text-lg sm:text-xl font-bold text-[#111111] transition-colors tracking-tight font-galano">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {activeProduct.partners.length > displayedPartnersCount ? (
            <div className="pt-4">
              <button
                onClick={() => setDisplayedPartnersCount((prev) => prev + 4)}
                className="bg-white text-black border border-[#DCDAD4] hover:bg-black hover:text-white transition-all text-sm px-10 py-3.5 font-semibold rounded-full shadow-sm"
              >
                Load More
              </button>
            </div>
          ) : (
            <div className="pt-4">
              <a
                href="https://wa.me/2349030001851"
                target="_blank"
                rel="noopener noreferrer"
                className="framer-pill-button text-sm px-10 py-3.5 font-semibold"
              >
                Become a partner
              </a>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
