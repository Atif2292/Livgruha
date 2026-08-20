import React from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

/**
 * Premium Brand Partners with authentic vector SVG logos
 * Sizing enhanced to 44px-50px for maximum trust and visual authority
 */
const BRAND_PARTNERS_LIST = [
  {
    id: 'blum',
    name: 'Blum',
    country: 'Austria',
    category: 'Lift & Drawer Systems',
    usp: '100% Genuine Soft-Close Mechanisms',
    logoSvg: (
      <svg viewBox="0 0 160 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="Blum Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="38" letterSpacing="-1.5">
          blum
        </text>
      </svg>
    ),
    color: '#E30613'
  },
  {
    id: 'hafele',
    name: 'Häfele',
    country: 'Germany',
    category: 'Architectural Hardware',
    usp: 'German Architectural Fittings',
    logoSvg: (
      <svg viewBox="0 0 180 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="Hafele Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="34" letterSpacing="1">
          HÄFELE
        </text>
      </svg>
    ),
    color: '#D42127'
  },
  {
    id: 'hettich',
    name: 'Hettich',
    country: 'Germany',
    category: 'Precision Hardware',
    usp: 'Sensys Soft-Close Hinges',
    logoSvg: (
      <svg viewBox="0 0 180 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="Hettich Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="serif" fontWeight="800" fontSize="36" letterSpacing="0.5">
          Hettich
        </text>
      </svg>
    ),
    color: '#005CA9'
  },
  {
    id: 'saint-gobain',
    name: 'Saint-Gobain',
    country: 'France',
    category: 'Glass & Gyproc',
    usp: 'Acoustic Glass & Drywalls',
    logoSvg: (
      <svg viewBox="0 0 220 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="Saint-Gobain Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="28" letterSpacing="0.5">
          SAINT-GOBAIN
        </text>
      </svg>
    ),
    color: '#006DB6'
  },
  {
    id: 'asian-paints',
    name: 'Asian Paints',
    country: 'India',
    category: 'Royale Luxury Paints',
    usp: 'Teflon-Coated PU Finishes',
    logoSvg: (
      <svg viewBox="0 0 200 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="Asian Paints Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="30" letterSpacing="-0.5">
          asianpaints
        </text>
      </svg>
    ),
    color: '#E42313'
  },
  {
    id: 'centuryply',
    name: 'CenturyPly',
    country: 'India',
    category: 'IS-710 Marine BWR',
    usp: 'Club Prime BWP 100% Plywood',
    logoSvg: (
      <svg viewBox="0 0 210 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="CenturyPly Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="30" letterSpacing="1">
          CENTURYPLY
        </text>
      </svg>
    ),
    color: '#1B5E20'
  },
  {
    id: 'greenply',
    name: 'Greenply',
    country: 'India',
    category: 'BWP Marine Grade',
    usp: 'Zero-Emission Structural Ply',
    logoSvg: (
      <svg viewBox="0 0 190 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="Greenply Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="32" letterSpacing="0.5">
          greenply
        </text>
      </svg>
    ),
    color: '#2E7D32'
  },
  {
    id: 'merino',
    name: 'Merino',
    country: 'Global',
    category: 'High-Gloss Laminates',
    usp: 'Anti-Fingerprint Super Matte',
    logoSvg: (
      <svg viewBox="0 0 180 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="Merino Laminates Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="32" letterSpacing="2">
          MERINO
        </text>
      </svg>
    ),
    color: '#D84315'
  },
  {
    id: 'kohler',
    name: 'Kohler',
    country: 'USA',
    category: 'Kitchen Sinks & Fittings',
    usp: 'Cast Iron & Quartz Sinks',
    logoSvg: (
      <svg viewBox="0 0 170 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="Kohler Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="serif" fontWeight="800" fontSize="36" letterSpacing="2">
          KOHLER
        </text>
      </svg>
    ),
    color: '#1E2229'
  },
  {
    id: 'philips',
    name: 'Philips',
    country: 'Netherlands',
    category: 'Concealed LED Lighting',
    usp: '3000K Warm Ambient Profiles',
    logoSvg: (
      <svg viewBox="0 0 180 50" className="h-9 sm:h-11 w-auto fill-current" aria-label="Philips Logo">
        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="34" letterSpacing="1">
          PHILIPS
        </text>
      </svg>
    ),
    color: '#0066A1'
  }
];

export default function PartnerLogosTicker() {
  // Duplicate array for infinite seamless scrolling
  const tickerItems = [...BRAND_PARTNERS_LIST, ...BRAND_PARTNERS_LIST];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-[#E6DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2ED] border border-[#E8CFCA] text-xs font-bold text-[#9B3F23] uppercase tracking-wider shadow-xs">
          <Award className="w-4 h-4" />
          <span>Brands We Work With • 100% Certified Materials</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E2229] mt-3">
          Engineered with Global Hardware & Material Leaders
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mt-2">
          Every LivGruha residence is built exclusively with authentic Austrian & German mechanisms, IS-710 Marine BWR plywood, and premium European finishes.
        </p>
      </div>

      {/* Infinite Seamless Scrolling Marquee with Enlarged Brand Cards */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left and right fade gradients for depth */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

        <div className="flex items-center gap-5 sm:gap-7 animate-marquee whitespace-nowrap py-3">
          {tickerItems.map((brand, idx) => (
            <div
              key={idx}
              className="inline-flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD5] shadow-xs hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[200px] sm:min-w-[230px] group cursor-default"
            >
              {/* Brand Logo Header */}
              <div className="h-12 flex items-center justify-center text-[#1E2229] group-hover:text-[#9B3F23] transition-colors">
                {brand.logoSvg}
              </div>

              {/* Specification Detail Sub-tag */}
              <div className="mt-3 pt-3 border-t border-[#E6DFD5]/80 text-center">
                <span className="text-[11px] font-bold text-[#1E2229] block truncate">
                  {brand.category}
                </span>
                <span className="text-[10px] text-gray-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{brand.country} • {brand.usp}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Brand Quality Guarantee Strip */}
      <div className="max-w-4xl mx-auto px-4 mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-gray-600">
        <div className="flex items-center gap-1.5 font-semibold text-[#1E2229]">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Original Factory Hologram Verified</span>
        </div>
        <span className="hidden sm:inline text-gray-300">•</span>
        <div className="flex items-center gap-1.5 font-semibold text-[#1E2229]">
          <Award className="w-4 h-4 text-[#9B3F23]" />
          <span>Direct OEM Sourcing with Manufacturer Warranty</span>
        </div>
      </div>
    </section>
  );
}
