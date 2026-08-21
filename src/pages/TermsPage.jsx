import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import starIcon from '../assets/SVG@4x.png';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#EBEAE6] text-[#111111] pt-36 pb-28 px-6 sm:px-12 selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto space-y-16 text-center">
        
        {/* Top Header */}
        <div className="space-y-5 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCDAD4] shadow-sm text-black text-xs font-mono uppercase tracking-[2px] font-semibold">
            <img src={starIcon} alt="" className="w-3.5 h-3.5 object-contain brightness-0 shrink-0" />
            <span>insights</span>
          </div>

          <h1 className="font-galano font-bold text-4xl sm:text-6xl text-[#111111] tracking-tight">
            Terms and conditions
          </h1>

          <p className="text-sm sm:text-base text-[#444444] leading-relaxed max-w-3xl mx-auto font-medium pt-2">
            Welcome to Identifine, an identity consultancy supporting senior leaders and their organizations as they navigate the complexity of promoting individual and organization's identity. By engaging Identifine for consulting, advisory, facilitation, identity designs and deployment, events, or any related programs, you (“Client,” “you,” or “your”) agree to the following Terms and Conditions.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-14 text-center max-w-3xl mx-auto">
          
          {/* Section 1 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Definitions
            </h2>
            <div className="text-sm sm:text-base text-[#444444] leading-relaxed space-y-2.5 font-normal">
              <p><strong className="text-black font-semibold">“Identifine,” “we,” “our,” or “us”</strong> refers to Identifine, its employees, contractors, and authorized representatives.</p>
              <p><strong className="text-black font-semibold">“Client,” “you,” or “your”</strong> refers to the individual or organization entering into an agreement with Identifine.</p>
              <p><strong className="text-black font-semibold">“Programs”</strong> means any consulting, advisory, facilitation, events, or related activities delivered by Identifine.</p>
              <p><strong className="text-black font-semibold">“Agreement”</strong> refers to the contract formed when you accept a proposal, statement of work, engagement letter, or these Terms and Conditions.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Engagement and scope of work
            </h2>
            <div className="text-sm sm:text-base text-[#444444] leading-relaxed space-y-3 font-normal">
              <p><strong className="text-black font-semibold">Service scope:</strong> The nature, timeline, and deliverables of the Services will be defined in writing in a proposal, statement of work, or similar document.</p>
              <p><strong className="text-black font-semibold">Acceptance:</strong> By signing the proposal, paying an invoice, or otherwise authorising work to begin, you accept the terms of the engagement.</p>
              <p><strong className="text-black font-semibold">Changes to scope:</strong> Any changes or additions to the agreed scope must be documented and may require revised fees or timelines.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Fees, invoicing, and payment
            </h2>
            <div className="text-sm sm:text-base text-[#444444] leading-relaxed space-y-3 font-normal">
              <p><strong className="text-black font-semibold">Fees:</strong> Fees for Services will be clearly outlined in the proposal or invoice. Unless otherwise agreed, fees are exclusive of applicable taxes.</p>
              <p><strong className="text-black font-semibold">Payment terms:</strong> Payment is due within the timeframe stated on the invoice. Late payments may incur interest or suspension of Services.</p>
              <p><strong className="text-black font-semibold">Cancellations or postponements:</strong> If you cancel or postpone Services, Identifine may charge for work already completed, non-recoverable costs, or agreed cancellation fees.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Confidentiality
            </h2>
            <div className="text-sm sm:text-base text-[#444444] leading-relaxed space-y-3 font-normal">
              <p><strong className="text-black font-semibold">Mutual confidentiality:</strong> Both parties agree to protect confidential or sensitive information disclosed during the engagement.</p>
              <p><strong className="text-black font-semibold">Exceptions:</strong> Confidentiality obligations do not apply to information that is public, already known, independently developed, or required to be disclosed by law.</p>
              <p><strong className="text-black font-semibold">Client discussions:</strong> Identifine may reference engagement themes in anonymised form for learning or thought leadership, unless otherwise agreed.</p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Privacy and data protection
            </h2>
            <div className="text-sm sm:text-base text-[#444444] leading-relaxed space-y-3 font-normal">
              <p><strong className="text-black font-semibold">Personal data:</strong> Identifine will handle personal data in accordance with applicable data protection laws.</p>
              <p><strong className="text-black font-semibold">Data use:</strong> We collect only the data necessary to deliver the Services and will not share personal data with third parties without permission, unless required by law.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Limitation of liability
            </h2>
            <div className="text-sm sm:text-base text-[#444444] leading-relaxed space-y-3 font-normal">
              <p><strong className="text-black font-semibold">Exclusions:</strong> Identifine is not liable for indirect, incidental, or consequential damages from the client arising from the Services.</p>
              <p><strong className="text-black font-semibold">Liability cap:</strong> Identifine’s total liability is limited to the fees paid by the Client for the specific engagement giving rise to the claim.</p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Termination
            </h2>
            <p className="text-sm sm:text-base text-[#444444] leading-relaxed font-normal">
              Either party may terminate the engagement with written notice, subject to any notice period or cancellation terms set out in the proposal. Work completed up to the date of termination will be invoiced.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Changes to services or scheduling
            </h2>
            <p className="text-sm sm:text-base text-[#444444] leading-relaxed font-normal">
              Identifine reserves the right to adjust schedules, facilitators, formats, or delivery methods where necessary. Any significant changes will be communicated promptly.
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Governing law
            </h2>
            <p className="text-sm sm:text-base text-[#444444] leading-relaxed font-normal">
              These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria, and any disputes will be resolved exclusively in the courts of Nigeria.
            </p>
          </div>

          {/* Section 10 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-[#111111]">
              Entire agreement
            </h2>
            <p className="text-sm sm:text-base text-[#444444] leading-relaxed font-normal">
              These Terms and Conditions, together with the proposal or statement of work, constitute the entire agreement between the parties and supersede all prior discussions or understandings.
            </p>
          </div>

        </div>

        {/* Back Link CTA */}
        <div className="pt-8 text-center">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white font-bold text-sm shadow-xl hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </NavLink>
        </div>

      </div>
    </div>
  );
}
