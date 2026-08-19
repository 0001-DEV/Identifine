import React, { useRef, useLayoutEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

gsap.registerPlugin(ScrollTrigger);

const programData = {
  'consultation': {
    id: 'consultation',
    title: 'Identity Consultation Services',
    subtitle: 'Strategic Brand Alignment',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Consultation%20Services',
    images: [
      { src: postProcessImg, title: 'Strategic Brand Audit', desc: 'In-depth analysis of your existing identity touchpoints, physical credentials, and market positioning.' },
      { src: blackMatteRender, title: 'Identity Architecture', desc: 'Structuring a unified physical and digital presence for executive leadership teams.' },
      { src: elitePassGold, title: 'Executive Credential Strategy', desc: 'Defining high-converting tactile materials that signal trust instantly during corporate introductions.' },
      { src: renderOne, title: 'Institutional Positioning', desc: 'Aligning internal corporate culture with outward authority for maximum commercial impact.' },
      { src: elitePassSilver, title: 'Capability Roadmap', desc: 'Full execution blueprint from strategic consultation concept to seamless organizational deployment.' }
    ]
  },
  'corporate-design': {
    id: 'corporate-design',
    title: 'Corporate Identity Design',
    subtitle: 'Visual Systems & Architecture',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Corporate%20Identity%20Design',
    images: [
      { src: elitePassGold2, title: 'Tactile Material Formulation', desc: 'Crafting bespoke 24K gold electroplated finishes for executive presentation credentials.' },
      { src: elitePassBlack, title: 'Dual-Tone Hybrid Design', desc: 'Precision engineered finishes balancing ultra-durability with modern matte elegance.' },
      { src: elitePassSilver2, title: 'Titanium Hardware Precision', desc: 'Laser-etched metal passes forged from high-density aerospace-grade titanium alloy.' },
      { src: blackMatteRender, title: 'Visual System Hierarchy', desc: 'Cohesive brand architecture across physical pass hardware and digital identity assets.' },
      { src: postProcessImg, title: 'Corporate Brand Specifications', desc: 'Comprehensive visual design standards for enterprise-wide brand rollout.' }
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

export default function ProgramDetailPage() {
  const { id } = useParams();
  
  // Default to 'consultation' if valid ID not matched
  const activeKey = (id && programData[id]) ? id : 'consultation';
  const program = programData[activeKey];

  const galleryRef = useRef(null);
  const slideRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slideRefs.current.filter(Boolean);
      if (!slides || slides.length === 0) return;

      const totalSlides = slides.length;

      // Initial positions: Slide 0 is active (xPercent: 0, opacity: 1), Slides 1+ start off-screen right (xPercent: 80, opacity: 0)
      slides.forEach((slide, idx) => {
        if (idx === 0) {
          gsap.set(slide, { xPercent: 0, opacity: 1, scale: 1 });
        } else {
          gsap.set(slide, { xPercent: 80, opacity: 0, scale: 0.95 });
        }
      });

      // Pin section and scrub image dissolve transitions from right on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.current,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: () => `+=${(totalSlides - 1) * 110}%`,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (totalSlides - 1),
            duration: { min: 0.2, max: 0.4 },
            ease: 'power1.inOut'
          },
          invalidateOnRefresh: true
        }
      });

      slides.forEach((slide, idx) => {
        if (idx === 0) return;

        const prevSlide = slides[idx - 1];

        tl.to(
          prevSlide,
          {
            xPercent: -40,
            opacity: 0,
            scale: 0.92,
            ease: 'power2.inOut',
            duration: 1
          },
          `slide-${idx}`
        ).to(
          slide,
          {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.inOut',
            duration: 1
          },
          `slide-${idx}`
        );
      });
    }, galleryRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [activeKey]);

  return (
    <div className="min-h-screen bg-[#080B11] text-white pt-20 pb-12 overflow-x-hidden selection:bg-[#E2B857] selection:text-black">
      
      {/* Clean Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4">
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </NavLink>
      </div>

      {/* FULL SCREEN WIDTH 5-PICTURE DISSOLVE GALLERY (NO BORDER, FULL SCREEN WIDTH) */}
      <section
        ref={galleryRef}
        className="w-screen w-full h-screen min-h-[600px] flex items-center justify-center relative overflow-hidden select-none"
      >
        <div className="w-full h-full relative">
          {program.images.map((imgObj, idx) => (
            <div
              key={idx}
              ref={(el) => (slideRefs.current[idx] = el)}
              className="absolute inset-0 w-full h-full overflow-hidden shadow-2xl bg-[#000000] transform-gpu"
              style={{ zIndex: idx + 1 }}
            >
              {/* Picture (Full Screen Width and Height) */}
              <img
                src={imgObj.src}
                alt={imgObj.title}
                className="w-full h-full object-cover object-center select-none"
              />

              {/* Glassmorphism Overlay Card */}
              <div className="absolute bottom-8 left-6 right-6 sm:bottom-12 sm:left-12 max-w-xl p-6 sm:p-8 rounded-3xl bg-black/65 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#E2B857]/20 border border-[#E2B857]/40 text-[#E2B857] text-xs font-mono font-semibold uppercase tracking-wider">
                    0{idx + 1} / 0{program.images.length}
                  </span>
                </div>
                <h3 className="font-galano font-medium text-xl sm:text-3xl text-white mb-2">
                  {imgObj.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                  {imgObj.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Consultation CTA */}
      <div className="max-w-4xl mx-auto text-center px-6 pt-16 pb-12 space-y-6">
        <h3 className="font-galano font-medium text-2xl sm:text-4xl text-white">
          Ready to elevate your organization with <em className="font-swarsh italic font-normal text-[#E2B857]">{program.title}</em>?
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={program.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden inline-flex items-center justify-center text-sm font-bold px-8 py-4 rounded-full bg-white text-black shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
              <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                <span className="block">Book a Consultation</span>
                <span className="block">Book a Consultation</span>
              </span>
            </span>
          </a>
        </div>
      </div>

    </div>
  );
}
