import React, { useState } from 'react';
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
import optivaImg from '../assets/case-studies/optiva.png';

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
  },
  {
    id: 'optiva',
    name: 'Optiva',
    category: 'Capital & Investment Architecture',
    image: optivaImg,
    description: 'Bespoke corporate identity passes engineered for elite investment management leadership.',
    stats: 'Private Wealth Ecosystem'
  }
];

export default function CaseStudiesPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);

  // Exact height pattern matching the two lines:
  // Line 1: 200px, 300px, 200px, 300px, 200px
  // Line 2: 300px, 250px, 200px, 300px
  const heightPattern = [
    'h-[200px]', // 1. Rainoil
    'h-[300px]', // 2. Seplat
    'h-[200px]', // 3. Revolution plus
    'h-[300px]', // 4. ARM
    'h-[200px]', // 5. Sterling bank
    'h-[300px]', // 6. TVC
    'h-[250px]', // 7. Bank 78
    'h-[200px]', // 8. UBA
    'h-[300px]'  // 9. Optiva
  ];

  return (
    <div className="bg-[#EBEAE6] text-[#111111] min-h-screen pt-36 sm:pt-44 pb-28 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black overflow-hidden font-sans">
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

        {/* 5-Column Grid with 2 Lines Matching Product Catalogue Arrangement */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-[8px] gap-y-[80px] items-start">
          {caseStudiesData.slice(0, visibleCount).map((item, idx) => {
            const heightClass = heightPattern[idx] || 'h-[200px]';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedCard(item)}
                className="group cursor-pointer block w-full text-left"
              >
                {/* Card Image Container (Top Aligned, No border radius, Pure Image) */}
                <div className={`relative ${heightClass} w-full rounded-none overflow-hidden bg-white border border-[#DCDAD4] shadow-sm group-hover:shadow-xl group-hover:border-[#111111]/40 transition-all duration-500 transform group-hover:-translate-y-1`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none rounded-none"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button (White Background, Reduced Width, Gray-to-Black Text & Border Hover) */}
        <div className="text-center pt-8">
          <button
            onClick={() => setVisibleCount((prev) => (prev >= caseStudiesData.length ? 5 : caseStudiesData.length))}
            className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-8 py-3 rounded-full bg-white text-[#777777] border border-[#DCDAD4] hover:text-black hover:border-black shadow-sm transition-all duration-300 select-none"
          >
            Load More
          </button>
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
