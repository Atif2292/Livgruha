import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import InteriorPage from './pages/InteriorPage';
import HowItWorksPage from './pages/HowItWorksPage';
import CitiesPage from './pages/CitiesPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';

import WelcomePopupModal from './components/WelcomePopupModal';
import Free3DDesignModal from './components/Free3DDesignModal';
import CostEstimatorModal from './components/CostEstimatorModal';
import GoogleSheetConfigModal from './components/GoogleSheetConfigModal';
import AdminPortalModal from './components/AdminPortalModal';
import LegalModals from './components/LegalModals';

import { Sparkles, ShieldCheck } from 'lucide-react';
import { useData } from './context/DataContext';
import { detectAcquisitionSource, trackEvent } from './services/analytics';

export default function App() {
  const { brand, banners } = useData();
  const [activePage, setActivePage] = useState('home');
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isEstimatorModalOpen, setIsEstimatorModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'privacy' | 'terms' | 'warranty' | null

  // Initialize lead attribution & trigger welcome popup on initial visit after a brief 1.8 second delay
  useEffect(() => {
    // Detect & store first-touch acquisition source (Point 18)
    const attribution = detectAcquisitionSource();
    trackEvent('page_view', { page: 'home', source: attribution.source });

    const timer = setTimeout(() => {
      // Check if previously dismissed in this session
      const dismissed = sessionStorage.getItem('livgruha_welcome_dismissed');
      if (!dismissed) {
        setIsWelcomeModalOpen(true);
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Secret URL routing & Hotkey listener for Admin Portal
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const pathname = (window.location.pathname || '').toLowerCase();
      const search = (window.location.search || '').toLowerCase();

      if (
        hash === '#admin' || 
        hash === '#/admin' || 
        hash === '#admin-portal' ||
        pathname === '/admin' || 
        pathname === '/admin-portal' ||
        search.includes('admin=true') ||
        search.includes('portal=true')
      ) {
        setIsAdminModalOpen(true);
      }
    };

    // Check immediately on page mount
    checkAdminRoute();

    // Listen to URL hash or navigation changes
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Secret Hotkey: Ctrl + Shift + A or Cmd + Shift + A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseWelcome = () => {
    setIsWelcomeModalOpen(false);
    sessionStorage.setItem('livgruha_welcome_dismissed', 'true');
  };

  const handleWhatsAppFloatClick = () => {
    trackEvent('whatsapp_click', { placement: 'floating_dock' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E2229] relative selection:bg-[#9B3F23] selection:text-white">
      
      {/* Sticky Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        open3DModal={() => setIs3DModalOpen(true)}
        openEstimatorModal={() => setIsEstimatorModalOpen(true)}
        openConfigModal={() => setIsConfigModalOpen(true)}
        openAdminPortal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main className="flex-grow pb-16">
        {activePage === 'home' && (
          <HomePage
            open3DModal={() => setIs3DModalOpen(true)}
            openEstimatorModal={() => setIsEstimatorModalOpen(true)}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            open3DModal={() => setIs3DModalOpen(true)}
            openEstimatorModal={() => setIsEstimatorModalOpen(true)}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'interior' && (
          <InteriorPage
            open3DModal={() => setIs3DModalOpen(true)}
            openEstimatorModal={() => setIsEstimatorModalOpen(true)}
          />
        )}

        {activePage === 'portfolio' && (
          <PortfolioPage
            open3DModal={() => setIs3DModalOpen(true)}
            openEstimatorModal={() => setIsEstimatorModalOpen(true)}
          />
        )}

        {activePage === 'how-it-works' && (
          <HowItWorksPage
            open3DModal={() => setIs3DModalOpen(true)}
            openEstimatorModal={() => setIsEstimatorModalOpen(true)}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'cities' && (
          <CitiesPage
            open3DModal={() => setIs3DModalOpen(true)}
            openEstimatorModal={() => setIsEstimatorModalOpen(true)}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            open3DModal={() => setIs3DModalOpen(true)}
            openEstimatorModal={() => setIsEstimatorModalOpen(true)}
          />
        )}

        {activePage === 'careers' && (
          <CareersPage
            open3DModal={() => setIs3DModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Bottom Quick Action Dock */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 pointer-events-none">
        {/* Floating Official WhatsApp Action Button */}
        <a
          href={`https://wa.me/${(brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi LivGruha Interiors, I am looking for interior design services. I would like to know more.")}`}
          target="_blank"
          rel="noreferrer"
          onClick={handleWhatsAppFloatClick}
          className="pointer-events-auto w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] shadow-2xl hover:scale-110 transition-all flex items-center justify-center border-2 border-white cursor-pointer group"
          title="Chat on WhatsApp (+91 79956 72323)"
        >
          <svg className="w-7 h-7 text-white fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>

        {/* Floating Free 3D Design Trigger Pill */}
        <button
          onClick={() => setIs3DModalOpen(true)}
          className="pointer-events-auto bg-gradient-to-r from-[#9B3F23] via-[#B84A2A] to-[#C68B59] text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-xl hover:opacity-95 transition-all hover:scale-105 flex items-center gap-1.5 border border-white/20 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>Free 3D Design Plan</span>
        </button>
      </div>

      {/* Global Modals */}
      <WelcomePopupModal
        isOpen={isWelcomeModalOpen}
        onClose={handleCloseWelcome}
        onOpen3DModal={() => {
          setIsWelcomeModalOpen(false);
          setIs3DModalOpen(true);
        }}
      />

      <Free3DDesignModal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
      />

      <CostEstimatorModal
        isOpen={isEstimatorModalOpen}
        onClose={() => setIsEstimatorModalOpen(false)}
        onOpen3DModal={() => {
          setIsEstimatorModalOpen(false);
          setIs3DModalOpen(true);
        }}
      />

      <GoogleSheetConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
      />

      <AdminPortalModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <LegalModals
        activeLegalModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        open3DModal={() => setIs3DModalOpen(true)}
        openEstimatorModal={() => setIsEstimatorModalOpen(true)}
        openConfigModal={() => setIsConfigModalOpen(true)}
        openAdminPortal={() => setIsAdminModalOpen(true)}
        openLegalModal={(type) => setActiveLegalModal(type)}
      />

    </div>
  );
}
