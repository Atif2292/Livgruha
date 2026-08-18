import React from 'react';
import { CUSTOMER_JOURNEY_STEPS } from '../data/interiorData';
import { 
  Sparkles, CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck, 
  Layers, Factory, Wrench, Trophy 
} from 'lucide-react';

const STEP_ICONS = [
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
  Factory,
  Wrench,
  Trophy
];

export default function HowItWorksJourney({ open3DModal }) {
  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#E6DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA]">
            How LivGruha Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E2229] mt-3">
            Our 21-Day Systematic Execution Journey
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2.5">
            A transparent 7-step customer journey engineered with German automated factory pre-fabrication and dust-free on-site assembly.
          </p>
        </div>

        {/* 7-Step Horizontal / Vertical Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {CUSTOMER_JOURNEY_STEPS.map((item, idx) => {
            const Icon = STEP_ICONS[idx] || CheckCircle2;
            const isLast = idx === CUSTOMER_JOURNEY_STEPS.length - 1;

            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between border ${
                  isLast 
                    ? 'bg-gradient-to-br from-[#9B3F23] to-[#782E17] text-white border-[#9B3F23] shadow-xl md:col-span-2 lg:col-span-2' 
                    : 'bg-white border-[#E6DFD5] text-[#1E2229] shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                      isLast ? 'bg-white/20 text-amber-200' : 'bg-[#FAF2ED] text-[#9B3F23]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isLast ? 'bg-amber-300 text-[#782E17]' : 'bg-[#FAF8F5] text-gray-600 border border-gray-200'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono font-bold tracking-widest uppercase block mb-1 ${
                    isLast ? 'text-amber-200' : 'text-[#9B3F23]'
                  }`}>
                    STEP {item.step}
                  </span>
                  <h3 className={`font-serif font-bold text-base sm:text-lg mb-2 ${
                    isLast ? 'text-white' : 'text-[#1E2229]'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${
                    isLast ? 'text-amber-100' : 'text-gray-600'
                  }`}>
                    {item.desc}
                  </p>
                </div>

                {isLast && (
                  <div className="pt-6 mt-4 border-t border-white/20 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-amber-200 uppercase block">Guarantee:</span>
                      <span className="text-xs font-semibold text-white">100% On-Time Handover</span>
                    </div>
                    <button
                      onClick={open3DModal}
                      className="px-5 py-2.5 rounded-full font-bold text-xs bg-white text-[#9B3F23] hover:bg-amber-50 shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Book Free 3D Design</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
