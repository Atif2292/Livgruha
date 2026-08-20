import React from 'react';

/**
 * Official LivGruha Brand Logo Component
 * High-definition, crystal-clear rendering of the user's authentic brand identity.
 */
export default function BrandLogo({ 
  variant = 'default', 
  layout = 'horizontal', 
  size = 'default', 
  className = '' 
}) {
  const isDark = variant === 'dark'; // For dark backgrounds (e.g. Footer)

  // Height configurations
  const heightClasses = {
    small: 'h-8 sm:h-9',
    default: layout === 'horizontal' ? 'h-10 sm:h-12 md:h-14' : 'h-16 sm:h-20',
    large: layout === 'horizontal' ? 'h-14 sm:h-16 md:h-20' : 'h-24 sm:h-28',
    footer: 'h-16 sm:h-20'
  };

  const h = heightClasses[size] || heightClasses.default;

  // Choose the appropriate high-resolution asset
  let logoSrc = '/livgruha-logo-horizontal.png';
  if (layout === 'stacked') {
    logoSrc = isDark ? '/livgruha-logo-white.png' : '/livgruha-logo-transparent.png';
  } else {
    logoSrc = isDark ? '/livgruha-logo-horizontal-white.png' : '/livgruha-logo-horizontal.png';
  }

  return (
    <div className={`inline-flex items-center select-none cursor-pointer group ${className}`}>
      <img
        src={logoSrc}
        alt="LIVGRUHA INTERIORS - Designing Spaces. Enriching Lives."
        className={`${h} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        style={{
          imageRendering: '-webkit-optimize-contrast',
          filter: isDark 
            ? 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' 
            : 'drop-shadow(0 2px 4px rgba(155,63,35,0.06))'
        }}
        loading="eager"
      />
    </div>
  );
}
