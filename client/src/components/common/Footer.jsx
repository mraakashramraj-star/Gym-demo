import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from './SocialIcons.jsx';
import { gymConfig } from '../../config/gymConfig.js';
import { api } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import Magnet from './Magnet.jsx';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);
    try {
      await api.subscribeNewsletter({ email });
      setSubscribed(true);
      addToast('Subscribed successfully to gym updates!', 'success');
      setEmail('');
    } catch (err) {
      addToast(err.message || 'Subscription failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Membership', path: '/membership' },
    { name: 'Class Schedule', path: '/schedule' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Facility Gallery', path: '/gallery' },
    { name: 'Fitness Blog', path: '/blog' },
    { name: 'Contact & Location', path: '/contact' },
  ];

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#ff4612] flex items-center justify-center text-white shadow-lg shadow-[#ff4612]/30">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="font-heading font-black text-xl text-white tracking-wider uppercase">
                {gymConfig.name}
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {gymConfig.subheading}
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
              {gymConfig.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <Magnet padding={35} magnetStrength={2.5}>
                <a
                  href={gymConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff4612] hover:text-white flex items-center justify-center text-gray-400 transition-all duration-200"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </Magnet>
              <Magnet padding={35} magnetStrength={2.5}>
                <a
                  href={gymConfig.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff4612] hover:text-white flex items-center justify-center text-gray-400 transition-all duration-200"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </Magnet>
              <Magnet padding={35} magnetStrength={2.5}>
                <a
                  href={gymConfig.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff4612] hover:text-white flex items-center justify-center text-gray-400 transition-all duration-200"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </Magnet>
              <Magnet padding={35} magnetStrength={2.5}>
                <a
                  href={gymConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#ff4612] hover:text-white flex items-center justify-center text-gray-400 transition-all duration-200"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </Magnet>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-[#ff4612] pl-2">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-[#ff4612] hover:underline transition-colors block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-1 border-l-2 border-[#ff4612] pl-2">
              Contact & Hours
            </h4>
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-[#ff4612] shrink-0 mt-0.5" />
              <span>{gymConfig.displayDetails.addressFormatted}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-[#ff4612] shrink-0" />
              <span>{gymConfig.displayDetails.phoneFormatted}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-[#ff4612] shrink-0" />
              <span>{gymConfig.displayDetails.emailFormatted}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs pt-1">
              <Clock className="w-4 h-4 text-[#ff4612] shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-300 font-semibold">Operating Hours:</p>
                <p>Mon - Fri: {gymConfig.displayDetails.hoursWeekday}</p>
                <p>Saturday: {gymConfig.displayDetails.hoursSaturday}</p>
                <p>Sunday: {gymConfig.displayDetails.hoursSunday}</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-2 border-l-2 border-[#ff4612] pl-2">
              Join Newsletter
            </h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Get training protocols, nutrition breakdowns, and priority event invites delivered straight to your inbox.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are subscribed! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#111116] border border-white/10 rounded px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
                  />
                </div>
                <Magnet padding={40} magnetStrength={3} wrapperClassName="w-full" innerClassName="w-full" style={{ width: '100%' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary text-xs !py-2.5 w-full flex items-center justify-center gap-2"
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Magnet>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {gymConfig.name}. All rights reserved. Built for champions.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Safety Standards</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
