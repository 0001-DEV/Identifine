import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Case studies', path: '/case-studies' },
    { name: 'Elite pass', path: '/elite-pass' },
    { name: 'About us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 framer-glass-header border-b border-[#DCDAD4]/70 shadow-sm' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-md bg-[#E2B857] flex items-center justify-center text-black font-bold text-xs shadow-sm">
            ⚡
          </div>
          <span className="font-sans text-lg font-bold tracking-tight text-[#111111] group-hover:text-black">
            Identifine
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-xs font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-black font-bold' : 'text-[#666666] hover:text-black'
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
            href="https://wa.me/2349030001851"
            target="_blank"
            rel="noopener noreferrer"
            className="framer-pill-button inline-flex items-center gap-2"
          >
            Book a consultation
          </a>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-black hover:bg-black/5"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] bg-[#EBEAE6] border-b border-[#DCDAD4] p-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold py-2 transition-colors ${
                    isActive ? 'text-black font-extrabold' : 'text-[#666666] hover:text-black'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-[#DCDAD4]">
              <a
                href="https://wa.me/2349030001851"
                target="_blank"
                rel="noopener noreferrer"
                className="framer-pill-button w-full text-center block"
              >
                Book a consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
