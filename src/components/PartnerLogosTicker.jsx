import React from 'react';
import { PARTNER_BRANDS } from '../data/interiorData';
import { ShieldCheck, Award } from 'lucide-react';

export default function PartnerLogosTicker() {
  // Duplicate array for infinite seamless scrolling
  const tickerItems = [...PARTNER_BRANDS, ...PARTNER_BRANDS];

  return (
    <section className="py-10 bg-white border-y border-[#E6DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF2ED] border border-[#E8CFCA] text-[11px] font-bold text-[#9B3F23] uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Brands We Work With • Genuine Global Partners</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E2229] mt-2">
          Engineered with Global Hardware & Material Leaders
        </h3>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left and right fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex items-center gap-6 sm:gap-10 animate-marquee whitespace-nowrap py-2">
          {tickerItems.map((brand, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD5] shadow-xs hover:shadow-md transition-all hover:scale-105"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-[#E8CFCA] flex items-center justify-center font-bold text-xs text-[#9B3F23] shadow-inner font-serif">
                {brand.logo.slice(0, 2)}
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-[#1E2229] tracking-wider uppercase block font-mono">
                  {brand.name}
                </span>
                <span className="text-[10px] text-gray-500 font-medium block">
                  {brand.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
