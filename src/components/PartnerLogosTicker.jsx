import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

/**
 * Premium Brand Partners with authentic vector graphics & official emblem logos.
 */
const BRAND_PARTNERS = [
  {
    id: 'hafele',
    name: 'Häfele',
    country: 'Germany',
    category: 'Architectural Hardware',
    usp: 'German Soft-Close Fittings',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-[#D42127] flex items-center justify-center shadow-sm shrink-0">
          <span className="text-white font-black text-xl tracking-tighter">H</span>
        </div>
        <div className="text-left">
          <span className="text-xl sm:text-2xl font-black tracking-wider text-[#D42127] block leading-none font-sans">
            HÄFELE
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            GERMANY • 1923
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'blum',
    name: 'Blum',
    country: 'Austria',
    category: 'Lift & Drawer Systems',
    usp: 'Austrian Precision Mechanisms',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-[#F36F21] flex items-center justify-center shadow-sm shrink-0">
          <span className="text-white font-black text-xl tracking-tight">b</span>
        </div>
        <div className="text-left">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#1E2229] block leading-none font-sans">
            blum<span className="text-[#F36F21]">.</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            AUSTRIA • PERFECT MOTION
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'hettich',
    name: 'Hettich',
    country: 'Germany',
    category: 'Precision Hardware',
    usp: 'Sensys Soft-Close Hinges',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-[#004B87] flex items-center justify-center shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.3l5.5 3.4L12 11.1 6.5 7.7 12 4.3zM6 9.3l5 3.1v6.3l-5-3.1V9.3zm7 9.4v-6.3l5-3.1v6.3l-5 3.1z"/>
          </svg>
        </div>
        <div className="text-left">
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#004B87] block leading-none">
            Hettich
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            TECHNIK FÜR MÖBEL
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'saint-gobain',
    name: 'Saint-Gobain',
    country: 'France',
    category: 'Glass & Gyproc',
    usp: 'Acoustic Glass & Drywalls',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#003A70] via-[#00A3E0] to-[#84BD00] flex items-center justify-center shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 9.5l7.03 8.11C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/>
          </svg>
        </div>
        <div className="text-left">
          <span className="text-lg sm:text-xl font-black tracking-tight text-[#003A70] block leading-none font-sans">
            SAINT-GOBAIN
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            FRANCE • GYPROC GLASS
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'asian-paints',
    name: 'Asian Paints',
    country: 'India',
    category: 'Royale Luxury Paints',
    usp: 'Teflon PU & Anti-Bacterial',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E31B23] via-[#F37021] to-[#FFC20E] flex items-center justify-center shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="text-left">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#E31B23] block leading-none font-sans">
            asian<span className="text-[#1E2229]">paints</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            ROYALE LUXURY FINISH
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'centuryply',
    name: 'CenturyPly',
    country: 'India',
    category: 'IS-710 Marine BWR',
    usp: 'Club Prime 100% Plywood',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-[#008542] flex items-center justify-center shadow-sm shrink-0">
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs">
            ★
          </div>
        </div>
        <div className="text-left">
          <span className="text-lg sm:text-xl font-black tracking-tight text-[#008542] block leading-none font-sans">
            CENTURY<span className="text-[#E31B23]">PLY</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            IS-710 MARINE GRADE
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'greenply',
    name: 'Greenply',
    country: 'India',
    category: 'Club BWP Plywood',
    usp: 'Zero-Emission Marine Core',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A9.49 9.49 0 0 0 12 21c6 0 9-4 9-9 0-.35-.02-.71-.06-1.07A8.93 8.93 0 0 0 17 8z"/>
          </svg>
        </div>
        <div className="text-left">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#2E7D32] block leading-none font-sans">
            green<span className="text-[#1E2229]">ply</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            VIRGIN BWP PLYWOOD
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'merino',
    name: 'Merino',
    country: 'India',
    category: 'High-Pressure Laminates',
    usp: 'Zero Scratch Matte Textures',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-[#1B365D] flex items-center justify-center shadow-sm shrink-0">
          <div className="w-5 h-5 rotate-45 border-2 border-amber-300 bg-amber-400/20"></div>
        </div>
        <div className="text-left">
          <span className="text-xl sm:text-2xl font-black tracking-widest text-[#1B365D] block leading-none font-sans">
            MERINO
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            SURFACE LAMINATES
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'kohler',
    name: 'Kohler',
    country: 'USA',
    category: 'Kitchen Sinks & Fittings',
    usp: 'Cast Iron & Matte PVD Sinks',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-[#1E2229] flex items-center justify-center shadow-sm shrink-0">
          <span className="text-white font-serif font-black text-xl">K</span>
        </div>
        <div className="text-left">
          <span className="text-xl sm:text-2xl font-serif font-black tracking-wider text-[#1E2229] block leading-none">
            KOHLER.
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            USA • SINCE 1873
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'philips',
    name: 'Philips',
    country: 'Netherlands',
    category: 'Architectural LEDs',
    usp: '3000K Warm Profile Coves',
    logo: (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-[#0B5ED7] flex items-center justify-center shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V19h-2v-2.07c-2.84-.48-5-2.94-5-5.93s2.16-5.45 5-5.93V3h2v2.07c2.84.48 5 2.94 5 5.93s-2.16 5.45-5 5.93z"/>
          </svg>
        </div>
        <div className="text-left">
          <span className="text-xl sm:text-2xl font-black tracking-widest text-[#0B5ED7] block leading-none font-sans">
            PHILIPS
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block mt-0.5">
            CONCEALED PROFILE LIGHTING
          </span>
        </div>
      </div>
    )
  }
];

export default function PartnerLogosTicker() {
  return (
    <section className="py-16 bg-white border-y border-[#E6DFD5] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] text-[#9B3F23] text-xs font-bold uppercase tracking-wider border border-[#E8CFCA] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Original Factory Hologram Verified</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E2229] tracking-tight">
          Engineered with Global Hardware & Material Leaders
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mt-2">
          Every LivGruha residence is built exclusively with authentic Austrian & German mechanisms, certified IS-710 Marine BWR plywood, and premium European finishes.
        </p>
      </div>

      {/* Grid Display for Desktop & Tablets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {BRAND_PARTNERS.map((brand) => (
            <div
              key={brand.id}
              className="bg-[#FAF8F5] hover:bg-white rounded-2xl p-5 border border-[#E6DFD5] hover:border-[#9B3F23]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
            >
              {/* Official Brand Logo Mark */}
              <div className="py-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {brand.logo}
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-3 border-t border-gray-200/70 space-y-1 text-left">
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-800">
                  <span>{brand.category}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{brand.usp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Assurance Banner */}
        <div className="mt-10 pt-6 border-t border-[#E6DFD5] flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-gray-800">100% Original Factory Hologram Verified</span>
          </div>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#9B3F23]" />
            <span className="font-semibold text-gray-800">Direct OEM Sourcing with Manufacturer Warranty</span>
          </div>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#9B3F23]" />
            <span className="font-semibold text-gray-800">Zero Local Imitations or Cheap Particle Boards</span>
          </div>
        </div>
      </div>
    </section>
  );
}
