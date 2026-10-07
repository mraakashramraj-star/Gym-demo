import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Filter, 
  Clock, 
  User, 
  MapPin, 
  Users, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { ClassCard } from '../components/cards/ClassCard.jsx';
import { BookingModal } from '../components/common/BookingModal.jsx';
import { PageHero } from '../components/common/PageHero.jsx';
import heroAthlete from '../assets/hero_athlete.jpg';

export const SchedulePage = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const categories = ['All', 'HIIT', 'Yoga', 'Strength', 'Cardio', 'Zumba', 'Functional Training', 'Mobility'];

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBookingClass, setActiveBookingClass] = useState(null);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await api.getClasses({
        day: selectedDay,
        category: selectedCategory === 'All' ? undefined : selectedCategory
      });
      if (res.classes) setClasses(res.classes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [selectedDay, selectedCategory]);

  return (
    <div className="pb-20">
      
      {/* Header Banner */}
      <PageHero
        badge="Weekly Timetable & Live Availability"
        title="CLASS SCHEDULE"
        breadcrumb="Schedule"
        subtitle="Reserve your session up to 7 days in advance. Real-time slot reservation prevents over-crowding and guarantees your spot."
        bgImage={heroAthlete}
        highlights={[
          { label: '7-Day Advance Booking', icon: Clock },
          { label: 'Live Slot Availability', icon: Zap },
          { label: 'Zero Overcrowding', icon: ShieldCheck },
          { label: '24/7 Floor Access', icon: Sparkles }
        ]}
      >
        {/* Days of Week Tab Bar */}
        <div className="flex items-center justify-center overflow-x-auto gap-2 pb-2 max-w-5xl mx-auto no-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedDay === day
                  ? 'bg-[#ff4612] text-white shadow-lg shadow-[#ff4612]/30 scale-105'
                  : 'bg-[#14141b]/80 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mt-4 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-black font-black shadow-md'
                  : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </PageHero>

      {/* Classes Grid */}
      <section className="py-16 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#ff4612]" />
              <span>{selectedDay} Sessions</span>
              <span className="text-xs text-gray-400 font-normal">({classes.length} classes found)</span>
            </h2>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Available</span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 ml-2"></span>
              <span>Class Full</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-[#ff4612] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs uppercase font-bold text-gray-400">Updating Timetable...</p>
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-16 bg-[#111116] border border-white/10 rounded-2xl">
              <Clock className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <h3 className="font-heading font-black text-xl text-white uppercase">No Sessions Scheduled</h3>
              <p className="text-gray-400 text-xs mt-1">
                No classes matching category "{selectedCategory}" on {selectedDay}.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((gymClass) => (
                <ClassCard
                  key={gymClass.id}
                  gymClass={gymClass}
                  onBook={(cls) => setActiveBookingClass(cls)}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Booking Modal */}
      {activeBookingClass && (
        <BookingModal
          gymClass={activeBookingClass}
          onClose={() => setActiveBookingClass(null)}
          onBookingSuccess={() => {
            setActiveBookingClass(null);
            fetchClasses(); // Refresh class reserved counts
          }}
        />
      )}

    </div>
  );
};
