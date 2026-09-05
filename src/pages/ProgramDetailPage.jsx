import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Assets
import elitePassGold from '../assets/ELITE_PASS_GOLD.png';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.png';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.png';
import elitePassGold2 from '../assets/ELITE_PASS_GOLD_2.png';
import elitePassBlack2 from '../assets/ELITE_PASS_BLACK_MATTE_2.png';
import elitePassSilver2 from '../assets/ELITE_PASS_SILVER_2.png';
import postProcessImg from '../assets/Post process 6.jpg';
import renderOne from '../assets/RENDER 1.png';
import heroImg from '../assets/Hero@4x.png';
import scrollSliderImg from '../assets/Scroll Slider.png';
import scrollSlideImg from '../assets/Scroll Slide.png';
import scrollImg from '../assets/Scroll.png';
import scroll4xImg from '../assets/Scroll4x.png';
import scrollssImg from '../assets/Scrollss.png';
import ab1 from '../assets/ab1.png';
import ab2 from '../assets/ab2.png';
import ab3 from '../assets/ab3.png';
import ab4 from '../assets/ab4.png';
import ab5 from '../assets/ab5.png';
import ab6 from '../assets/ab6.png';
import discoverImg from '../assets/Discover.jpg';
import designImg from '../assets/design.jpg';
import identityImg from '../assets/IDENTITY.jpg';
import techImg from '../assets/TECH.jpg';
import deployImg from '../assets/Deploy.jpg';
import card1Img from '../assets/Card 1.png';

gsap.registerPlugin(ScrollTrigger);

const programData = {
  'identity-discovery': {
    id: 'identity-discovery',
    title: 'Identity Discovery',
    subtitle: 'See how your organization is represented across people, credentials, spaces, communication, and everyday interactions.',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Discovery',
    images: [
      { src: techImg, title: 'Identity Touchpoint Audit', desc: 'Examining the key places where your organization\'s identity is being expressed.' },
      { src: heroImg, title: 'What Is Working Well', desc: 'Identifying the strengths in your existing identity expressions across departments.' },
      { src: scrollssImg, title: 'Disconnected Signals', desc: 'Spotting where identity feels fragmented, inconsistent, or unintentional.' },
      { src: scrollSliderImg, title: 'Opportunity Mapping', desc: 'Highlighting opportunities to create a more consistent and intentional identity experience.' },
      { src: scrollImg, title: 'Discovery Report', desc: 'A clear picture of how your organization is currently being experienced.' }
    ]
  },
  'identity-architecture': {
    id: 'identity-architecture',
    title: 'Identity Architecture',
    subtitle: 'Design how identity works across your organization — people, places, processes and touchpoints.',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Architecture',
    images: [
      { src: card1Img, title: 'Identity Framework Design', desc: 'Defining how organizational identity should be represented across every key touchpoint.' },
      { src: scrollSlideImg, title: 'Departmental Alignment', desc: 'Bringing different departments under a unified identity standard and visual language.' },
      { src: scroll4xImg, title: 'People & Credentials', desc: 'Ensuring employees and executives are represented consistently and with purpose.' },
      { src: techImg, title: 'Physical & Digital Coherence', desc: 'Connecting physical and digital identity experiences into a seamless whole.' },
      { src: elitePassGold2, title: 'Identity Architecture Blueprint', desc: 'A structured plan for consistency, clarity, and purpose across all organizational touchpoints.' }
    ]
  },
  'identity-experience': {
    id: 'identity-experience',
    title: 'Identity Experience',
    subtitle: 'Make identity tangible across physical, digital and human touchpoints.',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Experience',
    images: [
      { src: identityImg, title: 'Tangible Identity', desc: 'Translating identity standards into practical experiences people actually encounter.' },
      { src: elitePassBlack2, title: 'Credential Experience', desc: 'The credentials people carry become a direct expression of organizational identity.' },
      { src: renderOne, title: 'Physical Touchpoints', desc: 'Spaces and places designed to communicate the organization\'s identity consistently.' },
      { src: postProcessImg, title: 'Digital Touchpoints', desc: 'Digital environments that reflect and reinforce organizational identity at every interaction.' },
      { src: elitePassSilver, title: 'Human Experience', desc: 'The moments shaped by people — how they present, interact, and represent the organization.' }
    ]
  },
  'identikare': {
    id: 'identikare',
    title: 'IDENTIKARE',
    subtitle: 'Ongoing care, support and protection to keep your organization\'s identity experience working as intended.',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identikare',
    images: [
      { src: deployImg, title: 'Ongoing Identity Care', desc: 'Continuous support to keep your identity experience current, consistent and dependable.' },
      { src: ab1, title: 'Credential Replacement', desc: 'Fast, hassle-free replacement of lost or outdated identity credentials.' },
      { src: ab2, title: 'Identity Updates', desc: 'Keeping digital profiles, credentials, and representations current as roles evolve.' },
      { src: card1Img, title: 'Maintenance & Support', desc: 'Proactive maintenance of identity systems so they always work as intended.' },
      { src: ab5, title: 'Identity Protection', desc: 'Safeguarding the integrity of your organization\'s identity experience over time.' }
    ]
  }
};

