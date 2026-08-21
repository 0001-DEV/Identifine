import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import identifineLogo from '../assets/identifine_logo.png';

function IdentifineWhiteTextLogo({ className = "h-[100px] w-auto" }) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = identifineLogo;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i+1], b = d[i+2], a = d[i+3];
        if (a > 15) {
          const isGold = (r > 140 && g > 100 && b < 110);
          if (!isGold) {
            d[i] = 255;
            d[i+1] = 255;
            d[i+2] = 255;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setDataUrl(canvas.toDataURL());
    };
  }, []);

  return (
    <img
      src={dataUrl || identifineLogo}
      alt="Identifine Logo"
      className={className}
    />
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsDownloaded(true);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer ref={footerRef} className="bg-black text-white px-6 sm:px-12 pt-16 pb-10 relative overflow-hidden">
      
      {/* Streaming / Downloading Top Indicator Line */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E2B857] to-transparent transition-all duration-1000 ${
          isDownloaded ? 'opacity-100 w-full scale-x-100' : 'opacity-0 scale-x-0'
        }`} 
      />

      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Content Top */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 pb-12">
          
          {/* Content Left: Newsletter */}
          <div 
            className={`max-w-[367px] w-full space-y-6 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDownloaded 
                ? 'opacity-100 translate-y-0 blur-0' 
                : 'opacity-0 translate-y-8 blur-[4px]'
            }`}
          >
            <div className="space-y-3">
              <h4 className="text-base font-normal text-white">Stay connected</h4>
              <p className="text-[#AAA9AD] text-base leading-snug">
                Join our newsletter for tips, updates, and project highlights—only the good stuff.
              </p>
            </div>

            <form onSubmit={handleNewsletter} className="relative w-full">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-[10px] px-5 py-3.5 backdrop-blur-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address*"
                  className="bg-transparent text-[#AAA9AD] placeholder-[#AAA9AD]/60 text-base focus:outline-none flex-1 pr-12 w-full font-medium"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 hover:scale-105 transition-transform shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {subscribed && (
              <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed to Identifine!
              </div>
            )}
          </div>

          {/* Content Right: Links & Contact */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20 w-full">
            
            {/* Main Links */}
            <div 
              className={`space-y-4 transition-all duration-700 delay-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isDownloaded 
                  ? 'opacity-100 translate-y-0 blur-0' 
                  : 'opacity-0 translate-y-8 blur-[4px]'
              }`}
            >
              <p className="text-[#AAA9AD] text-base font-normal">Main links</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-base text-[#AAA9AD]">
                <div className="space-y-3">
                  <NavLink to="/" className="block text-white hover:text-white/80 transition-colors">Home</NavLink>
                  <NavLink to="/about-us" className="block text-[#AAA9AD] hover:text-white transition-colors">About us</NavLink>
                  <NavLink to="/case-studies" className="block text-[#AAA9AD] hover:text-white transition-colors">Projects</NavLink>
                  <NavLink to="/blog" className="block text-[#AAA9AD] hover:text-white transition-colors">Blog</NavLink>
                </div>
                <div className="space-y-3">
                  <NavLink to="/contact" className="block text-[#AAA9AD] hover:text-white transition-colors">Contact us</NavLink>
                </div>
              </div>
            </div>

            {/* Get in touch & Offline */}
            <div 
              className={`space-y-8 transition-all duration-700 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isDownloaded 
                  ? 'opacity-100 translate-y-0 blur-0' 
                  : 'opacity-0 translate-y-8 blur-[4px]'
              }`}
            >
              <div className="space-y-4">
                <p className="text-[#AAA9AD] text-base font-normal">Get in touch</p>
                <div className="space-y-3 text-base text-[#AAA9AD]">
                  <a href="tel:+2347046367754" className="block text-[#AAA9AD] hover:text-white transition-colors">+234 704 636 7754</a>
                  <a href="mailto:identifine@cr8.com" className="block text-[#AAA9AD] hover:text-white transition-colors">identifine@cr8.com</a>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-[#AAA9AD] text-base font-normal">Offline</p>
                <div className="text-base space-y-1 text-[#AAA9AD]">
                  <span className="text-white block font-normal">Identifine studio</span>
                  <address className="text-[#AAA9AD] not-italic leading-snug">
                    C-close, 3rd avenue, Citiview estate, warewa, Ogun state, Nigeria
                  </address>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Logo & Social List Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pt-4 w-full">
          
          {/* Social List Rows - Staggered scroll-up reveal */}
          <div className="max-w-[284px] w-full space-y-0">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-between py-4 border-b border-white/20 group text-[#AAA9AD] hover:text-white transition-all duration-800 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isDownloaded 
                  ? 'opacity-100 translate-y-0 scale-100 blur-0' 
                  : 'opacity-0 translate-y-12 scale-95 blur-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-[#AAA9AD] group-hover:text-white transition-colors" />
                <span className="text-xl font-medium tracking-tight text-[#AAA9AD] group-hover:text-white transition-colors">LinkedIn</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#AAA9AD] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-between py-4 border-b border-white/20 group text-[#AAA9AD] hover:text-white transition-all duration-800 delay-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isDownloaded 
                  ? 'opacity-100 translate-y-0 scale-100 blur-0' 
                  : 'opacity-0 translate-y-12 scale-95 blur-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <Twitter className="w-5 h-5 text-[#AAA9AD] group-hover:text-white transition-colors" />
                <span className="text-xl font-medium tracking-tight text-[#AAA9AD] group-hover:text-white transition-colors">Twitter/X</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#AAA9AD] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-between py-4 border-b border-white/20 group text-[#AAA9AD] hover:text-white transition-all duration-800 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isDownloaded 
                  ? 'opacity-100 translate-y-0 scale-100 blur-0' 
                  : 'opacity-0 translate-y-12 scale-95 blur-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-[#AAA9AD] group-hover:text-white transition-colors" />
                <span className="text-xl font-medium tracking-tight text-[#AAA9AD] group-hover:text-white transition-colors">Instagram</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#AAA9AD] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Logo on Right - Staggered Streamed Logo (Responsive Height on all screens) */}
          <NavLink 
            to="/" 
            className={`inline-block pb-2 shrink-0 max-w-full transition-all duration-900 delay-650 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isDownloaded 
                ? 'opacity-100 translate-y-0 lg:-translate-y-6 xl:-translate-y-10 scale-100 blur-0' 
                : 'opacity-0 translate-y-16 scale-90 blur-md'
            }`}
          >
            <IdentifineWhiteTextLogo className="h-[48px] sm:h-[70px] md:h-[84px] lg:h-[100px] max-w-full w-auto object-contain" />
          </NavLink>

        </div>

        {/* Copyright & Legal */}
        <div 
          className={`flex justify-end pt-6 border-t border-white/10 text-base text-[#AAA9AD] transition-all duration-700 delay-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDownloaded 
              ? 'opacity-100 translate-y-0 blur-0' 
              : 'opacity-0 translate-y-6 blur-[2px]'
          }`}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span>©2026 Identifine. All rights reserved</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#AAA9AD] shrink-0 inline-block" aria-hidden="true" />
            <NavLink to="/terms" className="text-[#AAA9AD] hover:text-white transition-colors">
              Terms & Conditions
            </NavLink>
          </div>
        </div>

      </div>
    </footer>
  );
}
