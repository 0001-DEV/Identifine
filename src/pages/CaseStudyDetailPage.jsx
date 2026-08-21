import React from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Case Study Images
import rainoil1 from '../assets/case-studies/rainoil_1.jpg';
import rainoil2 from '../assets/case-studies/rainoil_2.png';
import rainoil3 from '../assets/case-studies/rainoil_3.jpg';

import seplatImg from '../assets/case-studies/seplat.png';
import revPlusImg from '../assets/case-studies/revolution_plus.png';
import armImg from '../assets/case-studies/arm.png';
import sterlingImg from '../assets/case-studies/sterling_bank.png';
import tvcImg from '../assets/case-studies/tvc.jpg';
import bank78Img from '../assets/case-studies/bank78.jpg';
import ubaImg from '../assets/case-studies/uba.png';
import optivaImg from '../assets/case-studies/optiva.png';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.png';
import elitePassGold from '../assets/ELITE_PASS_GOLD.png';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.png';

const caseStudyDetails = {
  'rainoil': {
    title: 'Rainoil',
    type: 'Visual Identity Direction, Touchpoints',
    year: '2026',
    writeup: 'We partnered with Rainoil to provide visual identity direction for their latest campaign. The campaign features a mix of innovative design elements and striking imagery.',
    images: [rainoil1, rainoil2, rainoil3],
    nextSlug: 'seplat',
    nextTitle: 'Seplat'
  },
  'seplat': {
    title: 'Seplat',
    type: 'Corporate Identity Design, Leadership Pass',
    year: '2026',
    writeup: 'We partnered with Seplat to engineer precision titanium smart cards and executive credentials for senior leadership across global energy operations.',
    images: [seplatImg, elitePassSilver, rainoil2],
    nextSlug: 'revolution-plus',
    nextTitle: 'Revolution plus'
  },
  'revolution-plus': {
    title: 'Revolution plus',
    type: 'Prestige Member Identity, Gold Card',
    year: '2026',
    writeup: 'We partnered with Revolution Plus to design high-prestige 24K electroplated gold membership cards for premier luxury property developments.',
    images: [revPlusImg, elitePassGold, rainoil3],
    nextSlug: 'arm',
    nextTitle: 'ARM'
  },
  'arm': {
    title: 'ARM',
    type: 'Wealth Stewardship Identity, Dual Pass',
    year: '2026',
    writeup: 'We partnered with ARM to craft bespoke dual-tone executive smart passes reflecting asset management leadership and financial trust.',
    images: [armImg, elitePassBlack, rainoil1],
    nextSlug: 'sterling-bank',
    nextTitle: 'Sterling bank'
  },
  'sterling-bank': {
    title: 'Sterling bank',
    type: 'Commercial Banking NFC Access Pass',
    year: '2026',
    writeup: 'We partnered with Sterling Bank to produce dynamic contactless digital identity cards enabling seamless executive and regional access verification.',
    images: [sterlingImg, rainoil1, rainoil2],
    nextSlug: 'tvc',
    nextTitle: 'TVC'
  },
  'tvc': {
    title: 'TVC',
    type: 'Media & Broadcasting Network Pass',
    year: '2026',
    writeup: 'We partnered with TVC News & Entertainment Network to design studio leadership credentials and high-visibility media broadcast passes.',
    images: [tvcImg, rainoil2, rainoil3],
    nextSlug: 'bank-78',
    nextTitle: 'Bank 78'
  },
  'bank-78': {
    title: 'Bank 78',
    type: 'Fintech Leadership Smart Pass',
    year: '2026',
    writeup: 'We partnered with Bank 78 to create lightweight carbon-fiber NFC passes enabling instant digital identity exchange for modern fintech executives.',
    images: [bank78Img, elitePassBlack, rainoil1],
    nextSlug: 'uba',
    nextTitle: 'UBA'
  },
  'uba': {
    title: 'UBA',
    type: 'Pan-African Executive Credentials',
    year: '2026',
    writeup: 'We partnered with United Bank for Africa (UBA) to deliver international bespoke leadership identity cards across 20 African subsidiary markets.',
    images: [ubaImg, rainoil1, rainoil3],
    nextSlug: 'optiva',
    nextTitle: 'Optiva'
  },
  'optiva': {
    title: 'Optiva',
    type: 'Capital & Investment Architecture Pass',
    year: '2026',
    writeup: 'We partnered with Optiva Capital to engineer executive identity cards embodying private wealth stewardship and financial authority.',
    images: [optivaImg, elitePassBlack, rainoil2],
    nextSlug: 'rainoil',
    nextTitle: 'Rainoil'
  }
};

export default function CaseStudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentSlug = id || 'rainoil';
  const study = caseStudyDetails[currentSlug] || caseStudyDetails['rainoil'];

  return (
    <div className="bg-[#ffffff] text-[#1f1f1f] min-h-screen pt-36 sm:pt-48 pb-28 px-6 sm:px-12 lg:px-16 selection:bg-[#E2B857] selection:text-black font-sans">
      <div className="max-w-[94rem] mx-auto">
        
        {/* Main 2-Column Content Layout (Left Column moved to left edge, Images to right) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: STICKY INFO PANEL (PROJECT TITLE, TYPE, YEAR, WRITEUP)       */}
          {/* ========================================================================= */}
          <div className="animate-hero-fade-1 w-full lg:w-[360px] shrink-0 lg:sticky lg:top-36 space-y-8 text-left">
            
            {/* Back link */}
            <NavLink
              to="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#737378] hover:text-[#1f1f1f] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Case Studies</span>
            </NavLink>

            {/* Title, Project Type & Year */}
            <div className="space-y-6">
              
              {/* Project Title */}
              <h1 className="font-galano font-semibold text-sm sm:text-base text-[#1f1f1f] tracking-tight">
                {study.title}
              </h1>

              {/* Project Type & Year (Gray Color) */}
              <div className="space-y-0.5 text-sm font-medium text-[#737378]">
                <p>{study.type}</p>
                <p>{study.year}</p>
              </div>

              {/* Project Writeup */}
              <p className="font-galano font-medium text-sm text-[#1f1f1f] leading-relaxed pt-2">
                {study.writeup}
              </p>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: VISUALS & IMAGERY (MOVED MORE TO THE RIGHT)                 */}
          {/* ========================================================================= */}
          <div className="animate-hero-fade-2 flex-1 w-full max-w-4xl space-y-4">
            
            {study.images.map((imgSrc, index) => (
              <div
                key={index}
                className="w-full rounded-none overflow-hidden bg-[#FBFBFA] border border-[#E5E5E5] shadow-sm"
              >
                <img
                  src={imgSrc}
                  alt={`${study.title} visual ${index + 1}`}
                  className="w-full h-auto object-cover select-none rounded-none"
                  loading="lazy"
                />
              </div>
            ))}

            {/* Previous / Next Project Navigation Bar */}
            <div className="flex items-center justify-between pt-10 pb-4 border-t border-[#E5E5E5] text-sm">
              <div className="flex-1" />
              {study.nextSlug && (
                <NavLink
                  to={`/case-studies/${study.nextSlug}`}
                  className="font-galano font-semibold text-[#1f1f1f] hover:text-[#737378] transition-colors inline-flex items-center gap-1 text-sm select-none"
                >
                  <span>↳ {study.nextTitle}</span>
                </NavLink>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
