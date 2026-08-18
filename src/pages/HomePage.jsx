import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroVideoZoom from '../components/HeroVideoZoom';
import CompanyLogosMarquee from '../components/CompanyLogosMarquee';
import IdentityQuiz from '../components/IdentityQuiz';
import CardShowcaseModal from '../components/CardShowcaseModal';
import starIcon from '../assets/SVG@4x.png';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.png';
import elitePassGold from '../assets/ELITE_PASS_GOLD.png';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.png';
import blackMatteRender from '../assets/Black matte render 2.png';
import renderOne from '../assets/RENDER 1.png';
import postProcessImg from '../assets/Post process 6.jpg';
import elitePassGold2 from '../assets/ELITE_PASS_GOLD_2.png';
import elitePassBlack2 from '../assets/ELITE_PASS_BLACK_MATTE_2.png';
import elitePassSilver2 from '../assets/ELITE_PASS_SILVER_2.png';

export default function HomePage() {
  const [selectedCardModal, setSelectedCardModal] = useState(null);
  const [activeStep, setActiveStep] = useState('discover');

  // Scroll reveal IntersectionObserver hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Program Services
  const programs = [
    {
      id: 'consultation',
      title: 'Identity Consultation Services',
      description: 'We craft distinctive corporate brand identities that speak louder than words. We design bold brand identities that capture your mission and connect across every touchpoint.',
    },
    {
      id: 'corporate-design',
      title: 'Corporate Identity Design',
      description: 'Build the clarity, presence, and habits needed to lead with confidence and calm.',
    },
    {
      id: 'creation-experience',
      title: 'Identity Creation & Experience',
      description: "Unlock the collective potential in your organization's identity through intentional design and dialogue.",
    }
  ];

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
      image: postProcessImg,
      description: 'We dive deep into your goals, audience, and brand to uncover insights and define a clear identity direction.'
    },
    {
      key: 'design',
      title: 'Design',
      image: elitePassGold2,
      description: 'With strategy in place, we craft stunning visuals and high-performing identity solutions tailored to your needs.'
    },
    {
      key: 'deploy',
      title: 'Deploy',
      image: elitePassBlack2,
      description: 'We dive deep into your goals, audience, and brand to uncover insights and define a clear identity direction.'
    },
    {
      key: 'evolve',
      title: 'Evolve',
      image: elitePassSilver2,
      description: 'We dive deep into your goals, audience, and brand to uncover insights and define a clear identity direction.'
    }
  ];

  // Blog posts
  const blogPosts = [
    {
      id: '1',
      date: 'Jul 8, 2026',
      readTime: '2 min read',
      title: 'Identity design that converts: What really works in 2026'
    },
    {
      id: '2',
      date: 'Jul 2, 2026',
      readTime: '5 min read',
      title: 'Why corporate identity is the future of organization’s success'
    },
    {
      id: '3',
      date: 'Jun 21, 2026',
      readTime: '2 min read',
      title: 'Identity mistakes you didn’t know you were making'
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      
      {/* 1. HERO SECTION (Height min-h-[95vh], pt-48 sm:pt-64 pb-28) */}
      <section className="bg-[#EBEAE6] pt-48 sm:pt-64 pb-28 px-6 sm:px-12 text-center flex flex-col items-center justify-center relative min-h-[95vh] overflow-hidden">
        <div className="max-w-[840px] w-full mx-auto space-y-12 min-h-[301px] flex flex-col justify-center items-center">
          
          <h1 className="animate-hero-fade-1 mt-2 sm:mt-4 text-5xl sm:text-7xl lg:text-[5.25rem] font-galano font-medium tracking-tight text-[#111111] leading-[1.2] text-center">
            Every organization has an <em className="font-swarsh italic font-normal text-[#111111] px-1.5">identity</em>, only few intentionally designed it
          </h1>

          <p className="animate-hero-fade-2 text-base sm:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed font-medium">
            We help organizations transform identity from an administrative necessity into a strategic organizational capability.
          </p>

          <div className="animate-hero-fade-3 pt-4">
            <a
              href="https://wa.me/2347046367754"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center justify-center text-sm sm:text-base font-bold px-8 py-4 rounded-full bg-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                  <span className="block">Book a consultation</span>
                  <span className="block">Book a consultation</span>
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Full Width Dynamic Scroll Zoom Video Section (herovideo.mp4) */}
        <div className="animate-hero-fade-4 w-full max-w-[92rem] mx-auto pt-12 overflow-hidden">
          <HeroVideoZoom />
        </div>
      </section>


      {/* 2. DEFINE HOW YOUR ORGANIZATION IS EXPERIENCED */}
      <section className="bg-[#EBEAE6] pt-0 pb-20 px-6 sm:px-12 overflow-hidden -mt-12 sm:-mt-16 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="scroll-reveal text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center gap-2.5 max-w-[540px] mx-auto">
              <img 
                src={starIcon} 
                alt="" 
                className="w-4 h-4 object-contain brightness-0" 
              />
              <span 
                className="font-galano font-normal text-[#111111] text-sm sm:text-base"
                style={{ letterSpacing: '5.2px' }}
              >
                Our identity experience program
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[4rem] font-galano font-medium text-[#111111] leading-tight max-w-6xl mx-auto">
              <span className="inline-block whitespace-nowrap">Define how your organization is</span> <br />
              <em className="italic-serif text-[#111111]">experienced</em>
            </h2>
          </div>

          {/* Client Logos Marquee */}
          <div className="scroll-reveal">
            <CompanyLogosMarquee />
          </div>

          {/* Program Services Grid */}
          <div className="space-y-8 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((prog) => (
                <div 
                  key={prog.id}
                  className="scroll-reveal bg-[#F5F4F0] p-8 rounded-3xl border border-[#DCDAD4] flex flex-col justify-between space-y-6 hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-[#111111] font-sans">{prog.title}</h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-medium">{prog.description}</p>
                  </div>

                  <a
                    href="https://wa.me/2349030001851"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-[#111111] hover:underline pt-4 border-t border-[#E5E3DC]"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 3. DARK CATALOGUE SECTION */}
      <section className="bg-[#000000] text-white py-28 px-6 sm:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="scroll-reveal text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center justify-center gap-2.5 max-w-[540px] mx-auto">
              <img 
                src={starIcon} 
                alt="" 
                className="w-4 h-4 object-contain brightness-200" 
              />
              <span 
                className="font-galano font-normal text-white text-sm sm:text-base md:text-lg capitalize"
                style={{ letterSpacing: '5.2px' }}
              >
                Our identity catalogue
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-galano font-medium leading-tight text-[#E2B857] max-w-5xl mx-auto">
              Create an <em className="font-swarsh italic font-normal text-[#E2B857]">identity</em> so irresistible it becomes a <em className="font-swarsh italic font-normal text-[#E2B857]">culture</em>.
            </h2>

            <p className="text-base sm:text-lg text-[#AAAAAA] max-w-2xl mx-auto leading-relaxed font-medium">
              Skip the powerpoints, frameworks and short term fixes. Choose a partner with real experience instead.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://wa.me/2349030001851"
                target="_blank"
                rel="noopener noreferrer"
                className="framer-pill-white text-sm sm:text-base px-8 py-4 font-medium"
              >
                Make an identity enquiry
              </a>

              <NavLink
                to="/case-studies"
                className="framer-pill-gold text-sm sm:text-base px-8 py-4 font-medium"
              >
                See more identity case studies
              </NavLink>
            </div>
          </div>

          {/* Cards Catalogue Dynamic Scroll Deck */}
          <CatalogueScrollDeck 
            catalogueCards={catalogueCards} 
            onSelectCard={(card) => setSelectedCardModal(card)} 
          />

        </div>
      </section>


      {/* 4. TRANSFORMATION JOURNEY */}
      <section className="bg-[#EBEAE6] py-28 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="scroll-reveal text-center space-y-3">
            <div className="inline-flex items-center justify-center gap-2.5 max-w-[540px] mx-auto">
              <img 
                src={starIcon} 
                alt="" 
                className="w-4 h-4 object-contain brightness-0" 
              />
              <span 
                className="font-galano font-normal text-[#111111] text-xs sm:text-sm capitalize"
                style={{ letterSpacing: '5.2px' }}
              >
                From concept to launch
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-galano font-medium text-[#111111]">
              Your <em className="font-swarsh italic font-normal text-[#111111]">identity</em> transformation journey <br /> with <em className="font-swarsh italic font-normal text-[#111111]">us</em>
            </h2>
          </div>

          {/* Sticky Stacking Cards Animation */}
          <JourneyStickyStack journeySteps={journeySteps} />

        </div>
      </section>


      {/* 5. INSIGHTS & INSPIRATION (JOURNAL) */}
      <section className="bg-[#000000] text-white py-28 px-6 sm:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="scroll-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#222222] pb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">Insights & Inspiration</span>
              <h2 className="text-4xl font-sans font-medium mt-1 text-white">journal</h2>
            </div>

            <NavLink
              to="/blog"
              className="framer-pill-white text-xs px-6 py-3 inline-flex items-center gap-2 self-start sm:self-auto font-medium"
            >
              View all blogs
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <NavLink
                key={post.id}
                to="/blog"
                className="scroll-reveal group p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#E2B857]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#777777] font-mono">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-medium text-lg text-white group-hover:text-[#E2B857] transition-colors leading-snug">
                    {post.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-[#222222] flex items-center gap-2 text-xs font-medium text-[#E2B857]">
                  <span>Read full blog</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </NavLink>
            ))}
          </div>

        </div>
      </section>


      {/* 6. INTERACTIVE DIAGNOSTIC QUIZ */}
      <section className="bg-[#EBEAE6] py-28 px-6 sm:px-12 overflow-hidden">
        <div className="scroll-reveal max-w-[1200px] w-full mx-auto">
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

    </div>
  );
}

function CatalogueScrollDeck({ catalogueCards, onSelectCard }) {
  const containerRef = React.useRef(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from 0 (when entering bottom of viewport) to 1 (when exiting top)
      const currentScroll = windowHeight - rect.top;
      const totalRange = windowHeight + rect.height;
      const clampedProgress = Math.max(0, Math.min(1, currentScroll / totalRange));

      setScrollProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Starts offset right (+650px) when entering viewport, and rapidly slides faster to the left (-1000px) as you scroll down
  const translateX = (1 - scrollProgress * 2.8) * 650;

  return (
    <div ref={containerRef} className="relative w-full py-8 overflow-hidden">
      <div 
        style={{
          transform: `translateX(${translateX}px)`,
          transition: 'transform 0.12s ease-out'
        }}
        className="flex items-center justify-start gap-[8px] w-max mx-auto px-4"
      >
        {catalogueCards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectCard(card)}
            className="group cursor-pointer rounded-[40px] overflow-hidden shadow-2xl hover:z-20 hover:scale-[1.03] transition-all duration-300 w-[300px] sm:w-[345px] md:w-[385px] h-[265px] sm:h-[305px] md:h-[345px] shrink-0 relative"
          >
            <img 
              src={card.image} 
              alt={card.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
              <h3 className="font-galano font-normal text-base sm:text-lg text-white group-hover:text-[#E2B857] transition-colors leading-snug">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JourneyStickyStack({ journeySteps }) {
  const topOffsets = ['top-20', 'top-24', 'top-28', 'top-32'];

  return (
    <div className="relative w-full max-w-6xl mx-auto space-y-12 pb-16">
      {journeySteps.map((step, idx) => (
        <div 
          key={step.key}
          className={`sticky ${topOffsets[idx] || 'top-20'} w-full h-[65vh] sm:h-[75vh] rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10`}
          style={{ zIndex: idx + 10 }}
        >
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-8 sm:p-14 flex flex-col justify-end">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#E2B857] mb-1">
              0{idx + 1} — {step.title}
            </span>
            <h3 className="font-galano font-medium text-3xl sm:text-5xl text-white mb-3">
              {step.title}
            </h3>
            <p className="text-base sm:text-lg text-[#D1D5DB] max-w-2xl leading-relaxed font-medium">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
