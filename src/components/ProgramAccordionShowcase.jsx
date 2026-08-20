import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import techImg from '../assets/TECH.jpg';
import identityImg from '../assets/IDENTITY.jpg';

// AB Corporate Identity Assets
import ab1Img from '../assets/ab1.png';
import ab2Img from '../assets/ab2.png';
import ab3Img from '../assets/ab3.png';
import ab4Img from '../assets/ab4.png';
import ab5Img from '../assets/ab5.png';
import ab6Img from '../assets/ab6.png';

const corporateImages = [
  { img: ab1Img, label: 'ab1' },
  { img: ab2Img, label: 'ab2' },
  { img: ab3Img, label: 'ab3' },
  { img: ab4Img, label: 'ab4' },
  { img: ab5Img, label: 'ab5' },
  { img: ab6Img, label: 'ab6' },
];

export default function ProgramAccordionShowcase() {
  const programs = [
    {
      id: 'consultation',
      title: 'Identity Consultation Services',
      subtitle: 'Strategic Brand Alignment',
      description: 'We craft distinctive corporate brand identities that speak louder than words. We design bold brand identities that capture your mission and connect across every touchpoint.',
      features: [
        'Strategic Brand Audit & Positioning',
        'Executive Leadership Identity Architecture',
        'Enterprise Deployment Roadmap'
      ],
      image: techImg,
    },
    {
      id: 'corporate-design',
      title: 'Corporate Identity Design',
      subtitle: 'Visual Systems & Architecture',
      description: 'Build the clarity, presence, and habits needed to lead with confidence and calm across all corporate assets.',
      features: [
        '24K Gold & Titanium Metal Credentials',
        'Unified Visual Brand Hierarchy',
        'Precision Aerospace Hardware Manufacturing'
      ],
      image: ab1Img,
      images: corporateImages,
    },
    {
      id: 'creation-experience',
      title: 'Identity Creation & Experience',
      subtitle: 'Physical & Digital Touchpoints',
      description: "Unlock the collective potential in your organization's identity through intentional design, premium materials, and dialogue.",
      features: [
        'Touch-to-Share Contactless NFC Provisioning',
        'VIP Member Access Control Systems',
        'Real-Time Cloud Profile Management'
      ],
      image: identityImg,
    }
  ];

  // First container active by default
  const [activeId, setActiveId] = useState('consultation');
  const [corporateIndex, setCorporateIndex] = useState(0);

  // Auto-cycle through ab1-ab6 when corporate-design is active
  useEffect(() => {
    if (activeId !== 'corporate-design') return;
    const interval = setInterval(() => {
      setCorporateIndex((prev) => (prev + 1) % corporateImages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [activeId]);

  const toggleProgram = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-7xl mx-auto py-6">
      {/* VERTICAL TEXT CONTAINERS (LEFT COLUMN: 6 Cols on Desktop) */}
      <div className="lg:col-span-6 order-1 flex flex-col justify-between space-y-4 h-full">
        {programs.map((prog) => {
          const isOpen = activeId === prog.id;
          return (
            <div
              key={prog.id}
              onClick={() => toggleProgram(prog.id)}
              onMouseEnter={() => {
                // Only trigger on hover for desktop view (screen >= 1024px)
                if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                  setActiveId(prog.id);
                }
              }}
              className={`group cursor-pointer transition-all duration-500 rounded-3xl select-none flex flex-col justify-center ${isOpen
                  ? 'bg-[#F5F4F0] border border-[#DCDAD4] p-6 sm:p-8 shadow-xl scale-[1.01] flex-1'
                  : 'bg-transparent border border-transparent p-6 sm:p-7 opacity-80 hover:opacity-100'
                }`}
            >
              {/* Header Row with Title */}
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-galano font-medium tracking-tight text-[#111111]">
                  {prog.title}
                </h3>
              </div>

              {/* Expandable Description & Features List with Staggered Drop-Down */}
              <div
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isOpen
                    ? 'max-h-[600px] opacity-100 mt-4 pt-2'
                    : 'max-h-0 opacity-0 mt-0 pt-0 pointer-events-none'
                  }`}
              >
                <div className="space-y-5">
                  {/* Paragraph Drop-Down (Delay 100ms) */}
                  <p
                    className={`text-base sm:text-lg text-[#555555] leading-relaxed font-normal transform transition-all duration-500 ease-out ${isOpen ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-3 opacity-0'
                      }`}
                  >
                    {prog.description}
                  </p>

                  {/* Learn More Button Drop-Down (Delay 300ms) */}
                  <div
                    className={`pt-2 transform transition-all duration-500 ease-out ${isOpen ? 'translate-y-0 opacity-100 delay-300' : '-translate-y-4 opacity-0'
                      }`}
                  >
                    <NavLink
                      to={`/program/${prog.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="group/btn relative overflow-hidden inline-flex items-center justify-center text-sm sm:text-base font-semibold px-7 py-3.5 rounded-full bg-black text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                        <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-1/2">
                          <span className="block">Learn more</span>
                          <span className="block">Learn more</span>
                        </span>
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DYNAMIC IMAGE (RIGHT COLUMN: 6 Cols on Desktop - Height increased by 24px) */}
      <div className="lg:col-span-6 order-2 relative w-full h-[384px] sm:h-[464px] lg:h-[524px] rounded-3xl overflow-hidden bg-[#111111] border border-[#DCDAD4] shadow-2xl min-h-[384px] sm:min-h-[464px] lg:min-h-[524px]">
        {programs.map((prog) => {
          const isActive = activeId === prog.id;

          if (prog.id === 'corporate-design') {
            return (
              <div
                key={prog.id}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                }`}
              >
                {corporateImages.map((item, idx) => (
                  <NavLink
                    key={idx}
                    to={`/program/${prog.id}`}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                      idx === corporateIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={item.img}
                      alt={`${prog.title} ${idx + 1}`}
                      className="w-full h-full object-cover object-center select-none"
                    />
                  </NavLink>
                ))}

                {/* Interactive Carousel Dots Indicator */}
                {isActive && (
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                    {corporateImages.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCorporateIndex(dotIdx);
                        }}
                        aria-label={`Slide ${dotIdx + 1}`}
                        className={`transition-all duration-300 rounded-full ${
                          dotIdx === corporateIndex
                            ? 'w-6 h-2 bg-[#E2B857]'
                            : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={prog.id}
              to={`/program/${prog.id}`}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={prog.image}
                alt={prog.title}
                className="w-full h-full object-cover object-center select-none"
              />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
