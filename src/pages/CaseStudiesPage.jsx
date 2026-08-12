import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import CardShowcaseModal from '../components/CardShowcaseModal';

export default function CaseStudiesPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const initialItems = [
    { id: '1', name: 'Rainoil', tag: 'Energy & Oil', color: 'bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800' },
    { id: '2', name: 'Seplat', tag: 'Petroleum', color: 'bg-gradient-to-br from-slate-800 via-zinc-900 to-black border border-slate-700' },
    { id: '3', name: 'Revolution plus', tag: 'Real Estate', color: 'bg-gradient-to-br from-neutral-800 via-stone-900 to-black border border-neutral-700' },
    { id: '4', name: 'ARM', tag: 'Asset Management', color: 'bg-gradient-to-br from-[#422006] via-[#713F12] to-black border border-amber-600/40' },
    { id: '5', name: 'Sterling bank', tag: 'Banking', color: 'bg-gradient-to-br from-slate-700 via-slate-800 to-zinc-900 border border-slate-500/40' },
    { id: '6', name: 'TVC', tag: 'Broadcasting & Media', color: 'bg-gradient-to-br from-amber-950 via-zinc-900 to-black border border-amber-800/40' }
  ];

  const additionalItems = [
    { id: '7', name: 'Bank 78', tag: 'Fintech', color: 'bg-gradient-to-br from-zinc-950 via-[#1E293B] to-black border border-cyan-500/30' },
    { id: '8', name: 'UBA', tag: 'Global Banking', color: 'bg-gradient-to-br from-red-950 via-zinc-900 to-black border border-red-800/40' }
  ];

  const renderItem = (item, isExtra = false, extraIndex = 0) => (
    <div 
      key={item.id}
      onClick={() => setSelectedCard(item)}
      className={`group cursor-pointer space-y-3 ${
        isExtra
          ? `transform transition-all duration-700 ease-out ${
              isExpanded
                ? 'translate-y-0 opacity-100 scale-100'
                : '-translate-y-10 opacity-0 scale-95 pointer-events-none'
            }`
          : ''
      }`}
      style={{
        transitionDelay: isExtra && isExpanded ? `${extraIndex * 150}ms` : '0ms'
      }}
    >
      <div className={`aspect-[16/10] rounded-2xl p-6 text-white shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 flex flex-col justify-between ${item.color}`}>
        <div className="flex justify-between items-start text-xs font-bold font-sans">
          <span>IDENTIFINE</span>
          <span className="text-[#E2B857]">⚡</span>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase text-[#AAAAAA]">{item.tag}</span>
          <div className="font-bold text-lg text-white">{item.name}</div>
        </div>
      </div>

      <div className="text-sm font-bold text-[#111111] font-sans flex items-center justify-between">
        <span>{item.name}</span>
        <ArrowRight className="w-4 h-4 text-[#777777] group-hover:text-black group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );

  return (
    <div className="bg-[#EBEAE6] min-h-screen pt-36 pb-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#666666] flex items-center gap-1.5">
            <span>✦</span> Case studies
          </div>
          <h1 className="text-4xl sm:text-6xl font-sans font-bold text-[#111111] leading-tight max-w-2xl">
            Create an identity that is a voice, and not an echo!
          </h1>
        </div>

        {/* Initial Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialItems.map((item) => renderItem(item, false))}
        </div>

        {/* Accordion Drop-down for Extra Items */}
        <div className={isExpanded ? 'accordion-dropdown-open' : 'accordion-dropdown-closed'}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-4">
              {additionalItems.map((item, idx) => renderItem(item, true, idx))}
            </div>
          </div>
        </div>

        {/* Show More Button with Text-Roll Animation */}
        <div className="text-center pt-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative inline-flex items-center justify-center overflow-hidden bg-white border border-[#CCCCCC] hover:border-[#111111] shadow-sm rounded-2xl px-10 py-4 text-xs font-bold tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5 select-none"
          >
            <div className="h-4 relative overflow-hidden flex items-center justify-center min-w-[95px]">
              <span className="text-[#777777] transition-transform duration-300 ease-out group-hover:-translate-y-full block whitespace-nowrap">
                {isExpanded ? 'Show Less' : 'Show More'}
              </span>
              <span className="text-[#111111] absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 font-extrabold whitespace-nowrap">
                {isExpanded ? 'Show Less' : 'Show More'}
              </span>
            </div>
          </button>
        </div>

      </div>

      {selectedCard && (
        <CardShowcaseModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onEnquire={(c) => {
            setSelectedCard(null);
            window.open(`https://wa.me/2349030001851?text=Inquiry%20regarding%20${encodeURIComponent(c.name)}`, '_blank');
          }}
        />
      )}
    </div>
  );
}
