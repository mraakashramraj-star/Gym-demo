import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { ProgramCard } from '../components/cards/ProgramCard.jsx';
import { Filter } from 'lucide-react';

export const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPrograms().then(res => {
      if (res.programs) setPrograms(res.programs);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const categories = ['All', '1-on-1 Coaching', 'Studio Fitness', 'Mind & Body', 'Cardio & Stamina', 'Dance Fitness', 'Heavy Lifting', 'Physique Sculpting', 'Body Recomposition', 'Dietetics', 'Therapy & Longevity'];

  const filteredPrograms = activeCategory === 'All'
    ? programs
    : programs.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="relative py-16 bg-[#0a0a0e] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-4 inline-block">
            Comprehensive Fitness Catalog
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight">
            ATHLETIC PROGRAMS
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ten specialized disciplines designed to build strength, shred fat, restore mobility, and cultivate unstoppable endurance.
          </p>

          {/* Category Filter Badges */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-8 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-[#ff4612] text-white shadow-lg shadow-[#ff4612]/30'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-[#ff4612] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs uppercase font-bold text-gray-400">Loading Programs...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
