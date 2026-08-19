import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import blackMatteRender from '../assets/Black matte render 2.png';
import elitePassGold from '../assets/ELITE_PASS_GOLD.png';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.png';

export default function ProgramAccordionShowcase() {
  const programs = [
    {
      id: 'consultation',
      title: 'Identity Consultation Services',
      description: 'We craft distinctive corporate brand identities that speak louder than words. We design bold brand identities that capture your mission and connect across every touchpoint.',
      image: blackMatteRender,
      link: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Consultation%20Services',
    },
    {
      id: 'corporate-design',
      title: 'Corporate Identity Design',
      description: 'Build the clarity, presence, and habits needed to lead with confidence and calm.',
      image: elitePassGold,
      link: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Corporate%20Identity%20Design',
    },
    {
      id: 'creation-experience',
      title: 'Identity Creation & Experience',
      description: "Unlock the collective potential in your organization's identity through intentional design and dialogue.",
      image: elitePassBlack,
      link: 'https://wa.me/2349030001851?text=Hello%20Identifine!%20I%20am%20interested%20in%20Identity%20Creation%20%26%20Experience',
    }
  ];

  // First container active initially
  const [activeId, setActiveId] = useState('consultation');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-7xl mx-auto py-6">
      {/* LEFT COLUMN: 3 Vertical Accordion Containers (6 Cols) */}
      <div className="lg:col-span-6 flex flex-col justify-between space-y-2">
        {programs.map((prog) => {
          const isOpen = activeId === prog.id;
          return (
            <div
              key={prog.id}
              onMouseEnter={() => setActiveId(prog.id)}
              onClick={() => setActiveId(prog.id)}
              className={`group cursor-pointer transition-all duration-500 flex flex-col justify-between select-none ${
                isOpen
                  ? 'bg-white border border-[#DCDAD4] rounded-3xl p-6 sm:p-8 shadow-xl'
                  : 'bg-transparent border-b border-[#DCDAD4] px-4 py-6 sm:py-7'
              }`}
            >
              {/* Header Row */}
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-galano font-normal tracking-tight leading-snug text-[#111111]">
                  {prog.title}
                </h3>
              </div>

              {/* Expandable Description & Link (Opens on Hover) */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 mt-5 pt-4' : 'grid-rows-[0fr] opacity-0 mt-0 pt-0'
                }`}
              >
                <div className="overflow-hidden space-y-6">
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-normal">
                    {prog.description}
                  </p>

                  <div className="pt-1">
                    <a
                      href={prog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="group/btn relative overflow-hidden inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-[21px] py-3 rounded-full bg-black text-white shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                        <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-1/2">
                          <span className="block">Learn more</span>
                          <span className="block">Learn more</span>
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT COLUMN: Matching Height Dynamic Picture (6 Cols) */}
      <div className="lg:col-span-6 relative w-full h-[540px] lg:h-auto min-h-[540px] rounded-3xl overflow-hidden bg-[#09090b] border border-[#DCDAD4] shadow-xl">
        {programs.map((prog) => {
          const isActive = activeId === prog.id;
          return (
            <div
              key={prog.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={prog.image}
                alt={prog.title}
                className="w-full h-full object-cover object-center select-none"
              />
              {/* Overlay with Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent p-8 sm:p-10 flex flex-col justify-end">
                <h4 className="font-galano font-normal text-2xl text-white">
                  {prog.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
