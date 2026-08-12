import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroVideoZoom from '../components/HeroVideoZoom';
import CompanyLogosMarquee from '../components/CompanyLogosMarquee';
import IdentityQuiz from '../components/IdentityQuiz';
import CardShowcaseModal from '../components/CardShowcaseModal';

export default function HomePage() {
  const [selectedCardModal, setSelectedCardModal] = useState(null);
  const [activeStep, setActiveStep] = useState('discover');

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

  // Catalogue Cards
  const catalogueCards = [
    {
      id: 'du-plex',
      title: 'Du-plex smart card',
      subtitle: 'Hybrid Dual-Tone Finish',
      colorScheme: 'bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] border border-cyan-500/30',
      description: 'Ultra-durable hybrid smart pass engineered for executive teams wanting fast NFC sharing & sleek dual-tone aesthetic.'
    },
    {
      id: 'de-titan',
      title: 'De-titan smart card',
      subtitle: 'Aircraft Titanium Alloy',
      colorScheme: 'bg-gradient-to-br from-slate-700 via-slate-800 to-zinc-900 border border-slate-400/30',
      description: 'Forged from high-density titanium metal. Unmatched weight, tactile luxury, and instant NFC profile transmission.'
    },
    {
      id: 'gold-metal',
      title: 'Gold metal card',
      subtitle: '24K Electroplated Brass',
      colorScheme: 'bg-gradient-to-br from-[#422006] via-[#713F12] to-[#A16207] border border-yellow-400/40',
      description: 'Statement gold metal card designed for ultra-high-net-worth identity presentation and VIP access credentials.'
    },
    {
      id: 'forte-smart',
      title: 'Forte smart card',
      subtitle: 'Carbon Fiber Weave',
      colorScheme: 'bg-gradient-to-br from-[#18181B] via-[#27272A] to-black border border-red-500/20',
      description: 'Lightweight carbon fiber structure engineered for high-performance leaders and modern technology executives.'
    },
    {
      id: 'membership-prestige',
      title: 'Membership prestige',
      subtitle: 'Gunmetal VIP Access',
      colorScheme: 'bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#311042] border border-purple-500/30',
      description: 'Bespoke access pass for private member clubs, luxury resorts, and high-security organizational identity systems.'
    }
  ];

  // Journey Stepper
  const journeySteps = [
    {
      key: 'discover',
      title: 'Discover',
      description: 'We dive deep into your goals, audience, and brand to uncover insights and define a clear identity direction.'
    },
    {
      key: 'design',
      title: 'Design',
      description: 'With strategy in place, we craft stunning visuals and high-performing identity solutions tailored to your needs.'
    },
    {
      key: 'deploy',
      title: 'Deploy',
      description: 'We dive deep into your goals, audience, and brand to uncover insights and define a clear identity direction.'
    },
    {
      key: 'evolve',
      title: 'Evolve',
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
    <div className="w-full">
      
      {/* 1. HERO SECTION (Height min-h-[95vh], pt-48 sm:pt-64 pb-28) */}
      <section className="bg-[#EBEAE6] pt-48 sm:pt-64 pb-28 px-6 sm:px-12 text-center flex flex-col items-center justify-center relative min-h-[95vh]">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <h1 className="animate-hero-fade-1 mt-2 sm:mt-4 text-5xl sm:text-7xl lg:text-[5.25rem] font-sans font-bold tracking-tight text-[#111111] leading-[1.2]">
            Every organization has an <em className="italic-serif text-[#111111]">identity</em>, only few intentionally <em className="italic-serif text-[#111111]">designed</em> it
          </h1>

          <p className="animate-hero-fade-2 text-base sm:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed font-normal">
            We help organizations transform identity from an administrative necessity into a strategic organizational capability.
          </p>

          <div className="animate-hero-fade-3 pt-4">
            <a
              href="https://wa.me/2349030001851"
              target="_blank"
              rel="noopener noreferrer"
              className="framer-pill-button inline-flex items-center gap-2 text-sm px-9 py-4 shadow-lg hover:shadow-2xl transition-all"
            >
              Book a consultation
            </a>
          </div>
        </div>

        {/* Full Width Dynamic Scroll Zoom Video Section (herovideo.mp4) */}
        <div className="animate-hero-fade-4 w-full max-w-[92rem] mx-auto pt-12">
          <HeroVideoZoom />
        </div>
      </section>


      {/* 2. DEFINE HOW YOUR ORGANIZATION IS EXPERIENCED */}
      <section className="bg-[#EBEAE6] py-24 px-6 sm:px-12 border-t border-[#DCDAD4]">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#111111] leading-tight">
              Define how your organization is <em className="italic-serif text-[#111111]">experienced</em>
            </h2>
          </div>

          {/* Client Logos Marquee */}
          <CompanyLogosMarquee />

          {/* Program Services Grid */}
          <div className="space-y-8 pt-6">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777]">Our identity experience program</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((prog) => (
                <div 
                  key={prog.id}
                  className="bg-[#F5F4F0] p-8 rounded-3xl border border-[#DCDAD4] flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#111111] font-sans">{prog.title}</h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">{prog.description}</p>
                  </div>

                  <a
                    href="https://wa.me/2349030001851"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#111111] hover:underline pt-4 border-t border-[#E5E3DC]"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 3. DARK CATALOGUE SECTION */}
      <section className="bg-[#000000] text-white py-28 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">Our identity catalogue</span>
            
            <h2 className="text-3xl sm:text-5xl font-sans font-bold leading-tight">
              Create an <em className="italic-serif text-[#E2B857]">identity</em> so irresistible it becomes a <em className="italic-serif text-white">culture</em>
            </h2>

            <p className="text-sm text-[#999999] max-w-xl mx-auto leading-relaxed">
              Skip the powerpoints, frameworks and short term fixes. Choose a partner with real experience instead.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://wa.me/2349030001851"
                target="_blank"
                rel="noopener noreferrer"
                className="framer-pill-white text-xs px-6 py-3.5"
              >
                Make an identity enquiry
              </a>

              <NavLink
                to="/case-studies"
                className="framer-pill-gold text-xs px-6 py-3.5"
              >
                See more identity case studies
              </NavLink>
            </div>
          </div>

          {/* Cards Catalogue Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {catalogueCards.map((card) => (
              <div 
                key={card.id}
                onClick={() => setSelectedCardModal(card)}
                className="group cursor-pointer p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#E2B857]/50 transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`aspect-[1.586/1] rounded-xl p-5 shadow-xl flex flex-col justify-between ${card.colorScheme}`}>
                    <div className="flex justify-between items-start text-xs font-bold tracking-widest text-white">
                      <span>IDENTIFINE</span>
                      <span className="text-[#E2B857]">⚡</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#AAAAAA]">{card.subtitle}</span>
                      <div className="font-bold text-sm text-white">{card.title}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-[#E2B857] transition-colors">{card.title}</h3>
                    <p className="text-xs text-[#888888] mt-1">{card.subtitle}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#222222] flex items-center justify-between text-xs font-semibold text-[#E2B857]">
                  <span>Inspect Hardware Spec</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 4. TRANSFORMATION JOURNEY */}
      <section className="bg-[#EBEAE6] py-28 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777]">From concept to launch</span>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#111111]">
              Your <em className="italic-serif text-[#111111]">identity</em> transformation journey with <em className="italic-serif text-[#111111]">us</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journeySteps.map((step) => (
              <div 
                key={step.key}
                onClick={() => setActiveStep(step.key)}
                className={`cursor-pointer p-8 rounded-3xl border transition-all ${
                  activeStep === step.key
                    ? 'bg-white border-[#111111] shadow-xl'
                    : 'bg-[#F5F4F0] border-[#DCDAD4] hover:bg-white'
                }`}
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#111111] font-sans">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 5. INSIGHTS & INSPIRATION (JOURNAL) */}
      <section className="bg-[#000000] text-white py-28 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#222222] pb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">Insights & Inspiration</span>
              <h2 className="text-4xl font-sans font-bold mt-1 text-white">journal</h2>
            </div>

            <NavLink
              to="/blog"
              className="framer-pill-white text-xs px-6 py-3 inline-flex items-center gap-2 self-start sm:self-auto"
            >
              View all blogs
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <NavLink
                key={post.id}
                to="/blog"
                className="group p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#E2B857]/50 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#777777] font-mono">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-bold text-lg text-white group-hover:text-[#E2B857] transition-colors leading-snug">
                    {post.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-[#222222] flex items-center gap-2 text-xs font-bold text-[#E2B857]">
                  <span>Read full blog</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </NavLink>
            ))}
          </div>

        </div>
      </section>


      {/* 6. INTERACTIVE DIAGNOSTIC QUIZ */}
      <section className="bg-[#EBEAE6] py-24 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
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
