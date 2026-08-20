import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Sparkles, Send, CheckCircle2, 
  MessageSquare, Clock, ShieldCheck, ArrowRight, Loader2, Building2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../context/DataContext';
import { submitToGoogleSheets } from '../services/googleSheets';
import { trackEvent } from '../services/analytics';

export default function ContactPage({ open3DModal, openEstimatorModal }) {
  const { brand, cities } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    propertyType: '3 BHK',
    preferredDate: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    try {
      await submitToGoogleSheets('CONTACT_GENERAL', {
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        propertyType: formData.propertyType,
        preferredDate: formData.preferredDate,
        notes: formData.message,
        source: 'Contact Page Inquiry Form'
      });

      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCallClick = () => {
    trackEvent('call_click', { placement: 'contact_page', phone: brand.phone });
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', { placement: 'contact_page' });
  };

  return (
    <div className="pt-24 sm:pt-28 font-sans bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* 1. HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
          Connect With Our Senior Architects
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2229] mt-3">
          Let's Design Your Dream Home
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2.5">
          Visit our Hyderabad Experience Studio, request a designer home visit, or book a virtual 3D consultation.
        </p>
      </div>

      {/* 2. MAIN GRID: CONTACT CARDS & FORM */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Connect & Showrooms */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-gradient-to-r from-[#9B3F23] via-[#B84A2A] to-[#C68B59] rounded-3xl p-7 text-white shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">Direct Hotline</h3>
                <p className="text-xs text-amber-100/90 mt-1">
                  Speak directly with our senior architectural lead for quick quotes and design queries.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <a
                  href={`tel:${(brand.phone || '+917995672323').replace(/[^0-9]/g, '')}`}
                  onClick={handleCallClick}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                >
                  <Phone className="w-5 h-5 text-amber-200" />
                  <div>
                    <span className="text-[11px] text-white/70 block">Telephone Hotline:</span>
                    <span className="font-bold">{brand.phone || '+91 79956 72323'}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${(brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hi LivGruha Interiors, I am looking for interior design services. I would like to know more.")}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-300" />
                  <div>
                    <span className="text-[11px] text-white/70 block">Instant WhatsApp Chat:</span>
                    <span className="font-bold">+91 79956 72323</span>
                  </div>
                </a>

                <a
                  href={`mailto:${brand.email || 'info@livgruhainteriors.com'}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                >
                  <Mail className="w-5 h-5 text-amber-200" />
                  <div>
                    <span className="text-[11px] text-white/70 block">Official Email:</span>
                    <span className="font-bold">{brand.email || 'info@livgruhainteriors.com'}</span>
                  </div>
                </a>
              </div>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-amber-100">
                <span>Showrooms Open: 10:00 AM – 8:30 PM</span>
                <span>All 7 Days</span>
              </div>
            </div>

            {/* Flagship Head Office Card */}
            <div className="bg-white rounded-3xl border border-[#E6DFD5] p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9B3F23]">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad Head Office & Flagship Studio</span>
              </div>
              <h4 className="text-base font-serif font-bold text-gray-900">
                Financial District Design Pavilion
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Plot No. 42, Silicon Valley Layout, Near WaveRock, Hitec City / Madhapur, Hyderabad, Telangana - 500081
              </p>
              <div className="pt-2 text-[11px] text-gray-500 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Free Valet Parking Available • 3BHK Full Scale Walkthrough Mockup</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E6DFD5] shadow-xl p-8 sm:p-10">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9B3F23]">
                  Consultation Booking Form
                </span>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">
                  Schedule Free 3D Design Session
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  We'll prepare a custom photorealistic 3D render of your home floor plan with an itemized bill of quantities.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Varun Kapoor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit Mobile"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-xs sm:text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. varun@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-xs sm:text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Your City
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-xs sm:text-sm outline-none bg-white"
                      >
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai & MMR</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Home Configuration
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-xs sm:text-sm outline-none bg-white"
                      >
                        <option value="2 BHK">2 BHK Apartment</option>
                        <option value="3 BHK">3 BHK Apartment</option>
                        <option value="4 BHK">4 BHK Apartment / Duplex</option>
                        <option value="Villa / Penthouse">Villa / Penthouse</option>
                        <option value="1 BHK">1 BHK Compact</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-xs sm:text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Project Notes / Specific Design Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Need an open acrylic kitchen with island counter, 2 walk-in wardrobes, and pooja mandir."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-xs sm:text-sm outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-lg shadow-[#9B3F23]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming & Syncing to Google Sheets...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-200" />
                        <span>Confirm Free 3D Design Consultation</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      100% Privacy Protected
                    </span>
                    <span>Synced directly to Google Sheets database</span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-gray-900">
                    Consultation Request Confirmed!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry has been synced to our design registry. Our {formData.city} Senior Architect will contact you shortly with your 3D design preparation brief.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={`https://wa.me/${BRAND_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hi Livgruha Interiors, I have submitted an inquiry on your contact page!\n\n` +
                        `*Name:* ${formData.name}\n` +
                        `*Phone:* ${formData.phone}\n` +
                        `*City:* ${formData.city} (${formData.propertyType})\n` +
                        `*Preferred Date:* ${formData.preferredDate || 'Earliest Available'}\n` +
                        `*Notes:* ${formData.message || 'Need complete interior design consult'}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-6 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp Directly</span>
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="py-3 px-6 rounded-xl text-xs font-semibold text-[#9B3F23] bg-[#FAF2ED] hover:bg-[#F3E2D8] cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
