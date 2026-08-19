import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        '.faq-question-text',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
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
    <div className="bg-[#EBEAE6] min-h-screen pt-36 pb-28 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <h1 className="text-5xl sm:text-8xl lg:text-[7.5rem] text-center font-sans font-bold text-[#111111] leading-tight pb-6">
          Start <em className="italic-serif text-[#111111] font-normal">something</em> bold
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Details */}
          <div className="lg:col-span-4 space-y-10 lg:-ml-16 xl:-ml-24">
            
            {/* Contact us */}
            <div className="space-y-3">
              <div className="text-sm font-mono uppercase tracking-widest text-[#666666] font-bold flex items-center gap-1">
                <span>✦</span> Contact us
              </div>
              <div className="text-base sm:text-lg font-semibold text-[#111111]">
                <a href="tel:+2349030001851" className="block hover:underline">+234 903 000 1851</a>
                <a href="mailto:contact@identifine.com.ng" className="text-2xl sm:text-3xl font-bold text-[#111111] block mt-1 hover:underline">
                  contact@identifine.com.ng
                </a>
              </div>
            </div>

            {/* Visit us */}
            <div className="space-y-2">
              <div className="text-sm font-mono uppercase tracking-widest text-[#666666] font-bold flex items-center gap-1">
                <span>✦</span> Visit us
              </div>
              <div className="text-base sm:text-lg font-bold text-[#111111]">Identifine studio</div>
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                C-close, 3rd avenue, Citiview estate, warewa, Ogun state, Nigeria.
              </p>
            </div>

            {/* Founder Note */}
            <div className="pt-6 border-t border-[#DCDAD4] space-y-3">
              <p className="text-base font-medium text-[#222222] leading-relaxed">
                Every great project begins with a simple conversation — let’s start yours.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                <div className="w-12 h-12 rounded-full bg-[#111111] text-[#E2B857] flex items-center justify-center font-bold text-sm">
                  DA
                </div>
                <div>
                  <div className="text-sm font-bold text-[#111111]">Debo Atiba</div>
                  <div className="text-xs font-mono text-[#777777]">Founder & CEO</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Card Form (#F5F4F0 light container) */}
          <div className="lg:col-span-8">
            <div className="bg-[#F5F4F0] p-8 sm:p-12 rounded-3xl border border-[#DCDAD4] shadow-sm space-y-6">
              
              <h2 className="text-3xl font-bold text-[#111111] font-sans">Let’s work together</h2>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#333333]">Full name*</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Amanda Ferguson"
                      className="w-full bg-white border border-[#DCDAD4] rounded-xl px-4 py-3.5 text-sm text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#333333]">Email address*</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@gmail.com"
                      className="w-full bg-white border border-[#DCDAD4] rounded-xl px-4 py-3.5 text-sm text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#333333]">Message</label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us the purpose"
                      className="w-full bg-white border border-[#DCDAD4] rounded-xl px-4 py-3.5 text-sm text-[#111111] placeholder-[#AAAAAA] focus:outline-none focus:border-[#111111] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="framer-pill-button text-sm px-10 py-4"
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

        {/* FAQ Section */}
        <div ref={faqRef} className="pt-24 border-t border-[#DCDAD4]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-4 space-y-4 lg:-ml-16 xl:-ml-24">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-[#111111] leading-tight tracking-tight">
                Have questions? <br/>
                <span className="text-[#666666] italic-serif font-normal">Clarity start right here</span>
              </h2>
            </div>

            <div className="lg:col-span-8">
              <div className="border-t border-[#DCDAD4]">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="border-b border-[#DCDAD4]">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left py-6 sm:py-8 group"
                      >
                        <h3 className="faq-question-text text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111] group-hover:text-[#E2B857] transition-colors leading-tight pr-8" style={{ clipPath: 'inset(0 100% 0 0)' }}>
                          {faq.question}
                        </h3>
                        <div className="w-10 h-10 rounded-full bg-[#EBEAE6] group-hover:bg-[#E2B857] text-[#111111] flex items-center justify-center shrink-0 transition-colors">
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </button>
                      <div
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-3xl">
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

      </div>
    </div>
  );
}
