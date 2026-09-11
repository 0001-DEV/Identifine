import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Assets
import elitePassGold from '../assets/ELITE_PASS_GOLD.webp';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.webp';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.webp';
import elitePassGold2 from '../assets/ELITE_PASS_GOLD_2.webp';
import elitePassBlack2 from '../assets/ELITE_PASS_BLACK_MATTE_2.webp';
import elitePassSilver2 from '../assets/ELITE_PASS_SILVER_2.webp';
import postProcessImg from '../assets/Post process 6.webp';
import renderOne from '../assets/RENDER 1.webp';
import heroImg from '../assets/Hero@4x.png';
import scrollSliderImg from '../assets/Scroll Slider.png';
import scrollSlideImg from '../assets/Scroll Slide.png';
import scrollImg from '../assets/Scroll.png';
import scroll4xImg from '../assets/Scroll4x.png';
import scrollssImg from '../assets/Scrollss.png';
import ab1 from '../assets/ab1.webp';
import ab2 from '../assets/ab2.webp';
import ab3 from '../assets/ab3.webp';
import ab4 from '../assets/ab4.webp';
import ab5 from '../assets/ab5.webp';
import ab6 from '../assets/ab6.webp';
import discoverImg from '../assets/Discover.webp';
import designImg from '../assets/design.webp';
import identityImg from '../assets/IDENTITY.jpg';
import techImg from '../assets/TECH.jpg';
import deployImg from '../assets/Deploy.webp';
import card1Img from '../assets/Card 1.webp';
import img1 from '../assets/1.webp';
import img2 from '../assets/2.webp';
import twoDollImg from '../assets/two doll.webp';
import img4 from '../assets/4.webp';
import arch1 from '../assets/arch-1.webp';
import arch2 from '../assets/arch-2.webp';
import arch3 from '../assets/arch-3.webp';
import holdImg from '../assets/hold.webp';
import chainImg from '../assets/chain.webp';
import arrowImg from '../assets/arrow.webp';
import goldhumanImg from '../assets/Goldhuman.webp';
import expSlide1 from '../assets/slide 1.webp';
import expSlide2 from '../assets/slide 2.webp';
import expSlide3 from '../assets/Slide 3.webp';
import expSlide4 from '../assets/Slide 4.webp';
import revealImg from '../assets/reveal.jpg';
import blackImg from '../assets/black .jpg';
import printImg from '../assets/print.jpg';
import idkImg1 from '../assets/1 (3).jpg';
import idkImg2 from '../assets/2 copy 2.jpg';
import idkImg3 from '../assets/3 (3).jpg';
import idkImg4 from '../assets/4 (2).jpg';

gsap.registerPlugin(ScrollTrigger);

