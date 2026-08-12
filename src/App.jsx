import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ElitePassPage from './pages/ElitePassPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './pages/NotFoundPage';

// Scroll To Top on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#080B11] text-[#F1F5F9] font-sans flex flex-col justify-between selection:bg-[#E2B857] selection:text-black">
      <ScrollToTop />
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/elite-pass" element={<ElitePassPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          {/* Catch-all aliases */}
          <Route path="/program-details" element={<HomePage />} />
          <Route path="/product-catalogue" element={<ElitePassPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