// 1st Slide Top-Center Animated Badge (Strategic Brand Audit Beacon)
function FirstImageAnimation() {
  return (
    <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none">
      <div className="bg-[#0D1117]/90 border border-[#E2B857]/60 shadow-[0_10px_35px_rgba(226,184,87,0.35)] backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3.5 transition-all duration-300 hover:scale-105 hover:border-[#E2B857]">
        {/* Pulsing Radar Beacon */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2B857] opacity-80" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E2B857]" />
        </div>
        <span className="text-xs sm:text-sm font-galano font-bold text-[#E2B857] uppercase tracking-[0.25em] drop-shadow">
          Strategic Brand Audit
        </span>
      </div>
    </div>
  );
}

// 4th Slide Top-Center Animated Badge (Institutional Positioning & Enterprise Signal)
function FourthImageAnimation() {
  return (
    <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none">
      <div className="bg-[#0B0E14]/95 border border-white/30 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3.5 transition-all duration-300 hover:scale-105 hover:border-white/60">
        {/* Animated Signal Bars */}
        <div className="flex items-end gap-1 h-4 w-4 justify-center">
          <span className="w-1 bg-[#E2B857] rounded-full h-2.5 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 bg-[#E2B857] rounded-full h-4 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 bg-[#E2B857] rounded-full h-3 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-xs sm:text-sm font-galano font-bold text-white uppercase tracking-[0.25em] drop-shadow">
          Institutional Positioning
        </span>
      </div>
    </div>
  );
}

export default function ProgramDetailPage() {
  const { id } = useParams();

  const activeKey = (id && programData[id]) ? id : 'identity-discovery';
  const program = programData[activeKey];

  const galleryRef = useRef(null);
  const slideRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slideRefs.current.filter(Boolean);
      if (!slides.length) return;

      const total = slides.length;

      // Set initial states
      slides.forEach((slide, idx) => {
        if (idx === 0) {
          gsap.set(slide, { xPercent: 0, opacity: 1, zIndex: idx + 1 });
        } else {
          gsap.set(slide, { xPercent: 100, opacity: 0, zIndex: idx + 1 });
        }
      });

      // One scrollTrigger per transition (slide N-1 → slide N)
      slides.forEach((slide, idx) => {
        if (idx === 0) return;

        const prevSlide = slides[idx - 1];

        ScrollTrigger.create({
          trigger: galleryRef.current,
          // Each transition occupies an equal share of the pinned scroll space
          start: () => `top+=${(idx - 1) * (window.innerHeight * 0.9)} top`,
          end: () => `top+=${idx * (window.innerHeight * 0.9)} top`,
          pin: false,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress; // 0 → 1 as user scrolls through this segment

            // New slide slides in from right
            gsap.set(slide, {
              xPercent: 100 - p * 100,
              opacity: Math.min(1, p * 2),
            });

            // Old slide fades & drifts left
            gsap.set(prevSlide, {
              xPercent: -(p * 30),
              opacity: Math.max(0, 1 - p * 2),
            });
          }
        });
      });

      // Pin the whole gallery for (total - 1) viewport-heights of scroll
      ScrollTrigger.create({
        trigger: galleryRef.current,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: () => `+=${(total - 1) * window.innerHeight * 0.9}`,
        invalidateOnRefresh: true,
        scrub: true,
      });

    }, galleryRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { clearTimeout(t); ctx.revert(); };
  }, [activeKey]);

  return (
    <div className="bg-[#080B11] text-white overflow-x-hidden selection:bg-[#E2B857] selection:text-black">

      {/* PINNED FULL-SCREEN SCROLL GALLERY */}
      <section
        ref={galleryRef}
        className="w-full h-screen relative overflow-hidden"
      >
        {program.images.map((imgObj, idx) => {

          return (
            <div
              key={idx}
              ref={(el) => (slideRefs.current[idx] = el)}
              className="absolute inset-0 w-full h-full will-change-transform overflow-hidden pointer-events-none"
              style={{ zIndex: idx + 1 }}
            >
              <img
                src={imgObj.src}
                alt={imgObj.title}
                className="w-full h-full object-cover object-center select-none pointer-events-none"
              />
              <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
                <a
                  href={program.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="framer-pill-gold inline-flex items-center gap-2 px-8 py-3 text-sm font-bold tracking-wider uppercase"
                >
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          );
        })}

        {/* Scroll hint on first load */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 opacity-60 pointer-events-none">
          <span className="text-[10px] text-white/70 font-mono uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </section>

    </div>
  );
}
