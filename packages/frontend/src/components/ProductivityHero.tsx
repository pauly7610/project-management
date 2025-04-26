import React from "react";

export function ProductivityHero() {
  // Subtle SVG illustration with calendar, checklist, and sparkles
  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[420px] h-[160px] pointer-events-none opacity-70 select-none z-0">
      <svg width="420" height="160" viewBox="0 0 420 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="40" width="90" height="60" rx="10" fill="#E0E7FF" />
        <rect x="70" y="60" width="30" height="10" rx="3" fill="#6366F1" />
        <rect x="70" y="75" width="18" height="6" rx="2" fill="#A5B4FC" />
        <rect x="70" y="85" width="20" height="6" rx="2" fill="#A5B4FC" />
        <rect x="70" y="95" width="12" height="6" rx="2" fill="#A5B4FC" />
        <circle cx="180" cy="80" r="28" fill="#FDE68A" />
        <rect x="160" y="70" width="40" height="6" rx="3" fill="#F59E42" />
        <rect x="160" y="82" width="30" height="6" rx="3" fill="#FBBF24" />
        <rect x="160" y="94" width="20" height="6" rx="3" fill="#FBBF24" />
        <g>
          <circle cx="250" cy="60" r="12" fill="#A7F3D0" />
          <rect x="246" y="54" width="8" height="12" rx="2" fill="#34D399" />
        </g>
        <g>
          <circle cx="320" cy="100" r="22" fill="#F3F4F6" />
          <rect x="310" y="90" width="20" height="8" rx="3" fill="#6366F1" />
          <rect x="310" y="102" width="10" height="6" rx="2" fill="#A5B4FC" />
        </g>
        {/* Sparkles */}
        <g>
          <circle cx="115" cy="44" r="2" fill="#FBBF24" />
          <circle cx="200" cy="60" r="1.5" fill="#34D399" />
          <circle cx="275" cy="50" r="2" fill="#6366F1" />
          <circle cx="350" cy="110" r="1.5" fill="#F59E42" />
        </g>
      </svg>
    </div>
  );
}
