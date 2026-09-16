import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Dumbbell, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { gymConfig } from '../config/gymConfig.js';
import { useToast } from '../context/ToastContext.jsx';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      addToast('Password reset link dispatched.', 'info');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-4 pt-24 pb-16">
      <div className="max-w-md w-full bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#ff4612] flex items-center justify-center text-white shadow-lg shadow-[#ff4612]/30">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="font-heading font-black text-xl text-white tracking-wider uppercase">
              {gymConfig.name}
            </span>
          </Link>
          <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
            Reset Password
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Enter your email to receive a password recovery link.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-heading font-black text-lg text-white uppercase mb-2">Check Your Inbox</h4>
            <p className="text-gray-400 text-xs leading-relaxed mb-6">
              If an account matches <strong className="text-white">{email}</strong>, we have dispatched instructions to reset your access credentials.
            </p>
            <Link to="/login" className="btn-primary text-xs w-full text-center block">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Registered Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-xs !py-3 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Sending Request...' : 'Send Recovery Instructions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 text-center">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
