import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import identifineLogo from '../assets/identifine_logo.png';
import ConsultationModal from './ConsultationModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
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
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-4 bg-[#EBEAE6]/95 backdrop-blur-md border-b border-[#DCDAD4]/50 shadow-sm' 
          : 'py-6 bg-[#EBEAE6]'
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

          {/* Desktop Navigation Links (Visible on lg 1024px+ screens) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-base font-semibold tracking-wide transition-colors ${
                    isActive ? 'text-[#E2B857] font-bold' : 'text-[#555555] hover:text-[#E2B857]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right CTA Button (Visible on lg 1024px+ screens) */}
          <div className="hidden lg:block">
            <button
              onClick={() => setConsultationModalOpen(true)}
              className="group relative overflow-hidden inline-flex items-center justify-center text-sm sm:text-base font-bold px-8 py-4 rounded-full bg-black text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                  <span className="block">Book a consultation</span>
                  <span className="block">Book a consultation</span>
                </span>
              </span>
            </button>
          </div>

          {/* Mobile / Split-Screen Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-black hover:bg-black/5 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile / Split-Screen Menu Drawer */}
        <div 
          className={`lg:hidden fixed inset-x-0 top-[65px] bg-[#EBEAE6] backdrop-blur-2xl border-b border-[#DCDAD4] shadow-2xl z-50 flex flex-col justify-between overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen ? 'max-h-[calc(100vh-65px)] opacity-100 p-6 sm:p-8' : 'max-h-0 opacity-0 px-6 sm:px-8 py-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-6 pt-4">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xl font-bold py-2 border-b border-[#DCDAD4]/40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'text-[#E2B857] font-extrabold' : 'text-[#444444] hover:text-[#E2B857]'
                  }`
                }
                style={{ 
                  clipPath: mobileMenuOpen ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                  transitionDelay: mobileMenuOpen ? `${150 + (idx * 150)}ms` : '0ms' 
                }}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div 
            className={`pt-8 pb-12 transition-all duration-700 ease-out transform ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? `${150 + (navLinks.length * 150)}ms` : '0ms' }}
          >
            <div className="flex justify-start w-full">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setConsultationModalOpen(true);
                }}
                className="group relative overflow-hidden inline-flex items-center justify-center text-xs sm:text-sm font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-black text-white shadow-md hover:shadow-xl transition-all duration-300 w-auto"
              >
                <span className="relative inline-block overflow-hidden h-[1.3em] leading-snug">
                  <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                    <span className="block">Book a consultation</span>
                    <span className="block">Book a consultation</span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Consultation Form Questionnaire Modal */}
      <ConsultationModal 
        isOpen={consultationModalOpen} 
        onClose={() => setConsultationModalOpen(false)} 
      />
    </>
  );
}
