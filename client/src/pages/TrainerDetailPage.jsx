import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Award, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  Flame 
} from 'lucide-react';
import { api } from '../services/api.js';
import { ClassCard } from '../components/cards/ClassCard.jsx';
import { BookingModal } from '../components/common/BookingModal.jsx';
import FadeContent from '../components/common/FadeContent.jsx';

export const TrainerDetailPage = () => {
  const { slug } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingClass, setBookingClass] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.getTrainerBySlug(slug)
      .then(res => {
        if (res.trainer) setTrainer(res.trainer);
        if (res.classes) setClasses(res.classes);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-[#ff4612] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="min-h-screen bg-[#08080a] flex flex-col items-center justify-center text-center p-4 pt-20">
        <h2 className="font-heading font-black text-3xl text-white uppercase mb-4">Trainer Not Found</h2>
        <Link to="/trainers" className="btn-primary text-xs">Back to Coaches</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20">
      
      {/* Hero / Profile Header */}
      <section className="relative py-20 bg-[#0a0a0e] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            to="/trainers"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#ff4612]" />
            <span>All Coaches</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Large Profile Image */}
            <div className="lg:col-span-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#ff4612] shadow-2xl bg-zinc-900 aspect-[4/5] max-w-sm mx-auto">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#ff5e28] bg-black/75 px-2.5 py-1 rounded border border-white/10">
                    {trainer.experience} Practical Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="lg:col-span-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3 inline-block">
                {trainer.role}
              </span>
              <h1 className="font-heading font-black text-4xl sm:text-6xl text-white uppercase tracking-tight mb-4">
                {trainer.name}
              </h1>

              {/* Training Philosophy Banner */}
              <div className="p-4 bg-[#14141b] border-l-4 border-[#ff4612] rounded-r-xl mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Coaching Philosophy</p>
                <p className="text-white text-sm sm:text-base italic font-medium">
                  "{trainer.philosophy}"
                </p>
              </div>

              {/* Bio */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {trainer.bio}
              </p>

              {/* Available Days */}
              {trainer.availableDays && (
                <div className="flex items-center gap-2 mb-6 text-xs text-gray-400">
                  <Calendar className="w-4 h-4 text-[#ff4612]" />
                  <span>On Deck: <strong className="text-white">{trainer.availableDays.join(', ')}</strong></span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/membership" className="btn-primary text-xs !py-3.5 !px-6">
                  Book 1-on-1 Consultation
                </Link>
                <a href="#sessions" className="btn-outline text-xs !py-3.5 !px-6">
                  View Scheduled Classes
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Specialties & Certifications */}
      <section className="py-16 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Specialties */}
            <FadeContent blur={true} duration={750} threshold={0.1} className="h-full">
              <div className="p-6 sm:p-8 bg-[#111116] border border-white/10 rounded-2xl h-full">
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#ff4612]" />
                  Domain Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trainer.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </FadeContent>

            {/* Certifications */}
            <FadeContent blur={true} duration={750} delay={150} threshold={0.1} className="h-full">
              <div className="p-6 sm:p-8 bg-[#111116] border border-white/10 rounded-2xl h-full">
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Accreditations & Credentials
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  {trainer.certifications.map((cert, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeContent>

          </div>
        </div>
      </section>

      {/* Available Classes Taught by Trainer */}
      <section id="sessions" className="py-16 bg-[#0c0c11] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-8">
            STUDIO SESSIONS LED BY {trainer.name.toUpperCase()}
          </h2>

          {classes.length === 0 ? (
            <div className="p-8 bg-[#111116] border border-white/10 rounded-xl text-center">
              <p className="text-gray-400 text-sm">
                No open studio sessions scheduled this week. Check back for next week's timetable or book 1-on-1 personal training.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classes.map((c) => (
                <ClassCard
                  key={c.id}
                  gymClass={c}
                  onBook={(cls) => setBookingClass(cls)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      {bookingClass && (
        <BookingModal
          gymClass={bookingClass}
          onClose={() => setBookingClass(null)}
          onBookingSuccess={() => setBookingClass(null)}
        />
      )}

    </div>
  );
};
