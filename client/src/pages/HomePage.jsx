import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronDown, 
  Dumbbell, 
  Users, 
  Clock, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  CheckCircle2,
  User,
  Lock,
  Heart,
  Play
} from 'lucide-react';
import { InstagramIcon } from '../components/common/SocialIcons.jsx';
import { gymConfig } from '../config/gymConfig.js';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { FeatureCard } from '../components/cards/FeatureCard.jsx';
import { PricingCard } from '../components/cards/PricingCard.jsx';
import { TestimonialCard } from '../components/cards/TestimonialCard.jsx';
import { BookingModal } from '../components/common/BookingModal.jsx';
import { CheckoutModal } from '../components/common/CheckoutModal.jsx';
import ShinyText from '../components/common/ShinyText.jsx';
import ScrollExpand from '../components/common/ScrollExpand.jsx';
import heroBg from '../assets/hero-focus.jpg';
import heroAthlete from '../assets/hero_athlete.jpg';
import aboutAthlete from '../assets/about_athlete.jpg';
import { CinematicHero } from '../components/home/CinematicHero.jsx';
import { useToast } from '../context/ToastContext.jsx';
import FadeContent from '../components/common/FadeContent.jsx';
import Magnet from '../components/common/Magnet.jsx';

export const HomePage = () => {
  const [classes, setClasses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [loadingNewsletter, setLoadingNewsletter] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    // Load class schedule highlight
    api.getClasses({ day: 'Monday' })
      .then(res => {
        if (res.classes) setClasses(res.classes.slice(0, 3));
      })
      .catch(console.error);

    // Load testimonials
    api.getTestimonials()
      .then(res => {
        if (res.testimonials) setTestimonials(res.testimonials);
      })
      .catch(console.error);
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoadingNewsletter(true);
    try {
      await api.subscribeNewsletter({ email: newsletterEmail });
      setNewsletterSuccess(true);
      addToast('Subscribed successfully!', 'success');
      setNewsletterEmail('');
    } catch (err) {
      addToast(err.message || 'Subscription failed', 'error');
    } finally {
      setLoadingNewsletter(false);
    }
  };

  const usps = [
    {
      number: '01',
      title: 'Premium Equipment',
      description: 'Olympic Eleiko calibrated plates, Arsenal Strength selectorized machines, and specialized lifting platforms.',
      iconName: 'Dumbbell'
    },
    {
      number: '02',
      title: 'Expert Trainers',
      description: 'Degree-holding CSCS & master-certified performance coaches who program with physiological precision.',
      iconName: 'Users'
    },
    {
      number: '03',
      title: '24/7 Facility Access',
      description: 'Train on your terms with round-the-clock biometric keycard access and continuous CCTV security monitoring.',
      iconName: 'Clock'
    },
    {
      number: '04',
      title: 'Personalized Training',
      description: 'Tailored progressive overload regimens, metabolic tracking, and periodized weekly volume adjustments.',
      iconName: 'Target'
    },
    {
      number: '05',
      title: 'Clean & Modern Facility',
      description: 'Hospital-grade HEPA air purifiers, constant sanitary upkeep, spacious executive lockers, and infrared saunas.',
      iconName: 'ShieldCheck'
    },
    {
      number: '06',
      title: 'Supportive Community',
      description: 'An inspiring culture of like-minded strivers where personal records are celebrated and egos are checked.',
      iconName: 'Sparkles'
    }
  ];

  const socialImages = [
    {
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
      caption: 'Deadlift PRs on the platform'
    },
    {
      url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
      caption: 'Dawn Vinyasa yoga mobility'
    },
    {
      url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      caption: 'Metabolic HIIT team circuits'
    },
    {
      url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
      caption: 'Arsenal Strength hypertrophy deck'
    },
    {
      url: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=600&q=80',
      caption: 'High-energy Zumba rhythms'
    },
    {
      url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
      caption: 'Cold plunge and contrast recovery'
    }
  ];

  return (
    <div>
      
      {/* 1. ATHLETIC HERO SECTION (Cinematic Interactive Hero with GSAP Parallax & Transitions) */}
      <CinematicHero onWatchLiveDemo={() => setSelectedClass(classes[0] || null)} />

      {/* 2. THREE QUICK-INFO FEATURE CARDS (Directly under hero) */}
      <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: PERSONAL TRAINING */}
          <FadeContent blur={true} duration={800} delay={0} threshold={0.1} className="h-full">
            <div className="bg-[#0f0f15] border border-white/10 rounded-2xl p-7 sm:p-8 hover:border-[#ff3c00]/60 transition-all duration-300 shadow-2xl group relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-14 h-1 bg-gradient-to-r from-[#ff7a00] to-[#ff3c00] group-hover:w-full transition-all duration-500"></div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-[#ff3c00] group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-athletic font-black text-xl text-white uppercase tracking-wider mb-2">
                  PERSONAL TRAINING
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
                  Degree-holding CSCS master performance coaches who program physiological precision, metabolic testing, and periodized progressive overload.
                </p>
              </div>
            </div>
          </FadeContent>

          {/* Card 2: LOCKER AVAILABLE */}
          <FadeContent blur={true} duration={800} delay={150} threshold={0.1} className="h-full">
            <div className="bg-[#0f0f15] border border-white/10 rounded-2xl p-7 sm:p-8 hover:border-[#ff3c00]/60 transition-all duration-300 shadow-2xl group relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-14 h-1 bg-gradient-to-r from-[#ff3c00] to-[#e60039] group-hover:w-full transition-all duration-500"></div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-[#ff3c00] group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-athletic font-black text-xl text-white uppercase tracking-wider mb-2">
                  LOCKER AVAILABLE
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
                  Round-the-clock biometric keycard security, spacious executive private lockers, rain showers, and dry cedarwood infrared recovery saunas.
                </p>
              </div>
            </div>
          </FadeContent>

          {/* Card 3: CARDIO THEATRE */}
          <FadeContent blur={true} duration={800} delay={300} threshold={0.1} className="h-full">
            <div className="bg-[#0f0f15] border border-white/10 rounded-2xl p-7 sm:p-8 hover:border-[#e60039]/60 transition-all duration-300 shadow-2xl group relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-14 h-1 bg-gradient-to-r from-[#e60039] to-[#ff7a00] group-hover:w-full transition-all duration-500"></div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-[#e60039] group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-athletic font-black text-xl text-white uppercase tracking-wider mb-2">
                  CARDIO THEATRE
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
                  Olympic Eleiko competition barbells, Arsenal Strength selectorized machinery, connected curved Matrix treadmills, and sled tracks.
                </p>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* 3. ABOUT SECTION (Segmented Geometric Graphic + Athlete Pushup) */}
      <section className="py-24 bg-[#08080a] relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left: Segmented Geometric Graphic + Dynamic Athlete */}
            <FadeContent blur={true} duration={900} threshold={0.15}>
              <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center">
                {/* Background Ghost Watermark "ABOUT" */}
                <span className="font-athletic font-black text-[130px] sm:text-[180px] text-white/[0.04] absolute -bottom-10 -left-6 select-none pointer-events-none tracking-tighter uppercase leading-none">
                  ABOUT
                </span>

                {/* Segmented Gradient Circle with geometric cuts */}
                <div className="absolute w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full p-2 bg-gradient-to-tr from-[#a80024] via-[#ff3c00] to-[#ff7a00] shadow-[0_0_70px_rgba(255,60,0,0.35)] flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#08080a] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff3c00] to-[#a80024] opacity-90"></div>
                    {/* Geometric slice gaps matching the reference graphic */}
                    <div className="absolute w-[200%] h-5 bg-[#08080a] rotate-45"></div>
                    <div className="absolute w-[200%] h-5 bg-[#08080a] -rotate-45"></div>
                  </div>
                </div>

                {/* Athlete in Foreground */}
                <img
                  src={aboutAthlete}
                  alt="Batron Gym Athletic Training"
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </FadeContent>

            {/* Right: Story & Mission Copy */}
            <FadeContent blur={true} duration={900} delay={150} threshold={0.15}>
              <div className="flex flex-col items-start">
                <span className="font-athletic font-black text-xs sm:text-sm uppercase tracking-[0.25em] text-[#ff3c00] mb-3 inline-block">
                  ABOUT US
                </span>
                <h2 className="font-athletic font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none mb-6">
                  WE ARE {gymConfig.name === '[GYM NAME]' ? 'APEX' : gymConfig.name}. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                    HERE IS WHO WE ARE.
                  </span>
                </h2>
                <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                  <p>
                    Founded on the belief that peak physical health transforms every aspect of life, our club is engineered to eliminate gimmicks and deliver real, measurable human adaptation.
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Whether you are stepping onto an Eleiko platform, dialing in metabolic zones, or reclaiming daily vitality, our coaches, facility, and community are dedicated to your daily triumph.
                  </p>
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff3c00] to-[#e60039] hover:from-[#ff5511] hover:to-[#ff1a4a] text-white font-athletic font-black tracking-wider uppercase text-sm px-8 py-3.5 rounded shadow-lg shadow-[#ff3c00]/30 transition-all hover:translate-y-[-2px]"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeContent>

          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES / USPs */}
      <section className="py-24 bg-[#0d0d12] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why Train Here"
            title="ENGINEERED FOR SUPREMACY"
            subtitle="Six distinct pillars that separate our athletic environment from ordinary gym franchises."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {usps.map((usp) => (
              <FeatureCard
                key={usp.number}
                number={usp.number}
                title={usp.title}
                description={usp.description}
                iconName={usp.iconName}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEMBERSHIP PREVIEW */}
      <section className="py-24 bg-[#08080a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Pricing Architecture"
            title="MEMBERSHIP THAT FITS YOUR GOALS."
            subtitle="Transparent investments in your vitality. No surprise initiation fees, zero hidden contracts."
          />

          {/* Monthly / Annual Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex p-1.5 bg-[#121217] rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#ff4612] text-white shadow-lg shadow-[#ff4612]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly Plans
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-[#ff4612] text-white shadow-lg shadow-[#ff4612]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annual Plans
                <span className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded font-black">SAVE 15%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {gymConfig.pricing.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
                onSelectPlan={(selected, cycle) => {
                  setSelectedPlan(selected);
                  setBillingCycle(cycle);
                }}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/membership"
              className="text-xs uppercase font-black tracking-widest text-[#ff4612] hover:text-[#ff5e28] underline underline-offset-4"
            >
              Compare full plan entitlements & read FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CLASS SCHEDULE HIGHLIGHT */}
      <section className="py-24 bg-[#0e0e13] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3 inline-block">
                Weekly Timetable
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                TODAY'S HIGHLIGHT SESSIONS
              </h2>
            </div>
            <Link
              to="/schedule"
              className="btn-outline text-xs !py-3 !px-6 shrink-0"
            >
              <span>View Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Highlight Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classes.map((cls, idx) => (
              <FadeContent key={cls.id} blur={true} duration={750} delay={idx * 100} threshold={0.1} className="h-full">
                <div
                  className="p-6 rounded-2xl bg-[#14141b] border border-white/10 flex flex-col justify-between hover:border-[#ff4612]/40 transition-colors h-full"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5e28] bg-[#ff4612]/15 px-2.5 py-0.5 rounded border border-[#ff4612]/30">
                        {cls.category}
                      </span>
                      <span className="text-xs font-bold text-gray-300">
                        {cls.time}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-2">
                      {cls.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                      Trainer: <strong className="text-white">{cls.instructor}</strong> • {cls.duration}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className={`text-xs font-bold ${cls.isFull ? 'text-red-400' : 'text-emerald-400'}`}>
                      {cls.isFull ? 'Class Full' : `${cls.availableSlots} Slots Available`}
                    </span>
                    <button
                      onClick={() => setSelectedClass(cls)}
                      disabled={cls.isFull}
                      className={`text-xs font-black uppercase tracking-wider py-1.5 px-3.5 rounded transition-colors ${
                        cls.isFull
                          ? 'bg-red-500/10 text-red-400 cursor-not-allowed'
                          : 'btn-primary !py-1.5 !px-3.5'
                      }`}
                    >
                      {cls.isFull ? 'Full' : 'Book'}
                    </button>
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL / GRID */}
      <section className="py-24 bg-[#08080a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Verified Journeys"
            title="REAL DISCIPLINE. REAL RESULTS."
            subtitle="Authentic transformation experiences from dedicated athletes training inside our club."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <TestimonialCard key={test.id} testimonial={test} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. SOCIAL / INSTAGRAM SECTION (6-card mosaic grid) */}
      <section className="py-24 bg-[#0b0b0f] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3 inline-block">
              Connect With Us
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              TRAIN WITH US. FOLLOW THE JOURNEY.
            </h2>
            <p className="text-gray-400 text-sm mt-3">
              Tag @{gymConfig.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'gymclub'} in your workout stories to be featured on our digital board.
            </p>
          </div>

          {/* 6 Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {socialImages.map((img, i) => (
              <FadeContent key={i} blur={true} duration={600} delay={i * 80} threshold={0.1}>
                <div
                  className="group relative h-48 sm:h-56 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-lg"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                    <InstagramIcon className="w-6 h-6 text-[#ff4612] mb-2" />
                    <span className="text-[11px] text-white font-bold">{img.caption}</span>
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>

          <div className="text-center">
            <FadeContent blur={true} duration={700} delay={200} threshold={0.1}>
              <Magnet padding={50} magnetStrength={3}>
                <a
                  href={gymConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-xs !py-3 !px-6 inline-flex items-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-[#ff4612]" />
                  <span>Follow @{gymConfig.name} on Instagram</span>
                </a>
              </Magnet>
            </FadeContent>
          </div>
        </div>
      </section>

      {/* 8. HIGH-CONVERTING NEWSLETTER */}
      <section className="py-20 bg-gradient-to-b from-[#111116] to-[#08080a] border-t border-white/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeContent blur={true} duration={800} threshold={0.15}>
            <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3 inline-block">
              Direct To Your Inbox
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
              GET STRONGER EVERY WEEK.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Get fitness tips, workout ideas, nutrition advice and gym updates directly in your inbox.
            </p>

            {newsletterSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>You're subscribed! Stay tuned for weekly performance guides.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 w-full bg-[#181820] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
                />
                <Magnet padding={45} magnetStrength={3} wrapperClassName="shrink-0 w-full sm:w-auto" innerClassName="w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={loadingNewsletter}
                    className="btn-primary text-xs !py-3 !px-6 w-full sm:w-auto"
                  >
                    {loadingNewsletter ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </Magnet>
              </form>
            )}
          </FadeContent>
        </div>
      </section>

      {/* Interactive Booking Modal */}
      {selectedClass && (
        <BookingModal
          gymClass={selectedClass}
          onClose={() => setSelectedClass(null)}
          onBookingSuccess={() => setSelectedClass(null)}
        />
      )}

      {/* Interactive Membership Checkout Modal */}
      {selectedPlan && (
        <CheckoutModal
          plan={selectedPlan}
          billingCycle={billingCycle}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => setSelectedPlan(null)}
        />
      )}

    </div>
  );
};
