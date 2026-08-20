import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import starIcon from '../assets/SVG@4x.png';

// High-res Filled Solid Social Media Icons
function FilledInstagram({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FilledTwitter({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FilledLinkedin({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function FilledFacebook({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  );
}

// Animated Counter Component
function AnimatedNumber({ target, suffix = '', duration = 1600 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const start = 0;
          const end = parseInt(target, 10) || 0;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(start + easeOut * (end - start)));

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function AboutUsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Team members configuration (Easily replaceable images & links)
  const teamMembers = [
    {
      id: 'debo',
      name: 'Debo Atiba',
      role: 'Founder & CEO',
      image: 'https://framerusercontent.com/images/cLch6kcbrpx7WPsMJPFoTfqRaGE.jpg',
      featured: true,
      socials: [
        { icon: FilledInstagram, href: 'https://www.instagram.com/' },
        { icon: FilledTwitter, href: 'https://x.com/' },
        { icon: FilledLinkedin, href: 'https://www.linkedin.com/' }
      ]
    },
    {
      id: 'josh-i',
      name: 'Josh Itorobong',
      role: 'Creative Director',
      image: 'https://framerusercontent.com/images/48WyQJeURdcPunobsncnaBihT9k.jpg',
      socials: [
        { icon: FilledInstagram, href: 'https://www.instagram.com/' },
        { icon: FilledTwitter, href: 'https://x.com/' },
        { icon: FilledFacebook, href: 'https://www.facebook.com/' }
      ]
    },
    {
      id: 'josh-o',
      name: 'Josh Oladele',
      role: 'Brand Identity Strategist',
      image: 'https://framerusercontent.com/images/GpLKgye5A02eHS42pPFoeFUcxI.jpg',
      socials: [
        { icon: FilledInstagram, href: 'https://www.instagram.com/' },
        { icon: FilledFacebook, href: 'https://www.facebook.com/' }
      ]
    },
    {
      id: 'zino',
      name: 'Zino Amayido',
      role: 'Brand Identity Designer',
      image: 'https://framerusercontent.com/images/qJFzuq7AyZaTeFF1fJXIeGhCDD8.jpg',
      socials: [
        { icon: FilledInstagram, href: 'https://www.instagram.com/' },
        { icon: FilledTwitter, href: 'https://x.com/' }
      ]
    },
    {
      id: 'dmt',
      name: 'DMT',
      role: 'Brand Identity Designer',
      image: 'https://framerusercontent.com/images/7lajaR92ZTGup0dTaH2WDxEb0Dk.jpg',
      socials: [
        { icon: FilledInstagram, href: 'https://www.instagram.com/' },
        { icon: FilledTwitter, href: 'https://x.com/' },
        { icon: FilledFacebook, href: 'https://www.facebook.com/' }
      ]
    },
    {
      id: 'barakat',
      name: 'Barakat',
      role: 'Motion Designer',
      image: 'https://framerusercontent.com/images/l90peC6TbXGmtp1UQjahjzCyg.jpg',
      socials: [
        { icon: FilledTwitter, href: 'https://x.com/' },
        { icon: FilledFacebook, href: 'https://www.facebook.com/' }
      ]
    },
    {
      id: 'nathaniel',
      name: 'Nathaniel Aremu',
      role: '3D Artist',
      image: 'https://framerusercontent.com/images/0xC6c3pgBLh7pCoQS4AJP6eqUU.jpg',
      socials: [
        { icon: FilledInstagram, href: 'https://www.instagram.com/' },
        { icon: FilledFacebook, href: 'https://www.facebook.com/' }
      ]
    }
  ];

  // FAQ list
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer comprehensive corporate identity design, strategy, brand audits, executive identity solutions, and premium NFC card ecosystems."
    },
    {
      question: "Do you work with startups or only big brands?",
      answer: "We work with organizations of all sizes—from ambitious startups looking to establish a strong foundational identity, to enterprise organizations needing comprehensive identity realignment."
    },
    {
      question: "How long does a typical project take?",
      answer: "A standard identity transformation project typically takes 4 to 8 weeks, depending on the scope, scale, and specific requirements of your organization."
    },
    {
      question: "What’s your pricing structure?",
      answer: "Our pricing is project-based and tailored to your specific needs. After our initial consultation, we provide a detailed proposal outlining the scope and investment required."
    }
  ];

  // Goals list
  const goals = [
    'Clear and focused strategy',
    'Design that drives impact',
    'Collaboration without the chaos',
    'Outcomes that build momentum',
    'Smart solutions, tailored for you'
  ];

  return (
    <div className="bg-[#EBEAE6] min-h-screen pt-36 sm:pt-44 pb-24 px-6 sm:px-12 text-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-[10rem] sm:space-y-[13.5rem] lg:space-y-[16rem]">

        {/* ========================================================= */}
        {/* 1. HERO & THE IDENTIFINE STORY SECTION                    */}
        {/* ========================================================= */}
        <section className="space-y-14 w-full pt-4">

          {/* Main Hero Header - 3 Lines Bold Far Left Aligned */}
          <div className="scroll-reveal space-y-1 text-left w-full">
            <h1 className="text-5xl sm:text-7xl lg:text-[6.25rem] font-galano font-medium tracking-tight text-[#111111] leading-[1.06] text-left">
              <span className="block">
                We craft <em className="font-swarsh italic font-medium text-[#111111] px-1.5">identity</em>
              </span>
              <span className="block">that change the</span>
              <span className="block">game</span>
            </h1>
          </div>

          {/* Story Narrative Section - Shifted further from the left margin */}
          <div className="scroll-reveal space-y-8 max-w-4xl lg:ml-36 xl:ml-52 pt-6 text-left">
            <div className="inline-flex items-center justify-start gap-2.5">
              <img
                src={starIcon}
                alt=""
                className="w-4 h-4 object-contain brightness-0"
              />
              <span
                className="font-galano font-bold text-xs sm:text-sm text-[#111111] tracking-widest uppercase"
                style={{ letterSpacing: '4px' }}
              >
                The Identifine Story
              </span>
            </div>

            <div className="space-y-6 text-base sm:text-lg lg:text-[1.2rem] text-[#111111] leading-relaxed font-bold text-left max-w-3xl">
              <p className="font-bold">
                We thought we were building better identity cards, so we obsessed over premium materials, flawless craftsmanship, and technology that could elevate how people represented their organizations. Every card we created was designed to leave a lasting impression. But over time, we noticed something. Our clients rarely talked about cards,
              </p>
              <p className="font-bold">
                they talked about Culture. Leadership. Consistency. Trust. They asked how every employee could reflect the same standard of excellence, how every visitor experience could reinforce their brand, and how every interaction could communicate who they truly are. That was our turning point.
              </p>
              <p className="font-bold">
                We realized organizations don't have an ID card problem. They have an identity challenge, because identity isn't a product. It's an experience. It's felt through people, workplaces, processes, technology, and every moment that shapes perception. The card is simply one expression of that bigger story. That realization transformed Identifine. Today, we help organizations intentionally design how their identity is represented, experienced, and managed. Our premium credentials, smart NFC technology, executive identity solutions, and branded touchpoints work together as one integrated identity ecosystem, helping organizations build clarity, consistency, trust, and distinction at every level.
              </p>
              <p className="font-bold">
                Through our Identity Transformation Journey, Discover. Design. Deploy. Evolve., and our 5P Identity Framework spanning Purpose, People, Places, Processes, and Presence, we help organizations turn identity into a strategic advantage, because every organization tells a story. The question is whether that story is being told by design... or by default.
              </p>
            </div>

            <div className="pt-4 flex justify-start">
              <a
                href="https://wa.me/2349030001851"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-flex items-center justify-center text-sm sm:text-base font-semibold px-10 py-5 sm:py-5.5 rounded-full bg-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[58px]"
              >
                <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                  <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                    <span className="block">Contribute to the story</span>
                    <span className="block">Contribute to the story</span>
                  </span>
                </span>
              </a>
            </div>
          </div>

        </section>


        {/* ========================================================= */}
        {/* 2. MEET OUR TEAM SECTION (FULL WIDTH BLACK BACKGROUND)    */}
        {/* ========================================================= */}
        <section className="bg-[#000000] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 w-screen relative left-1/2 -translate-x-1/2 border-y border-[#222222] shadow-2xl space-y-16 my-8">
          <div className="max-w-[84rem] mx-auto space-y-12">

            {/* Header: Badge left aligned, Heading centered */}
            <div className="scroll-reveal space-y-4">
              <div className="inline-flex items-center justify-start gap-2.5">
                <img
                  src={starIcon}
                  alt=""
                  className="w-4 h-4 object-contain brightness-200"
                />
                <span
                  className="font-galano font-medium text-base sm:text-lg text-white/90 normal-case"
                  style={{ letterSpacing: '6px' }}
                >
                  meet our team
                </span>
              </div>
              <h2 className="text-6xl sm:text-8xl lg:text-[5.75rem] font-galano font-medium text-white leading-[1.12] text-center max-w-6xl mx-auto py-2">
                The team that <em className="font-swarsh italic font-medium text-white px-1">builds</em> <span className="font-galano font-medium">bold</span>
              </h2>
            </div>

            {/* Team Grid Layout - 4-Column Asymmetric Layout with Founder Card Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-3 sm:gap-3.5 lg:gap-4 auto-rows-fr items-stretch">
              {teamMembers.map((member, idx) => (
                <div
                  key={member.id}
                  className={`scroll-reveal group relative rounded-[28px] overflow-hidden bg-[#111111] border border-[#222222] shadow-md transition-all duration-500 hover:border-[#E2B857]/40 hover:shadow-2xl ${idx === 0
                      ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2 min-h-[520px] lg:min-h-[720px] h-full'
                      : 'min-h-[350px] h-full'
                    }`}
                >
                  {/* Full-bleed Color Team Photo with Synchronized Zoom Effect */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.14] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
                    loading="lazy"
                  />

                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                  {/* Top Right Floating Vertical Socials - Synchronized Slide Down from UP with Image Zoom */}
                  <div className="absolute top-5 right-5 z-20 pointer-events-none group-hover:pointer-events-auto">
                    <div className="flex flex-col items-center gap-2.5">
                      {member.socials.map((soc, sIdx) => {
                        const IconComponent = soc.icon;
                        return (
                          <a
                            key={sIdx}
                            href={soc.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              transitionDelay: `${sIdx * 70}ms`
                            }}
                            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-[#E2B857] hover:text-black hover:border-[#E2B857] shadow-2xl transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 -translate-y-8 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
                            aria-label={member.name}
                          >
                            <IconComponent className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Left Corner: Name and Role */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10 text-left">
                    <h3 className="font-galano font-bold text-2xl sm:text-3xl text-white group-hover:text-[#E2B857] transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm text-white/80 font-normal mt-1 tracking-wide">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* ========================================================= */}
        {/* 3. TURNING VISION INTO REALITY (MISSION & GOALS)          */}
        {/* ========================================================= */}
        <section className="space-y-14 py-4">
          {/* Header: Badge left aligned in lowercase, Heading centered */}
          <div className="scroll-reveal space-y-4">
            <div className="inline-flex items-center justify-start gap-2.5">
              <img
                src={starIcon}
                alt=""
                className="w-4 h-4 object-contain brightness-0"
              />
              <span
                className="font-galano font-medium text-base sm:text-lg text-[#111111] normal-case"
                style={{ letterSpacing: '5px' }}
              >
                not just another agency
              </span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-galano font-medium text-[#111111] leading-[1.12] text-center max-w-5xl mx-auto py-2">
              Turning <em className="font-swarsh italic font-medium text-[#111111] px-1">vision</em> into <span className="font-galano font-medium">reality</span>
            </h2>
          </div>

          {/* Photo on Left, Mission & Goal 2-Column Grid on Right (Top & Bottom Aligned to Picture) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">

            {/* Left Photo & Quote Card (Reduced height by 12px: 548px) */}
            <div className="scroll-reveal lg:col-span-5 rounded-[32px] overflow-hidden relative min-h-[508px] lg:min-h-[548px] flex flex-col justify-end p-8 sm:p-10 border border-[#DCDAD4] group shadow-sm">
              <img
                src="https://framerusercontent.com/images/Dj4ocCol5pMn5REI6UxlIzJllk.jpg"
                alt="Debo Atiba"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="relative z-10 text-white space-y-4 text-left">
                <p className="text-lg sm:text-xl font-galano font-normal leading-relaxed text-white/90">
                  “Every great project begins with a simple conversation — let’s start yours.”
                </p>
                <div className="pt-2 border-t border-white/20">
                  <div className="font-bold text-base text-white">Debo Atiba</div>
                  <div className="text-xs text-white/70 font-mono">Founder & CEO</div>
                </div>
              </div>
            </div>

            {/* Right Side: 2 Columns for Our Mission and Our Goal */}
            <div className="scroll-reveal lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 items-stretch text-left pt-1 lg:pl-4">

              {/* Column 1: Our Mission */}
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-galano font-bold text-[#111111]">
                    Our mission
                  </h3>
                  <p className="text-sm sm:text-base text-[#444444] leading-relaxed font-normal">
                    To empower brands' identity through bold design, strategic thinking, and <strong className="font-semibold text-[#111111]">experiences</strong> that inspire action and create lasting impact. To help <strong className="font-semibold text-[#111111]">businesses</strong> stand out through thoughtful branding and <strong className="font-semibold text-[#111111]">high-performance identity solutions</strong> rooted in creativity and clarity.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://wa.me/2349030001851"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full bg-black text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                        <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                          <span className="block">Know more about us</span>
                          <span className="block">Know more about us</span>
                        </span>
                      </span>
                    </a>
                  </div>
                </div>

                {/* © 2026 Identifine under Know more about us, aligned near image bottom line */}
                <div className="text-base sm:text-lg text-black font-normal font-mono pt-6 lg:pt-10">
                  © 2026 Identifine
                </div>
              </div>

              {/* Column 2: Our Goal */}
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-galano font-bold text-[#111111]">
                    Our goal
                  </h3>
                  <div className="space-y-4">
                    {goals.map((goal, gIdx) => (
                      <div key={gIdx} className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#111111] shrink-0" />
                        <span className="text-sm sm:text-base font-medium text-[#222222]">
                          {goal}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ========================================================= */}
        {/* 4. STATS & METRICS GRID (ANIMATED NUMBERS)                */}
        {/* ========================================================= */}
        <section className="w-screen relative left-1/2 -translate-x-1/2 px-6 sm:px-12 lg:px-16 py-4 my-4">
          <div className="max-w-[96rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">

            {/* Card 1: Experience */}
            <div className="scroll-reveal bg-[#F5F4F0] border border-[#DCDAD4] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between min-h-[328px] sm:min-h-[358px] shadow-sm hover:border-[#111111]/30 transition-all">
              <span className="text-sm sm:text-base font-galano font-semibold text-black">
                Years of experience
              </span>
              <div className="flex items-end justify-between gap-2.5 mt-auto pt-6">
                <div className="text-5xl sm:text-6xl font-galano font-normal italic text-[#111111] leading-none shrink-0 tracking-tight">
                  <AnimatedNumber target="14" suffix="+" />
                </div>
                <div className="text-sm sm:text-base text-[#333333] font-normal text-right leading-relaxed shrink-0">
                  <span className="block whitespace-nowrap">Expertise that drives</span>
                  <span className="block whitespace-nowrap">meaningful results.</span>
                </div>
              </div>
            </div>

            {/* Card 2: Clients Worldwide (BLACK BACKGROUND) */}
            <div className="scroll-reveal bg-[#111111] border border-[#222222] text-white rounded-[32px] p-8 sm:p-10 flex flex-col justify-between min-h-[328px] sm:min-h-[358px] shadow-xl hover:border-[#E2B857]/40 transition-all">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#222222] object-cover" src="https://framerusercontent.com/images/jm0dvrhBRn67BN7gXkLvk9Ymi4.jpg" alt="" />
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#222222] object-cover" src="https://framerusercontent.com/images/rvVsRZjAKkiA0nvOxWWVXzG9L6s.jpg" alt="" />
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#222222] object-cover" src="https://framerusercontent.com/images/nSZJQpCu25uRO9lrT3cjUnyKmk.jpg" alt="" />
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-[#222222] object-cover" src="https://framerusercontent.com/images/OmhA69HM1VbnEMV63I5CAKdlNlk.jpg" alt="" />
                  </div>
                  <span className="text-sm sm:text-base font-galano font-semibold text-white">Clients worldwide</span>
                </div>
                <span className="text-xs font-bold text-black bg-[#E2B857] px-3 py-1 rounded-full shadow-md shrink-0">
                  98% Retention
                </span>
              </div>
              <div className="flex items-end justify-between gap-2.5 mt-auto pt-6">
                <div className="text-5xl sm:text-6xl font-galano font-normal italic text-white leading-none shrink-0 tracking-tight">
                  <AnimatedNumber target="98" suffix="%" />
                </div>
                <div className="text-sm sm:text-base text-white/90 font-normal text-right leading-relaxed shrink-0">
                  <span className="block whitespace-nowrap">Happy clients worldwide</span>
                  <span className="block whitespace-nowrap">staying for quality.</span>
                </div>
              </div>
            </div>

            {/* Card 3: Projects Delivered */}
            <div className="scroll-reveal bg-[#F5F4F0] border border-[#DCDAD4] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between min-h-[328px] sm:min-h-[358px] shadow-sm hover:border-[#111111]/30 transition-all">
              <span className="text-sm sm:text-base font-galano font-semibold text-black">
                Projects delivered
              </span>
              <div className="flex items-end justify-between gap-2.5 mt-auto pt-6">
                <div className="text-5xl sm:text-6xl font-galano font-normal italic text-[#111111] leading-none shrink-0 tracking-tight">
                  <AnimatedNumber target="100" suffix="+" />
                </div>
                <div className="text-sm sm:text-base text-[#333333] font-normal text-right leading-relaxed shrink-0">
                  <span className="block whitespace-nowrap">Creative solutions</span>
                  <span className="block whitespace-nowrap">built with purpose.</span>
                </div>
              </div>
            </div>

            {/* Card 4: Brands Transformed */}
            <div className="scroll-reveal bg-[#F5F4F0] border border-[#DCDAD4] rounded-[32px] p-8 sm:p-10 flex flex-col justify-between min-h-[328px] sm:min-h-[358px] shadow-sm hover:border-[#111111]/30 transition-all">
              <span className="text-sm sm:text-base font-galano font-semibold text-black">
                Brands transformed
              </span>
              <div className="flex items-end justify-between gap-2.5 mt-auto pt-6">
                <div className="text-5xl sm:text-6xl font-galano font-normal italic text-[#111111] leading-none shrink-0 tracking-tight">
                  <AnimatedNumber target="86" suffix="+" />
                </div>
                <div className="text-sm sm:text-base text-[#333333] font-normal text-right leading-relaxed shrink-0">
                  <span className="block whitespace-nowrap">From strategy to</span>
                  <span className="block whitespace-nowrap">standout identity.</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================= */}
        {/* 5. FAQ SECTION ("FIND THE ANSWERS")                       */}
        {/* ========================================================= */}
        <section className="pt-8 sm:pt-14 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Header */}
            <div className="scroll-reveal lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-2.5">
                <img
                  src={starIcon}
                  alt=""
                  className="w-4 h-4 object-contain brightness-0"
                />
                <span
                  className="font-galano font-medium text-sm sm:text-base text-[#111111] normal-case"
                  style={{ letterSpacing: '5px' }}
                >
                  Have questions?
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-galano font-medium text-[#111111] leading-[1.1]">
                Find the <br />
                <em className="font-swarsh italic font-medium text-[#111111]">answers</em>
              </h2>
            </div>

            {/* Right Accordion (White Container Cards wrapping to the Arrow Button) */}
            <div className="scroll-reveal lg:col-span-8">
              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white border border-[#DCDAD4] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left group focus:outline-none"
                      >
                        <h3 className="text-xl sm:text-2xl font-galano font-medium text-[#111111] group-hover:text-[#E2B857] transition-colors leading-snug pr-6">
                          {faq.question}
                        </h3>
                        <div className="w-11 h-11 rounded-full bg-[#F5F4F0] group-hover:bg-[#E2B857] text-[#111111] border border-[#DCDAD4] flex items-center justify-center shrink-0 transition-colors shadow-sm">
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </button>
                      <div
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-[#DCDAD4]/60' : 'grid-rows-[0fr] opacity-0'
                          }`}
                      >
                        <div className="overflow-hidden">
                          <p className={`text-base sm:text-[1.05rem] text-[#444444] leading-relaxed max-w-3xl font-normal ${isOpen ? 'animate-typewriter-text' : ''}`}>
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
