import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2, RefreshCw, Layers, ArrowRight } from 'lucide-react';

const TRANSFORMATION_PROJECTS = [
  {
    id: 'kitchen',
    tabLabel: '🍳 Modular Kitchen',
    project: 'My Home Bhooja, Hyderabad - 3 BHK',
    beforeImage: '/transformations/kitchen-before.jpg',
    afterImage: '/transformations/kitchen-after.jpg',
    beforeLabel: 'Bare Civil Shell (Day 0)',
    afterLabel: 'Acrylic Modular Kitchen (Day 21)',
    highlights: 'Blum Tandembox Drawers • Quartz Countertop • Anti-Scratch Acrylic • Gola Profile Handles'
  },
  {
    id: 'living',
    tabLabel: '🛋️ Living Lounge',
    project: 'Aparna Serene Park, Hyderabad - 3 BHK',
    beforeImage: '/transformations/living-before.jpg',
    afterImage: '/transformations/living-after.jpg',
    beforeLabel: 'Unfinished Concrete Hall (Day 0)',
    afterLabel: 'Japandi Living Suite (Day 21)',
    highlights: 'Oak Wall Fluting • Concealed Cable Routing • 3000K Warm Profile Cove • Italian Marble Flooring'
  },
  {
    id: 'bedroom',
    tabLabel: '🛏️ Master Suite',
    project: 'Prestige High Fields, Hyderabad - 4 BHK',
    beforeImage: '/transformations/bedroom-before.jpg',
    afterImage: '/transformations/bedroom-after.jpg',
    beforeLabel: 'Empty Bedroom Shell (Day 0)',
    afterLabel: 'Acoustic Master Suite (Day 21)',
    highlights: 'Floor-to-Ceiling Tinted Glass Closets • Upholstered Acoustic Headboard • Integrated Vanity'
  },
  {
    id: 'foyer',
    tabLabel: '🚪 Entry Foyer',
    project: 'Rajapushpa Atria, Hyderabad - 3 BHK',
    beforeImage: '/transformations/foyer-before.jpg',
    afterImage: '/transformations/foyer-after.jpg',
    beforeLabel: 'Raw Entry Corridor (Day 0)',
    afterLabel: 'Backlit Brass Jaali Foyer (Day 18)',
    highlights: 'CNC Brass Motif Partition • Cushioned Shoe Bench • Warm Ambient Backlight • Granite Top'
  }
];

export default function BeforeAfterSlider() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const currentProject = TRANSFORMATION_PROJECTS[activeProjectIdx];

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(Math.round(percentage * 10) / 10);
  }, []);

  // Pointer event handlers (Works on Desktop Mouse & Mobile Touch)
  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Transformation Room Tabs with Active Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {TRANSFORMATION_PROJECTS.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => {
              setActiveProjectIdx(idx);
              setSliderPosition(50);
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              activeProjectIdx === idx
                ? 'bg-[#9B3F23] text-white shadow-lg scale-105 ring-2 ring-[#9B3F23]/20'
                : 'bg-white text-gray-700 hover:bg-[#FAF2ED] hover:text-[#9B3F23] border border-[#E6DFD5]'
            }`}
          >
            <span>{proj.tabLabel}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Comparison Container */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-72 sm:h-96 md:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize touch-none bg-stone-900 group"
      >
        {/* Native range input for accessible touch & keyboard navigation */}
        <input
          type="range"
          min="0"
          max="100"
          step="0.5"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize touch-none"
          aria-label="Before and After transformation percentage slider"
        />

        {/* AFTER IMAGE (Base background layer) */}
        <img
          src={currentProject.afterImage}
          alt={currentProject.afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable="false"
        />

        {/* BEFORE IMAGE (Clipped overlay layer) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={currentProject.beforeImage}
            alt={currentProject.beforeLabel}
            className="absolute inset-0 w-full h-full object-cover filter saturate-60 contrast-90 brightness-90 pointer-events-none"
            draggable="false"
          />
          {/* Before Badge */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
            {currentProject.beforeLabel}
          </div>
        </div>

        {/* After Badge */}
        <div className="absolute top-4 right-4 bg-[#9B3F23]/95 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>{currentProject.afterLabel}</span>
        </div>

        {/* Project Location Overlay Tag */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-2xl border border-white/10 hidden sm:flex items-center gap-2 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold">{currentProject.project}</span>
        </div>

        {/* Vertical Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full shadow-2xl border-2 border-[#9B3F23] flex items-center justify-center text-[#9B3F23] transition-transform duration-150 group-hover:scale-110">
            <MoveHorizontal className="w-5 h-5 text-[#9B3F23]" />
          </div>
        </div>
      </div>

      {/* Project Craftsmanship Specifications Footer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E6DFD5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-[#FAF2ED] text-[#9B3F23] rounded-xl shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9B3F23] block">
              Executed Materials & Joinery
            </span>
            <p className="text-xs sm:text-sm font-semibold text-gray-800">
              {currentProject.highlights}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✓ 21-Day Handover Guaranteed
          </span>
        </div>
      </div>
    </div>
  );
}
