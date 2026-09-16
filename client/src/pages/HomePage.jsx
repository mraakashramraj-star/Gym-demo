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
  CheckCircle2 
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
import { useToast } from '../context/ToastContext.jsx';

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
    <div className="pt-20">
      
      {/* 1. HERO SECTION (Cinematic, energetic, athletic) */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Fitness Imagery with Dark Athletic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
            alt="Gym Facility Training"
            className="w-full h-full object-cover object-center filter brightness-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff4612]/20 border border-[#ff4612]/40 text-[#ff6b3d] text-xs font-black tracking-widest uppercase mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="w-2 h-2 rounded-full bg-[#ff4612] animate-ping"></span>
            {gymConfig.tagline}
          </div>

          {/* Main Heading */}
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-none mb-6">
            BUILD YOUR <br />
            <span className="text-gradient-accent">STRONGEST SELF.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-gray-300 text-base sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-normal mb-10 text-balance">
            {gymConfig.subheading}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/membership"
              className="btn-primary text-sm !py-4 !px-8 w-full sm:w-auto text-center"
            >
              <span>Join Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/programs"
              className="btn-outline text-sm !py-4 !px-8 w-full sm:w-auto text-center"
            >
              Explore Programs
            </Link>
          </div>

          {/* Subtle Scroll Indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Scroll Down</span>
            <ChevronDown className="w-4 h-4 text-[#ff4612]" />
          </div>

        </div>
      </section>

      {/* 2. ABOUT PREVIEW (Split layout) */}
      <section className="py-24 bg-[#08080a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Split Left: Curated High-End Gym Photo */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
                alt="Elite Performance Arena"
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <p className="text-[#ff5e28] text-xs font-black uppercase tracking-wider">The Standard of Excellence</p>
                <p className="text-white text-sm font-semibold mt-1">20,000 sq.ft of pure athletic training architecture.</p>
              </div>
            </div>

            {/* Split Right: Mission & Story Text */}
            <div className="flex flex-col items-start">
              <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3">
                Mission & Heritage
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-6">
                MORE THAN A GYM.
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                Founded on the belief that peak physical health transforms every aspect of life, {gymConfig.name} is engineered to eliminate gimmicks and deliver real, measurable human adaptation.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Whether you are a competitive powerlifter stepping onto an Eleiko platform, an endurance athlete dialing in metabolic VO2 zones, or a working professional reclaiming vitality, our coaches, facility, and community are dedicated to your daily triumph.
              </p>

              <Link
                to="/about"
                className="btn-primary text-xs !py-3.5 !px-6"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

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
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="p-6 rounded-2xl bg-[#14141b] border border-white/10 flex flex-col justify-between hover:border-[#ff4612]/40 transition-colors"
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
              <div
                key={i}
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
            ))}
          </div>

          <div className="text-center">
            <a
              href={gymConfig.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn-outline text-xs !py-3 !px-6 inline-flex items-center gap-2"
            >
              <InstagramIcon className="w-4 h-4 text-[#ff4612]" />
              <span>Follow @{gymConfig.name} on Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. HIGH-CONVERTING NEWSLETTER */}
      <section className="py-20 bg-gradient-to-b from-[#111116] to-[#08080a] border-t border-white/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
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
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-[#181820] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
              />
              <button
                type="submit"
                disabled={loadingNewsletter}
                className="btn-primary text-xs !py-3 !px-6"
              >
                {loadingNewsletter ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
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
