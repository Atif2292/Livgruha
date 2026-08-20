import React from 'react';
import { 
  Phone, Mail, MapPin, Sparkles, Shield, Clock, Award, 
  ChevronRight, Heart, ArrowUpRight, Calculator, ShieldCheck 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { trackEvent } from '../services/analytics';
import BrandLogo from './BrandLogo';

export default function Footer({ setActivePage, open3DModal, openEstimatorModal, openConfigModal, openAdminPortal, openLegalModal }) {
  const { brand, banners, cities } = useData();

  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('page_view', { page: pageId });
  };

  const handleCallClick = () => {
    trackEvent('call_click', { placement: 'footer', phone: brand.phone });
  };

  return (
    <footer className="bg-[#18181B] text-[#FAF8F5] pt-16 pb-12 border-t border-gray-800 font-sans relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#9B3F23]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Assurance Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gray-800 text-left">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-[#9B3F23]/20 text-[#C68B59] rounded-2xl shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{banners.handoverDays || "21-Day"} Handover</h4>
              <p className="text-xs text-gray-400 mt-0.5">Strict schedule with on-time delivery assurance</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-[#9B3F23]/20 text-[#C68B59] rounded-2xl shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{brand.warrantyYears || "10-Year"} Warranty</h4>
              <p className="text-xs text-gray-400 mt-0.5">IS-710 Marine BWR Plywood structural assurance</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-[#9B3F23]/20 text-[#C68B59] rounded-2xl shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Genuine Blum</h4>
              <p className="text-xs text-gray-400 mt-0.5">Original German hinges & hydraulic lifters</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-[#9B3F23]/20 text-[#C68B59] rounded-2xl shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free 3D Design</h4>
              <p className="text-xs text-gray-400 mt-0.5">Photorealistic visual model before commitment</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-gray-800">
          {/* Col 1: Brand Ethos & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => handleNav('home')} 
              className="text-left focus:outline-none cursor-pointer group"
            >
              <BrandLogo variant="dark" layout="horizontal" size="large" />
            </button>
            
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              <strong>LivGruha Interiors</strong> delivers bespoke turnkey home interiors with certified German Blum mechanisms, 100% IS-710 Marine BWR Plywood, and guaranteed 21-day handover.
            </p>

            <div className="pt-2 flex flex-col space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-[#C68B59] shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>

              <a 
                href={`tel:${(brand.phone || '+917995672323').replace(/[^0-9]/g, '')}`} 
                onClick={handleCallClick}
                className="flex items-center gap-2 hover:text-[#C68B59] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C68B59]" />
                <span className="font-semibold">{brand.phone || '+91 79956 72323'} (10:00 AM - 8:30 PM)</span>
              </a>

              <a href={`mailto:${brand.email || 'info@livgruhainteriors.com'}`} className="flex items-center gap-2 hover:text-[#C68B59] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#C68B59]" />
                <span>{brand.email || 'info@livgruhainteriors.com'}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#C68B59] mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><button onClick={() => handleNav('home')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"><ChevronRight className="w-3 h-3 text-[#C68B59]" /> Home Overview</button></li>
              <li><button onClick={() => handleNav('about')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"><ChevronRight className="w-3 h-3 text-[#C68B59]" /> About LivGruha</button></li>
              <li><button onClick={() => handleNav('how-it-works')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"><ChevronRight className="w-3 h-3 text-[#C68B59]" /> How It Works</button></li>
              <li><button onClick={() => handleNav('portfolio')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"><ChevronRight className="w-3 h-3 text-[#C68B59]" /> Completed Projects</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"><ChevronRight className="w-3 h-3 text-[#C68B59]" /> Contact Us</button></li>
            </ul>
          </div>

          {/* Col 3: Interior Services */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#C68B59] mb-4">
              Design Solutions
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('interior')}>Modular Kitchens (Blum)</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('interior')}>Master Bedroom Suites</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('interior')}>Floor-to-Ceiling Wardrobes</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('interior')}>Living TV & Acoustic Louvers</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('interior')}>Sacred Teak Pooja Mandirs</span></li>
              <li><span className="hover:text-white cursor-pointer" onClick={() => handleNav('interior')}>False Ceiling & Profile LEDs</span></li>
            </ul>
          </div>

          {/* Col 4: Service Areas */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#C68B59] mb-4">
              Service Locations
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button 
                  onClick={() => handleNav('contact')} 
                  className="hover:text-white transition-colors flex items-center justify-between w-full cursor-pointer text-left"
                >
                  <div>
                    <span className="font-semibold text-white block">Hyderabad, Telangana</span>
                    <span className="text-[10px] text-gray-400">Complete Home Interiors</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF2ED]/10 text-[#C68B59] border border-[#C68B59]/30">Active</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('contact')} 
                  className="text-amber-200 hover:text-white text-xs font-semibold flex items-center gap-1 mt-2 cursor-pointer"
                >
                  <span>Book Studio Walkthrough ➔</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} LivGruha Interiors Private Limited. All rights reserved. (livgruhainteriors.com)</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px]">
            <button onClick={() => openLegalModal('privacy')} className="hover:text-gray-300 cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => openLegalModal('terms')} className="hover:text-gray-300 cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => openLegalModal('warranty')} className="hover:text-gray-300 cursor-pointer">
              10-Year Warranty
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
