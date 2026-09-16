import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { TrainerCard } from '../components/cards/TrainerCard.jsx';
import { BookingModal } from '../components/common/BookingModal.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useNavigate } from 'react-router-dom';

export const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getTrainers().then(res => {
      if (res.trainers) setTrainers(res.trainers);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleBookSession = (trainer) => {
    navigate(`/trainers/${trainer.slug}`);
  };

  return (
    <div className="pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="relative py-16 bg-[#0a0a0e] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-4 inline-block">
            Elite Performance Coaches
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight">
            EXPERT TRAINERS
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Certified CSCS specialists, physical therapists, and sports dietitians committed to engineering your peak physiological performance.
          </p>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-16 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-[#ff4612] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs uppercase font-bold text-gray-400">Loading Coaching Staff...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.map((trainer) => (
                <TrainerCard
                  key={trainer.id}
                  trainer={trainer}
                  onBookSession={handleBookSession}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
