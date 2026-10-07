import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Flame, Sparkles } from 'lucide-react';
import { ScrollFloat } from './ScrollFloat.jsx';

export const PageHero = ({
  badge = '',
  title = '',
  subtitle = '',
  breadcrumb = '',
  highlights = [],
  bgImage = null,
  children = null,
  className = ''
}) => {
  return (
    <section className={`relative overflow-hidden bg-[#07070a] border-b border-white/10 pt-28 sm:pt-36 pb-14 sm:pb-20 ${className}`}>
      {/* 1. Atmospheric Ambient Gym Backdrop */}
      {bgImage && (
        <div className="absolute inset-0 pointer-events-none select-none -z-20 overflow-hidden">
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-[0.14] mix-blend-luminosity filter blur-[1px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/90 via-[#07070a]/75 to-[#07070a]" />
        </div>
      )}

      {/* 2. Fiery Crimson Radial Fog Glow (Center-Top) */}
      <div className="absolute inset-0 pointer-events-none select-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] sm:w-[950px] h-[400px] sm:h-[480px] bg-[radial-gradient(ellipse_at_top,_rgba(255,70,18,0.22)_0%,_rgba(230,0,57,0.09)_42%,_transparent_72%)] blur-3xl" />
        {/* Subtle Athletic Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Top Ambient Edge Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff4612]/35 to-transparent" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Breadcrumb Navigation Trail */}
        <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold text-gray-400">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors py-1 px-2.5 rounded-full bg-white/[0.04] border border-white/5 hover:border-white/20"
          >
            <Home className="w-3 h-3 text-[#ff4612]" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="text-[#ff4612] bg-[#ff4612]/10 border border-[#ff4612]/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px]">
            {breadcrumb || title}
          </span>
        </div>

        {/* Badge Pill */}
        {badge && (
          <div className="mb-3 inline-block">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#ff4612] bg-[#ff4612]/15 border border-[#ff4612]/30 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(255,70,18,0.25)]">
              <Flame className="w-3 h-3 text-[#ff4612] animate-pulse" />
              {badge}
            </span>
          </div>
        )}

        {/* Dynamic Animated H1 Title - Always Visible */}
        {title && (
          <div className="my-2 sm:my-3">
            <ScrollFloat
              as="h1"
              containerClassName="leading-none"
              textClassName="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
              animationDuration={0.8}
              ease="power3.out"
              stagger={0.02}
            >
              {title}
            </ScrollFloat>
          </div>
        )}

        {/* Description / Subtitle */}
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal text-balance">
            {subtitle}
          </p>
        )}

        {/* Highlights / Athletic Stats Pills */}
        {highlights && highlights.length > 0 && (
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8 max-w-4xl mx-auto">
            {highlights.map((item, idx) => {
              const label = typeof item === 'string' ? item : item.label;
              const Icon = typeof item === 'object' && item.icon ? item.icon : Sparkles;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-gray-200 font-medium backdrop-blur-md shadow-sm hover:border-[#ff4612]/40 hover:bg-[#ff4612]/5 transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-[#ff4612]" />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Additional Interactive Children Slot (Tabs, Search, Filters, Switchers) */}
        {children && (
          <div className="mt-8 sm:mt-10">
            {children}
          </div>
        )}

      </div>
    </section>
  );
};

export default PageHero;
