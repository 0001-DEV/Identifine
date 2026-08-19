import React, { useRef, useLayoutEffect } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

const programData = {
  'consultation': {
    id: 'consultation',
    title: 'Identity Consultation Services',
    subtitle: 'Strategic Brand Alignment',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Consultation%20Services',
    images: [
      { src: heroImg,          title: 'Strategic Brand Audit',        desc: 'In-depth analysis of your existing identity touchpoints, physical credentials, and market positioning.' },
      { src: scrollSlidImg,    title: 'Identity Architecture',        desc: 'Structuring a unified physical and digital presence for executive leadership teams.' },
      { src: scrollSliderImg,  title: 'Executive Credential Strategy', desc: 'Defining high-converting tactile materials that signal trust instantly during corporate introductions.' },
      { src: scrollSlideImg,   title: 'Institutional Positioning',    desc: 'Aligning internal corporate culture with outward authority for maximum commercial impact.' },
      { src: scrollImg,        title: 'Capability Roadmap',           desc: 'Full execution blueprint from strategic consultation concept to seamless organizational deployment.' },
      { src: scroll4xImg,      title: 'Enterprise Deployment',        desc: 'Comprehensive rollout strategy across all organizational touchpoints and stakeholder channels.' }
    ]
  },
  'corporate-design': {
    id: 'corporate-design',
    title: 'Corporate Identity Design',
    subtitle: 'Visual Systems & Architecture',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Corporate%20Identity%20Design',
    images: [
      { src: elitePassGold2,   title: 'Tactile Material Formulation', desc: 'Crafting bespoke 24K gold electroplated finishes for executive presentation credentials.' },
      { src: elitePassBlack,   title: 'Dual-Tone Hybrid Design',      desc: 'Precision engineered finishes balancing ultra-durability with modern matte elegance.' },
      { src: elitePassSilver2, title: 'Titanium Hardware Precision',   desc: 'Laser-etched metal passes forged from high-density aerospace-grade titanium alloy.' },
      { src: blackMatteRender, title: 'Visual System Hierarchy',       desc: 'Cohesive brand architecture across physical pass hardware and digital identity assets.' },
      { src: postProcessImg,   title: 'Corporate Brand Specifications',desc: 'Comprehensive visual design standards for enterprise-wide brand rollout.' }
    ]
  },
  'creation-experience': {
    id: 'creation-experience',
    title: 'Identity Creation & Experience',
    subtitle: 'Physical & Digital Touchpoints',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Creation%20%26%20Experience',
    images: [
      { src: elitePassBlack2, title: 'NFC Smart Provisioning',        desc: 'Instant touch-to-share contactless technology integrated seamlessly inside metal smart cards.' },
      { src: renderOne,       title: 'VIP Access Integration',        desc: 'Bespoke credentials for private member clubs, luxury resorts, and high-security organizations.' },
      { src: elitePassGold,   title: 'High-Net-Worth Presentation',   desc: 'First impressions designed to command respect and close high-value deals effortlessly.' },
      { src: postProcessImg,  title: 'Cloud Profile Ecosystem',       desc: 'Centralized real-time cloud management for updating executive contact profiles instantly.' },
      { src: elitePassSilver, title: 'Continuous Experience Upgrades',desc: 'Regular identity maintenance, analytics, and software upgrades as your firm expands.' }
    ]
  }
};

export default function ProgramDetailPage() {
  const { id } = useParams();

  const activeKey = (id && programData[id]) ? id : 'consultation';
  const program = programData[activeKey];

  const galleryRef = useRef(null);
  const slideRefs  = useRef([]);

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
          end:   () => `top+=${idx       * (window.innerHeight * 0.9)} top`,
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
        {program.images.map((imgObj, idx) => (
          <div
            key={idx}
            ref={(el) => (slideRefs.current[idx] = el)}
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{ zIndex: idx + 1 }}
          >
            {/* Full-screen image */}
            <img
              src={imgObj.src}
              alt={imgObj.title}
              className="w-full h-full object-cover object-center select-none"
            />
          </div>
        ))}

        {/* Scroll hint on first load */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 opacity-60 pointer-events-none">
          <span className="text-[10px] text-white/70 font-mono uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* Bottom CTA Section */}
      <div className="max-w-4xl mx-auto text-center px-6 pt-16 pb-12 space-y-6">
        <h3 className="font-galano font-medium text-2xl sm:text-4xl text-white">
          Ready to elevate your organization with{' '}
          <em className="font-swarsh italic font-normal text-[#E2B857]">{program.title}</em>?
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
