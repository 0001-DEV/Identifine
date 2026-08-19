import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import identifineLogo from '../assets/identifine_logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Case studies', path: '/case-studies' },
    { name: 'Elite pass', path: '/elite-pass' },
    { name: 'About us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent ${
      scrolled ? 'py-4' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center group">
          <img 
            src={identifineLogo} 
            alt="Identifine Logo" 
            className="w-[131px] h-[26px] object-contain"
            width={131}
            height={26}
          />
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-[13px] font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-black font-bold' : 'text-[#555555] hover:text-black'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/2347046367754"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden inline-flex items-center justify-center text-sm sm:text-base font-bold px-8 py-4 rounded-full bg-black text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
              <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                <span className="block">Book a consultation</span>
                <span className="block">Book a consultation</span>
              </span>
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-black hover:bg-black/5 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] bottom-0 bg-[#EBEAE6]/95 backdrop-blur-xl border-b border-[#DCDAD4] p-6 shadow-2xl z-50 flex flex-col justify-between animate-fade-in overflow-y-auto">
          <div className="flex flex-col gap-6 pt-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xl font-bold py-2 border-b border-[#DCDAD4]/40 transition-colors ${
                    isActive ? 'text-black font-extrabold' : 'text-[#444444] hover:text-black'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-8 pb-12">
            <a
              href="https://wa.me/2347046367754"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden w-full inline-flex items-center justify-center text-sm font-semibold py-4 rounded-full bg-black text-white shadow-md hover:shadow-xl transition-all duration-300"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                  <span className="block">Book a consultation</span>
                  <span className="block">Book a consultation</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
