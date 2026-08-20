import React, { useState } from 'react';
import { X, Sparkles, Gift, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Database, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../context/DataContext';
import { submitToGoogleSheets } from '../services/googleSheets';
import { trackEvent } from '../services/analytics';

export default function WelcomePopupModal({ isOpen, onClose, onOpen3DModal }) {
  const { brand, banners } = useData();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    propertyType: '3 BHK',
    possession: 'Within 30 Days'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleClose = () => {
    try {
      localStorage.setItem('livgruha_welcome_dismissed', 'true');
    } catch (e) {
      // ignore
    }
    onClose();
  };

  // Handle ESC key press
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.phone || formData.phone.length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await submitToGoogleSheets('WELCOME_POPUP', {
        ...formData,
        source: 'Website Welcome Modal',
        campaignOffer: 'Free 3D Photorealistic Design + Designer Moodboard Session'
      });

      setResultData(res);
      setSubmitted(true);

      // Permanently record submission in localStorage so popup never shows again
      try {
        localStorage.setItem('livgruha_lead_submitted', 'true');
        localStorage.setItem('livgruha_welcome_dismissed', 'true');
      } catch (e) {
        // ignore
      }

      // Trigger celebratory confetti
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#9B3F23', '#C68B59', '#D4A373', '#E9D8A6']
      });

      // Auto-dismiss after 2.5 seconds so user sees confirmation and popup disappears cleanly
      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (err) {
      console.error('Submission failed', err);
      setErrorMsg('Failed to save. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm modal-backdrop overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl shadow-2xl border border-[#E6DFD5] overflow-hidden modal-content"
        style={{ backgroundColor: '#FFFFFF', color: '#1E2229' }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner with Luxury Warm Terracotta Aesthetic */}
        <div 
          className="p-6 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #9B3F23 0%, #B84A2A 50%, #C68B59 100%)' }}
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wider text-amber-100 mb-2">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>EXCLUSIVE WELCOME PRIVILEGE</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
            Book Free 3D Design <br className="hidden sm:inline" />+ Designer Moodboard
          </h3>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1.5 max-w-md">
            Personalized modular kitchen & whole-home interior design with 10-year structural warranty & 35-day handover.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 bg-white text-[#1E2229]" style={{ backgroundColor: '#FFFFFF', color: '#1E2229' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Arjun Mehta"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit Mobile"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none bg-white transition-all"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai & MMR</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Home Typology
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none bg-white transition-all"
                  >
                    <option value="2 BHK">2 BHK Apartment</option>
                    <option value="3 BHK">3 BHK Apartment</option>
                    <option value="4 BHK">4 BHK / Duplex</option>
                    <option value="Villa / Penthouse">Villa / Penthouse</option>
                    <option value="1 BHK">1 BHK Compact</option>
                    <option value="Commercial">Commercial / Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Expected Possession / Move-in
                </label>
                <select
                  name="possession"
                  value={formData.possession}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none bg-white transition-all"
                >
                  <option value="Within 30 Days">Immediate (Within 30 Days)</option>
                  <option value="1 - 3 Months">In 1 - 3 Months</option>
                  <option value="3 - 6 Months">In 3 - 6 Months</option>
                  <option value="Exploring Ideas">Just Exploring Designs</option>
                </select>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-lg shadow-[#9B3F23]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming 3D Consultation...</span>
                  </>
                ) : (
                  <>
                    <span>Unlock Free 3D Design & Moodboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Zero spam guarantee
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Database className="w-3.5 h-3.5 text-blue-500" />
                  Google Sheet Connected
                </span>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div>
                <h4 className="text-2xl font-serif font-bold text-[#1E2229]">
                  3D Consultation Confirmed!
                </h4>
                <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                  Your details have been registered and logged in our Google Sheet system. A senior designer will connect with your complimentary 3D moodboard.
                </p>
              </div>

              <div className="p-4 bg-[#FAF2ED] border border-[#E8CFCA] rounded-2xl text-left space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
                  <span>REGISTRATION ID:</span>
                  <span className="text-[#9B3F23] font-mono font-bold">{resultData?.record?.id || 'LIV-2026-3D'}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-700">
                  <span>Name:</span>
                  <span className="font-semibold">{formData.fullName}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-700">
                  <span>City:</span>
                  <span className="font-semibold">{formData.city} ({formData.propertyType})</span>
                </div>
                <div className="flex justify-between items-center text-xs text-emerald-700 pt-1 border-t border-[#E8CFCA]">
                  <span>Status:</span>
                  <span className="font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Logged & Assigned
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={`https://wa.me/${(brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi LivGruha Interiors, I have registered on your website for the Free 3D Design Consultation!\n\n` +
                    `*Registration ID:* ${resultData?.record?.id || 'LIV-2026-3D'}\n` +
                    `*Name:* ${formData.fullName}\n` +
                    `*Phone:* ${formData.phone}\n` +
                    `*City:* ${formData.city}\n` +
                    `*Home:* ${formData.propertyType}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { placement: 'welcome_modal_success' })}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Receive 3D Moodboard on WhatsApp</span>
                </a>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      if (onOpen3DModal) onOpen3DModal();
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] transition-colors cursor-pointer"
                  >
                    Upload Floor Plan for 3D Design
                  </button>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Browse Designs
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
