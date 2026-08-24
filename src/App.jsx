import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import ElitePassPage from './pages/ElitePassPage';
import ElitePassDetailPage from './pages/ElitePassDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import ProductCataloguePage from './pages/ProductCataloguePage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll To Top on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Global Scroll Reveal for all sections, pages & footer
function ScrollRevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    let observer = null;

    const applyObservers = () => {
      const elementsToObserve = document.querySelectorAll(
        '.scroll-reveal, .reveal-on-scroll, .scroll-reveal-deep, [data-reveal], footer'
      );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              if (observer) observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px -30px 0px'
        }
      );

      elementsToObserve.forEach((el) => {
        if (!el.classList.contains('reveal-on-scroll') && !el.classList.contains('scroll-reveal')) {
          el.classList.add('reveal-on-scroll');
        }
        observer.observe(el);

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30) {
          el.classList.add('is-revealed');
          observer.unobserve(el);
        }
      });
    };

    const timer = setTimeout(applyObservers, 60);
    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/program');

  return (
    <div className="min-h-screen bg-[#080B11] text-[#F1F5F9] font-sans flex flex-col justify-between selection:bg-[#E2B857] selection:text-black">
      <ScrollToTop />
      <ScrollRevealObserver />
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:id" element={<CaseStudyDetailPage />} />
          <Route path="/projects" element={<CaseStudiesPage />} />
          <Route path="/projects/:id" element={<CaseStudyDetailPage />} />
          <Route path="/elite-pass" element={<ElitePassPage />} />
          <Route path="/elite-pass/:id" element={<ElitePassDetailPage />} />
          <Route path="/elitepass" element={<ElitePassPage />} />
          <Route path="/elitepass/:id" element={<ElitePassDetailPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<TermsPage />} />
          <Route path="/program/:id" element={<ProgramDetailPage />} />
          <Route path="/program" element={<ProgramDetailPage />} />
          <Route path="/program-details/:id" element={<ProgramDetailPage />} />
          <Route path="/program-details" element={<ProgramDetailPage />} />
          <Route path="/program/*" element={<ProgramDetailPage />} />
          <Route path="/product-catalogue" element={<ProductCataloguePage />} />
          <Route path="/product-catalogue/:id" element={<ProductCataloguePage />} />
          <Route path="/catalogue" element={<ProductCataloguePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer (hidden on program detail pages) */}
      {!hideFooter && <Footer />}
    </div>
  );
}