const programData = {
  'identity-discovery': {
    id: 'identity-discovery',
    title: 'Identity Discovery',
    subtitle: 'See how your organization is represented across people, credentials, spaces, communication, and everyday interactions.',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Discovery',
    images: [
      {
        src: revealImg,
        title: 'Reveal your identity touchpoints.',
        desc: 'See how your people, credentials, spaces, communication, and interactions express your organization.',
        color: '#EAE5CB',
        btnBg: '#EAE5CB',
        btnText: '#111111',
        hasGlassBg: true
      },
      {
        src: img2,
        title: 'Understand what’s working.',
        desc: 'Identify the identity elements that already feel clear, credible, and consistent.',
        color: '#000000',
        titleColor: '#000000',
        descColor: '#E2B857',
        btnBg: '#000000',
        btnText: '#FFFFFF',
        hasGlassBg: true,
        glassStyle: 'clear'
      },
      {
        src: chainImg,
        title: 'Uncover what feels disconnected.',
        desc: 'Spot gaps and inconsistencies between how your organization defines itself and how it is experienced.',
        color: '#000000',
        btnBg: '#000000',
        btnText: '#FFFFFF',
        hasGlassBg: true
      },
      {
        src: img4,
        title: 'Create a more intentional identity.',
        desc: 'Turn your findings into opportunities for a clearer, more consistent, and recognizable organizational experience.',
        color: '#000000',
        btnBg: '#000000',
        btnText: '#FFFFFF',
        hasGlassBg: true
      }
    ]
  },
  'identity-architecture': {
    id: 'identity-architecture',
    title: 'Identity Architecture',
    subtitle: 'Design how identity works across your organization — people, places, processes and touchpoints.',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Architecture',
    images: [
      {
        src: arch1,
        title: 'Eliminate fragmentation.',
        desc: 'Align departments, employees, executives, physical spaces, and digital experiences under clear identity standards.',
        color: '#000000',
        btnBg: '#000000',
        btnText: '#FFFFFF',
        hasGlassBg: true
      },
      {
        src: goldhumanImg,
        title: 'Define how your organization is represented.',
        desc: 'Establish purposeful principles for how identity should show up across the key places people encounter your organization.',
        color: '#000000',
        btnBg: '#000000',
        btnText: '#FFFFFF',
        hasGlassBg: true
      },
      {
        src: blackImg,
        title: 'Build consistency with purpose.',
        desc: 'Create an identity system that is clearer, more connected, and consistently experienced across the organization.',
        color: '#FFFFFF',
        titleColor: '#FFFFFF',
        descColor: '#FFFFFF',
        btnBg: '#FFFFFF',
        btnText: '#111111',
        hasGlassBg: true
      }
    ]
  },
  'identity-experience': {
    id: 'identity-experience',
    title: 'Identity Experience',
    subtitle: 'Make identity tangible across physical, digital and human touchpoints.',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Experience',
    images: [
      {
        src: expSlide1,
        title: 'Bring identity into the real world.',
        desc: 'Turn your identity strategy into experiences people can see, use, and interact with every day.',
        color: '#000000',
        titleColor: '#000000',
        descColor: '#000000',
        btnBg: '#111111',
        btnText: '#FFFFFF',
        hasGlassBg: true,
        glassStyle: 'clear'
      },
      {
        src: printImg,
        title: 'Connect every touchpoint.',
        desc: 'Align people, credentials, spaces, systems, and digital experiences so they feel like one organization.',
        color: '#000000',
        titleColor: '#000000',
        descColor: '#000000',
        btnBg: '#000000',
        btnText: '#FFFFFF',
        hasGlassBg: true
      },
      {
        src: expSlide3,
        title: 'Turn standards into experiences.',
        desc: 'Translate identity principles into practical physical, digital, and human applications.',
        color: '#FFFFFF',
        btnBg: '#FFFFFF',
        btnText: '#111111',
        hasGlassBg: true
      },
      {
        src: expSlide4,
        title: 'Make identity consistently felt.',
        desc: 'Create experiences that reinforce who your organization is at every meaningful point of interaction.',
        color: '#000000',
        btnBg: '#000000',
        btnText: '#FFFFFF',
        hasGlassBg: true
      }
    ]
  },
  'identikare': {
    id: 'identikare',
    title: (
      <>
        IDENTIKARE
        <span className="text-[0.55em] align-super font-bold ml-0.5 inline-block select-none">
          ™
        </span>
      </>
    ),
    subtitle: 'Ongoing care, support and protection to keep your organization\'s identity experience working as intended.',
    whatsappLink: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identikare',
    images: [
      {
        src: idkImg1,
        title: 'Keep Identity Current',
        desc: 'Keep employee details, roles, credentials, and digital profiles up to date.',
        color: '#FFFFFF',
        btnBg: '#E2B857',
        btnText: '#111111',
        hasGlassBg: true
      },
      {
        src: idkImg2,
        title: 'Maintain Every Credential',
        desc: 'Handle replacements, updates, renewals, and changes as organizational needs evolve.',
        color: '#FFFFFF',
        btnBg: '#E2B857',
        btnText: '#111111',
        hasGlassBg: true
      },
      {
        src: idkImg3,
        title: 'Protect Identity Continuity',
        desc: 'Ensure identity systems remain secure, dependable, and ready when needed.',
        color: '#FFFFFF',
        btnBg: '#E2B857',
        btnText: '#111111',
        hasGlassBg: true
      },
      {
        src: idkImg4,
        title: 'Support Every Change',
        desc: 'Provide ongoing care and support that keeps your organization’s identity experience consistent.',
        color: '#FFFFFF',
        btnBg: '#E2B857',
        btnText: '#111111',
        hasGlassBg: true
      }
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
  const navigate = useNavigate();

  const activeKey = (id && programData[id]) ? id : 'identity-discovery';
  const program = programData[activeKey];

  const galleryRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Preload all program slide images to ensure instantaneous display without lag
  useEffect(() => {
    Object.values(programData).forEach((prog) => {
      prog.images.forEach((item) => {
        if (item.src) {
          const img = new Image();
          img.src = item.src;
        }
      });
    });
  }, []);

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

            // Update active slide counter (when progress passes 50%)
            if (p >= 0.5) {
              setActiveSlide(idx);
            } else if (p < 0.5 && idx === 1) {
              setActiveSlide(0);
            }

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
        onUpdate: (self) => {
          const index = Math.min(
            total - 1,
            Math.floor(self.progress * total + 0.05)
          );
          setActiveSlide(index);
        }
      });

    }, galleryRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { clearTimeout(t); ctx.revert(); };
  }, [activeKey]);

  return (
    <div className="bg-[#080B11] text-white overflow-x-clip selection:bg-[#E2B857] selection:text-black">

      {/* PINNED FULL-SCREEN SCROLL GALLERY */}
      <section
        ref={galleryRef}
        className="w-full h-screen relative overflow-hidden"
      >
        {/* Concise Back Button on Each Slide */}
        <button
          onClick={() => navigate(`/#our-identity-experience-program?prog=${activeKey}`)}
          className="absolute top-24 sm:top-28 left-4 sm:left-10 z-50 pointer-events-auto flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          aria-label="Back to Our identity experience program section"
        >
          <ArrowLeft className="w-4 h-4 text-[#E2B857] group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs sm:text-sm font-galano font-bold tracking-wider uppercase">
            Back
          </span>
        </button>

        {/* Top Slide Progress Indicator: 2-Digit Padded Counter Style matching Framer Showcase */}
        <div className="absolute top-24 sm:top-28 left-0 right-0 z-40 pointer-events-none px-6 sm:px-10 max-w-xs sm:max-w-md mx-auto flex items-center justify-center gap-3">
          {/* Current Slide Number (Left) */}
          <span className="text-xs sm:text-sm font-mono font-bold text-[#E2B857] tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-none">
            {String(activeSlide + 1).padStart(2, '0')}
          </span>

          {/* Hairline Progress Track */}
          <div className="relative flex-1 h-[2px] rounded-full bg-white/30 backdrop-blur-sm overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <div
              className="h-full bg-[#E2B857] transition-all duration-500 ease-out shadow-[0_0_8px_#E2B857]"
              style={{
                width: `${((activeSlide + 1) / program.images.length) * 100}%`,
              }}
            />
          </div>

          {/* Total Slides Number (Right) */}
          <span className="text-xs sm:text-sm font-mono font-bold text-white/80 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-none">
            {String(program.images.length).padStart(2, '0')}
          </span>
        </div>

        {program.images.map((imgObj, idx) => {
          const textColor = imgObj.color || '#FFFFFF';
          const titleColor = imgObj.titleColor || imgObj.color || '#FFFFFF';
          const descColor = imgObj.descColor || imgObj.color || '#FFFFFF';
          const btnBg = imgObj.btnBg || imgObj.color || '#E2B857';
          const btnText = imgObj.btnText || (imgObj.color === '#2B2927' ? '#FFFFFF' : '#111111');

          return (
            <div
              key={idx}
              ref={(el) => (slideRefs.current[idx] = el)}
              className="absolute inset-0 w-full h-full will-change-transform overflow-hidden pointer-events-none"
              style={{ zIndex: idx + 1 }}
            >
              {/* Full-screen edge-to-edge image */}
              <img
                src={imgObj.src}
                alt={imgObj.title}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover object-center select-none pointer-events-none"
              />

              {/* Text on top of MAKE AN ENQUIRY button - placed on the deeper and lower part of the picture across all viewports */}
              <div className="absolute bottom-5 sm:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-auto w-full max-w-2xl px-4 sm:px-6 text-center flex flex-col items-center gap-2.5 sm:gap-3.5">
                <div
                  className={`space-y-1 sm:space-y-1.5 transition-all duration-300 ${
                    imgObj.hasGlassBg
                      ? `backdrop-blur-xl ${
                          imgObj.glassStyle === 'clear'
                            ? 'bg-white/80 border-white/90 shadow-2xl'
                            : textColor === '#FFFFFF' || textColor === '#E2B857' || textColor === '#EAE5CB'
                            ? 'bg-white/20 border-white/30'
                            : 'bg-white/40 border-white/50'
                        } border rounded-2xl sm:rounded-3xl px-5 sm:px-8 py-3.5 sm:py-5 shadow-xl w-fit max-w-[92vw] sm:max-w-xl mx-auto`
                      : ''
                  }`}
                >
                  <h3
                    className="text-base xs:text-lg sm:text-2xl md:text-3xl font-galano font-semibold tracking-tight leading-snug max-w-xl mx-auto"
                    style={{ color: titleColor }}
                  >
                    {imgObj.title}
                  </h3>
                  {imgObj.desc && (
                    <p
                      className="text-xs xs:text-sm sm:text-base md:text-lg font-galano font-normal leading-snug max-w-xl mx-auto"
                      style={{ color: descColor }}
                    >
                      {imgObj.desc}
                    </p>
                  )}
                </div>

                {/* MAKE AN ENQUIRY Button */}
                <a
                  href={program.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm font-galano font-bold tracking-wider uppercase rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
                  style={{
                    backgroundColor: btnBg,
                    color: btnText,
                  }}
                >
                  MAKE AN ENQUIRY
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
