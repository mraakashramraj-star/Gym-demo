import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { ProgramCard } from '../components/cards/ProgramCard.jsx';
import { PageHero } from '../components/common/PageHero.jsx';
import FadeContent from '../components/common/FadeContent.jsx';
import { 
  Target, 
  Dumbbell, 
  ShieldCheck, 
  Zap, 
  Search, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Flame, 
  HeartPulse, 
  Award, 
  Compass, 
  CheckCircle2,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import heroAthlete from '../assets/hero_athlete.jpg';

export const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    api.getPrograms()
      .then(res => {
        if (res.programs) setPrograms(res.programs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => [
    'All',
    '1-on-1 Coaching',
    'Studio Fitness',
    'Mind & Body',
    'Cardio & Stamina',
    'Dance Fitness',
    'Heavy Lifting',
    'Physique Sculpting',
    'Body Recomposition',
    'Dietetics',
    'Therapy & Longevity'
  ], []);

  // Filter by category and search
  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase();
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        (p.tagline && p.tagline.toLowerCase().includes(q)) || 
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.leadTrainer && p.leadTrainer.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [programs, activeCategory, searchQuery]);

  // Count helper
  const getCategoryCount = (cat) => {
    if (cat === 'All') return programs.length;
    return programs.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;
  };

  const pillars = [
    {
      num: '01',
      title: 'Biomechanical Movement Screen',
      desc: 'Before touching load, every athlete undergoes joint range-of-motion assessments, kinetic chain screening, and postural diagnostics to eliminate injury vulnerability.',
      icon: ShieldCheck
    },
    {
      num: '02',
      title: 'Periodized Progressive Overload',
      desc: 'Our protocols are periodized in 4-to-6 week mesocycles with calculated RPE, volume wave loading, and deload phases to guarantee continuous neurological and muscular growth.',
      icon: Dumbbell
    },
    {
      num: '03',
      title: 'Nutritional Peri-Fueling Synergy',
      desc: 'Training without strategic recovery is just systemic fatigue. Every program syncs with macronutrient budgeting and intra-workout hydration guidelines curated by registered dietitians.',
      icon: Zap
    },
    {
      num: '04',
      title: 'Autonomic Downregulation & Rehab',
      desc: 'Active infrared thermal recovery, cold plunge contrast therapy, and soft-tissue release ensure your central nervous system rebounds rapidly between high-output sessions.',
      icon: HeartPulse
    }
  ];

  const goalDirectives = [
    {
      goal: 'Build Raw Strength & Power',
      desc: 'Develop maximum force output on Olympic competition barbells with calibrated plates.',
      tag: 'Heavy Lifting',
      slug: 'strength-training'
    },
    {
      goal: 'Rapid Fat Loss & Athletic Stamina',
      desc: 'Maximize metabolic post-workout burn (EPOC) with high-density functional intervals.',
      tag: 'Cardio & Stamina',
      slug: 'hiit'
    },
    {
      goal: 'Physique Balance & Muscle Hypertrophy',
      desc: 'Target lagging muscle groups using Arsenal Strength and Prime selectorized machinery.',
      tag: 'Physique Sculpting',
      slug: 'bodybuilding'
    },
    {
      goal: 'Restore Mobility & Alleviate Back Pain',
      desc: 'Correct postural misalignments and decompress the spine through guided vinyasa sequences.',
      tag: 'Mind & Body',
      slug: 'yoga'
    }
  ];

  const faqs = [
    {
      q: 'How do I know which program is right for my current fitness level?',
      a: 'Every new member receives a complimentary 45-minute 1-on-1 kinetic assessment with a Master Coach. We analyze your mobility, cardiovascular threshold, strength baseline, and lifestyle schedule to recommend the ideal program or custom hybrid split.'
    },
    {
      q: 'Can I combine multiple athletic programs?',
      a: 'Yes. Many members combine Strength & Powerlifting with Yoga & Mindful Mobility for recovery, or pair Group Studio Classes with Nutrition Counseling. Our coaches ensure your weekly volume is balanced to prevent overtraining.'
    },
    {
      q: 'Are programs included in the monthly gym membership?',
      a: 'Group Classes, HIIT conditioning, Yoga, and Zumba are fully included with standard membership tiers. Specialized 1-on-1 Personal Training, Clinical Dietetics, and Physiotherapy Rehabilitation can be added as dedicated packages or VIP plan add-ons.'
    },
    {
      q: 'How often are the training blocks and workout routines updated?',
      a: 'All programs follow calibrated 4-week periodization cycles. Every 4 weeks, weight loads, rep cadences, and accessory exercises are recalibrated based on your logged performance metrics to avoid plateaus.'
    }
  ];

  return (
    <div className="pb-20">
      
      {/* Header Banner */}
      <PageHero
        badge="Comprehensive Fitness Catalog"
        title="ATHLETIC PROGRAMS"
        breadcrumb="Programs"
        subtitle="Ten specialized disciplines engineered to build raw power, burn visceral fat, restore joint longevity, and cultivate unstoppable athletic conditioning."
        bgImage={heroAthlete}
        highlights={[
          { label: '10 Specialized Disciplines', icon: Target },
          { label: 'Biomechanic Precision', icon: Dumbbell },
          { label: 'All Skill Levels Welcome', icon: ShieldCheck },
          { label: 'Free Induction Included', icon: Zap }
        ]}
      >
        {/* Search Bar & Category Filter Badges */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Search Input Box */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs by name, discipline, or coach..."
              className="w-full bg-[#121218]/90 border border-white/10 rounded-full pl-10 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612] transition-colors shadow-lg"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Badges */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {categories.map((cat) => {
              const count = getCategoryCount(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#ff4612] text-white shadow-lg shadow-[#ff4612]/30 scale-105'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-gray-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </PageHero>

      {/* Programs Grid Section */}
      <section className="py-16 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-white/5 gap-3">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] block mb-1">
                Curated Disciplines
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {activeCategory === 'All' ? 'All Athletic Programs' : activeCategory}
              </h2>
            </div>
            <p className="text-xs font-semibold text-gray-400">
              Showing <span className="text-white font-bold">{filteredPrograms.length}</span> of {programs.length} programs
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-[#ff4612] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs uppercase font-bold text-gray-400">Loading Programs Catalog...</p>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-20 bg-[#111116] border border-white/10 rounded-2xl p-8 max-w-lg mx-auto">
              <Compass className="w-12 h-12 text-[#ff4612] mx-auto mb-4 opacity-80" />
              <h3 className="font-heading font-black text-xl text-white uppercase mb-2">No Matching Programs Found</h3>
              <p className="text-gray-400 text-xs mb-6 leading-relaxed">
                We couldn't find any programs matching "{searchQuery}" under "{activeCategory}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="btn-primary text-xs !py-2.5 !px-6"
              >
                Reset All Filters
              </button>
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

      {/* 4 Pillars: The Apex Methodology */}
      <section className="py-20 bg-[#0d0d12] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Science of Results"
            title="THE APEX TRAINING BLUEPRINT"
            subtitle="Every single program follows an uncompromised physiological framework engineered to build resilience without burnout."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const IconComp = pillar.icon;
              return (
                <FadeContent key={i} blur={true} duration={700} delay={i * 100} threshold={0.1} className="h-full">
                  <div className="p-7 bg-[#13131a] border border-white/10 rounded-2xl flex flex-col justify-between h-full hover:border-[#ff4612]/50 transition-all duration-300 group">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-heading font-black text-3xl text-white/15 group-hover:text-[#ff4612]/40 transition-colors">
                          {pillar.num}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-white/5 text-[#ff4612] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </FadeContent>
              );
            })}
          </div>
        </div>
      </section>

      {/* Goal Matcher Interactive Directives */}
      <section className="py-20 bg-[#08080a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#15151c] to-[#0c0c11] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3 inline-block">
                Tailored Guidance
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-3">
                CHOOSE YOUR DISCIPLINE BY OUTCOME
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Click your primary training objective to immediately navigate to its calibrated program.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goalDirectives.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/programs/${item.slug}`}
                  className="p-6 rounded-2xl bg-[#121217] border border-white/5 hover:border-[#ff4612]/60 hover:bg-[#16161f] transition-all group flex items-center justify-between"
                >
                  <div className="pr-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5e28] block mb-1">
                      {item.tag}
                    </span>
                    <h4 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight mb-1 group-hover:text-[#ff4612] transition-colors">
                      {item.goal}
                    </h4>
                    <p className="text-gray-400 text-xs line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/5 text-white flex items-center justify-center shrink-0 group-hover:bg-[#ff4612] transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program FAQs Section */}
      <section className="py-20 bg-[#0c0c11] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="QUESTIONS ABOUT OUR PROGRAMS?"
            subtitle="Everything you need to know about program enrollment, coaching methodology, and schedule synergy."
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#121218] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-[#ff4612] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#ff4612]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Induction / Consultation CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#1a0e0e] via-[#121217] to-[#08080a] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-4 inline-block">
            Complimentary Kinetic Assessment
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
            NOT SURE WHERE TO START?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Sit down with one of our Master Performance Directors for a free 3D movement screen, body composition audit, and tailored program recommendation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary text-xs !py-3.5 !px-8 inline-flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Consultation</span>
            </Link>
            <Link to="/membership" className="btn-outline text-xs !py-3.5 !px-8">
              Explore Memberships
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

