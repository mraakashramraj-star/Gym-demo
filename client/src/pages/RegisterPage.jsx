import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Phone, Dumbbell, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { gymConfig } from '../config/gymConfig.js';
import FadeContent from '../components/common/FadeContent.jsx';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (res.success) {
        addToast(`Welcome to ${gymConfig.name}!`, 'success');
        navigate('/member');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-4 pt-24 pb-16">
      <FadeContent blur={true} duration={800} threshold={0.1} className="max-w-md w-full">
        <div className="w-full bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        
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
            Join The Tribe
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Create your digital account to reserve classes and view membership plans.
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rohan Sharma"
                required
                className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
              />
              <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rohan@example.com"
                required
                className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
              />
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 12345"
                className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2 pl-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
              />
              <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 pl-9 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
                />
                <Lock className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 pl-9 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
                />
                <Lock className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-xs !py-3 flex items-center justify-center gap-2 mt-4"
          >
            <span>{loading ? 'Creating Profile...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-bold hover:text-[#ff4612] underline">
            Sign In
          </Link>
        </div>

        </div>
      </FadeContent>
    </div>
  );
};
