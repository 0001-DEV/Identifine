import React, { useState, useEffect } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import starIcon from '../assets/SVG@4x.webp';

// Product Assets
import productHeroImg from '../assets/case-studies/product_catalogue_hero.webp';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.webp';
import elitePassGold from '../assets/ELITE_PASS_GOLD.webp';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.webp';
import renderOne from '../assets/RENDER 1.webp';
import postProcessImg from '../assets/Post process 6.webp';
import silverForteImg from '../assets/IDENTIFINE SILVER FORTE.webp';
import blackMatteRender from '../assets/Black matte render 2.webp';
import elitePassBlackMatte2 from '../assets/ELITE_PASS_BLACK_MATTE_2.webp';

// Partner Case Studies Images
import palton1Img from '../assets/palton1.webp';
import seplat4Img from '../assets/seplat 4.webp';
import adnocPost14 from '../assets/POST 14.webp';
import googleNotepad1 from '../assets/NOTEPAD 1.webp';
import renaissanceMain from '../assets/case-studies/renaissance_main.webp';
import guinnessRender6 from '../assets/RENDER 6.webp';
import novaMain from '../assets/Nova.webp';
import ubaMain from '../assets/case-studies/uba_main.webp';
import optivaMainImg from '../assets/OPTIVA.webp';

