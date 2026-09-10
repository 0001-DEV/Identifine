import React from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Case Study Images (Optimized WebP)
import rainoil1 from '../assets/case-studies/rainoil_1.webp';
import rainoil2 from '../assets/case-studies/rainoil_2.webp';
import rainoil3 from '../assets/case-studies/rainoil_3.webp';

import seplatImg from '../assets/seplat.webp';
import seplat2Img from '../assets/seplat 2.webp';
import seplat3Img from '../assets/seplat 3.webp';

import optiva1Img from '../assets/OPTIVA1.webp';
import optiva2Img from '../assets/OPTIVA2.webp';
import optiva3Img from '../assets/OPTIVA3.webp';

import revPlusImg from '../assets/case-studies/revolution_plus.webp';
import armImg from '../assets/case-studies/arm.webp';
import sterlingImg from '../assets/case-studies/sterling_bank.webp';
import tvcImg from '../assets/case-studies/tvc.webp';
import bank78Img from '../assets/case-studies/bank78.webp';
import ubaImg from '../assets/case-studies/uba.webp';
import elitePassBlack from '../assets/ELITE_PASS_BLACK_MATTE.webp';
import elitePassGold from '../assets/ELITE_PASS_GOLD.webp';
import elitePassSilver from '../assets/ELITE_PASS_SILVER.webp';

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
    type: 'Visual Identity Direction, Touchpoints',
    year: '2026',
    writeup: (
      <div className="space-y-6 font-galano font-medium text-sm text-[#1f1f1f] leading-relaxed pt-2">
        <p>
          One identity. Two systems. One seamless experience. Rethinking the employee credential as more than a card — but as a point where technology, access and organizational identity meet.
        </p>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE CHALLENGE</h3>
          <p>
            Two offices. Two systems. One organization. Seplat Energy had two office environments, each operating on a different access-control system. For employees moving between them, identity came with friction. What should have been a simple act of access required navigating two separate systems — and potentially, two separate credentials. But the problem went deeper. The employee ID was functioning as a utility — a tool to open doors — rather than an expression of the brand itself. In an organization operating at the highest levels of the energy sector, touchpoints should reflect precision, authority and cohesion. The access card was a missed opportunity.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE QUESTION</h3>
          <p>
            How do you unify two separate physical security systems into a single employee credential — without changing the underlying infrastructure of either office? And how do you turn that credential into something an employee is proud to carry?
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE INSIGHT</h3>
          <p>
            An identity card is not just hardware. It is the most frequent physical interaction an employee has with their organization. When designed thoughtfully, it ceases to be a plastic card and becomes an artifact of belonging.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE APPROACH</h3>
          <p>
            Identifine approached the challenge not as a card-printing exercise, but as an identity architecture problem. We audited both access control systems to understand their frequencies, protocols and encoding requirements. The solution required embedding dual-chip technology into a single, high-durability substrate — allowing one card to communicate seamlessly across both office environments. But technical integration was only half the assignment. The card itself needed to feel like Seplat Energy: modern, disciplined and premium. We designed a clean, minimalist visual layout that elevated the company’s brand identity, utilizing precision surface finishing and durable materials built for daily, high-use environments.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE SOLUTION</h3>
          <p>
            A single, custom-engineered dual-technology smart card that grants frictionless access across all Seplat Energy locations. Paired with a refined visual identity that replaces generic corporate pass design with a sleek, high-grade executive credential.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">FROM ACCESS CARD TO IDENTITY EXPERIENCE</h3>
          <p>
            To complete the ecosystem, Identifine delivered the cards in custom-designed executive packaging — transforming what is normally a administrative handoff into an onboarding moment that communicates value from day one.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE RESULT</h3>
          <p>
            Zero friction across offices. One card for every employee. A tangible upgrade to Seplat Energy’s everyday touchpoints.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">THE BIGGER IDEA</h3>
          <p>
            Technology should solve complexity silently. Design should make the solution feel effortless.
          </p>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#1f1f1f] uppercase tracking-wider text-xs">CLOSING</h3>
          <p>
            Identifine exists at the intersection of both — turning everyday corporate objects into expressions of identity, access and precision.
          </p>
        </div>
      </div>
    ),
    images: [seplatImg, seplat3Img, seplat2Img],
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
    images: [optiva1Img, optiva2Img, optiva3Img],
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
    <div className="bg-[#EBEAE6] text-[#1f1f1f] min-h-screen pt-36 sm:pt-48 pb-28 px-6 sm:px-12 lg:px-16 selection:bg-[#E2B857] selection:text-black font-sans">
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
              {typeof study.writeup === 'string' ? (
                <p className="font-galano font-medium text-sm text-[#1f1f1f] leading-relaxed pt-2">
                  {study.writeup}
                </p>
              ) : (
                study.writeup
              )}
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
                  decoding="async"
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
