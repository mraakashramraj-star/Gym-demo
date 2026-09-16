import React from 'react';
import * as Icons from 'lucide-react';

export const FeatureCard = ({ number, title, description, iconName }) => {
  // Dynamically resolve icon from lucide-react with fallback
  const IconComponent = Icons[iconName] || Icons.Dumbbell;

  return (
    <div className="group relative bg-[#111116] border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-[#ff4612]/50 hover:bg-[#15151c] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#ff4612]/10 overflow-hidden">
      {/* Background subtle number */}
      <span className="absolute top-3 right-4 font-heading font-black text-4xl text-white/5 group-hover:text-[#ff4612]/15 transition-colors select-none">
        {number}
      </span>

      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#ff4612] group-hover:bg-[#ff4612] group-hover:text-white transition-all duration-300 mb-5 shadow-md">
        <IconComponent className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-2 group-hover:text-[#ff5e28] transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
        {description}
      </p>

      {/* Bottom accent glow bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-gradient-to-r from-transparent via-[#ff4612] to-transparent transition-all duration-300"></div>
    </div>
  );
};
