import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import blackMatteRender from '../assets/Black matte render 2.png';
import elitePassGold from '../assets/ELITE_PASS_GOLD.png';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.png';

export default function ProgramAccordionShowcase() {
  const programs = [
    {
      id: 'consultation',
      title: 'Identity Consultation Services',
      subtitle: 'Strategic Brand Alignment',
      description: 'We craft distinctive corporate brand identities that speak louder than words. We design bold brand identities that capture your mission and connect across every touchpoint.',
      image: blackMatteRender,
    },
    {
      id: 'corporate-design',
      title: 'Corporate Identity Design',
      subtitle: 'Visual Systems & Architecture',
      description: 'Build the clarity, presence, and habits needed to lead with confidence and calm across all corporate assets.',
      image: elitePassGold,
    },
    {
      id: 'creation-experience',
      title: 'Identity Creation & Experience',
      subtitle: 'Physical & Digital Touchpoints',
      description: "Unlock the collective potential in your organization's identity through intentional design, premium materials, and dialogue.",
      image: elitePassBlack,
    }
  ];

  // First container active by default
  const [activeId, setActiveId] = useState('consultation');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-7xl mx-auto py-6">
      {/* VERTICAL TEXT CONTAINERS (LEFT COLUMN: 6 Cols on Desktop) */}
      <div className="lg:col-span-6 order-1 flex flex-col justify-center space-y-4">
        {programs.map((prog) => {
          const isOpen = activeId === prog.id;
          return (
            <div
              key={prog.id}
              onMouseEnter={() => setActiveId(prog.id)}
              onClick={() => setActiveId(prog.id)}
              className={`group cursor-pointer transition-all duration-500 rounded-3xl select-none ${
                isOpen
                  ? 'bg-[#F5F4F0] border border-[#DCDAD4] p-6 sm:p-8 shadow-xl scale-[1.01]'
                  : 'bg-transparent border border-transparent p-6 sm:p-7 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Header Row */}
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-galano font-medium tracking-tight text-[#111111]">
                  {prog.title}
                </h3>
              </div>

              {/* Expandable Description & Link */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 mt-4 pt-2' : 'grid-rows-[0fr] opacity-0 mt-0 pt-0'
                }`}
              >
                <div className="overflow-hidden space-y-6">
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-normal">
                    {prog.description}
                  </p>

                  <div className="pt-2">
                    <NavLink
                      to={`/program/${prog.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="group/btn relative overflow-hidden inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-6 py-3 rounded-full bg-black text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
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
      <div className="lg:col-span-6 order-2 relative w-full h-[400px] sm:h-[500px] lg:h-auto rounded-3xl overflow-hidden bg-[#111111] border border-[#DCDAD4] shadow-2xl min-h-[480px]">
        {programs.map((prog) => {
          const isActive = activeId === prog.id;
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
              {/* Dark Overlay with Subtitle & Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 sm:p-10 flex flex-col justify-end">
                <span className="text-xs font-mono tracking-widest text-[#E2B857] uppercase mb-2">
                  {prog.subtitle}
                </span>
                <h4 className="font-galano font-medium text-2xl sm:text-3xl text-white">
                  {prog.title}
                </h4>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
