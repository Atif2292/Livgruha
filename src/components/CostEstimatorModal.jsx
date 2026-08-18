import React, { useState } from 'react';
import { 
  X, Sparkles, CheckCircle2, ChevronRight, Download, 
  ArrowRight, ShieldCheck, RefreshCw, Send, Loader2, MessageSquare, Layers, Award, Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../context/DataContext';
import { submitToGoogleSheets } from '../services/googleSheets';
import { trackEvent } from '../services/analytics';

export default function CostEstimatorModal({ isOpen, onClose, onOpen3DModal }) {
  const { brand, banners } = useData();
  const [bhk, setBhk] = useState('3bhk');
  const [qualityTier, setQualityTier] = useState('signature'); // express, signature, luxe
  const [selectedRooms, setSelectedRooms] = useState({
    kitchen: true,
    masterBedroom: true,
    guestBedroom: true,
    livingRoom: true,
    falseCeiling: true,
    poojaMandir: true,
    foyer: true,
    painting: true
  });

  const [kitchenFinish, setKitchenFinish] = useState('acrylic'); // laminate, acrylic, pu
  const [wardrobeType, setWardrobeType] = useState('sliding'); // hinged, sliding, walkin
  const [ceilingCoverage, setCeilingCoverage] = useState('full'); // basic, full

  const [leadContact, setLeadContact] = useState({
    name: '',
    phone: '',
    city: 'Bangalore'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle ESC key press
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleRoom = (key) => {
    setSelectedRooms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedCount = Object.values(selectedRooms).filter(Boolean).length;

  const tierDetails = {
    express: {
      name: 'Express Modular Tier',
      material: '100% IS-710 BWR Marine Plywood',
      hardware: 'European Hettich Soft-Close',
      timeline: '35 Working Days',
      warranty: '10-Year Warranty'
    },
    signature: {
      name: 'Signature Livgruha Tier',
      material: 'IS-710 Marine Grade + High-Gloss Acrylic',
      hardware: 'German Blum Tandembox Systems',
      timeline: '45 Working Days',
      warranty: '10-Year Warranty + 1-Yr Free Maintenance'
    },
    luxe: {
      name: 'Luxe Bespoke Tier',
      material: 'PU Matte Lacquer Polish & Teak Veneer',
      hardware: 'Blum Aventos Servo-Drive & Quartz',
      timeline: '60 Working Days',
      warranty: '10-Year Warranty + Lifetime Support'
    }
  };

  const activeTier = tierDetails[qualityTier] || tierDetails.signature;

  const handleSaveEstimate = async (e) => {
    e.preventDefault();
    if (!leadContact.name || !leadContact.phone) {
      alert('Please fill your name and phone number to receive your customized quotation.');
      return;
    }

    setSubmitting(true);
    try {
      await submitToGoogleSheets('COST_ESTIMATOR', {
        fullName: leadContact.name,
        phone: leadContact.phone,
        city: leadContact.city,
        propertyType: bhk.toUpperCase(),
        qualityTier: activeTier.name,
        kitchenFinish,
        wardrobeType,
        ceilingCoverage,
        selectedRooms: Object.keys(selectedRooms).filter(k => selectedRooms[k]).join(', '),
        source: 'Interior Scope Planner Modal'
      });

      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      // Construct customized itemized WhatsApp message
      const quoteText = encodeURIComponent(
        `*Livgruha Interiors - Custom Design Specification Request*\n\n` +
        `👤 *Client Name:* ${leadContact.name}\n` +
        `📱 *Contact:* ${leadContact.phone}\n` +
        `📍 *Location:* ${leadContact.city}\n` +
        `🏠 *Configuration:* ${bhk.toUpperCase()}\n` +
        `✨ *Tier:* ${activeTier.name}\n` +
        `🔨 *Kitchen Finish:* ${kitchenFinish.toUpperCase()}\n` +
        `🚪 *Wardrobe Finish:* ${wardrobeType.toUpperCase()}\n` +
        `🛋️ *Selected Modules (${selectedCount}):* ${Object.keys(selectedRooms).filter(k => selectedRooms[k]).join(', ')}\n\n` +
        `_Please share detailed material moodboard & 3D floor plan layout._`
      );

      // Open WhatsApp chat
      const waNumber = (brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '');
      trackEvent('whatsapp_click', { placement: 'scope_planner_submit' });
      window.open(`https://wa.me/${waNumber}?text=${quoteText}`, '_blank');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-[#E6DFD5] modal-content"
        style={{ backgroundColor: '#FFFFFF', color: '#1E2229' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div 
          className="p-6 sm:p-7 text-white"
          style={{ background: 'linear-gradient(135deg, #9B3F23 0%, #B84A2A 50%, #C68B59 100%)' }}
        >
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Interior Scope & Design Planner</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Configure Your Dream Home Specification
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
            Select your home configuration, room modules, and finishes to receive an architectural 3D proposal.
          </p>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white text-[#1E2229]" style={{ backgroundColor: '#FFFFFF', color: '#1E2229' }}>
          
          {/* Left 7 Columns: Selection Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. BHK Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                1. Select Home Typology
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: '1bhk', label: '1 BHK' },
                  { id: '2bhk', label: '2 BHK' },
                  { id: '3bhk', label: '3 BHK' },
                  { id: '4bhk', label: '4 BHK' },
                  { id: 'villa', label: 'Villa' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBhk(item.id)}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      bhk === item.id
                        ? 'bg-[#9B3F23] text-white border-[#9B3F23] shadow-md'
                        : 'bg-[#FAF8F5] text-gray-700 border-gray-200 hover:border-[#9B3F23]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Package Quality Tier */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                2. Choose Interior Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'express', label: 'Express Essential', sub: 'Laminate & Hettich' },
                  { id: 'signature', label: 'Signature', sub: 'High-Gloss Acrylic & Blum' },
                  { id: 'luxe', label: 'Luxe Bespoke', sub: 'PU Matte & Veneer' }
                ].map(tier => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setQualityTier(tier.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      qualityTier === tier.id
                        ? 'bg-[#FAF2ED] border-[#9B3F23] text-[#9B3F23] ring-1 ring-[#9B3F23]'
                        : 'bg-[#FAF8F5] border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="block text-xs font-bold">{tier.label}</span>
                    <span className="block text-[10px] text-gray-500 mt-0.5">{tier.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Room Modules Included */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                3. Select Included Room Modules ({selectedCount} Selected)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'kitchen', label: 'Modular Kitchen' },
                  { key: 'masterBedroom', label: 'Master Bedroom Wardrobes' },
                  { key: 'guestBedroom', label: 'Kids / Guest Wardrobes' },
                  { key: 'livingRoom', label: 'Living Room TV & Louvers' },
                  { key: 'falseCeiling', label: 'False Ceiling & Spotlights' },
                  { key: 'poojaMandir', label: 'Teak Pooja Mandir' },
                  { key: 'foyer', label: 'Foyer Shoe Console' },
                  { key: 'painting', label: 'Full Home Premium Paint' },
                ].map(room => (
                  <button
                    key={room.key}
                    type="button"
                    onClick={() => toggleRoom(room.key)}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between text-left transition-all cursor-pointer ${
                      selectedRooms[room.key]
                        ? 'bg-emerald-50/70 border-emerald-500 text-emerald-900 font-semibold'
                        : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
                    }`}
                  >
                    <span>{room.label}</span>
                    <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                      selectedRooms[room.key] ? 'bg-emerald-600 text-white' : 'border border-gray-300'
                    }`}>
                      {selectedRooms[room.key] ? '✓' : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Finish Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Kitchen Finish
                </label>
                <select
                  value={kitchenFinish}
                  onChange={(e) => setKitchenFinish(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:border-[#9B3F23]"
                >
                  <option value="laminate">Anti-Scratch Laminate</option>
                  <option value="acrylic">High-Gloss Seamless Acrylic</option>
                  <option value="pu">Italian Polyurethane (PU) Matte</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Wardrobe Mechanism
                </label>
                <select
                  value={wardrobeType}
                  onChange={(e) => setWardrobeType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white focus:outline-none focus:border-[#9B3F23]"
                >
                  <option value="hinged">Hinged Soft-Close Shutters</option>
                  <option value="sliding">Floor-to-Ceiling Sliding</option>
                  <option value="walkin">Tinted Glass Walk-In Wardrobe</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Specification Summary Card */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E8CFCA] rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8CFCA] pb-3">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Specification Brief
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-[11px] font-bold border border-[#E8CFCA]">
                  {bhk.toUpperCase()}
                </span>
              </div>

              {/* Tier Details Card */}
              <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#9B3F23]" />
                  <h4 className="font-serif font-bold text-sm text-gray-900">{activeTier.name}</h4>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Material Core:</span>
                    <span className="font-semibold text-gray-800">{activeTier.material}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Hardware Standard:</span>
                    <span className="font-semibold text-gray-800">{activeTier.hardware}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Handover Timeline:</span>
                    <span className="font-semibold text-gray-800">{activeTier.timeline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Warranty:</span>
                    <span className="font-semibold text-emerald-700">{activeTier.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Selected Modules Badges */}
              <div>
                <span className="text-[11px] font-bold uppercase text-gray-500 block mb-2">
                  Configured Modules ({selectedCount})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(selectedRooms).filter(k => selectedRooms[k]).map(key => (
                    <span key={key} className="px-2.5 py-1 bg-white border border-[#E8CFCA] rounded-lg text-[11px] font-medium text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Lead capture form */}
            <div className="mt-5 pt-4 border-t border-[#E8CFCA]">
              {!submitted ? (
                <form onSubmit={handleSaveEstimate} className="space-y-3">
                  <p className="text-xs font-bold text-gray-800">
                    Get customized 3D design plan & quotation:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={leadContact.name}
                      onChange={(e) => setLeadContact({ ...leadContact, name: e.target.value })}
                      className="px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#9B3F23]"
                    />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="WhatsApp No."
                      value={leadContact.phone}
                      onChange={(e) => setLeadContact({ ...leadContact, phone: e.target.value })}
                      className="px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-[#9B3F23]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Syncing Specification...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send My Scope to Designer on WhatsApp</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <p className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Specification Registered & Synced!
                  </p>
                  
                  <a
                    href={`https://wa.me/${(brand.whatsapp || '+917995672323').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `*LivGruha Interiors - My Specification*\n\n` +
                      `Name: ${leadContact.name}\n` +
                      `Phone: ${leadContact.phone}\n` +
                      `City: ${leadContact.city}\n` +
                      `Configuration: ${bhk.toUpperCase()} (${activeTier.name})\n` +
                      `Modules: ${Object.keys(selectedRooms).filter(k => selectedRooms[k]).join(', ')}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { placement: 'scope_planner_success' })}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open Specification in WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      onClose();
                      if (onOpen3DModal) onOpen3DModal();
                    }}
                    className="w-full py-2 px-4 rounded-xl text-xs font-bold text-[#9B3F23] bg-[#FAF2ED] hover:bg-[#F3E2D8] border border-[#E8CFCA] cursor-pointer"
                  >
                    Proceed to 3D Design Visualization
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
