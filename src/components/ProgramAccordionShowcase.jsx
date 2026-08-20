import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import techImg from '../assets/TECH.jpg';
import card1Img from '../assets/Card 1.png';
import identityImg from '../assets/IDENTITY.jpg';

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
      image: card1Img,
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

      {/* DYNAMIC IMAGE (RIGHT COLUMN: 6 Cols on Desktop) */}
      <div className="lg:col-span-6 order-2 relative w-full h-[420px] sm:h-[520px] lg:h-full rounded-3xl overflow-hidden bg-[#111111] border border-[#DCDAD4] shadow-2xl min-h-[420px] sm:min-h-[520px] lg:min-h-[620px]">
        {programs.map((prog) => {
          const isActive = activeId === prog.id;
          return (
            <NavLink
              key={prog.id}
              to={`/program/${prog.id}`}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
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
