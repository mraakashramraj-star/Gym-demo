import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Target, 
  ShieldCheck, 
  Award, 
  Users, 
  Compass, 
  Flame, 
  ArrowRight 
} from 'lucide-react';
import { gymConfig } from '../config/gymConfig.js';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { ScrollFloat } from '../components/common/ScrollFloat.jsx';
import { TrainerCard } from '../components/cards/TrainerCard.jsx';
import ScrollExpand from '../components/common/ScrollExpand.jsx';
import FadeContent from '../components/common/FadeContent.jsx';
import { PageHero } from '../components/common/PageHero.jsx';
import aboutAthlete from '../assets/about_athlete.jpg';

export const AboutPage = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    api.getTrainers().then(res => {
      if (res.trainers) setTrainers(res.trainers.slice(0, 3));
    }).catch(console.error);
  }, []);

  const facilityAreas = [
    {
      title: 'Heavy Weight & Platform Arena',
      desc: 'Competition Eleiko barbells, calibrated iron plates, and power cages.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Panoramic Cardio Deck',
      desc: 'Connected Matrix curved treadmills, StairMasters, and Wattbikes.',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Functional Turf & Sled Track',
      desc: '30-meter high-density sled track, plyo boxes, rings, and kettlebells.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Mind & Body Studio',
      desc: 'Sound-dampened acoustic room with natural wood flooring and ambient lighting.',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Executive Reception & Juice Bar',
      desc: 'Cold-pressed electrolyte shakes, organic espresso, and member lounge.',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Executive Lockers & Infrared Saunas',
      desc: 'Spacious private lockers, rain showers, and dry cedarwood saunas.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const values = [
    {
      title: 'Discipline',
      desc: 'Motivation gets you through day one. Discipline carries you through year ten. We build the habits that make success inevitable.',
      icon: Target
    },
    {
      title: 'Consistency',
      desc: 'Small, unglamorous daily executions compound into superhuman outcomes over time. We honor the daily grind.',
      icon: Flame
    },
    {
      title: 'Community',
      desc: 'A tribe that bleeds together succeeds together. We leave arrogance at the door and elevate everyone around us.',
      icon: Users
    },
    {
      title: 'Progress',
      desc: 'We rely on measurable biometric data, progressive overload charts, and continuous adaptation rather than guesswork.',
      icon: Compass
    }
  ];

  return (
    <div className="pb-20">
      
      {/* Hero Section */}
      <PageHero
        badge="Our Story & Values"
        title="OUR STORY"
        breadcrumb="About Us"
        subtitle="Engineered to bridge the gap between clinical science, uncompromising athletic standards, and welcoming fitness culture."
        bgImage={aboutAthlete}
        highlights={[
          { label: '18,000 Sq. Ft Sanctuary', icon: Award },
          { label: 'Founded in 2018', icon: Flame },
          { label: 'CSCS Master Coaches', icon: Users },
          { label: 'Olympic Eleiko Certified', icon: Dumbbell }
        ]}
      />

      {/* Gym Story & Vision */}
      <section className="py-20 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <FadeContent blur={true} duration={850} threshold={0.15}>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] mb-2 block">
                  How It Began
                </span>
                <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-6">
                  BUILT BY LIFTERS, DESIGNED FOR ATHLETES.
                </h2>
                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                  <p>
                    {gymConfig.name} was born out of frustration with commercial gyms overflowing with broken cardio machines, unqualified staff, and predatory annual contracts.
                  </p>
                  <p>
                    We set out to build an athletic sanctuary: a facility with competition-spec barbells, custom-built machines tuned to true muscle biomechanics, and coaches holding advanced degrees in exercise physiology and physical therapy.
                  </p>
                  <p className="text-gray-400">
                    Today, our club serves a vibrant community of athletes, powerlifters, runners, and everyday professionals in {gymConfig.location} who share a commitment to mental and physical excellence.
                  </p>
                </div>
              </div>
            </FadeContent>

            <FadeContent blur={true} duration={850} delay={150} threshold={0.15}>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
                  alt="Gym Training Floor"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </FadeContent>

          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-[#0f0f14] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeContent blur={true} duration={850} threshold={0.15}>
            <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3 inline-block">
              Our Purpose
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-6">
              OUR MISSION
            </h2>
            <p className="text-gray-300 text-base sm:text-xl leading-relaxed font-medium mb-6">
              "To empower every member to unlock their highest physical capacity through intelligent programming, world-class equipment, and a supportive culture of discipline and accountability."
            </p>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
              We believe that physical strength builds mental resilience. When you master your body under the barbell, you discover an unshakeable confidence that permeates every decision you make in life and work.
            </p>
          </FadeContent>
        </div>
      </section>

      {/* What We Stand For (Honest Core Values) */}
      <section className="py-20 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Core Philosophy"
            title="WHAT WE STAND FOR"
            subtitle="The fundamental tenets that guide our coaching staff and athletic standards every day."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeContent key={i} blur={true} duration={700} delay={i * 100} threshold={0.1} className="h-full">
                  <div className="p-6 rounded-xl bg-[#111116] border border-white/10 hover:border-[#ff4612]/40 transition-colors h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-[#ff4612]/15 text-[#ff4612] flex items-center justify-center mb-4 border border-[#ff4612]/30">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-2">
                        {v.title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </FadeContent>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="py-20 bg-[#0e0e13] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Architecture"
            title="FACILITY TOUR"
            subtitle="Every square meter has been carefully mapped out for optimal kinetic flow, safety, and training performance."
          />

          {/* Interactive Virtual Arena Scroll Demo */}
          <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#111116]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4612] animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Interactive Arena Showcase (Scroll Inside Box)</span>
              </div>
              <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">ScrollExpand Scroller Mode</span>
            </div>
            <div style={{ height: '520px' }}>
              <ScrollExpand
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80"
                alt="Competition Eleiko Platform"
                title="ELEIKO OLYMPIC PLATFORM"
                scrollHint="Scroll to expand view"
                mediaZoom={1.35}
                overlayScrim={0.5}
              >
                <div className="max-w-xl text-center px-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#ff4612]/20 border border-[#ff4612]/40 text-[#ff6b3d] text-xs font-black uppercase tracking-wider mb-3">
                    Zone 01 — Powerlifting & Weightlifting
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight mb-2">
                    CALIBRATED COMPETITION RIGS
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                    Featuring certified Eleiko IWF discs, Swedish steel barbells, and acoustic shock-absorbing oak wood drop zones.
                  </p>
                  <Link to="/programs" className="btn-primary text-xs !py-2.5 !px-5 inline-flex items-center gap-2">
                    <span>View Strength Programs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </ScrollExpand>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilityAreas.map((area, idx) => (
              <FadeContent key={idx} blur={true} duration={700} delay={idx * 80} threshold={0.1} className="h-full">
                <div className="group bg-[#14141b] border border-white/10 rounded-xl overflow-hidden shadow-lg h-full flex flex-col justify-between">
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={area.image}
                        alt={area.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#14141b] via-transparent to-transparent"></div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-1">
                        {area.title}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Preview */}
      <section className="py-20 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3 inline-block">
                Leadership
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                MEET THE HEAD COACHES
              </h2>
            </div>
            <Link to="/trainers" className="btn-outline text-xs !py-3 !px-6">
              <span>View All 6 Coaches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainers.map(trainer => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
