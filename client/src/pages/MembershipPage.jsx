import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  CreditCard 
} from 'lucide-react';
import { gymConfig } from '../config/gymConfig.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { ScrollFloat } from '../components/common/ScrollFloat.jsx';
import { PricingCard } from '../components/cards/PricingCard.jsx';
import { CheckoutModal } from '../components/common/CheckoutModal.jsx';
import FadeContent from '../components/common/FadeContent.jsx';
import { PageHero } from '../components/common/PageHero.jsx';
import { Lock, Award } from 'lucide-react';
import heroFocus from '../assets/hero-focus.jpg';

export const MembershipPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: "How do I join?",
      a: "Joining takes less than 60 seconds. Select your preferred tier (Basic, Premium, or VIP), choose monthly or annual billing, and click 'Choose Plan'. You can complete payment online and immediately activate your digital keycard and class booking access."
    },
    {
      q: "Can I cancel my membership?",
      a: "Yes. Monthly memberships can be cancelled at any time before your next billing cycle with zero cancellation fees. Annual memberships provide significant savings up front and remain active through the 12-month period."
    },
    {
      q: "Do you offer monthly memberships?",
      a: "Absolutely. All three tiers (Basic, Premium, and VIP) are available on flexible month-to-month terms with no lock-in commitments."
    },
    {
      q: "Can I freeze my membership?",
      a: "Yes. Members traveling or recovering from medical events can freeze their membership for up to 60 days per calendar year directly through the member portal or at front reception."
    },
    {
      q: "Do you offer student discounts?",
      a: "Yes. Valid college and university students with a verified active student ID receive a 10% discount on Basic and Premium monthly memberships. Inquire at reception with your physical student ID."
    },
    {
      q: "Can I switch plans?",
      a: "Yes. You can upgrade from Basic to Premium or VIP at any time, and the prorated difference will be applied automatically."
    },
    {
      q: "Are personal training sessions included?",
      a: "Premium memberships include 1 complimentary monthly 1-on-1 personal training session. VIP memberships include 4 dedicated monthly sessions. Basic members can book individual coaching sessions à la carte."
    },
    {
      q: "Do you offer trial sessions?",
      a: "Yes! Prospective athletes can book a 1-day complimentary pass including facility orientation and one studio class of their choice. Reach out via our Contact page or stop by reception."
    }
  ];

  const comparisonFeatures = [
    { name: "Full Gym Floor & Cardio Equipment", basic: true, premium: true, vip: true },
    { name: "Locker Rooms & Executive Showers", basic: true, premium: true, vip: true },
    { name: "Mobile App for Workout Logging", basic: true, premium: true, vip: true },
    { name: "Hydration Station & Wi-Fi", basic: true, premium: true, vip: true },
    { name: "Unlimited Studio Classes (HIIT, Yoga, Zumba)", basic: false, premium: true, vip: true },
    { name: "Monthly 3D Body Composition Analysis", basic: false, premium: true, vip: true },
    { name: "Infrared Sauna & Steam Recovery Suite", basic: false, premium: true, vip: true },
    { name: "Monthly Personal Training Sessions", basic: "None", premium: "1 Session / mo", vip: "4 Sessions / mo" },
    { name: "Free Guest Passes", basic: "None", premium: "2 / mo", vip: "Unlimited (1/visit)" },
    { name: "Dedicated VIP Locker & Laundry Service", basic: false, premium: false, vip: true },
    { name: "Weekly Customized Dietitian Meal Blueprint", basic: false, premium: false, vip: true },
    { name: "24/7 Concierge Support", basic: false, premium: false, vip: true }
  ];

  return (
    <div className="pb-20">
      
      {/* Header Banner */}
      <PageHero
        badge="Investment In Yourself"
        title="MEMBERSHIP TIERS"
        breadcrumb="Membership"
        subtitle="Engineered with complete transparency. Select the plan that matches your training schedule and performance ambitions."
        bgImage={heroFocus}
        highlights={[
          { label: 'Zero Initiation Fees', icon: ShieldCheck },
          { label: 'Biometric 24/7 Access', icon: Lock },
          { label: 'Cancel Anytime Guarantee', icon: Award },
          { label: 'Save 15% On Annual Plans', icon: Sparkles }
        ]}
      >
        {/* Billing Cycle Switcher */}
        <div className="flex justify-center">
          <div className="flex p-1.5 bg-[#121217]/90 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#ff4612] text-white shadow-lg shadow-[#ff4612]/30 scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-[#ff4612] text-white shadow-lg shadow-[#ff4612]/30 scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual Billing
              <span className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded-full font-black">SAVE 15%</span>
            </button>
          </div>
        </div>
      </PageHero>

      {/* Pricing Cards */}
      <section className="py-16 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {gymConfig.pricing.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
                onSelectPlan={(p, c) => {
                  setSelectedPlan(p);
                  setBillingCycle(c);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix (Desktop Table + Mobile Adaptation) */}
      <section className="py-20 bg-[#0c0c11] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Detailed Matrix"
            title="PLAN COMPARISON"
            subtitle="Explore exact privileges across all membership levels side-by-side."
          />

          {/* Desktop Table */}
          <FadeContent blur={true} duration={850} threshold={0.1}>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-black uppercase tracking-wider text-gray-400">
                    <th className="py-4 px-6 w-2/5">Feature & Privilege</th>
                    <th className="py-4 px-6 text-center w-1/5">BASIC</th>
                    <th className="py-4 px-6 text-center w-1/5 text-[#ff4612] bg-[#ff4612]/5 rounded-t-lg">PREMIUM</th>
                    <th className="py-4 px-6 text-center w-1/5">VIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">{row.name}</td>
                      
                      <td className="py-4 px-6 text-center">
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? <Check className="w-4 h-4 text-[#ff4612] mx-auto" /> : <X className="w-4 h-4 text-gray-600 mx-auto" />
                        ) : (
                          <span className="font-semibold text-gray-400">{row.basic}</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-center bg-[#ff4612]/5 font-bold text-white">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? <Check className="w-4 h-4 text-[#ff4612] mx-auto" /> : <X className="w-4 h-4 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-[#ff5e28] font-bold">{row.premium}</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-center">
                        {typeof row.vip === 'boolean' ? (
                          row.vip ? <Check className="w-4 h-4 text-[#ff4612] mx-auto" /> : <X className="w-4 h-4 text-gray-600 mx-auto" />
                        ) : (
                          <span className="text-amber-400 font-bold">{row.vip}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeContent>

          {/* Mobile Comparison Cards */}
          <div className="md:hidden space-y-4">
            {gymConfig.pricing.map((plan, i) => (
              <FadeContent key={plan.id} blur={true} duration={700} delay={i * 100} threshold={0.1}>
                <div className="p-5 bg-[#121218] border border-white/10 rounded-xl">
                  <h4 className="font-heading font-black text-lg text-white uppercase mb-3 flex items-center justify-between">
                    <span>{plan.name} Privileges</span>
                    <span className="text-[#ff4612] text-sm">₹{plan.monthlyPrice}/mo</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ff4612] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeContent>
            ))}
          </div>

        </div>
      </section>

      {/* Membership FAQ Accordion */}
      <section className="py-20 bg-[#08080a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Questions & Answers"
            title="MEMBERSHIP FAQ"
            subtitle="Everything you need to know about agreements, freezing, cancellations, and amenities."
          />

          <FadeContent blur={true} duration={800} threshold={0.1}>
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-xl bg-[#111116] border border-white/10 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-heading font-bold text-sm sm:text-base text-white">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#ff4612] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-150">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </FadeContent>
        </div>
      </section>

      {/* Checkout Modal */}
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