export const productsData = [
  {
    id: 'du-plex',
    title: 'Du-plex smart card',
    subtitle: 'Hybrid Dual-Tone Finish',
    overview: (
      <div className="space-y-6 font-galano font-normal text-lg sm:text-2xl text-[#222222] leading-relaxed">
        <p className="font-galano font-bold italic text-2xl sm:text-3xl lg:text-4xl text-[#111111]">
          Two functions. One identity.
        </p>
        <p>
          Some things never need to shout to be noticed.
        </p>
        <p>
          Du-plex was created for organizations that believe identity should work harder.
        </p>
        <p>
          Designed as a two-in-one identity credential, it brings together two essential functions in one refined card — reducing the clutter of multiple credentials while creating a more unified identity experience.
        </p>
        <p>
          Its dual-layer construction gives the card depth, distinction and a premium tactile presence. But its real value lies beneath the finish: one credential, designed to do more.
        </p>
        <p>
          Because an identity card should not simply tell people who you are.
        </p>
        <p className="font-medium text-[#111111]">
          It should make identity work for you.
        </p>
        <div className="pt-2 space-y-1 font-semibold text-[#111111]">
          <p>Du-plex.</p>
          <p>Two functions. One identity.</p>
        </div>
      </div>
    ),
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
    overview: (
      <div className="space-y-6 font-galano font-normal text-lg sm:text-2xl text-[#222222] leading-relaxed">
        <p className="font-galano font-bold italic text-2xl sm:text-3xl lg:text-4xl text-[#111111]">
          One Identity. Three Possibilities.
        </p>
        <p>
          Some things should simply work better.
        </p>
        <p>
          De-TITAN was created for organizations that believe identity should be simpler, smarter and more connected.
        </p>
        <p>
          Why carry an ID card, a business card and an access card when one credential can bring them together?
        </p>
        <p>
          De-TITAN combines three everyday identity functions in one thoughtfully designed credential — giving people fewer cards to carry, fewer touchpoints to manage and a more seamless way to identify, connect and gain access.
        </p>
        <p>
          It is a small change with a meaningful effect.
        </p>
        <div className="space-y-1 font-medium text-[#111111]">
          <p>Less clutter.</p>
          <p>Less duplication.</p>
          <p>More convenience.</p>
          <p>One identity.</p>
        </div>
        <p>
          Because modern identity should not make people carry more just to do more.
        </p>
        <div className="space-y-1">
          <p className="font-semibold text-[#111111]">De-TITAN.</p>
          <p>Three functions.</p>
          <p>One credential.</p>
          <p>A simpler way to carry identity.</p>
        </div>
        <div className="pt-2 space-y-1 font-semibold text-[#111111]">
          <p>DE-TITAN</p>
          <p className="italic">One Identity. Three Possibilities.</p>
        </div>
      </div>
    ),
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: elitePassSilver
  },
  {
    id: 'gold-metal',
    title: 'Gold metal card',
    subtitle: '24K Electroplated Brass',
    overview: (
      <div className="space-y-6 font-galano font-normal text-lg sm:text-2xl text-[#222222] leading-relaxed">
        <p className="font-galano font-bold italic text-2xl sm:text-3xl lg:text-4xl text-[#111111]">
          Recognition, Made Tangible
        </p>
        <p>
          Some introductions are remembered long after the conversation ends.
        </p>
        <p>
          Gold Metal is an expression of Elite Pass for those who understand that a business card is more than a way to exchange contact details. It is often the first physical expression of who you are, what you represent and the level at which you operate.
        </p>
        <p>
          Finished in 24K electroplating and refined with deliberate craftsmanship, Gold Metal gives professional identity a distinctive presence — one that feels as considered as the person carrying it.
        </p>
        <p>
          But its value is not simply in what it is made of.
        </p>
        <p className="font-medium text-[#111111]">
          It is in what it represents.
        </p>
        <div className="space-y-1 font-medium text-[#111111]">
          <p>Recognition.</p>
          <p>Presence.</p>
          <p>Distinction.</p>
          <p>Connection.</p>
        </div>
        <p>
          Because when your name represents an organization, a reputation or a body of work, the card you hand over should carry more than your details.
        </p>
        <p className="font-medium text-[#111111]">
          It should carry your presence.
        </p>
        <div className="pt-2 space-y-1 font-semibold text-[#111111]">
          <p>Elite Pass Gold Metal.</p>
          <p className="italic">Recognition, made tangible.</p>
        </div>
      </div>
    ),
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: elitePassGold
  },
  {
    id: 'forte-smart',
    title: 'Forte smart card',
    subtitle: 'Carbon Fiber Weave',
    overview: (
      <div className="space-y-6 font-galano font-normal text-lg sm:text-2xl text-[#222222] leading-relaxed">
        <p className="font-galano font-bold italic text-2xl sm:text-3xl lg:text-4xl text-[#111111]">
          Membership, Made Simpler
        </p>
        <p>
          Some things should not have to be carried separately.
        </p>
        <p>
          Forte was created for organizations that believe membership should be as seamless as belonging.
        </p>
        <p>
          More than an ID card, Forte brings four essential functions into one intelligent credential — identification, membership, access and payment.
        </p>
        <p>
          For clubs, associations and membership communities, that means one card can serve as the member’s identity, proof of belonging, access credential and means of making authorized purchases within the membership ecosystem.
        </p>
        <div className="space-y-1 font-medium text-[#111111]">
          <p>No juggling multiple cards.</p>
          <p>No unnecessary duplication.</p>
          <p>Less administrative complexity.</p>
          <p>A simpler experience for both the member and the organization.</p>
        </div>
        <p>
          And because Forte is designed to work within an organization’s chosen systems and processes, its possibilities can extend wherever membership, access and transactions intersect.
        </p>
        <p>
          It is not simply about putting more functions into a card.
        </p>
        <p className="font-medium text-[#111111]">
          It is about taking the complexity out of identity.
        </p>
        <p>
          Because when people belong to a community, their experience of that belonging should not be fragmented across different credentials.
        </p>
        <div className="pt-2 space-y-1 font-semibold text-[#111111]">
          <p>Forte.</p>
          <p>Four functions. One credential.</p>
          <p className="italic">Membership, made simpler.</p>
        </div>
      </div>
    ),
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: elitePassBlackMatte2
  },
  {
    id: 'membership-prestige',
    title: 'Membership prestige',
    subtitle: 'Gunmetal VIP Access',
    overview: (
      <div className="space-y-6 font-galano font-normal text-lg sm:text-2xl text-[#222222] leading-relaxed">
        <p className="font-galano font-bold italic text-2xl sm:text-3xl lg:text-4xl text-[#111111]">
          Belonging, Made Tangible
        </p>
        <p>
          A membership card should not disappear into a wallet the moment it has served its administrative purpose.
        </p>
        <p>
          It should carry the character of the organization.
        </p>
        <p>
          It should reflect the value of the relationship.
        </p>
        <p>
          It should remind the member that they are part of something—and make it easier for them to experience the benefits of that connection.
        </p>
        <p>
          Membership Prestige is designed for organizations ready to move beyond the ordinary membership card.
        </p>
        <div className="space-y-1">
          <p>Beyond eligibility.</p>
          <p>Beyond access.</p>
          <p>Beyond identification.</p>
        </div>
        <p>
          Toward a membership experience built around recognition, belonging, privilege and participation.
        </p>
        <p>
          Because the future of membership is not simply about proving that someone belongs.
        </p>
        <p>
          It is about helping them experience what belonging means.
        </p>
        <div className="pt-2 space-y-1">
          <p>
            Membership Prestige
          </p>
          <p>
            The new standard of membership identity.
          </p>
          <p>
            From proof of membership to participation in membership.
          </p>
        </div>
      </div>
    ),
    category: 'Executive Level',
    features: 'NFC, QR code, Access, Exclusive packaging',
    image: renderOne
  }
];

