import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { gymConfig } from '../config/gymConfig.js';
import { api } from '../services/api.js';
import { ScrollFloat } from '../components/common/ScrollFloat.jsx';
import FadeContent from '../components/common/FadeContent.jsx';
import Magnet from '../components/common/Magnet.jsx';
import { PageHero } from '../components/common/PageHero.jsx';
import { MessageSquare, ShieldCheck, Car, Train } from 'lucide-react';
import contactArnold from '../assets/contact_arnold.jpg';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { addToast } = useToast();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form Validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.phone && formData.phone.length < 8) {
      setError('Please enter a valid telephone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setSubmitted(true);
        addToast(res.message || 'Message sent successfully!', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Membership Inquiry',
          message: ''
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
      addToast('Submission failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      
      {/* Header Banner */}
      <PageHero
        badge="Direct Communication"
        title="CONTACT & LOCATION"
        breadcrumb="Contact Us"
        subtitle="Have questions regarding facility tours, corporate memberships, or 1-on-1 coaching? Connect with our team."
        bgImage={contactArnold}
        highlights={[
          { label: 'Fast Response Under 2 Hours', icon: MessageSquare },
          { label: 'Complimentary Day Pass', icon: ShieldCheck },
          { label: 'Free On-Site Valet Parking', icon: Car },
          { label: 'Direct Metro Station Access', icon: Train }
        ]}
      />

      {/* Main Split Content */}
      <section className="py-20 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Contact Information & Hours */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <FadeContent blur={true} duration={800} threshold={0.1}>
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] mb-2 block">
                    Reach Out
                  </span>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
                    LET'S GET YOU STARTED.
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Stop by our front desk for a complimentary tour of the strength deck and recovery suites, or drop us a line below.
                  </p>
                </div>
              </FadeContent>

              {/* Info Cards */}
              <div className="space-y-4 text-sm">
                <FadeContent blur={true} duration={700} delay={0} threshold={0.1}>
                  <div className="p-4 bg-[#111116] border border-white/10 rounded-xl flex items-start gap-4 hover:border-[#ff4612]/40 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#ff4612]/15 text-[#ff4612] flex items-center justify-center shrink-0 border border-[#ff4612]/30">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs">Facility Address</h4>
                      <p className="text-gray-400 text-xs mt-1 leading-relaxed">{gymConfig.displayDetails.addressFormatted}</p>
                    </div>
                  </div>
                </FadeContent>

                <FadeContent blur={true} duration={700} delay={100} threshold={0.1}>
                  <div className="p-4 bg-[#111116] border border-white/10 rounded-xl flex items-start gap-4 hover:border-[#ff4612]/40 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#ff4612]/15 text-[#ff4612] flex items-center justify-center shrink-0 border border-[#ff4612]/30">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs">Phone Numbers</h4>
                      <p className="text-gray-400 text-xs mt-1">{gymConfig.displayDetails.phoneFormatted}</p>
                      <p className="text-gray-500 text-[11px]">Direct Front Desk & Concierge</p>
                    </div>
                  </div>
                </FadeContent>

                <FadeContent blur={true} duration={700} delay={200} threshold={0.1}>
                  <div className="p-4 bg-[#111116] border border-white/10 rounded-xl flex items-start gap-4 hover:border-[#ff4612]/40 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#ff4612]/15 text-[#ff4612] flex items-center justify-center shrink-0 border border-[#ff4612]/30">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs">Direct Email</h4>
                      <p className="text-gray-400 text-xs mt-1">{gymConfig.displayDetails.emailFormatted}</p>
                    </div>
                  </div>
                </FadeContent>

                <FadeContent blur={true} duration={700} delay={300} threshold={0.1}>
                  <div className="p-4 bg-[#111116] border border-white/10 rounded-xl flex items-start gap-4 hover:border-[#ff4612]/40 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-[#ff4612]/15 text-[#ff4612] flex items-center justify-center shrink-0 border border-[#ff4612]/30">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs">Operating Hours</h4>
                      <p className="text-gray-400 text-xs mt-1">Monday – Friday: {gymConfig.displayDetails.hoursWeekday}</p>
                      <p className="text-gray-400 text-xs">Saturday: {gymConfig.displayDetails.hoursSaturday}</p>
                      <p className="text-gray-400 text-xs">Sunday: {gymConfig.displayDetails.hoursSunday}</p>
                    </div>
                  </div>
                </FadeContent>
              </div>
            </div>

            {/* Right Side: Validated Contact Form */}
            <div className="lg:col-span-7">
              <FadeContent blur={true} duration={850} delay={150} threshold={0.1}>
                <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
                <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight mb-2">
                  Send A Message
                </h3>
                <p className="text-gray-400 text-xs mb-6">
                  Our athletic advisory team reviews every message and responds within 24 business hours.
                </p>

                {error && (
                  <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {submitted ? (
                  <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-heading font-black text-xl text-white uppercase mb-2">
                      Inquiry Dispatched
                    </h4>
                    <p className="text-gray-300 text-xs max-w-sm mx-auto leading-relaxed mb-6">
                      Thank you for contacting {gymConfig.name}. An athletic advisor will reach out to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline text-xs !py-2.5 !px-6"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Marcus Aurelius"
                          required
                          className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          required
                          className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                          Inquiry Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff4612]"
                        >
                          <option value="Membership Inquiry">Membership Inquiry</option>
                          <option value="Personal Coaching Consultation">Personal Coaching Consultation</option>
                          <option value="Facility Tour Booking">Facility Tour Booking</option>
                          <option value="Corporate Wellness">Corporate Wellness</option>
                          <option value="General Question">General Question</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your fitness targets, schedule, or questions..."
                        required
                        className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
                      ></textarea>
                    </div>

                    <Magnet padding={50} magnetStrength={3} wrapperClassName="w-full" innerClassName="w-full" style={{ width: '100%' }}>
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full text-xs !py-3 flex items-center justify-center gap-2 mt-2"
                      >
                        <Send className="w-4 h-4" />
                        {loading ? 'Transmitting Message...' : 'Send Message'}
                      </button>
                    </Magnet>
                  </form>
                )}

                </div>
              </FadeContent>
            </div>

          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="py-12 bg-[#0c0c11] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeContent blur={true} duration={800} threshold={0.1}>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-80 sm:h-96 relative">
              <iframe
                title="Gym Club Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=12.9716,77.5946+(APEX%20Athletic%20Club)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                className="filter invert contrast-125 brightness-75 w-full h-full"
              ></iframe>
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg pointer-events-none">
                <p className="text-white text-xs font-bold">{gymConfig.name}</p>
                <p className="text-gray-400 text-[10px]">{gymConfig.displayDetails.addressFormatted}</p>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

    </div>
  );
};
