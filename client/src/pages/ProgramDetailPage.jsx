import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Target, 
  Layers, 
  Sparkles, 
  Calendar,
  Clock,
  Flame,
  Award,
  Activity
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { ProgramCard } from '../components/cards/ProgramCard.jsx';
import FadeContent from '../components/common/FadeContent.jsx';

export const ProgramDetailPage = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [relatedPrograms, setRelatedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    // Fetch program details
    api.getProgramBySlug(slug)
      .then(res => {
        if (res.program) setProgram(res.program);
        if (res.trainer) setTrainer(res.trainer);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    // Fetch related programs
    api.getPrograms()
      .then(res => {
        if (res.programs) {
          const others = res.programs.filter(p => p.slug !== slug).slice(0, 3);
          setRelatedPrograms(others);
        }
      })
      .catch(console.error);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-[#ff4612] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-[#08080a] flex flex-col items-center justify-center text-center p-4 pt-20">
        <h2 className="font-heading font-black text-3xl text-white uppercase mb-4">Program Not Found</h2>
        <Link to="/programs" className="btn-primary text-xs">Back to All Programs</Link>
      </div>
    );
  }

  const IconComponent = Icons[program.icon] || Icons.Dumbbell;

  return (
    <div className="pt-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-center bg-[#0a0a0e] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#ff4612]" />
            <span>All Programs</span>
          </Link>

          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3 inline-block">
              {program.category}
            </span>
            <h1 className="font-heading font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-tight mb-4">
              {program.title}
            </h1>
            <p className="text-gray-300 text-base sm:text-xl leading-relaxed">
              {program.tagline || program.description}
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/membership" className="btn-primary text-xs !py-3.5 !px-6">
                <span>Start Training Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/schedule" className="btn-outline text-xs !py-3.5 !px-6">
                View Class Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Program Quick Specs Ribbon */}
      <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121218] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 text-[#ff4612] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Skill Level</span>
              <span className="text-xs sm:text-sm font-black text-white">{program.level || 'All Skill Levels'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Intensity</span>
              <span className="text-xs sm:text-sm font-black text-white">{program.intensity || 'High Energy'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Session Duration</span>
              <span className="text-xs sm:text-sm font-black text-white">{program.duration || '50–60 mins'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 text-emerald-400 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Recommended Frequency</span>
              <span className="text-xs sm:text-sm font-black text-white">{program.frequency || '3–4 sessions / wk'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview & Benefits */}
      <section className="py-20 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Overview Left */}
            <div className="lg:col-span-7">
              <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] mb-2 block">
                The Science & Methodology
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-6">
                OVERVIEW
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {program.description}
              </p>

              {/* Target Audience Box */}
              {program.targetAudience && (
                <FadeContent blur={true} duration={800} threshold={0.1}>
                  <div className="p-6 bg-[#111116] border border-white/10 rounded-xl mb-8">
                    <div className="flex items-center gap-2 text-[#ff4612] text-xs font-black uppercase tracking-wider mb-2">
                      <Target className="w-4 h-4" />
                      Who This Program Is Engineered For
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {program.targetAudience}
                    </p>
                  </div>
                </FadeContent>
              )}
            </div>

            {/* Benefits Right */}
            <div className="lg:col-span-5">
              <FadeContent blur={true} duration={850} delay={150} threshold={0.1}>
                <div className="p-6 sm:p-8 bg-[#121218] border border-white/10 rounded-2xl shadow-xl">
                  <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#ff4612]" />
                    Key Program Benefits
                  </h3>
                  <ul className="space-y-4 text-xs sm:text-sm text-gray-300">
                    {program.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#ff4612] shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeContent>
            </div>

          </div>
        </div>
      </section>

      {/* 4-Step Training Process */}
      {program.process && program.process.length > 0 && (
        <section className="py-20 bg-[#0c0c11] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Structured Roadmap"
              title="THE TRAINING PROCESS"
              subtitle="Every program follows a calibrated, progressive path from initial biomechanical screening to athletic mastery."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {program.process.map((step, idx) => (
                <FadeContent key={idx} blur={true} duration={700} delay={idx * 100} threshold={0.1} className="h-full">
                  <div className="p-6 bg-[#14141b] border border-white/10 rounded-xl relative group hover:border-[#ff4612]/40 transition-colors h-full">
                    <span className="font-heading font-black text-3xl text-white/10 group-hover:text-[#ff4612]/30 transition-colors block mb-4">
                      {step.step}
                    </span>
                    <h4 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead Trainer Spotlight */}
      {trainer && (
        <section className="py-20 bg-[#08080a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeContent blur={true} duration={850} threshold={0.15}>
              <div className="p-8 sm:p-12 rounded-2xl bg-[#111116] border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border-2 border-[#ff4612] shadow-xl shrink-0"
                />
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-2.5 py-0.5 rounded border border-[#ff4612]/30 mb-2 inline-block">
                    Program Director
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    {trainer.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-semibold mb-3">
                    {trainer.role} • {trainer.experience}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm italic leading-relaxed mb-6">
                    "{trainer.philosophy}"
                  </p>
                  <Link
                    to={`/trainers/${trainer.slug}`}
                    className="btn-outline text-xs !py-2.5 !px-5 inline-flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>View Full Coaching Profile</span>
                  </Link>
                </div>
              </div>
            </FadeContent>
          </div>
        </section>
      )}

      {/* Related Programs Section */}
      {relatedPrograms.length > 0 && (
        <section className="py-20 bg-[#0c0c11] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] block mb-1">
                  Cross-Training Synergy
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  EXPLORE OTHER DISCIPLINES
                </h2>
              </div>
              <Link to="/programs" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                <span>View All 10</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPrograms.map((p) => (
                <ProgramCard key={p.id} program={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#181113] via-[#111116] to-[#08080a] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
            READY TO JOIN {program.title.toUpperCase()}?
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Choose your membership plan to unlock this program and schedule your first assessment today.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/membership" className="btn-primary text-xs !py-3.5 !px-8">
              Choose a Membership
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

