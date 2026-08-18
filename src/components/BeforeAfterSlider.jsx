import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2, RefreshCw } from 'lucide-react';

const TRANSFORMATION_PROJECTS = [
  {
    id: 'living',
    tabLabel: '🛋️ Living Room Suite',
    project: 'Sobha Dream Acres, Bangalore - 3 BHK',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    beforeLabel: 'Bare Concrete Flat (Day 0)',
    afterLabel: 'Livgruha Handover (Day 40)',
    highlights: 'Japandi Wall Fluting • Concealed Wiring • Ambient Profile Cove'
  },
  {
    id: 'kitchen',
    tabLabel: '🍳 Modular Kitchen',
    project: 'Prestige Finsbury Park, Bangalore - 2 BHK',
    beforeImage: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    beforeLabel: 'Unfinished Shell (Day 0)',
    afterLabel: 'Acrylic Modular Kitchen (Day 35)',
    highlights: 'Blum Tandembox • Quartz Island • Anti-Scratch Acrylic'
  },
  {
    id: 'bedroom',
    tabLabel: '🛏️ Master Suite',
    project: 'My Home Bhooja, Hyderabad - 4 BHK',
    beforeImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    beforeLabel: 'Empty Bedroom (Day 0)',
    afterLabel: 'Acoustic Suite (Day 45)',
    highlights: 'Floor-to-Ceiling Sliding Closets • Upholstered Acoustic Headboard'
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
    <div className="w-full space-y-4">
      {/* Transformation Room Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
        {TRANSFORMATION_PROJECTS.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => {
              setActiveProjectIdx(idx);
              setSliderPosition(50);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeProjectIdx === idx
                ? 'bg-[#9B3F23] text-white shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-[#FAF2ED] hover:text-[#9B3F23] border border-[#E6DFD5]'
            }`}
          >
            {proj.tabLabel}
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
        className="relative h-72 sm:h-96 md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize touch-none bg-stone-900 group"
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
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
            {currentProject.beforeLabel}
          </div>
        </div>

        {/* After Badge */}
        <div className="absolute top-4 right-4 bg-[#9B3F23]/90 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>{currentProject.afterLabel}</span>
        </div>

        {/* Project Details Bottom Pill */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-black/70 backdrop-blur-md text-white text-xs font-medium px-4 py-2.5 rounded-2xl border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between sm:justify-start gap-1 sm:gap-3 pointer-events-none">
          <span className="font-bold text-white">{currentProject.project}</span>
          <span className="text-amber-300 text-[11px] font-medium hidden sm:inline">• {currentProject.highlights}</span>
        </div>

        {/* Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular Drag Handle */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#9B3F23] shadow-2xl flex items-center justify-center border-2 border-[#9B3F23] transition-transform ${
            isDragging ? 'scale-125 bg-amber-50' : 'group-hover:scale-110'
          }`}>
            <MoveHorizontal className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Controls & Quick Presets Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-gray-600 px-1">
        <p className="flex items-center gap-1.5 text-gray-500 font-medium">
          <MoveHorizontal className="w-4 h-4 text-[#9B3F23]" />
          <span>Drag the slider or click anywhere to compare before & after</span>
        </p>

        {/* Quick Position Jump Buttons */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase mr-1">View:</span>
          <button
            onClick={() => setSliderPosition(100)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              sliderPosition >= 95 ? 'bg-[#9B3F23] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Before (100%)
          </button>
          <button
            onClick={() => setSliderPosition(50)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              sliderPosition >= 45 && sliderPosition <= 55 ? 'bg-[#9B3F23] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            50/50 Split
          </button>
          <button
            onClick={() => setSliderPosition(0)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              sliderPosition <= 5 ? 'bg-[#9B3F23] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            After (100%)
          </button>
        </div>
      </div>
    </div>
  );
}
