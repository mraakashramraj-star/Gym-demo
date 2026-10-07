import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { TrainerCard } from '../components/cards/TrainerCard.jsx';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero.jsx';
import { Award, Users, Target, Activity } from 'lucide-react';
import aboutAthlete from '../assets/about_athlete.jpg';

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
    <div className="pb-20">
      
      {/* Header Banner */}
      <PageHero
        badge="Elite Performance Coaches"
        title="EXPERT TRAINERS"
        breadcrumb="Trainers"
        subtitle="Certified CSCS specialists, physical therapists, and sports dietitians committed to engineering your peak physiological performance."
        bgImage={aboutAthlete}
        highlights={[
          { label: '100% CSCS & Master Certified', icon: Award },
          { label: '1-on-1 Personalized Programming', icon: Users },
          { label: 'Physiological Tracking', icon: Target },
          { label: 'Injury Rehabilitation', icon: Activity }
        ]}
      />

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
