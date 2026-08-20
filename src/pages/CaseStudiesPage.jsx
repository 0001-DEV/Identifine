import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import starIcon from '../assets/SVG@4x.png';
import CardShowcaseModal from '../components/CardShowcaseModal';

// Case Study Image Assets
import rainoilImg from '../assets/case-studies/rainoil.jpg';
import seplatImg from '../assets/case-studies/seplat.png';
import revolutionPlusImg from '../assets/case-studies/revolution_plus.png';
import armImg from '../assets/case-studies/arm.png';
import sterlingBankImg from '../assets/case-studies/sterling_bank.png';
import tvcImg from '../assets/case-studies/tvc.jpg';
import bank78Img from '../assets/case-studies/bank78.jpg';
import ubaImg from '../assets/case-studies/uba.png';

export const caseStudiesData = [
  {
    id: 'rainoil',
    name: 'Rainoil',
    category: 'Energy & Downstream Petroleum',
    image: rainoilImg,
    description: 'Executive leadership credentials & integrated digital NFC workforce pass architecture.',
    stats: '5,000+ Personnel Cards'
  },
  {
    id: 'seplat',
    name: 'Seplat',
    category: 'Oil & Gas Exploration',
    image: seplatImg,
    description: 'Precision aircraft-grade titanium smart cards for C-suite and senior energy executives.',
    stats: 'Enterprise Deployment'
  },
  {
    id: 'revolution-plus',
    name: 'Revolution plus',
    category: 'Real Estate & Infrastructure',
    image: revolutionPlusImg,
    description: 'Gold electroplated metal passes creating prestige at major luxury developments.',
    stats: 'VIP Access Ecosystem'
  },
  {
    id: 'arm',
    name: 'ARM',
    category: 'Asset & Wealth Management',
    image: armImg,
    description: 'Executive dual-tone corporate cards reflecting wealth stewardship and financial trust.',
    stats: 'High-Net-Worth Portfolio'
  },
  {
    id: 'sterling-bank',
    name: 'Sterling bank',
    category: 'Commercial Banking',
    image: sterlingBankImg,
    description: 'Unified contactless identity passes engineered for seamless branch and regional headquarters access.',
    stats: 'Nationwide Deployment'
  },
  {
    id: 'tvc',
    name: 'TVC',
    category: 'Media & Broadcasting Network',
    image: tvcImg,
    description: 'High-visibility broadcast media credentials and dynamic studio access verification passes.',
    stats: 'Live Studio Ecosystem'
  },
  {
    id: 'bank-78',
    name: 'Bank 78',
    category: 'Next-Gen Fintech',
    image: bank78Img,
    description: 'Modern carbon-fiber smart cards enabling contactless digital profile exchange for digital leaders.',
    stats: 'Smart NFC Provisioning'
  },
  {
    id: 'uba',
    name: 'UBA',
    category: 'Pan-African Banking Group',
    image: ubaImg,
    description: 'Executive bespoke passes for international board members across 20 African subsidiaries.',
    stats: 'Continental Reach'
  }
];

export default function CaseStudiesPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const initialItems = caseStudiesData.slice(0, visibleCount);
  const hasMore = visibleCount < caseStudiesData.length;

  return (
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-36 sm:pt-44 pb-28 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black overflow-hidden">
      <div className="max-w-[94rem] mx-auto space-y-16 sm:space-y-24">
        
        {/* Header Section */}
        <div className="space-y-4 max-w-4xl text-left">
          <div className="inline-flex items-center justify-start gap-2.5">
            <img
              src={starIcon}
              alt=""
              className="w-4 h-4 object-contain brightness-0"
            />
            <span
              className="font-galano font-normal text-[#555555] text-xs sm:text-sm uppercase"
              style={{ letterSpacing: '4.5px' }}
            >
              Case studies
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-galano font-medium text-[#111111] leading-[1.08] tracking-tight">
            Create an identity that is a <em className="font-swarsh italic font-normal text-[#111111]">voice</em>, and not an <em className="font-swarsh italic font-normal text-[#111111]">echo!</em>
          </h1>
        </div>

        {/* Case Studies Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {initialItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCard(item)}
              className="group cursor-pointer space-y-4 text-left"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/11] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white border border-[#DCDAD4] shadow-sm group-hover:shadow-xl group-hover:border-[#111111]/40 transition-all duration-500 transform group-hover:-translate-y-1.5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                />
                
                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-white text-xs font-mono tracking-wider uppercase">
                    ✦ View Case Study
                  </span>
                </div>
              </div>

              {/* Title & Arrow Row */}
              <div className="flex items-center justify-between pt-1 px-1">
                <h3 className="text-xl sm:text-2xl font-galano font-medium text-[#111111] group-hover:text-[#E2B857] transition-colors tracking-tight">
                  {item.name}
                </h3>
                <div className="w-9 h-9 rounded-full bg-white border border-[#DCDAD4] group-hover:bg-black group-hover:text-white group-hover:border-black flex items-center justify-center transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center pt-8">
          {hasMore ? (
            <button
              onClick={() => setVisibleCount(caseStudiesData.length)}
              className="group relative overflow-hidden inline-flex items-center justify-center text-sm sm:text-base font-semibold px-10 py-4 rounded-full bg-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[54px]"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                  <span className="block">Load More</span>
                  <span className="block">Load More</span>
                </span>
              </span>
            </button>
          ) : (
            <a
              href="https://wa.me/2349030001851"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center justify-center text-sm sm:text-base font-semibold px-10 py-4 rounded-full bg-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[54px]"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                  <span className="block">Make an identity enquiry</span>
                  <span className="block">Make an identity enquiry</span>
                </span>
              </span>
            </a>
          )}
        </div>

      </div>

      {/* Case Study Modal */}
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
