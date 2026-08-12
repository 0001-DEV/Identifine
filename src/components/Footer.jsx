import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#000000] text-white pt-20 pb-12 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#222222]">
          
          {/* Newsletter & Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#E2B857] flex items-center justify-center text-black font-bold text-xs">
                ⚡
              </div>
              <span className="font-sans text-xl font-bold tracking-tight text-white">
                Identifine
              </span>
            </div>

            <p className="text-xs text-[#888888] leading-relaxed max-w-sm">
              Join our newsletter for tips, updates, and project highlights—only the good stuff.
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Stay connected</h4>
              <form onSubmit={handleNewsletter} className="flex max-w-sm gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-[#111111] border border-[#222222] rounded-full px-4 py-2.5 text-xs text-white placeholder-[#555555] focus:outline-none focus:border-[#E2B857]"
                />
                <button
                  type="submit"
                  className="framer-pill-gold text-xs px-5 py-2.5 shrink-0"
                >
                  Join
                </button>
              </form>

              {subscribed && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed to Identifine!
                </div>
              )}
            </div>
          </div>

          {/* Main Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#777777]">Main links</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#AAAAAA]">
              <li><NavLink to="/" className="hover:text-white transition-colors">Home</NavLink></li>
              <li><NavLink to="/about-us" className="hover:text-white transition-colors">About us</NavLink></li>
              <li><NavLink to="/case-studies" className="hover:text-white transition-colors">Projects</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-white transition-colors">Blog</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-white transition-colors">Contact us</NavLink></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#777777]">Get in touch</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#AAAAAA]">
              <li><a href="tel:+2347046367754" className="hover:text-white transition-colors">+234 704 636 7754</a></li>
              <li><a href="mailto:identifine@cr8.com" className="hover:text-white transition-colors">identifine@cr8.com</a></li>
            </ul>

            <div className="pt-4 border-t border-[#222222]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#777777] block mb-2">Offline</span>
              <p className="text-xs text-[#888888] leading-relaxed">
                Identifine studio<br />
                C-close, 3rd avenue, Citiview estate, warewa, Ogun state, Nigeria
              </p>
            </div>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#777777]">Connect</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#AAAAAA]">
              <li><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://x.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter/X</a></li>
              <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
          <div>©2026 Identifine. All rights reserved</div>
          <NavLink to="/contact" className="hover:text-white transition-colors">Privacy Policy</NavLink>
        </div>

      </div>
    </footer>
  );
}
