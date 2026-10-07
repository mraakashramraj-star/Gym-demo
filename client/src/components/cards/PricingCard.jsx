import React from 'react';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { gymConfig } from '../../config/gymConfig.js';
import FadeContent from '../common/FadeContent.jsx';
import Magnet from '../common/Magnet.jsx';

export const PricingCard = ({ plan, billingCycle = 'monthly', onSelectPlan }) => {
  const isAnnual = billingCycle === 'annual';
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const isPopular = plan.popular;

  return (
    <FadeContent blur={true} duration={850} threshold={0.1} initialOpacity={0} className="h-full">
      <div
        className={`relative rounded-2xl p-7 flex flex-col justify-between h-full transition-all duration-300 ${
          isPopular
            ? 'bg-[#181822] border-2 border-[#ff4612] shadow-2xl shadow-[#ff4612]/20 lg:-translate-y-2'
            : 'bg-[#111116] border border-white/10 hover:border-white/20'
        }`}
      >
      {/* Featured Badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff5e28] to-[#ff4612] text-white text-[11px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {plan.badge || 'Most Popular'}
        </div>
      )}

      <div>
        {/* Plan Header */}
        <div className="mb-6">
          <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
            {plan.name}
          </h3>
          <p className="text-gray-400 text-xs mt-1.5 min-h-[36px] leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* Price Display */}
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="flex items-baseline gap-1">
            <span className="text-gray-400 text-xl font-bold">{gymConfig.currency}</span>
            <span className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
              {price.toLocaleString('en-IN')}
            </span>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              / {isAnnual ? 'year' : 'month'}
            </span>
          </div>
          {isAnnual && (
            <p className="text-[11px] text-emerald-400 mt-1 font-semibold">
              Billed annually • Includes 15% VIP discount
            </p>
          )}
        </div>

        {/* Feature List */}
        <div className="space-y-3 mb-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Included Features:</p>
          <ul className="space-y-2.5 text-xs text-gray-300">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff4612] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
            {plan.notIncluded && plan.notIncluded.map((feature, i) => (
              <li key={`not-${i}`} className="flex items-start gap-2.5 text-gray-400">
                <X className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <Magnet padding={40} magnetStrength={3.5} wrapperClassName="w-full" innerClassName="w-full" style={{ width: '100%' }}>
          <button
            type="button"
            onClick={() => onSelectPlan(plan, billingCycle)}
            className={`w-full py-3 px-6 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
              isPopular
                ? 'btn-primary'
                : 'btn-outline w-full'
            }`}
          >
            <span>Choose Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Magnet>
      </div>

      </div>
    </FadeContent>
  );
};
