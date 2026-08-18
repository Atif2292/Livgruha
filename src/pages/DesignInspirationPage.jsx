import React, { useState } from 'react';
import { Sparkles, Eye, Layers, ArrowRight, Heart, Filter, MapPin } from 'lucide-react';

const INSPIRATION_GALLERY = [
  {
    id: 'scandi-fluting',
    title: 'Scandinavian Fluted Slat Accents',
    category: 'living',
    style: 'Scandinavian Minimalist',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Fluted Oak', 'Warm White 3000K', 'Zero Wire Raceways']
  },
  {
    id: 'sage-acrylic-kitchen',
    title: 'Matte Sage Green Acrylic Island Kitchen',
    category: 'kitchen',
    style: 'Modern Contemporary',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Anti-Fingerprint Acrylic', 'Quartz Waterfall', 'Blum Servo-Drive']
  },
  {
    id: 'japandi-low-platform',
    title: 'Japandi Low-Profile Platform Bed & Shoji Screen',
    category: 'bedroom',
    style: 'Japandi',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Limewash Texture', 'Sliding Shoji Panelling', 'Cove LEDs']
  },
  {
    id: 'bronze-glass-closet',
    title: 'Tinted Bronze Glass Walk-in Wardrobe',
    category: 'wardrobe',
    style: 'Luxe Bespoke',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    tags: ['Anodized Aluminum Profile', 'Sensor Spotlights', 'Suede Drawers']
  },
  {
    id: 'backlit-onyx-mandir',
    title: 'Backlit Amber Onyx & Teakwood Shrine',
    category: 'pooja',
    style: 'Modern Indian Sacred',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Semi-Precious Onyx', 'Laser CNC Jali', 'Burma Teak Rafters']
  },
  {
    id: 'statuario-marble-media',
    title: 'Double-Height Statuario Marble & Brass TV Wall',
    category: 'living',
    style: 'Contemporary Luxe',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Bookmatched Italian Marble', 'Floating Walnut Console', 'Magnetic Track Light']
  }
];

export default function DesignInspirationPage({ open3DModal, openEstimatorModal }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedInspo, setSelectedInspo] = useState(null);

  const categories = [
    { id: 'all', label: 'All Inspirations' },
    { id: 'living', label: 'Living Rooms' },
    { id: 'kitchen', label: 'Kitchens' },
    { id: 'bedroom', label: 'Bedrooms' },
    { id: 'wardrobe', label: 'Wardrobes' },
    { id: 'pooja', label: 'Pooja Mandirs' }
  ];

  const filtered = INSPIRATION_GALLERY.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="pt-24 sm:pt-28 font-sans bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Concepts & Moodboards</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2229] mt-3">
          Design Ideas & Pinterest Inspiration
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2.5">
          Curated architectural moodboards and design ideas. See any style you love? Our architects will recreate it to your exact floor plan in 3D.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#9B3F23] text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-[#FAF2ED] hover:text-[#9B3F23] border border-[#E6DFD5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedInspo(item)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E6DFD5] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden image-zoom-container">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  {item.style}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-bold flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-amber-300" /> Click to Inspect Concept Details
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <h4 className="font-serif font-bold text-base text-gray-900 group-hover:text-[#9B3F23] transition-colors">
                  {item.title}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-md bg-[#FAF8F5] border border-gray-200 text-[10px] font-semibold text-gray-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concept Modal Inspector */}
      {selectedInspo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-200 animate-fadeIn relative">
            <button
              onClick={() => setSelectedInspo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
            >
              ✕
            </button>
            <div className="rounded-2xl overflow-hidden h-72 shadow-md">
              <img src={selectedInspo.image} alt={selectedInspo.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#9B3F23]">{selectedInspo.style}</span>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mt-1">{selectedInspo.title}</h3>
              <p className="text-xs text-gray-600 mt-2">
                Want this exact aesthetic adapted to your floor plan? Our architectural design team can generate a customized 3D render with exact finish samples.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedInspo(null);
                  open3DModal();
                }}
                className="flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Adapt This Design in Free 3D</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
