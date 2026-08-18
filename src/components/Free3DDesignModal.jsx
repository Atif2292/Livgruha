import React, { useState } from 'react';
import { 
  X, Sparkles, Upload, CheckCircle2, Shield, Calendar, Clock, 
  MapPin, Home, ArrowRight, Loader2, FileText, Check, ChevronLeft, MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../context/DataContext';
import { submitToGoogleSheets } from '../services/googleSheets';
import { trackEvent } from '../services/analytics';

export default function Free3DDesignModal({ isOpen, onClose }) {
  const { brand, cities } = useData();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resultRecord, setResultRecord] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    societyName: '',
    propertyType: '3 BHK',
    carpetArea: '1450',
    budget: 'Signature Tier (High-Gloss Acrylic & Blum)',
    scope: [
      'Modular Kitchen', 
      'Master Bedroom Wardrobe', 
      'Living Room TV Unit & Louvers', 
      'False Ceiling & Architectural Lighting'
    ],
    consultationMode: 'Experience Center Walkthrough',
    preferredDate: '',
    preferredTime: 'Evening (4:00 PM - 7:00 PM)',
    additionalNotes: ''
  });

  // Handle ESC key press and body scroll lock
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleScopeToggle = (item) => {
    setFormData(prev => {
      const exists = prev.scope.includes(item);
      if (exists) {
        return { ...prev, scope: prev.scope.filter(i => i !== item) };
      } else {
        return { ...prev, scope: [...prev.scope, item] };
      }
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const res = await submitToGoogleSheets('FREE_3D_DESIGN', {
        ...formData,
        floorPlanName: uploadedFile ? uploadedFile.name : 'Not attached',
        submissionType: 'Dedicated Free 3D Design Booking Studio'
      });

      setResultRecord(res.record);
      setSubmitted(true);

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#9B3F23', '#C68B59', '#D4A373', '#E9D8A6', '#1E2229']
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scopeOptions = [
    'Modular Kitchen',
    'Master Bedroom Wardrobe',
    'Kids / Guest Bedroom',
    'Living Room TV Unit & Louvers',
    'False Ceiling & Architectural Lighting',
    'Pooja Mandir Unit',
    'Foyer & Shoe Console',
    'Balcony Decking & Bar Unit',
    'Bathroom Vanities',
    'Full Home Painting & Wallpaper'
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm modal-backdrop overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div 
        className="relative w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E6DFD5] overflow-hidden modal-content my-6"
        style={{ backgroundColor: '#FFFFFF', color: '#1E2229' }}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div 
          className="px-6 py-5 text-white"
          style={{ background: 'linear-gradient(135deg, #9B3F23 0%, #B84A2A 50%, #C68B59 100%)' }}
        >
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Livgruha 3D Design Studio</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Book Your Free 3D Photorealistic Design Session
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1">
            Get an exact 3D render of your home with customized material samples and finish consultations before any commitment.
          </p>

          {/* Stepper indicator */}
          {!submitted && (
            <div className="flex items-center justify-between mt-4 max-w-sm pt-2 border-t border-white/20 text-xs font-semibold">
              <span className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-200' : 'text-white/60'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-400 text-black font-bold' : 'bg-white/20'}`}>1</span>
                Property & Plan
              </span>
              <span className="text-white/30">→</span>
              <span className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-200' : 'text-white/60'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-amber-400 text-black font-bold' : 'bg-white/20'}`}>2</span>
                Scope & Budget
              </span>
              <span className="text-white/30">→</span>
              <span className={`flex items-center gap-1.5 ${step >= 3 ? 'text-amber-200' : 'text-white/60'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-amber-400 text-black font-bold' : 'bg-white/20'}`}>3</span>
                Slot & Contact
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto bg-white text-[#1E2229]" style={{ backgroundColor: '#FFFFFF', color: '#1E2229' }}>
          {!submitted ? (
            <form onSubmit={handleNext}>
              {/* STEP 1: PROPERTY & FLOOR PLAN */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h4 className="font-serif font-bold text-lg text-gray-900 border-b border-gray-100 pb-2">
                    Step 1: Tell Us About Your Property
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        City *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none bg-white"
                      >
                        {(cities || []).map(c => (
                          <option key={c.id} value={c.name}>{c.name} ({c.state})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Apartment / Society Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sobha Dream Acres / Prestige"
                        value={formData.societyName}
                        onChange={(e) => setFormData({ ...formData, societyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        BHK Configuration *
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none bg-white"
                      >
                        <option value="1 BHK">1 BHK Apartment</option>
                        <option value="2 BHK">2 BHK Apartment</option>
                        <option value="3 BHK">3 BHK Apartment</option>
                        <option value="4 BHK">4 BHK Apartment / Duplex</option>
                        <option value="Villa / Penthouse">Villa / Penthouse</option>
                        <option value="Commercial">Commercial / Boutique Space</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Carpet Area (Approx. Sq. Ft.)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 1450"
                        value={formData.carpetArea}
                        onChange={(e) => setFormData({ ...formData, carpetArea: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Floor Plan Upload simulation */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Upload 2D / 3D Floor Plan (Optional)</span>
                      <span className="text-gray-400 text-[11px] lowercase">PDF, JPG, PNG up to 15MB</span>
                    </label>

                    <div className="border-2 border-dashed border-[#E8CFCA] hover:border-[#9B3F23] bg-[#FAF8F5] rounded-2xl p-5 text-center transition-colors relative cursor-pointer group">
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.dwg"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {uploadedFile ? (
                        <div className="flex items-center justify-center gap-3 text-emerald-700">
                          <FileText className="w-8 h-8 text-emerald-600" />
                          <div className="text-left">
                            <p className="text-xs font-bold text-gray-900">{uploadedFile.name}</p>
                            <p className="text-[11px] text-gray-500">{uploadedFile.size} • Ready for 3D modelling</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-[#9B3F23] mb-2 group-hover:-translate-y-1 transition-transform" />
                          <p className="text-xs font-semibold text-gray-700">
                            Click to upload or drag & drop your builder floor plan
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Helps our 3D designers prepare exact spatial measurements in advance
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] flex items-center gap-2 shadow-md"
                    >
                      <span>Proceed to Scope & Budget</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SCOPE & BUDGET */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <h4 className="font-serif font-bold text-lg text-gray-900">
                      Step 2: Select Scope & Target Budget
                    </h4>
                    <span className="text-xs text-gray-500">Selected: {formData.scope.length} areas</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      What interior modules do you need?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {scopeOptions.map((item) => {
                        const isSelected = formData.scope.includes(item);
                        return (
                          <div
                            key={item}
                            onClick={() => handleScopeToggle(item)}
                            className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#FAF2ED] border-[#9B3F23] text-[#9B3F23] shadow-sm'
                                : 'bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span>{item}</span>
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center ${isSelected ? 'bg-[#9B3F23] text-white' : 'border border-gray-300'}`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Preferred Finish & Quality Tier
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none bg-white"
                    >
                      <option value="Express Essential (Anti-Scratch Laminate & Hettich)">Express Essential (Anti-Scratch Laminate & Hettich)</option>
                      <option value="Signature Tier (High-Gloss Acrylic & Blum Soft-Close)">Signature Tier (High-Gloss Acrylic & Blum Soft-Close)</option>
                      <option value="Signature Premium (Fluted Glass & Quartz Island)">Signature Premium (Fluted Glass & Quartz Island)</option>
                      <option value="Luxe Bespoke (PU Matte Lacquer Polish & Teak Veneer)">Luxe Bespoke (PU Matte Lacquer Polish & Teak Veneer)</option>
                      <option value="Ultra Couture Villa (Imported Italian Marble & Automation)">Ultra Couture Villa (Imported Italian Marble & Automation)</option>
                    </select>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-3 px-5 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] flex items-center gap-2 shadow-md"
                    >
                      <span>Proceed to Slot & Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SLOT & CONTACT */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <h4 className="font-serif font-bold text-lg text-gray-900 border-b border-gray-100 pb-2">
                    Step 3: Consultation Mode & Contact Details
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Preferred Mode of 3D Meeting
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        'Experience Center Walkthrough',
                        'Virtual 3D Video Call',
                        'Designer Home Visit'
                      ].map((mode) => (
                        <div
                          key={mode}
                          onClick={() => setFormData({ ...formData, consultationMode: mode })}
                          className={`p-3 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                            formData.consultationMode === mode
                              ? 'bg-[#FAF2ED] border-[#9B3F23] text-[#9B3F23] shadow-sm'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {mode}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Time Slot
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none bg-white"
                      >
                        <option value="Morning (10:30 AM - 1:00 PM)">Morning (10:30 AM - 1:00 PM)</option>
                        <option value="Afternoon (1:30 PM - 4:00 PM)">Afternoon (1:30 PM - 4:00 PM)</option>
                        <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                        <option value="Weekend Priority Slot">Weekend Priority Slot</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kulkarni"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit WhatsApp Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#9B3F23] focus:ring-2 focus:ring-[#9B3F23]/20 text-sm outline-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-3 px-5 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      disabled={loading || !formData.fullName || !formData.phone}
                      onClick={handleFinalSubmit}
                      className="py-3.5 px-8 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#9B3F23] to-[#C68B59] hover:opacity-95 flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Booking 3D Session & Syncing to Sheets...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-200" />
                          <span>Confirm & Book Free 3D Design</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-serif font-bold text-gray-900">
                  3D Design Consultation Confirmed!
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 max-w-md mx-auto">
                  Your appointment request has been synced with our design desk and Google Sheets CRM. A Principal Architect from the <strong className="text-[#9B3F23]">{formData.city} Studio</strong> will prepare your personalized 3D plan.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-[#FAF2ED] border border-[#E8CFCA] rounded-2xl text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#E8CFCA] pb-2">
                  <span className="text-gray-500 font-semibold">BOOKING REFERENCE:</span>
                  <span className="font-mono font-bold text-[#9B3F23]">{resultRecord?.id || 'LIV-3D-BOOKING'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-700">
                  <div>
                    <span className="text-gray-500 block text-[11px]">Client Name:</span>
                    <span className="font-semibold">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Contact Number:</span>
                    <span className="font-semibold">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Property & City:</span>
                    <span className="font-semibold">{formData.propertyType}, {formData.city}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">Mode & Slot:</span>
                    <span className="font-semibold">{formData.consultationMode}</span>
                  </div>
                </div>
                {uploadedFile && (
                  <div className="pt-1 text-[11px] text-emerald-700 font-medium">
                    📁 Attached Floor Plan: {uploadedFile.name} ({uploadedFile.size})
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`https://wa.me/${(brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi LivGruha Interiors, I have booked a Free 3D Design Consultation!\n\n` +
                    `*Booking Ref:* ${resultRecord?.id || 'LIV-3D-BOOKING'}\n` +
                    `*Client:* ${formData.fullName}\n` +
                    `*Phone:* ${formData.phone}\n` +
                    `*City:* ${formData.city} (${formData.propertyType})\n` +
                    `*Mode:* ${formData.consultationMode}\n` +
                    `*Tier:* ${formData.budgetRange}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { placement: '3d_wizard_success' })}
                  className="py-3 px-6 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open 3D Consultation on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="py-3 px-6 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Done & Return to Site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
