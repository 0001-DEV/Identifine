import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#080B11] text-white pt-32 pb-24 px-6 sm:px-12 selection:bg-[#E2B857] selection:text-black">
      <div className="max-w-4xl mx-auto space-y-16 text-center">
        
        {/* Top Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-mono uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Official Agreement
          </div>

          <h1 className="font-galano font-bold text-4xl sm:text-6xl text-white tracking-tight">
            Terms and conditions
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl mx-auto font-medium pt-2">
            Welcome to Identifine, an identity consultancy supporting senior leaders and their organizations as they navigate the complexity of promoting individual and organization's identity. By engaging Identifine for consulting, advisory, facilitation, identity designs and deployment, events, or any related programs, you (“Client,” “you,” or “your”) agree to the following Terms and Conditions.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-14 text-center max-w-3xl mx-auto">
          
          {/* Section 1 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Definitions
            </h2>
            <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-2 font-normal">
              <p><strong className="text-[#E2B857] font-semibold">“Identifine,” “we,” “our,” or “us”</strong> refers to Identifine, its employees, contractors, and authorized representatives.</p>
              <p><strong className="text-[#E2B857] font-semibold">“Client,” “you,” or “your”</strong> refers to the individual or organization entering into an agreement with Identifine.</p>
              <p><strong className="text-[#E2B857] font-semibold">“Programs”</strong> means any consulting, advisory, facilitation, events, or related activities delivered by Identifine.</p>
              <p><strong className="text-[#E2B857] font-semibold">“Agreement”</strong> refers to the contract formed when you accept a proposal, statement of work, engagement letter, or these Terms and Conditions.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Engagement and scope of work
            </h2>
            <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-3 font-normal">
              <p><strong className="text-[#E2B857] font-semibold">Service scope:</strong> The nature, timeline, and deliverables of the Services will be defined in writing in a proposal, statement of work, or similar document.</p>
              <p><strong className="text-[#E2B857] font-semibold">Acceptance:</strong> By signing the proposal, paying an invoice, or otherwise authorising work to begin, you accept the terms of the engagement.</p>
              <p><strong className="text-[#E2B857] font-semibold">Changes to scope:</strong> Any changes or additions to the agreed scope must be documented and may require revised fees or timelines.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Fees, invoicing, and payment
            </h2>
            <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-3 font-normal">
              <p><strong className="text-[#E2B857] font-semibold">Fees:</strong> Fees for Services will be clearly outlined in the proposal or invoice. Unless otherwise agreed, fees are exclusive of applicable taxes.</p>
              <p><strong className="text-[#E2B857] font-semibold">Payment terms:</strong> Payment is due within the timeframe stated on the invoice. Late payments may incur interest or suspension of Services.</p>
              <p><strong className="text-[#E2B857] font-semibold">Cancellations or postponements:</strong> If you cancel or postpone Services, Identifine may charge for work already completed, non-recoverable costs, or agreed cancellation fees.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Confidentiality
            </h2>
            <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-3 font-normal">
              <p><strong className="text-[#E2B857] font-semibold">Mutual confidentiality:</strong> Both parties agree to protect confidential or sensitive information disclosed during the engagement.</p>
              <p><strong className="text-[#E2B857] font-semibold">Exceptions:</strong> Confidentiality obligations do not apply to information that is public, already known, independently developed, or required to be disclosed by law.</p>
              <p><strong className="text-[#E2B857] font-semibold">Client discussions:</strong> Identifine may reference engagement themes in anonymised form for learning or thought leadership, unless otherwise agreed.</p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Privacy and data protection
            </h2>
            <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-3 font-normal">
              <p><strong className="text-[#E2B857] font-semibold">Personal data:</strong> Identifine will handle personal data in accordance with applicable data protection laws.</p>
              <p><strong className="text-[#E2B857] font-semibold">Data use:</strong> We collect only the data necessary to deliver the Services and will not share personal data with third parties without permission, unless required by law.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Limitation of liability
            </h2>
            <div className="text-sm sm:text-base text-white/80 leading-relaxed space-y-3 font-normal">
              <p><strong className="text-[#E2B857] font-semibold">Exclusions:</strong> Identifine is not liable for indirect, incidental, or consequential damages from the client arising from the Services.</p>
              <p><strong className="text-[#E2B857] font-semibold">Liability cap:</strong> Identifine’s total liability is limited to the fees paid by the Client for the specific engagement giving rise to the claim.</p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Termination
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              Either party may terminate the engagement with written notice, subject to any notice period or cancellation terms set out in the proposal. Work completed up to the date of termination will be invoiced.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Changes to services or scheduling
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              Identifine reserves the right to adjust schedules, facilitators, formats, or delivery methods where necessary. Any significant changes will be communicated promptly.
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Governing law
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria, and any disputes will be resolved exclusively in the courts of Nigeria.
            </p>
          </div>

          {/* Section 10 */}
          <div className="space-y-4 text-center">
            <h2 className="font-galano font-bold text-2xl sm:text-3xl text-white">
              Entire agreement
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              These Terms and Conditions, together with the proposal or statement of work, constitute the entire agreement between the parties and supersede all prior discussions or understandings.
            </p>
          </div>

        </div>

        {/* Back Link CTA */}
        <div className="pt-8 text-center">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm shadow-xl hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </NavLink>
        </div>

      </div>
    </div>
  );
}
