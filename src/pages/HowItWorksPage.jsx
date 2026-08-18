import React from 'react';
import HowItWorksJourney from '../components/HowItWorksJourney';
import PartnerLogosTicker from '../components/PartnerLogosTicker';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function HowItWorksPage({ open3DModal, openEstimatorModal, setActivePage }) {
  const { banners, brand } = useData();

  return (
    <div className="pt-24 sm:pt-28 font-sans bg-[#FAF8F5] min-h-screen pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
          How LivGruha Works
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2229] mt-3">
          Our Systematic 21-Day Execution Journey
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2.5">
          From initial consultation and free photorealistic 3D design to German factory fabrication and rapid on-site assembly.
        </p>
      </section>

      {/* 2. 7-STEP PROCESS FLOW */}
      <HowItWorksJourney open3DModal={open3DModal} />

      {/* 3. PARALLEL MANUFACTURING BREAKDOWN */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E6DFD5] p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9B3F23]">
              The Secret to 21-Day Handover
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 leading-tight">
              Parallel Engineering: Factory & Site Execution
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Traditional contractors perform slow, noisy carpenter work on-site taking 90+ days. At LivGruha, 85% of your woodwork is laser-cut and edge-banded in our automated German CNC factory while false ceiling, electricals, and painting happen simultaneously on site.
            </p>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9B3F23] shrink-0 mt-0.5" />
                <span><strong>Dust-Free On-Site Assembly:</strong> Clean bolt-and-lock modular assembly in just 5–6 days.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9B3F23] shrink-0 mt-0.5" />
                <span><strong>PUR Waterproof Edge-Banding:</strong> Zero peeling from moisture or steam.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9B3F23] shrink-0 mt-0.5" />
                <span><strong>Live Milestone Updates:</strong> Daily photo progress directly on WhatsApp.</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={open3DModal}
                className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#9B3F23] hover:bg-[#83341C] shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Book Free 3D Design Session</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
              alt="Automated Modular Factory Joinery"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. BRAND PARTNERS */}
      <PartnerLogosTicker />

    </div>
  );
}
