import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, Sparkles } from 'lucide-react';

export const TrainerCard = ({ trainer, onBookSession }) => {
  return (
    <div className="group bg-[#111116] border border-white/10 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-[#ff4612]/50 hover:shadow-2xl hover:shadow-[#ff4612]/15">
      
      {/* Trainer Image Container */}
      <div className="relative h-72 sm:h-80 overflow-hidden bg-zinc-900">
        <img
          src={trainer.photo}
          alt={trainer.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent"></div>
        
        {/* Experience Pill */}
        <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#ff5e28] px-2.5 py-1 rounded border border-white/10 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {trainer.experience}
        </span>
      </div>

      {/* Trainer Information */}
      <div className="p-6 flex-1 flex flex-col justify-between -mt-8 relative z-10">
        <div>
          <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight group-hover:text-[#ff5e28] transition-colors">
            {trainer.name}
          </h3>
          <p className="text-[#ff4612] text-xs font-semibold tracking-wide mt-0.5 mb-3">
            {trainer.role}
          </p>
          
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4 italic">
            "{trainer.philosophy}"
          </p>

          {/* Specialties Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {trainer.specialties.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-white/5 text-gray-300 rounded border border-white/5"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/trainers/${trainer.slug}`}
            className="flex-1 py-2.5 px-3 rounded bg-white/5 hover:bg-[#ff4612] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          {onBookSession && (
            <button
              onClick={() => onBookSession(trainer)}
              className="py-2.5 px-3 rounded border border-white/10 hover:border-[#ff4612] hover:text-[#ff4612] text-gray-300 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Book
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
