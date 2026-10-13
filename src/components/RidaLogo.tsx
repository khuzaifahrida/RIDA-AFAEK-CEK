import React from 'react';

interface RidaLogoProps {
  className?: string;
  variant?: 'compact' | 'full';
  showTagline?: boolean;
  isDarkTheme?: boolean;
}

export const RidaLogo: React.FC<RidaLogoProps> = ({
  className = '',
  variant = 'compact',
  showTagline = true,
  isDarkTheme = false,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Visual Vector Icon / Emblem based on the uploaded logo */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 200 120"
          className={variant === 'compact' ? 'w-16 h-10' : 'w-56 h-34 sm:w-72 sm:h-44 md:w-80 md:h-48'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="blueLoop" x1="20" y1="65" x2="105" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="0.5" stopColor="#0369A1" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="greenLoop" x1="75" y1="85" x2="150" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#059669" />
              <stop offset="0.5" stopColor="#10B981" />
              <stop offset="1" stopColor="#065F46" />
            </linearGradient>

            <linearGradient id="goldArrow" x1="85" y1="90" x2="155" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="0.3" stopColor="#84CC16" />
              <stop offset="0.7" stopColor="#EAB308" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id="starGlow" x1="130" y1="12" x2="175" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A" />
              <stop offset="0.4" stopColor="#FDE047" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id="centralStarGrad" x1="90" y1="35" x2="110" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A" />
              <stop offset="0.6" stopColor="#FBBF24" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>

            <filter id="starFlare" x="120" y="0" width="70" height="70" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Geometric Facets in Blue and Teal */}
          <path d="M 48 32 L 25 50 L 25 78 L 46 98 L 68 88 L 76 68 L 60 48 Z" fill="#0284C7" />
          <path d="M 25 50 L 48 32 L 70 45 L 50 60 Z" fill="#0369A1" />
          <path d="M 25 78 L 46 98 L 68 88 L 50 70 Z" fill="#059669" />
          <path d="M 46 98 L 68 88 L 88 100 L 68 110 Z" fill="#047857" />
          <path d="M 48 32 L 68 45 L 82 32 L 65 22 Z" fill="#0284C7" />

          {/* Right Geometric Facets */}
          <path d="M 132 82 L 148 100 L 165 78 L 152 64 Z" fill="#F59E0B" opacity="0.9" />
          <path d="M 115 62 L 132 82 L 152 64 L 138 48 Z" fill="#0D9488" />

          {/* Upper Blue Flowing Ribbon */}
          <path
            d="M 45 84 C 62 102, 105 100, 132 64 C 144 48, 150 36, 160 26"
            stroke="url(#blueLoop)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Lower Green Flowing Ribbon */}
          <path
            d="M 58 46 C 80 24, 118 36, 142 72 C 150 84, 158 98, 165 105"
            stroke="url(#greenLoop)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Golden Ascending Arrow */}
          <path
            d="M 68 94 C 92 94, 126 78, 148 45 L 142 52 L 158 40 L 154 58 Z"
            fill="url(#goldArrow)"
          />
          <path
            d="M 135 52 L 160 26 L 152 50 Z"
            fill="#F59E0B"
          />

          {/* CENTRAL GOLDEN 5-POINTED STAR */}
          <g transform="translate(100, 48)">
            <polygon
              points="0,-12 3.5,-3.5 12.5,-3.5 5,2 7.5,11 0,5.5 -7.5,11 -5,2 -12.5,-3.5 -3.5,-3.5"
              fill="url(#centralStarGrad)"
              stroke="#D97706"
              strokeWidth="0.8"
            />
          </g>

          {/* APEX GLOWING STAR WITH RAYS */}
          <g transform="translate(160, 22)" filter="url(#starFlare)">
            <circle cx="0" cy="0" r="16" fill="#FDE047" opacity="0.35" />
            <polygon
              points="0,-18 5,-5 18,-5 7,3 11,16 0,8 -11,16 -7,3 -18,-5 -5,-5"
              fill="url(#starGlow)"
            />
          </g>
        </svg>
      </div>

      {/* Typography Lockup */}
      {variant === 'compact' ? (
        <div className="flex flex-col text-left">
          <div className={`flex items-center font-black text-base tracking-tight leading-none ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>
            <span>RIDA</span>
            <span className="text-emerald-500 mx-0.5">-</span>
            <span>AFAEK</span>
          </div>
          <span className={`text-[9px] font-semibold uppercase tracking-wider mt-0.5 ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
            Bapperida NTT
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center mt-3">
          {/* Main Title Wordmark: RIDA - AFAEK */}
          <div className="flex items-center justify-center text-slate-900 font-black tracking-tight text-4xl sm:text-5xl md:text-6xl leading-none">
            <span>RIDA</span>
            <span className="inline-block w-4 sm:w-6 h-1 sm:h-1.5 bg-emerald-500 mx-2 sm:mx-3 rounded-full"></span>
            <span>AFAEK</span>
          </div>

          {/* Subtitle 1: RISET DAN INOVASI DAERAH - ARENA FORUM ASPIRASI, EVALUASI, DAN KAJI-RISET */}
          <p className="text-xs sm:text-sm md:text-base font-bold text-slate-800 tracking-wider uppercase mt-3">
            RISET DAN INOVASI DAERAH - ARENA FORUM ASPIRASI, EVALUASI, DAN KAJI-RISET
          </p>

          {/* Subtitle 2 / Tagline: MENYAMBUNG ASPIRASI MENJADI KEBIJAKAN */}
          {showTagline && (
            <p className="text-xs sm:text-sm md:text-sm font-semibold text-slate-600 tracking-wide uppercase mt-1">
              MENYAMBUNG ASPIRASI MENJADI KEBIJAKAN
            </p>
          )}
        </div>
      )}
    </div>
  );
};
