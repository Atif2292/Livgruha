import React, { useState } from 'react';
import { 
  Sparkles, Layers, ShieldCheck, CheckCircle2, ArrowRight, 
  Check, Cpu, Droplet, Sun, Zap, Info, Calculator 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { INTERIOR_ROOM_SOLUTIONS } from '../data/interiorData';

export default function InteriorPage({ open3DModal, openEstimatorModal }) {
  const { rooms } = useData();
  const allRooms = rooms && rooms.length > 0 ? rooms : INTERIOR_ROOM_SOLUTIONS;
  const [selectedRoomId, setSelectedRoomId] = useState(allRooms[0]?.id || 'complete-home-interiors');
  const [activeFinishTab, setActiveFinishTab] = useState('acrylic');

  const selectedRoom = allRooms.find(r => r.id === selectedRoomId) || allRooms[0] || {};

  const finishes = [
    {
      id: 'acrylic',
      name: 'High-Gloss & Super-Matte Acrylic',
      rating: '★★★★★ (Best Seller)',
      desc: 'Seamless 2mm European acrylic sheets pressed over moisture-resistant core. 100% waterproof surface with anti-yellowing UV treatment and mirror-like reflections.',
      bestFor: 'Modular Kitchens & Living Room Consoles',
      durability: 'Scratch-resistant, non-toxic, easy micro-fiber wipe',
      colors: ['High-Gloss Champagne', 'Matte Sage Green', 'Charcoal Slate', 'Pure Alabaster']
    },
    {
      id: 'pu',
      name: 'Italian Polyurethane (PU) Lacquer',
      rating: '★★★★★ (Ultra Luxury)',
      desc: 'Multi-layer robotically sprayed Italian polyurethane paint baked under controlled heat lamps. Zero visible joint lines, silky cashmere tactile feel.',
      bestFor: 'Luxury Penthouses, Grooved Shutters & Custom Fluting',
      durability: 'Zero seam lines, completely water-impervious, refinishable',
      colors: ['Cashmere Beige', 'Midnight Forest Green', 'Deep Rust Terracotta', 'Warm Greige']
    },
    {
      id: 'veneer',
      name: 'Natural Teak & Walnut Veneers',
      rating: '★★★★★ (Timeless Heritage)',
      desc: 'Thin slices of authentic natural timber (Burma Teak, American Walnut, White Oak) bonded to marine grade ply and sealed with protective matte melamyne/PU coat.',
      bestFor: 'Sacred Pooja Units, Dining Partitions & Foyer Consoles',
      durability: 'Authentic natural wood grain, ages gracefully over decades',
      colors: ['Smoked Walnut', 'Natural Burma Teak', 'Scandinavian Pale Oak']
    },
    {
      id: 'glass',
      name: 'Tinted Lacquered & Fluted Glass',
      rating: '★★★★☆ (Contemporary)',
      desc: '4mm toughened glass with rear color coating or translucent bronze fluted reeding, framed in sleek anodized aluminum profiles with integrated LED channels.',
      bestFor: 'Walk-In Wardrobes & Crockery Display Cabinets',
      durability: 'Zero scratch risk, stain proof, high thermal endurance',
      colors: ['Bronze Tinted', 'Frosted Reeded', 'Jet Black Lacquered']
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 font-sans bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* 1. HEADER HERO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
        <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
          Architectural Interior Modules
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2229] mt-3">
          Precision-Engineered Spaces
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2.5">
          Every hinge, shutter, and drawer runner is engineered to millimeter precision using genuine Blum German hardware and certified IS-710 Boiling Water Resistant Marine Plywood.
        </p>

        {/* Room Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {allRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoomId(room.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedRoom.id === room.id
                  ? 'bg-[#9B3F23] text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-[#FAF2ED] hover:text-[#9B3F23] border border-[#E6DFD5]'
              }`}
            >
              {room.title}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SELECTED ROOM DEEP DIVE CARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E6DFD5] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 image-zoom-container shadow-md border-2 border-white">
              <img
                src={selectedRoom.heroImage}
                alt={selectedRoom.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                {selectedRoom.specification || 'IS-710 BWR Marine Grade Plywood'}
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8CFCA] flex items-center justify-between text-xs">
              <span className="text-gray-500 font-semibold">HARDWARE STANDARD:</span>
              <span className="font-bold text-[#9B3F23]">Blum & Hettich German Soft-Close</span>
            </div>
          </div>

          {/* Right Column: Specs & Features */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9B3F23]">
                Room Solution Deep-Dive
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
                {selectedRoom.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                {selectedRoom.shortDesc}
              </p>

              {/* Layouts available */}
              {selectedRoom.layouts && selectedRoom.layouts.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                    Popular Layout Configurations:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.layouts.map((l, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-semibold">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Features */}
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-1">
                  Core Engineering Assurances:
                </h4>
                {(selectedRoom.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#9B3F23] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={open3DModal}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Get Free 3D Design in {selectedRoom.title}</span>
              </button>

              <button
                onClick={openEstimatorModal}
                className="py-3.5 px-5 rounded-2xl font-bold text-xs text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Calculate Cost
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. MATERIAL & FINISH SWATCH EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
            Material Science & Swatches
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E2229] mt-3">
            500+ Premium Surface Finishes
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Compare textures, scratch resistance, and moisture endurance side-by-side.
          </p>
        </div>

        {/* Finish Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
          {finishes.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFinishTab(f.id)}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all ${
                activeFinishTab === f.id
                  ? 'bg-[#9B3F23] text-white border-[#9B3F23] shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.name.split(' ')[0]} {f.name.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Active Finish Details */}
        {(() => {
          const currentFinish = finishes.find(f => f.id === activeFinishTab) || finishes[0];
          return (
            <div className="bg-white rounded-3xl border border-[#E6DFD5] p-8 max-w-4xl mx-auto shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">{currentFinish.name}</h3>
                  <span className="text-xs font-semibold text-amber-600">{currentFinish.rating}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold border border-[#E8CFCA]">
                  Best For: {currentFinish.bestFor}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {currentFinish.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8CFCA] text-xs">
                <div>
                  <span className="text-gray-500 block font-bold uppercase text-[10px]">Durability & Care:</span>
                  <span className="text-gray-800 font-semibold">{currentFinish.durability}</span>
                </div>
                <div>
                  <span className="text-gray-500 block font-bold uppercase text-[10px]">Popular Color Tones:</span>
                  <span className="text-gray-800 font-semibold">{currentFinish.colors.join(', ')}</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={open3DModal}
                  className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Touch Swatches in Experience Studio (Book Visit)</span>
                </button>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 4. STRUCTURAL RAW MATERIAL COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-[#FAF2ED] border border-[#E8CFCA] rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
              Inside The Core
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E2229] mt-3">
              Why We Never Use Ordinary Particle Board
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              Standard local modular vendors use cheap commercial particle board that swells within 6 months of water exposure. Livgruha strictly uses 100% calibrated IS-710 Boiling Water Resistant (BWR) Marine Plywood and High-Density Moisture Resistant (HDHMR) core boards with automated PUR waterproof edge-banding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-5 rounded-2xl border border-[#E8CFCA] space-y-2">
              <Droplet className="w-6 h-6 text-[#9B3F23]" />
              <h4 className="text-sm font-bold text-gray-900">72-Hour Boiling Water Test</h4>
              <p className="text-xs text-gray-500">Certified zero ply-separation even under continuous steam and moisture.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8CFCA] space-y-2">
              <Zap className="w-6 h-6 text-[#9B3F23]" />
              <h4 className="text-sm font-bold text-gray-900">200,000+ Cycles Tested</h4>
              <p className="text-xs text-gray-500">German Blum hinges rated for 20+ years of smooth daily kitchen usage.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E8CFCA] space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#9B3F23]" />
              <h4 className="text-sm font-bold text-gray-900">E1 Emission Certified</h4>
              <p className="text-xs text-gray-500">Non-toxic, safe for infants, zero hazardous formaldehyde fumes.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
