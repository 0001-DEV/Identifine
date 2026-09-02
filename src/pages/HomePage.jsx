import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroVideoZoom from '../components/HeroVideoZoom';
import CompanyLogosMarquee from '../components/CompanyLogosMarquee';
import IdentityQuiz from '../components/IdentityQuiz';
import CardShowcaseModal from '../components/CardShowcaseModal';
import ConsultationModal from '../components/ConsultationModal';
import starIcon from '../assets/SVG@4x.png';
import JourneyStickyStack from '../components/JourneyStickyStack';
import ProgramAccordionShowcase from '../components/ProgramAccordionShowcase';
import CataloguePinnedHorizontalDeck from '../components/CataloguePinnedHorizontalDeck';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.png';
import elitePassGold from '../assets/ELITE_PASS_GOLD.png';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.png';
import blackMatteRender from '../assets/Black matte render 2.png';
import renderOne from '../assets/RENDER 1.png';
import postProcessImg from '../assets/Post process 6.jpg';
import elitePassGold2 from '../assets/ELITE_PASS_GOLD_2.png';
import elitePassBlack2 from '../assets/ELITE_PASS_BLACK_MATTE_2.png';
import elitePassSilver2 from '../assets/ELITE_PASS_SILVER_2.png';
import discoverImg from '../assets/Discover.jpg';
import designImg from '../assets/design.jpg';
import deployImg from '../assets/Deploy.jpg';
import evolveImg from '../assets/Evolve.png';

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedCardModal, setSelectedCardModal] = useState(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  // Catalogue Cards with Real Assets
  const catalogueCards = [
    {
      id: 'du-plex',
      title: 'Du-plex smart card',
      subtitle: 'Hybrid Dual-Tone Finish',
      image: elitePassBlack,
      description: 'Ultra-durable hybrid smart pass engineered for executive teams wanting fast NFC sharing & sleek dual-tone aesthetic.'
    },
    {
      id: 'de-titan',
      title: 'De-titan smart card',
      subtitle: 'Aircraft Titanium Alloy',
      image: elitePassSilver,
      description: 'Forged from high-density titanium metal. Unmatched weight, tactile luxury, and instant NFC profile transmission.'
    },
    {
      id: 'gold-metal',
      title: 'Gold metal card',
      subtitle: '24K Electroplated Brass',
      image: elitePassGold,
      description: 'Statement gold metal card designed for ultra-high-net-worth identity presentation and VIP access credentials.'
    },
    {
      id: 'forte-smart',
      title: 'Forte smart card',
      subtitle: 'Carbon Fiber Weave',
      image: blackMatteRender,
      description: 'Lightweight carbon fiber structure engineered for high-performance leaders and modern technology executives.'
    },
    {
      id: 'membership-prestige',
      title: 'Membership prestige',
      subtitle: 'Gunmetal VIP Access',
      image: renderOne,
      description: 'Bespoke access pass for private member clubs, luxury resorts, and high-security organizational identity systems.'
    }
  ];

  // Journey Stepper with Pure Asset Images
  const journeySteps = [
    {
      key: 'discover',
      title: 'Discover',
      image: discoverImg,
      description: 'We dive deep into your goals, audience, and brand to uncover insights and define a clear identity direction.'
    },
    {
      key: 'design',
      title: 'Design',
      image: designImg,
      description: 'With strategy in place, we craft stunning visuals and high-performing identity solutions tailored to your needs.'
    },
    {
      key: 'deploy',
      title: 'Deploy',
      image: deployImg,
      description: 'We seamlessly roll out your physical & digital identity assets with precision manufacturing and secure provisioning.'
    },
    {
      key: 'evolve',
      title: 'Evolve',
      image: evolveImg,
      description: 'We continuously refine, maintain, and upgrade your identity ecosystem to stay ahead as your organization grows.'
    }
  ];

  // Blog posts from WordPress REST API
  const [blogPosts, setBlogPosts] = useState([
    {
      id: '1',
      slug: 'design-that-converts-what-really-works-in-2026',
      date: 'Jul 8, 2026',
      readTime: '2 min read',
      title: 'Identity design that converts: What really works in 2026',
      image: postProcessImg,
      category: 'Design Strategy'
    },
    {
      id: '2',
      slug: 'why-corporate-identity-is-the-future-of-organizations-success',
      date: 'Jul 2, 2026',
      readTime: '5 min read',
      title: 'Why corporate identity is the future of organization’s success',
      image: renderOne,
      category: 'Corporate Growth'
    },
    {
      id: '3',
      slug: 'identity-mistakes-you-didnt-know-you-were-making',
      date: 'Jun 21, 2026',
      readTime: '2 min read',
      title: 'Identity mistakes you didn’t know you were making',
      image: blackMatteRender,
      category: 'Brand Audit'
    }
  ]);

  useEffect(() => {
    let isMounted = true;
    async function loadLatestWp() {
      const { fetchWpPosts } = await import('../api/wordpress');
      const wpData = await fetchWpPosts(1, 3);
      if (isMounted && wpData && wpData.length > 0) {
        const defaultImgs = [postProcessImg, renderOne, blackMatteRender];
        setBlogPosts(wpData.map((p, idx) => ({
          ...p,
          image: p.image || defaultImgs[idx % 3]
        })));
      }
    }
    loadLatestWp();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="w-full">

      {/* 1. HERO SECTION (Height min-h-[95vh], pt-48 sm:pt-64 pb-[300px]) */}
      <section className="bg-[#EBEAE6] pt-48 sm:pt-64 pb-32 px-6 sm:px-12 text-center flex flex-col items-center justify-center relative min-h-[95vh] overflow-hidden">
        <div className="max-w-[840px] w-full mx-auto space-y-12 min-h-[301px] flex flex-col justify-center items-center">

          <h1 className="animate-hero-fade-1 mt-2 sm:mt-4 text-4xl sm:text-7xl lg:text-[5.25rem] font-galano font-medium tracking-tight text-[#111111] leading-[1.2] text-center">
            Every organization has an <em className="font-swarsh italic font-normal text-[#111111] px-1.5">identity</em>, only few intentionally designed it
          </h1>

          <p className="animate-hero-fade-2 text-base sm:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed font-medium">
            We help organizations transform identity from an administrative necessity into a strategic organizational capability.
          </p>

          <div className="pt-4">
            <a
              href="https://wa.me/2349030001851"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center text-xs sm:text-base font-bold px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Make an Enquiry</span>
            </a>
          </div>
        </div>

      </section>

      {/* Full Width Scroll Zoom Video Section */}
      <HeroVideoZoom />


      {/* 2. DEFINE HOW YOUR ORGANIZATION IS EXPERIENCED */}
      <section className="bg-[#EBEAE6] pt-4 pb-20 px-6 sm:px-12 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">

          <div className="text-center max-w-4xl mx-auto space-y-4">
            {/* Title Badge */}
            <div className="inline-flex items-center justify-center gap-2 mx-auto">
              <img
                src={starIcon}
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 object-contain brightness-0"
              />
              <span
                className="font-galano font-normal text-[#111111] text-sm sm:text-lg tracking-[3px] sm:tracking-[5px] whitespace-nowrap"
              >
                Our identity experience program
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] font-galano font-medium text-[#111111] leading-tight max-w-6xl mx-auto">
              <span className="inline-block whitespace-nowrap">Define how your organization is</span> <br />
              <em className="font-swarsh italic font-normal text-[#111111]">experienced</em>
            </h2>
          </div>

          {/* Program Accordion Showcase */}
          <div>
            <ProgramAccordionShowcase />
          </div>

          {/* Client Logos Marquee (AFTER CONTAINER) */}
          <div className="my-28 sm:my-40 lg:my-52">
            <CompanyLogosMarquee />
          </div>

        </div>
      </section>


      {/* 3. OUR IDENTITY CATALOGUE (STICKY PINNED HORIZONTAL SCROLL DECK) */}
      <CataloguePinnedHorizontalDeck
        catalogueCards={catalogueCards}
        onSelectCard={(card) => navigate(`/product-catalogue?id=${card.id}`)}
      />


      {/* 4. TRANSFORMATION JOURNEY */}
      <section className="bg-[#EBEAE6] pt-28 pb-48 sm:pb-60 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto space-y-16">

          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center gap-2 mx-auto">
              <img
                src={starIcon}
                alt=""
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain brightness-0"
              />
              <span
                className="font-galano font-normal text-[#111111] text-xs sm:text-sm uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap"
              >
                From concept to launch
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-galano font-medium text-[#111111]">
              Your <em className="font-swarsh italic font-normal text-[#111111]">identity</em> transformation journey <br /> with <em className="font-swarsh italic font-normal text-[#111111]">us</em>
            </h2>
          </div>

        </div>

        {/* Sticky Stacking Cards */}
        <div className="mt-16 mx-0 lg:mx-[200px]">
          <JourneyStickyStack journeySteps={journeySteps} />
        </div>

      </section>


      {/* 5. INSIGHTS & INSPIRATION (JOURNAL) */}
      <section className="bg-[#000000] text-white py-28 sm:py-36 px-6 sm:px-12 overflow-hidden border-t border-[#222222]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Vertically Arranged Text & Button - Shifted Upwards */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 -mt-8 sm:-mt-12 lg:-mt-16">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <img
                    src={starIcon}
                    alt=""
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain brightness-200"
                  />
                  <span
                    className="font-galano font-medium text-white text-xs sm:text-sm uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap"
                  >
                    insights & inspiration
                  </span>
                </div>

                <h2 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-galano font-medium text-white tracking-tight leading-[1.1]">
                  <span className="block">Explore</span>
                  <span className="block">our <span className="text-[#E2B857]">latest</span></span>
                  <em className="font-swarsh italic font-normal text-white block">journal</em>
                </h2>
              </div>

              <div className="pt-2">
                <NavLink
                  to="/blog"
                  className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full bg-white text-black shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  View all blogs
                </NavLink>
              </div>
            </div>

            {/* Right Column: Blog Containers Arranged Vertically */}
            <div className="lg:col-span-7 space-y-4">
              {blogPosts.map((post) => (
                <NavLink
                  key={post.id}
                  to={`/blog/${post.slug || post.id}`}
                  className="group p-3.5 sm:p-4 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#E2B857]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-center gap-5 overflow-hidden shadow-xl"
                >
                  {/* Inside Container - Dedicated Left Space: Compact Image from Assets */}
                  <div className="w-full sm:w-44 h-36 sm:h-32 rounded-xl overflow-hidden bg-black/60 relative border border-[#222222] shrink-0 flex items-center justify-center p-1">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                  </div>

                  {/* Inside Container - Dedicated Right Space: Text Details */}
                  <div className="w-full sm:flex-1 flex flex-col justify-between py-1 pr-1 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#777777] font-mono">
                        <span className="text-[#E2B857]">{post.category}</span>
                        <span>{post.date} • {post.readTime}</span>
                      </div>

                      <h3 className="font-galano font-medium text-base sm:text-lg text-white group-hover:text-[#E2B857] transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-[#222222] flex items-center gap-2 text-xs font-medium text-[#E2B857]">
                      <span>Read full blog</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* 6. INTERACTIVE DIAGNOSTIC QUIZ */}
      <section className="bg-[#EBEAE6] py-28 px-6 sm:px-12 overflow-hidden">
        <div className="max-w-[1200px] w-full mx-auto">
          <IdentityQuiz />
        </div>
      </section>


      {/* MODAL VIEW */}
      {selectedCardModal && (
        <CardShowcaseModal
          card={selectedCardModal}
          onClose={() => setSelectedCardModal(null)}
          onEnquire={(card) => {
            setSelectedCardModal(null);
            window.open(`https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20the%20${encodeURIComponent(card.title)}`, '_blank');
          }}
        />
      )}

      {/* CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />

    </div>
  );
}
