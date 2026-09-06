import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import techImg from '../assets/TECH.jpg';
import card1Img from '../assets/Card 1.png';
import identityImg from '../assets/IDENTITY.jpg';
import deployImg from '../assets/Deploy.jpg';

export default function ProgramAccordionShowcase() {
  const programs = [
    {
      id: 'identity-discovery',
      title: 'Identity Discovery',
      description: 'See how your organization is represented.\n\nEvery organization communicates identity — through its people, credentials, spaces, communication, and everyday interactions.\n\nSome of these are carefully designed. Others simply evolve over time.\n\nIdentity Discovery helps you take a step back and look at the key places where your organization\'s identity is being expressed.\n\nWe examine selected identity touchpoints across your organization to identify what is working well, what feels disconnected, and where there are opportunities to create a more consistent and intentional experience.',
      image: techImg,
    },
    {
      id: 'identity-architecture',
      title: 'Identity Architecture',
      description: 'Design how identity works across your organization.\n\nAn organization can have a strong brand and still have a fragmented identity experience.\n\nDifferent departments may use different standards. Employees may be represented differently. Executives may have their own systems. Physical and digital experiences may not connect. Credentials may identify people without actually representing the organization.\n\nIdentity Architecture brings these elements together.\n\nWe help define how organizational identity should be represented across key people, places, processes and touchpoints — creating greater consistency, clarity and purpose in the way your organization is experienced.',
      image: card1Img,
    },
    {
      id: 'identity-experience',
      title: 'Identity Experience',
      description: 'Make identity tangible.\n\nAn organization\'s identity is not experienced in a strategy document.\n\nIt is experienced through the people who represent it, the credentials they carry, the places they enter, the spaces they encounter, the systems they interact with, and the moments that shape perception.\n\nIdentity Experience brings your identity architecture to life across the touchpoints that people actually encounter.\n\nWe translate identity standards into practical experiences — physical, digital and human — so that the organization is not only clearly defined, but consistently experienced.',
      image: identityImg,
    },
    {
      id: 'identikare',
      title: 'IDENTIKARE',
      description: 'Organizations change every day.\n\nPeople join. People leave. Roles change. Credentials are lost. Access requirements evolve. Digital profiles become outdated. Identity systems need attention.\n\nIdentikare provides the ongoing care, support and protection required to keep your organization\'s identity experience working as intended.\n\nFrom credential replacement and identity updates to maintenance, support and protection, Identikare helps organizations keep identity current, consistent and dependable.',
      image: deployImg,
    },
  ];

  // First container active by default
  const [activeId, setActiveId] = useState('identity-discovery');

  const toggleProgram = (id) => {
    setActiveId(id);
  };

  return (
    <div className="grid grid-cols-2 gap-2.5 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-stretch max-w-7xl mx-auto py-3 sm:py-6">
      {/* VERTICAL TEXT CONTAINERS — same fixed height as the image panel */}
      <div className="col-span-1 flex flex-col gap-1.5 xs:gap-2 sm:gap-4 lg:gap-6 h-[380px] xs:h-[420px] sm:h-[464px] lg:h-[524px] w-full overflow-hidden font-galano">
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
              className={`group cursor-pointer transition-all duration-500 rounded-xl xs:rounded-2xl lg:rounded-3xl select-none flex flex-col overflow-hidden ${
                isOpen
                  ? 'bg-[#F5F4F0] border border-[#DCDAD4] p-2.5 xs:p-3.5 sm:p-5 md:p-6 lg:px-8 lg:py-6 shadow-md sm:shadow-xl flex-1 min-h-0'
                  : 'bg-transparent border border-transparent px-2 py-1 xs:px-3 xs:py-1.5 sm:px-5 sm:py-3 lg:px-6 lg:py-3.5 text-black hover:text-black flex-none'
              }`}
            >
              {/* Header Row with Title */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-4 shrink-0">
                <h3 className="text-xs xs:text-sm sm:text-lg md:text-2xl lg:text-[2.25rem] font-galano font-medium tracking-tight text-black leading-snug sm:leading-tight">
                  {prog.title}
                </h3>
              </div>

              {/* Expandable Description — scrollable within the flex-1 item */}
              <div
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto min-h-0 thin-scrollbar pr-0.5 sm:pr-1 ${
                  isOpen
                    ? 'opacity-100 mt-1.5 xs:mt-2 sm:mt-3 flex-1'
                    : 'max-h-0 opacity-0 pointer-events-none flex-none'
                }`}
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div
                  className={`transform transition-all duration-500 ease-out ${
                    isOpen ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-3 opacity-0'
                  }`}
                >
                  {prog.description.split('\n\n').map((para, i) => (
                    <p
                      key={i}
                      className="font-galano text-[11px] xs:text-xs sm:text-sm lg:text-base text-[#555555] leading-relaxed font-normal mb-1.5 sm:mb-2.5 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DYNAMIC IMAGE (RIGHT COLUMN) */}
      <div className="col-span-1 relative w-full h-[380px] xs:h-[420px] sm:h-[464px] lg:h-[524px] rounded-xl xs:rounded-2xl lg:rounded-3xl overflow-hidden bg-[#111111] border border-[#DCDAD4] shadow-md sm:shadow-2xl">
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
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
