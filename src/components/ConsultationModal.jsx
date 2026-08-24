import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import starIcon from '../assets/SVG@4x.png';

export default function ConsultationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    solution: 'Executive Metal Passes',
    timeline: 'Urgent (Within 1-2 weeks)',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const solutionOptions = [
    'Smart ID Card',
    'Smart Business Card',
    'Executive Metal Passes',
    'VIP Membership Credentials',
    'Smart Hardware & NFC Access',
    'Corporate Identity Direction',
    'Custom Bespoke Identity'
  ];

  const timelineOptions = [
    'Urgent (Within 1-2 weeks)',
    'Upcoming Event / Launch',
    'Planning & Exploring Options'
  ];

  const handleSendToWhatsApp = (e) => {
    e.preventDefault();
    
    const message = 
      `Hello Identifine! I would like to book an executive consultation.\n\n` +
      `- *Name:* ${formData.name || 'Not specified'}\n` +
      `- *Organization:* ${formData.company || 'Not specified'}\n` +
      `- *Identity Interest:* ${formData.solution}\n` +
      `- *Timeline:* ${formData.timeline}\n` +
      (formData.notes ? `- *Notes/Requirements:* ${formData.notes}\n` : '');

    const whatsappUrl = `https://wa.me/2347046367754?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xl animate-hero-fade-1">
      
      {/* Modal Card */}
      <div 
        className="bg-[#0B0E14] text-white w-full max-w-xl rounded-3xl border border-[#E2B857]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden relative flex flex-col justify-between transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Top Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 flex items-center justify-center">
              <img src={starIcon} alt="" className="w-4 h-4 brightness-200" />
            </div>
            <div>
              <h3 className="font-galano font-semibold text-lg sm:text-xl text-white tracking-tight">
                Book a Consultation
              </h3>
              <p className="text-xs text-[#888888] font-medium">
                Tailored executive identity engineering
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 sm:px-8 pt-6 flex items-center gap-2">
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-[#E2B857]' : 'bg-white/10'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-[#E2B857]' : 'bg-white/10'}`} />
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {step === 1 && (
            <div className="space-y-6 animate-hero-fade-1">
              <div>
                <span className="text-xs font-mono text-[#E2B857] uppercase tracking-widest">Step 1 of 2</span>
                <h4 className="text-xl font-galano font-medium text-white pt-1">
                  Who are we consulting with?
                </h4>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA]">
                  Your Full Name <span className="text-[#E2B857]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E2B857] transition-all font-sans"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA]">
                  Organization / Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rainoil / Seplat / Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E2B857] transition-all font-sans"
                />
              </div>

              {/* Step 1 Next Button */}
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name.trim()}
                className={`w-full py-4 rounded-xl font-galano font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  formData.name.trim()
                    ? 'bg-[#E2B857] text-black hover:bg-[#d6aa46] shadow-lg cursor-pointer'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSendToWhatsApp} className="space-y-6 animate-hero-fade-1">
              <div>
                <span className="text-xs font-mono text-[#E2B857] uppercase tracking-widest">Step 2 of 2</span>
                <h4 className="text-xl font-galano font-medium text-white pt-1">
                  What solution are you exploring?
                </h4>
              </div>

              {/* Identity Solution Options */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA]">
                  Preferred Identity Solution
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {solutionOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setFormData({ ...formData, solution: opt })}
                      className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
                        formData.solution === opt
                          ? 'bg-[#E2B857] text-black border-[#E2B857] font-semibold'
                          : 'bg-white/5 text-white/80 border-white/15 hover:border-white/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Options */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA]">
                  Timeline / Urgency
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {timelineOptions.map((tOpt) => (
                    <button
                      type="button"
                      key={tOpt}
                      onClick={() => setFormData({ ...formData, timeline: tOpt })}
                      className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
                        formData.timeline === tOpt
                          ? 'bg-[#E2B857] text-black border-[#E2B857] font-semibold'
                          : 'bg-white/5 text-white/80 border-white/15 hover:border-white/40'
                      }`}
                    >
                      {tOpt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Notes */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#AAAAAA]">
                  Additional Details or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Quantity needed, specific materials or access card requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E2B857] transition-all font-sans resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-4 rounded-xl border border-white/20 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-xl bg-[#E2B857] text-black font-galano font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#d6aa46] shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request to WhatsApp</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
