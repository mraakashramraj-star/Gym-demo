import React from 'react';
import { Star, Quote, Info } from 'lucide-react';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl hover:border-white/20 transition-all duration-300">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 pointer-events-none" />

      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#ff4612] text-[#ff4612]" />
          ))}
        </div>

        {/* Member Review Quote */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 italic">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Member Details */}
      <div>
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#ff4612]"
          />
          <div>
            <h4 className="font-heading font-black text-white text-sm uppercase tracking-wide">
              {testimonial.name}
            </h4>
            <p className="text-[#ff5e28] text-xs font-semibold">
              {testimonial.goal}
            </p>
            <p className="text-gray-500 text-[11px]">
              {testimonial.role}
            </p>
          </div>
        </div>

        {/* Demarcated Placeholder Notice for Transparency */}
        {testimonial.isPlaceholderNotice && (
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-500 bg-white/5 px-2.5 py-1 rounded">
            <Info className="w-3 h-3 text-gray-400 shrink-0" />
            <span>{testimonial.isPlaceholderNotice}</span>
          </div>
        )}
      </div>

    </div>
  );
};
