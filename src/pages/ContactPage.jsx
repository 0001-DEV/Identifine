import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#EBEAE6] min-h-screen pt-36 pb-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <h1 className="text-4xl sm:text-7xl font-sans font-bold text-[#111111] leading-tight">
          Start <em className="italic-serif text-[#111111] font-normal">something</em> bold
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Contact us */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#666666] font-bold flex items-center gap-1">
                <span>✦</span> Contact us
              </div>
              <div className="text-sm font-semibold text-[#111111]">
                <a href="tel:+2349030001851" className="block hover:underline">+234 903 000 1851</a>
                <a href="mailto:contact@identifine.com.ng" className="text-xl font-bold text-[#111111] block mt-1 hover:underline">
                  contact@identifine.com.ng
                </a>
              </div>
            </div>

            {/* Visit us */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#666666] font-bold flex items-center gap-1">
                <span>✦</span> Visit us
              </div>
              <div className="text-sm font-bold text-[#111111]">Identifine studio</div>
              <p className="text-xs text-[#555555] leading-relaxed">
                C-close, 3rd avenue, Citiview estate, warewa, Ogun state, Nigeria.
              </p>
            </div>

            {/* Founder Note */}
            <div className="pt-6 border-t border-[#DCDAD4] space-y-3">
              <p className="text-sm font-medium text-[#222222] leading-relaxed">
                Every great project begins with a simple conversation — let’s start yours.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#111111] text-[#E2B857] flex items-center justify-center font-bold text-xs">
                  DA
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111111]">Debo Atiba</div>
                  <div className="text-[10px] font-mono text-[#777777]">Founder & CEO</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Card Form (#F5F4F0 light container) */}
          <div className="lg:col-span-7">
            <div className="bg-[#F5F4F0] p-8 sm:p-12 rounded-3xl border border-[#DCDAD4] shadow-sm space-y-6">
              
              <h2 className="text-2xl font-bold text-[#111111] font-sans">Let’s work together</h2>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#333333]">Full name*</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Amanda Ferguson"
                      className="w-full bg-white border border-[#DCDAD4] rounded-xl px-4 py-3 text-xs text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#333333]">Email address*</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@gmail.com"
                      className="w-full bg-white border border-[#DCDAD4] rounded-xl px-4 py-3 text-xs text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#333333]">Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us the purpose"
                      className="w-full bg-white border border-[#DCDAD4] rounded-xl px-4 py-3 text-xs text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#111111] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="framer-pill-button text-xs px-8 py-3.5"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111111]">Enquiry Received!</h3>
                  <p className="text-xs text-[#555555]">
                    Thank you, Amanda. We will reach out to you within 2 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="framer-pill-button text-xs px-6 py-2.5"
                  >
                    Submit another
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
