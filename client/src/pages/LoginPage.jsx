import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, Dumbbell, AlertCircle, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { gymConfig } from '../config/gymConfig.js';
import FadeContent from '../components/common/FadeContent.jsx';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/member';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        addToast(`Welcome back, ${res.user.name}!`, 'success');
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-4 pt-24 pb-16">
      <FadeContent blur={true} duration={800} threshold={0.1} className="max-w-md w-full">
        <div className="w-full bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#ff4612] flex items-center justify-center text-white shadow-lg shadow-[#ff4612]/30">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="font-heading font-black text-xl text-white tracking-wider uppercase">
              {gymConfig.name}
            </span>
          </Link>
          <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
            Athlete Access
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Sign in to manage classes, tracking progress, and club benefits.
          </p>
        </div>

        {/* Quick Demo Credentials Bar */}
        <div className="p-3 bg-[#181822] border border-[#ff4612]/30 rounded-xl mb-6 text-xs">
          <p className="text-[#ff5e28] font-bold text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Quick Demo Credentials:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('member@gym.com', 'member123')}
              className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white text-[11px] font-semibold border border-white/10 text-left transition-colors"
            >
              👤 Member Login
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@gym.com', 'admin123')}
              className="px-2.5 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/20 text-left transition-colors"
            >
              ⚡ Admin Login
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 mb-5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Email Address
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
              />
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-[#ff4612] focus:ring-0"
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-[#ff4612] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-xs !py-3 flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
          New to the club?{' '}
          <Link to="/register" className="text-white font-bold hover:text-[#ff4612] underline">
            Create an account
          </Link>
        </div>

        </div>
      </FadeContent>
    </div>
  );
};