export const partnerCases = [
  { id: 'optiva', name: 'Optiva', image: optivaMainImg },
  { id: 'nova', name: 'NOVA', image: novaMain },
  { id: 'palton-morgan', name: 'Palton Morgan', image: palton1Img },
  { id: 'seplat', name: 'Seplat', image: seplat4Img },
  { id: 'adnoc', name: 'ADNOC', image: adnocPost14 },
  { id: 'google', name: 'Google', image: googleNotepad1 },
  { id: 'renaissance', name: 'Renaissance', image: renaissanceMain },
  { id: 'guinness', name: 'Guinness', image: guinnessRender6 },
  { id: 'uba', name: 'UBA', image: ubaMain }
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
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-20 sm:pt-24 pb-28 selection:bg-[#E2B857] selection:text-black overflow-x-clip font-sans space-y-20 sm:space-y-28">

      {/* ========================================================================= */}
      {/* HERO SECTION: 100% FULL BLEED EDGE-TO-EDGE PICTURE (NO BORDER, NO RADIUS) */}
      {/* ========================================================================= */}
      <div className="animate-hero-fade-1 w-full rounded-none border-0 overflow-hidden bg-[#0A0D14] h-[260px] sm:h-[480px] lg:h-[600px] relative flex items-center justify-center group mt-0">

        {/* Hero Product Image */}
        <img
          src={activeProduct.image}
          alt={activeProduct.title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000 ease-out select-none"
          loading="eager"
          fetchpriority="high"
          decoding="async"
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

      {/* Main Page Content: Padded Container for Overview and Grid */}
      <div className="max-w-[94rem] mx-auto px-6 sm:px-12 space-y-20 sm:space-y-28">

        {/* ========================================================================= */}
        {/* OVERVIEW & SPECIFICATIONS SECTION (OVERVIEW LABEL ALIGNED ON FIRST LINE)  */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-start text-left">

          {/* Overview Tagline Label (Enlarged, Lowercase, Aligned with first line of narrative) */}
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
            {typeof activeProduct.overview === 'string' ? (
              <p className="text-lg sm:text-2xl text-[#222222] leading-relaxed font-normal max-w-5xl whitespace-pre-line">
                {activeProduct.overview}
              </p>
            ) : (
              <div className="text-lg sm:text-2xl text-[#222222] leading-relaxed font-normal max-w-5xl">
                {activeProduct.overview}
              </div>
            )}

            {/* Specs List (Category & Features stacked in separate rows as Framer Nova) */}
            <div className="space-y-1 max-w-5xl pt-2">
              <div className="py-4 border-b border-[#DCDAD4] flex items-center justify-between text-base sm:text-lg">
                <span className="font-galano font-medium text-[#737378]">Category:</span>
                <span className="font-galano font-semibold text-[#111111]">{activeProduct.category}</span>
              </div>
              <div className="py-4 border-b border-[#DCDAD4] flex items-center justify-between text-base sm:text-lg">
                <span className="font-galano font-medium text-[#737378]">Features:</span>
                <span className="font-galano font-semibold text-[#111111] text-right">{activeProduct.features}</span>
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
                      loading="lazy"
                      decoding="async"
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
