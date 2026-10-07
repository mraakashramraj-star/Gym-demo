import React from 'react';
import { Clock, User, MapPin, Users, Calendar } from 'lucide-react';
import FadeContent from '../common/FadeContent.jsx';
import Magnet from '../common/Magnet.jsx';

export const ClassCard = ({ gymClass, onBook }) => {
  const isFull = (gymClass.reserved || 0) >= (gymClass.capacity || 15);
  const remaining = Math.max(0, (gymClass.capacity || 15) - (gymClass.reserved || 0));

  return (
    <FadeContent blur={true} duration={800} threshold={0.1} initialOpacity={0} className="h-full">
      <div className={`p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between h-full ${
        isFull
          ? 'bg-[#121217]/60 border-white/5 opacity-85'
          : 'bg-[#111116] border-white/10 hover:border-[#ff4612]/40 hover:bg-[#16161d]'
      }`}>
        
        {/* Top Meta */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5e28] bg-[#ff4612]/15 px-2.5 py-0.5 rounded border border-[#ff4612]/30">
              {gymClass.category}
            </span>
            <span className="text-xs font-black text-white bg-white/5 px-2 py-0.5 rounded">
              {gymClass.time}
            </span>
          </div>

          <h4 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-2">
            {gymClass.name}
          </h4>

          {/* Info Grid */}
          <div className="space-y-1.5 text-xs text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#ff4612]" />
              <span className="text-gray-300 font-medium">{gymClass.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{gymClass.duration} • {gymClass.intensity || 'Medium'} Intensity</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              <span>{gymClass.room || 'Main Studio'}</span>
            </div>
          </div>
        </div>

        {/* Footer & Booking Action */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-gray-500" />
            {isFull ? (
              <span className="text-red-400 font-bold uppercase tracking-wider text-[11px]">
                Class Full
              </span>
            ) : (
              <span className="text-emerald-400 text-[11px]">
                {remaining} {remaining === 1 ? 'spot' : 'spots'} open
              </span>
            )}
          </div>

          {isFull ? (
            <button
              type="button"
              disabled
              className="px-4 py-2 rounded bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider cursor-not-allowed border border-red-500/20"
            >
              Class Full
            </button>
          ) : (
            <Magnet padding={40} magnetStrength={3}>
              <button
                type="button"
                onClick={() => onBook(gymClass)}
                className="btn-primary text-xs !py-2 !px-4"
              >
                Book Spot
              </button>
            </Magnet>
          )}
        </div>

      </div>
    </FadeContent>
  );
};
