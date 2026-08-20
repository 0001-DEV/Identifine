import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Assets
import blackMatteRender from '../assets/Black matte render 2.png';
import elitePassGold from '../assets/ELITE_PASS_GOLD.png';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.png';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.png';
import elitePassGold2 from '../assets/ELITE_PASS_GOLD_2.png';
import elitePassBlack2 from '../assets/ELITE_PASS_BLACK_MATTE_2.png';
import elitePassSilver2 from '../assets/ELITE_PASS_SILVER_2.png';
import postProcessImg from '../assets/Post process 6.jpg';
import renderOne from '../assets/RENDER 1.png';
import heroImg from '../assets/Hero@4x.png';
import scrollSlidImg from '../assets/Scroll Slid.png';
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

gsap.registerPlugin(ScrollTrigger);

const programData = {
  'consultation': {
    id: 'consultation',
    title: 'Identity Consultation Services',
    subtitle: 'Strategic Brand Alignment',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Consultation%20Services',
    images: [
      { src: heroImg, title: 'Strategic Brand Audit', desc: 'In-depth analysis of your existing identity touchpoints, physical credentials, and market positioning.' },
      { src: scrollssImg, title: 'Identity Architecture', desc: 'Structuring a unified physical and digital presence for executive leadership teams.' },
      { src: scrollSliderImg, title: 'Executive Credential Strategy', desc: 'Defining high-converting tactile materials that signal trust instantly during corporate introductions.' },
      { src: scrollSlideImg, title: 'Institutional Positioning', desc: 'Aligning internal corporate culture with outward authority for maximum commercial impact.' },
      { src: scrollImg, title: 'Capability Roadmap', desc: 'Full execution blueprint from strategic consultation concept to seamless organizational deployment.' },
      { src: scroll4xImg, title: 'Enterprise Deployment', desc: 'Comprehensive rollout strategy across all organizational touchpoints and stakeholder channels.' }
    ]
  },
  'corporate-design': {
    id: 'corporate-design',
    title: 'Corporate Identity Design',
    subtitle: 'Visual Systems & Architecture',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Corporate%20Identity%20Design',
    images: [
      { src: ab1, title: 'Corporate Identity Design 01', desc: 'Tactile material formulation and bespoke executive finishes.' },
      { src: ab2, title: 'Corporate Identity Design 02', desc: 'Precision engineered finishes balancing ultra-durability with modern elegance.' },
      { src: ab3, title: 'Corporate Identity Design 03', desc: 'Laser-etched metal credentials forged from high-density materials.' },
      { src: ab4, title: 'Corporate Identity Design 04', desc: 'Cohesive brand architecture across physical pass hardware.' },
      { src: ab5, title: 'Corporate Identity Design 05', desc: 'Comprehensive visual design standards for enterprise-wide rollout.' },
      { src: ab6, title: 'Corporate Identity Design 06', desc: 'Executive leadership credentials and premium presentation.' }
    ]
  },
  'creation-experience': {
    id: 'creation-experience',
    title: 'Identity Creation & Experience',
    subtitle: 'Physical & Digital Touchpoints',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Creation%20%26%20Experience',
    images: [
      { src: elitePassBlack2, title: 'NFC Smart Provisioning', desc: 'Instant touch-to-share contactless technology integrated seamlessly inside metal smart cards.' },
      { src: renderOne, title: 'VIP Access Integration', desc: 'Bespoke credentials for private member clubs, luxury resorts, and high-security organizations.' },
      { src: elitePassGold, title: 'High-Net-Worth Presentation', desc: 'First impressions designed to command respect and close high-value deals effortlessly.' },
      { src: postProcessImg, title: 'Cloud Profile Ecosystem', desc: 'Centralized real-time cloud management for updating executive contact profiles instantly.' },
      { src: elitePassSilver, title: 'Continuous Experience Upgrades', desc: 'Regular identity maintenance, analytics, and software upgrades as your firm expands.' }
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

  const activeKey = (id && programData[id]) ? id : 'consultation';
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
          const isMockupLayout = activeKey === 'consultation' || activeKey === 'corporate-design';
          const isFirstSlide = idx === 0;

          // Align perfectly with visual buttons detected in mockup images
          const buttonStyle = isFirstSlide
            ? {
                left: '79.17%',
                top: '81.50%',
                width: '16.39%',
                height: '6.42%',
              }
            : {
                left: '41.81%',
                top: '87.26%',
                width: '16.39%',
                height: '5.97%',
              };

          return (
            <div
              key={idx}
              ref={(el) => (slideRefs.current[idx] = el)}
              className="absolute inset-0 w-full h-full will-change-transform overflow-hidden pointer-events-none"
              style={{ zIndex: idx + 1 }}
            >
              {activeKey === 'consultation' && idx === 0 && <FirstImageAnimation />}
              {activeKey === 'consultation' && idx === 3 && <FourthImageAnimation />}

              {isMockupLayout ? (
                <div
                  className={isFirstSlide ? "cover-container-hero pointer-events-none" : "cover-container-scroll pointer-events-none"}
                >
                  <img
                    src={imgObj.src}
                    alt={imgObj.title}
                    className="w-full h-full select-none pointer-events-none"
                  />
                  <a
                    href={program.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute cursor-pointer z-20 pointer-events-auto"
                    style={buttonStyle}
                  />
                </div>
              ) : (
                <>
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
                </>
              )}
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
