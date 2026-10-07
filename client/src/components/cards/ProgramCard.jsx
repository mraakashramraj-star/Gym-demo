import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, User, Clock } from 'lucide-react';
import * as Icons from 'lucide-react';
import FadeContent from '../common/FadeContent.jsx';

export const ProgramCard = ({ program }) => {
  const IconComponent = Icons[program.icon] || Icons.Dumbbell;

  return (
    <FadeContent blur={true} duration={800} threshold={0.1} initialOpacity={0} className="h-full">
      <div className="group bg-[#111116] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:border-[#ff4612]/50 hover:shadow-2xl hover:shadow-[#ff4612]/15">
      
      {/* Program Image Header */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/40 to-transparent"></div>
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#ff5e28] px-2.5 py-1 rounded border border-white/10">
          {program.category}
        </span>

        {/* Floating Icon */}
        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-lg bg-[#ff4612] text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Program Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {program.level && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {program.level}
              </span>
            )}
            {program.duration && (
              <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                {program.duration}
              </span>
            )}
          </div>

          <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-2 group-hover:text-[#ff5e28] transition-colors">
            {program.title}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {program.tagline || program.description}
          </p>

          {/* Quick Benefits bullet list */}
          {program.benefits && program.benefits.length > 0 && (
            <ul className="space-y-1.5 mb-5 text-xs text-gray-300">
              {program.benefits.slice(0, 3).map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4612] shrink-0 mt-0.5" />
                  <span className="truncate">{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4 border-t border-white/5 mt-auto">
          {program.leadTrainer && (
            <div className="flex items-center justify-between text-xs mb-3 text-gray-400">
              <span className="text-[11px] font-medium flex items-center gap-1.5 text-gray-400">
                <User className="w-3 h-3 text-[#ff4612]" />
                Lead: <strong className="text-white font-semibold">{program.leadTrainer}</strong>
              </span>
              {program.intensity && (
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                  {program.intensity}
                </span>
              )}
            </div>
          )}

          <Link
            to={`/programs/${program.slug}`}
            className="w-full py-2.5 px-4 rounded bg-white/5 group-hover:bg-[#ff4612] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
          >
            <span>Explore Program</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      </div>
    </FadeContent>
  );
};
