import React from 'react';

interface RidaEmblemProps {
  className?: string;
}

export const RidaEmblem: React.FC<RidaEmblemProps> = ({ className = 'w-16 h-10' }) => {
  return (
    <svg
      viewBox="0 0 220 130"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Ribbon Gradients */}
        <linearGradient id="blueLoop" x1="25" y1="70" x2="115" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284C7" />
          <stop offset="0.45" stopColor="#0369A1" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>

        <linearGradient id="greenLoop" x1="80" y1="90" x2="165" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="0.5" stopColor="#10B981" />
          <stop offset="1" stopColor="#065F46" />
        </linearGradient>

        <linearGradient id="goldArrow" x1="95" y1="95" x2="175" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="0.3" stopColor="#84CC16" />
          <stop offset="0.7" stopColor="#EAB308" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>

        <linearGradient id="starGlow" x1="145" y1="10" x2="195" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.4" stopColor="#FDE047" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>

        <linearGradient id="centralStarGrad" x1="100" y1="40" x2="120" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.6" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>

        <filter id="starFlare" x="140" y="0" width="75" height="75" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Left Geometric Facets / Crystal Hexagonal Pattern */}
      <path d="M 52 35 L 28 54 L 28 84 L 52 105 L 75 94 L 82 72 L 65 52 Z" fill="#0284C7" />
      <path d="M 28 54 L 52 35 L 75 48 L 54 65 Z" fill="#0369A1" />
      <path d="M 28 84 L 52 105 L 75 94 L 54 75 Z" fill="#059669" />
      <path d="M 52 105 L 75 94 L 95 106 L 75 116 Z" fill="#047857" />
      <path d="M 52 35 L 74 48 L 88 34 L 70 24 Z" fill="#0284C7" />

      {/* Right Geometric Facets */}
      <path d="M 145 88 L 162 108 L 180 84 L 166 70 Z" fill="#F59E0B" opacity="0.9" />
      <path d="M 126 68 L 145 88 L 166 70 L 150 52 Z" fill="#0D9488" />

      {/* Upper Blue Flowing Curved Ribbon */}
      <path
        d="M 50 90 C 68 110, 115 108, 144 70 C 156 52, 162 40, 172 30"
        stroke="url(#blueLoop)"
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* Lower Green Flowing Curved Ribbon */}
      <path
        d="M 64 50 C 88 26, 128 38, 154 78 C 164 92, 172 106, 180 114"
        stroke="url(#greenLoop)"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Golden Ascending Arrow */}
      <path
        d="M 75 102 C 100 102, 136 84, 160 50 L 154 58 L 172 44 L 166 64 Z"
        fill="url(#goldArrow)"
      />
      <path
        d="M 148 56 L 174 30 L 166 54 Z"
        fill="#F59E0B"
      />

      {/* CENTRAL GOLDEN 5-POINTED STAR (Resting in the center loop opening) */}
      <g transform="translate(110, 52)">
        <polygon
          points="0,-12 3.5,-3.5 12.5,-3.5 5,2 7.5,11 0,5.5 -7.5,11 -5,2 -12.5,-3.5 -3.5,-3.5"
          fill="url(#centralStarGrad)"
          stroke="#D97706"
          strokeWidth="0.8"
        />
      </g>

      {/* APEX GLOWING STAR WITH RAYS (At arrow point) */}
      <g transform="translate(176, 26)" filter="url(#starFlare)">
        <circle cx="0" cy="0" r="16" fill="#FDE047" opacity="0.35" />
        <polygon
          points="0,-18 5,-5 18,-5 7,3 11,16 0,8 -11,16 -7,3 -18,-5 -5,-5"
          fill="url(#starGlow)"
        />
      </g>
    </svg>
  );
};

interface RidaLogoProps {
  className?: string;
  variant?: 'navbar' | 'hero-card' | 'compact' | 'full';
  showTagline?: boolean;
}

export const RidaLogo: React.FC<RidaLogoProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  // 1. Navbar horizontal lockup (Exact match to top left of image.png)
  if (variant === 'navbar' || variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
        <RidaEmblem className="w-14 h-9 sm:w-16 sm:h-10 shrink-0" />
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#0f2847] leading-none">
            RIDA-AFAEK
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#0f2847] mt-1 leading-none">
            BAPPERIDA PROVINSI NTT
          </span>
        </div>
      </div>
    );
  }

  // 2. Hero Card horizontal lockup (Exact match to the central card in image.png)
  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 md:gap-7 select-none ${className}`}>
      <RidaEmblem className="w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 shrink-0" />
      <div className="flex flex-col text-left">
        <div className="font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#0f2847] leading-none mb-1.5 sm:mb-2">
          RIDA-AFAEK
        </div>
        <div className="text-[10px] sm:text-xs md:text-[13px] font-bold text-black uppercase tracking-wider leading-snug">
          RISET DAN INOVASI DAERAH - ARENA FORUM
        </div>
        <div className="text-[10px] sm:text-xs md:text-[13px] font-bold text-black uppercase tracking-wider leading-snug">
          ASPIRASI, EVALUASI, DAN KAJI-RISET
        </div>
      </div>
    </div>
  );
};
