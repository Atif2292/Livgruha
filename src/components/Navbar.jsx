import React, { useState, useEffect } from 'react';
import { Phone, Sparkles, Menu, X, ChevronRight, Calculator, MapPin, Layers, ShieldCheck, Clock, Award, Star } from 'lucide-react';
import { useData } from '../context/DataContext';
import { trackEvent } from '../services/analytics';
import BrandLogo from './BrandLogo';

export default function Navbar({ activePage, setActivePage, open3DModal, openEstimatorModal, openConfigModal, openAdminPortal }) {
  const { brand, banners } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'interior', label: 'Services' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'cities', label: 'Branches' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('page_view', { page: pageId });
  };

  const handleCallClick = () => {
    trackEvent('call_click', { placement: 'navbar', phone: brand.phone });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Notification / Offer Bar */}
      <div className="bg-[#9B3F23] text-white py-1.5 px-4 text-xs sm:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-[#FAF8F5]/20 text-[#FAF8F5] px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase">
              Tri-State Coverage
            </span>
            <span className="truncate font-semibold">
              Serving Across Andhra Pradesh, Telangana &amp; Karnataka • Handover in Just 21 Days!
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white shrink-0">
            <a 
              href={`tel:${(brand.phone || '+917995672323').replace(/[^0-9]/g, '')}`} 
              onClick={handleCallClick}
              className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5 transition-all border border-amber-300/40"
              title="Call our direct studio helpline"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>+91 79956 72323</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#E6DFD5]/80 py-2.5' 
          : 'bg-white/90 backdrop-blur-sm border-b border-[#E6DFD5]/40 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => handleNavClick('home')}
                className="group flex items-center focus:outline-none cursor-pointer"
                title="LivGruha Interiors Homepage"
              >
                <BrandLogo />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activePage === item.id
                      ? 'bg-[#9B3F23] text-white shadow-sm'
                      : 'text-[#1E2229] hover:text-[#9B3F23] hover:bg-[#FAF2ED]'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={openEstimatorModal}
                className="px-3.5 py-2 rounded-full text-sm font-semibold text-[#9B3F23] bg-[#FAF2ED] hover:bg-[#F3E2D8] transition-all duration-200 flex items-center gap-1.5 border border-[#E8CFCA] cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#9B3F23]" />
                <span>Design Planner</span>
              </button>
            </div>

            {/* Header Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Highlighted Direct Contact Number */}
              <a
                href={`tel:${(brand.phone || '+917995672323').replace(/[^0-9]/g, '')}`}
                onClick={handleCallClick}
                className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-xs bg-[#FAF2ED] text-[#9B3F23] border border-[#E8CFCA] hover:bg-[#9B3F23] hover:text-white transition-all shadow-xs group"
                title="Call LivGruha Interiors"
              >
                <Phone className="w-3.5 h-3.5 text-[#9B3F23] group-hover:text-white transition-colors" />
                <span>+91 79956 72323</span>
              </a>

              <button
                onClick={open3DModal}
                className="group relative inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#9B3F23] via-[#B84A2A] to-[#C68B59] hover:opacity-95 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 mr-1.5 text-amber-200 animate-spin" style={{ animationDuration: '8s' }} />
                <span>FREE 3D DESIGN</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={open3DModal}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white bg-[#9B3F23]"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                <span>3D Design</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-700 hover:bg-[#FAF2ED] focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E6DFD5] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  activePage === item.id
                    ? 'bg-[#FAF2ED] text-[#9B3F23] font-bold border border-[#E8CFCA]'
                    : 'text-[#1E2229] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                open3DModal();
              }}
              className="w-full py-3 px-4 rounded-2xl text-xs font-bold text-center text-white bg-gradient-to-r from-[#9B3F23] via-[#B84A2A] to-[#C68B59] shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Book Free 3D Design Consultation</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEstimatorModal();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-[#9B3F23] bg-[#FAF2ED] border border-[#E8CFCA]"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Custom Design Planner</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <div className="pt-3 border-t border-[#E6DFD5]/60 flex flex-col gap-2">
              <a
                href={`tel:${(brand.phone || '').replace(/[^0-9]/g, '')}`}
                onClick={handleCallClick}
                className="w-full py-3 rounded-2xl text-xs font-bold text-center text-[#9B3F23] bg-[#FAF2ED] border border-[#E8CFCA] flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Studio: {brand.phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
