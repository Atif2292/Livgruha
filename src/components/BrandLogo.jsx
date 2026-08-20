import React from 'react';

/**
 * Premium Vector Brand Logo for LivGruha Interiors
 * High-definition, crystal-clear rendering across all screen densities and themes
 */
export default function BrandLogo({ variant = 'default', size = 'default', className = '' }) {
  const isDark = variant === 'dark'; // For dark backgrounds (like Footer)

  // Size configurations
  const sizes = {
    small: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[8px]', gap: 'gap-2' },
    default: { icon: 'w-9 h-9 sm:w-10 sm:h-10', text: 'text-lg sm:text-xl', sub: 'text-[9px] sm:text-[10px]', gap: 'gap-2.5 sm:gap-3' },
    large: { icon: 'w-12 h-12 sm:w-14 sm:h-14', text: 'text-2xl sm:text-3xl', sub: 'text-xs', gap: 'gap-3.5' }
  };

  const s = sizes[size] || sizes.default;

  return (
    <div className={`inline-flex items-center ${s.gap} select-none ${className}`}>
      {/* Luxury Geometric Architectural Emblem */}
      <div className={`relative ${s.icon} shrink-0 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-105 ${
        isDark 
          ? 'bg-gradient-to-br from-[#9B3F23] via-[#B84A2A] to-[#C68B59] border border-white/20' 
          : 'bg-gradient-to-br from-[#9B3F23] via-[#B84A2A] to-[#C68B59] border border-[#E8CFCA]'
      }`}>
        {/* Architectural House / Interior Isometric Lines SVG */}
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full p-1.5 text-white"
        >
          {/* Outer Diamond / Isometric Frame */}
          <path 
            d="M24 4L42 14V34L24 44L6 34V14L24 4Z" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
          {/* Roof Line */}
          <path 
            d="M12 21L24 13L36 21" 
            stroke="#FFFFFF" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Interior Living Pillar & Modern 'L' / 'G' Structural Monogram */}
          <path 
            d="M16 23V35H32V29H22V23" 
            stroke="#FDE68A" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Subtle Sparkle Accent */}
          <circle cx="34" cy="15" r="2" fill="#FDE68A" />
        </svg>
      </div>

      {/* Typography Brand Mark */}
      <div className="flex flex-col text-left">
        <div className="flex items-center tracking-wider">
          <span className={`font-serif font-black tracking-[0.12em] leading-none ${s.text} ${
            isDark ? 'text-white' : 'text-[#1E2229]'
          }`}>
            LIVGRUHA
          </span>
        </div>
        <span className={`font-mono font-bold tracking-[0.24em] uppercase mt-1 ${s.sub} ${
          isDark ? 'text-amber-300/90' : 'text-[#9B3F23]'
        }`}>
          INTERIORS • 21-DAY HANDOVER
        </span>
      </div>
    </div>
  );
}
