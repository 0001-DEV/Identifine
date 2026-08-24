import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import starIcon from '../assets/SVG@4x.png';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive corporate identity design, strategy, brand audits, executive identity solutions, and premium NFC card ecosystems."
  },
  {
    question: "Do you work with startups or only big brands?",
    answer: "We work with organizations of all sizes—from ambitious startups looking to establish a strong foundational identity, to enterprise organizations needing comprehensive identity realignment."
  },
  {
    question: "How long does a typical project take?",
    answer: "A standard identity transformation project typically takes 4 to 8 weeks, depending on the scope, scale, and specific requirements of your organization."
  },
  {
    question: "What’s your pricing structure?",
    answer: "Our pricing is project-based and tailored to your specific needs. After our initial consultation, we provide a detailed proposal outlining the scope and investment required."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const faqRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-card-item',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 80%',
          }
        }
      );
    }, faqRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#EBEAE6] min-h-screen pt-36 sm:pt-44 pb-28 px-6 sm:px-12 text-[#111111] overflow-hidden">
      <div className="max-w-[96rem] mx-auto space-y-24 sm:space-y-32">
        
        {/* Header - Reduced width, centered & font-medium */}
        <div className="animate-hero-fade-1 max-w-4xl mx-auto text-center pb-2">
          <h1 className="text-5xl sm:text-7xl lg:text-[6.25rem] font-galano font-medium text-[#111111] leading-[1.08] tracking-tight text-center">
            Start <em className="font-swarsh italic font-medium text-[#111111] px-1">something</em> bold
          </h1>
        </div>

        {/* Contact Grid: Left Details & Right Form Container */}
        <div className="animate-hero-fade-2 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Details - Indented with margin-left, bottom aligned with right form container */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full text-left lg:ml-4 xl:ml-8 space-y-8">
            
            <div className="space-y-8">
              {/* Contact us */}
              <div className="space-y-3">
                <div className="inline-flex items-center justify-start gap-2">
                  <img
                    src={starIcon}
                    alt=""
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain brightness-0"
                  />
                  <span
                    className="font-galano font-normal text-xs sm:text-sm text-[#111111] uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap"
                  >
                    Contact us
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  <a href="tel:+2349030001851" className="block text-xl sm:text-2xl font-normal text-[#111111] hover:text-[#E2B857] transition-colors">
                    +234 903 000 1851
                  </a>
                  <a href="mailto:contact@identifine.com.ng" className="text-lg sm:text-xl lg:text-[1.65rem] font-bold text-[#111111] block hover:text-[#E2B857] transition-colors leading-tight max-w-xs sm:max-w-sm">
                    contact@identifine.com.ng
                  </a>
                </div>
              </div>

              {/* Visit us */}
              <div className="space-y-3">
                <div className="inline-flex items-center justify-start gap-2">
                  <img
                    src={starIcon}
                    alt=""
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain brightness-0"
                  />
                  <span
                    className="font-galano font-normal text-xs sm:text-sm text-[#111111] uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap"
                  >
                    Visit us
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="text-xl sm:text-2xl font-bold text-[#111111]">Identifine studio</div>
                  <p className="text-base sm:text-lg text-[#444444] leading-relaxed font-normal max-w-sm">
                    C-close, 3rd avenue, Citiview estate, warewa, Ogun state, Nigeria.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Note - Bottom Aligned to Right Container */}
            <div className="pt-6 border-t border-[#DCDAD4] space-y-3.5 mt-auto">
              <p className="text-lg sm:text-xl font-galano font-normal text-[#111111] leading-relaxed">
                “Every great project begins with a simple <br /> conversation — let’s start yours.”
              </p>
              
              <div className="flex items-center gap-3.5 pt-1">
                <div className="w-12 h-12 rounded-full bg-[#111111] text-[#E2B857] flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                  DA
                </div>
                <div>
                  <div className="text-base font-bold text-[#111111]">Debo Atiba</div>
                  <div className="text-xs sm:text-sm font-mono text-[#666666]">Founder & CEO</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Container (Height & Width increased by 18px) */}
          <div className="lg:col-span-7">
            <div className="bg-[#F5F4F0] p-10 sm:p-12 lg:p-14 min-h-[518px] rounded-none border border-[#DCDAD4] shadow-md space-y-7 flex flex-col justify-between h-full">
              
              <h2 className="text-2xl sm:text-3xl font-galano font-medium text-[#111111]">
                Let’s work together
              </h2>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#333333]">Full name*</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Amanda Ferguson"
                      className="w-full bg-white border border-[#DCDAD4] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#111111] shadow-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#333333]">Email address*</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@gmail.com"
                      className="w-full bg-white border border-[#DCDAD4] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#111111] shadow-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-[#333333]">Message</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us the purpose"
                      className="w-full bg-white border border-[#DCDAD4] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#111111] resize-none shadow-sm transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative overflow-hidden inline-flex items-center justify-center text-sm sm:text-base font-semibold px-10 py-3.5 rounded-full bg-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[50px] mt-2"
                  >
                    <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                      <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                        <span className="block">Submit</span>
                        <span className="block">Submit</span>
                      </span>
                    </span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">Enquiry Received!</h3>
                  <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
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

        {/* FAQ Section - Center Aligned Header & White Card Containers */}
        <div ref={faqRef} className="pt-16 sm:pt-24 border-t border-[#DCDAD4] space-y-12">
          
          {/* Center-aligned FAQ Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center justify-center gap-2 mx-auto">
              <img
                src={starIcon}
                alt=""
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 object-contain brightness-0"
              />
              <span
                className="font-galano font-medium text-xs sm:text-sm text-[#111111] uppercase tracking-[2px] sm:tracking-[4px] whitespace-nowrap"
              >
                Have questions?
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-galano font-medium text-[#111111] leading-[1.12] text-center">
              Clarity <em className="font-swarsh italic font-medium text-[#111111] px-1">starts</em> right here
            </h2>
          </div>

          {/* FAQ Accordion Cards */}
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="faq-card-item bg-[#EBEAE6] border border-[#DCDAD4] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left group focus:outline-none"
                  >
                    <h3 className="text-xl sm:text-2xl font-galano font-medium text-[#111111] group-hover:text-[#E2B857] transition-colors leading-snug pr-6">
                      {faq.question}
                    </h3>
                    <div className="w-11 h-11 rounded-full bg-[#DCDAD4]/40 group-hover:bg-[#E2B857] text-[#111111] border border-[#DCDAD4] flex items-center justify-center shrink-0 transition-colors shadow-sm">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-[#DCDAD4]/60' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className={`text-base sm:text-[1.05rem] text-[#444444] leading-relaxed max-w-3xl font-normal ${isOpen ? 'animate-typewriter-text' : ''}`}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
