import React from 'react';
import ScrollFloat from './ScrollFloat.jsx';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`mb-12 ${isCentered ? 'text-center max-w-3xl mx-auto' : 'text-left'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-[#ff4612]/15 text-[#ff5e28] border border-[#ff4612]/30 mb-3`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4612] animate-pulse"></span>
          {badge}
        </div>
      )}
      <ScrollFloat
        containerClassName="leading-tight"
        textClassName={`font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-tight ${
          isCentered ? 'text-center' : 'text-left'
        }`}
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        {title}
      </ScrollFloat>
      {subtitle && (
        <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
