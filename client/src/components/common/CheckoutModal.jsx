import React, { useState } from 'react';
import { X, ShieldCheck, Check, CreditCard, Lock, Sparkles } from 'lucide-react';
import { gymConfig } from '../../config/gymConfig.js';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Link } from 'react-router-dom';

export const CheckoutModal = ({ plan, billingCycle: initialCycle = 'monthly', onClose, onSuccess }) => {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const { addToast } = useToast();
  const [cycle, setCycle] = useState(initialCycle);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!plan) return null;

  const isAnnual = cycle === 'annual';
  const rawPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const tax = Math.round(rawPrice * 0.18); // 18% GST standard in India
  const totalAmount = rawPrice + tax;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      addToast('Please create an account or sign in to complete your membership.', 'info');
      return;
    }

    setLoading(true);
    try {
      // Step 1: Request order creation from backend
      const orderRes = await api.createOrder({
        tierId: plan.id,
        billingCycle: cycle
      });

      if (!orderRes.success) {
        throw new Error(orderRes.message || 'Failed to create payment order');
      }

      const orderData = orderRes.order;

      // Check if real Razorpay keys are configured and Razorpay script is present
      if (!orderData.isSandbox && window.Razorpay) {
        const options = {
          key: orderData.razorpayKeyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: gymConfig.name,
          description: `${plan.name} Membership (${cycle})`,
          order_id: orderData.orderId,
          handler: async (response) => {
            // Verify payment on backend
            const verifyRes = await api.verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              tierId: plan.id,
              billingCycle: cycle
            });

            if (verifyRes.success) {
              await refreshUser();
              setSuccess(true);
              addToast(verifyRes.message, 'success');
              if (onSuccess) onSuccess(verifyRes.membership);
            }
          },
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: user?.phone || ''
          },
          theme: {
            color: '#ff4612'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Instant verified test activation mode
        // Demonstrates the end-to-end backend activation seamlessly
        setTimeout(async () => {
          try {
            const verifyRes = await api.verifyPayment({
              orderId: orderData.orderId,
              paymentId: `pay_mock_${Date.now()}`,
              tierId: plan.id,
              billingCycle: cycle
            });

            if (verifyRes.success) {
              await refreshUser();
              setSuccess(true);
              addToast(verifyRes.message, 'success');
              if (onSuccess) onSuccess(verifyRes.membership);
            }
          } catch (err) {
            addToast(err.message, 'error');
          } finally {
            setLoading(false);
          }
        }, 800);
      }
    } catch (err) {
      addToast(err.message || 'Checkout failed', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#111116] border border-white/10 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
              Welcome to the Team!
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Your <span className="text-[#ff4612] font-bold">{plan.name}</span> membership is now officially active.
            </p>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl my-6 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Plan:</span>
                <span className="font-bold text-white uppercase">{plan.name} ({cycle})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="font-bold text-emerald-400 uppercase">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Access Level:</span>
                <span className="font-bold text-white">Full Gym Floor + Entitlements</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                to="/member"
                onClick={onClose}
                className="btn-primary text-xs w-full text-center"
              >
                Go to Member Dashboard
              </Link>
              <button
                onClick={onClose}
                className="btn-outline text-xs w-full"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ff4612] uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                Secure Membership Activation
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {plan.name} Membership
              </h3>
            </div>

            {/* Billing Cycle Selector */}
            <div className="flex p-1 bg-[#181820] rounded-lg border border-white/10 mb-6">
              <button
                type="button"
                onClick={() => setCycle('monthly')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                  cycle === 'monthly'
                    ? 'bg-[#ff4612] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly (₹{plan.monthlyPrice})
              </button>
              <button
                type="button"
                onClick={() => setCycle('annual')}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  cycle === 'annual'
                    ? 'bg-[#ff4612] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annual (₹{plan.annualPrice})
                <span className="text-[9px] bg-emerald-500 text-black px-1.5 py-0.2 rounded font-black">SAVE 15%</span>
              </button>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-6 space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Base Membership Fee:</span>
                <span className="font-medium text-white">₹{rawPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>GST (18% included/applicable):</span>
                <span className="font-medium text-white">₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
                <span>Total Amount Due:</span>
                <span className="text-[#ff5e28] text-base">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Included highlights */}
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">What you get:</p>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {plan.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#ff4612] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!isAuthenticated ? (
              <div className="text-center">
                <p className="text-xs text-amber-400 mb-3">
                  Please sign in or register to complete your enrollment.
                </p>
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="btn-primary flex-1 text-xs text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-outline flex-1 text-xs text-center"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary w-full text-xs !py-3 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                {loading ? 'Authorizing & Activating...' : `Activate Membership (₹${totalAmount.toLocaleString('en-IN')})`}
              </button>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit Encrypted & Verified Payment Protocol</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
