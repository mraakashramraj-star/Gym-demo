import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Activity, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  Plus, 
  X, 
  Edit3, 
  Save, 
  TrendingDown, 
  TrendingUp, 
  Flame, 
  AlertCircle, 
  CheckCircle2, 
  Dumbbell 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import { gymConfig } from '../config/gymConfig.js';
import { CheckoutModal } from '../components/common/CheckoutModal.jsx';

export const MemberPortal = () => {
  const { user, refreshUser } = useAuth();
  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'progress' | 'profile' | 'membership'
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState(null);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    fitnessGoal: user?.fitnessGoal || '',
    avatar: user?.avatar || '',
    emergencyName: user?.emergencyContact?.name || '',
    emergencyPhone: user?.emergencyContact?.phone || '',
    emergencyRelation: user?.emergencyContact?.relation || ''
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // Progress Logging Form State
  const [progressForm, setProgressForm] = useState({
    weight: '',
    bodyFat: '',
    chest: '',
    waist: '',
    arms: ''
  });
  const [savingProgress, setSavingProgress] = useState(false);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await api.getMyBookings();
      if (res.bookings) setBookings(res.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this class reservation?')) return;
    try {
      const res = await api.cancelBooking(bookingId);
      if (res.success) {
        addToast('Booking cancelled.', 'info');
        fetchBookings();
      }
    } catch (err) {
      addToast(err.message || 'Failed to cancel reservation.', 'error');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await api.updateProfile({
        name: profileForm.name,
        phone: profileForm.phone,
        avatar: profileForm.avatar,
        fitnessGoal: profileForm.fitnessGoal,
        emergencyContact: {
          name: profileForm.emergencyName,
          phone: profileForm.emergencyPhone,
          relation: profileForm.emergencyRelation
        }
      });
      if (res.success) {
        await refreshUser();
        addToast('Profile updated successfully!', 'success');
      }
    } catch (err) {
      addToast(err.message || 'Failed to update profile.', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAddProgress = async (e) => {
    e.preventDefault();
    if (!progressForm.weight) {
      addToast('Please input weight measurement.', 'error');
      return;
    }
    setSavingProgress(true);
    try {
      const res = await api.addProgress(progressForm);
      if (res.success) {
        await refreshUser();
        addToast('Biometric progress entry logged!', 'success');
        setProgressForm({ weight: '', bodyFat: '', chest: '', waist: '', arms: '' });
      }
    } catch (err) {
      addToast(err.message || 'Failed to log progress.', 'error');
    } finally {
      setSavingProgress(false);
    }
  };

  const membership = user?.membership || {
    planName: 'None',
    status: 'none'
  };

  const upcomingBookings = bookings.filter(b => b.status === 'Upcoming');
  const pastBookings = bookings.filter(b => b.status !== 'Upcoming');
  const progressLogs = user?.progress || [];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Member Header Card */}
        <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            
            <div className="flex items-center gap-5">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                alt={user?.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#ff4612] shadow-xl"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-2.5 py-0.5 rounded border border-[#ff4612]/30">
                    {membership.status === 'active' ? `${membership.planName} MEMBER` : 'REGULAR ATHLETE'}
                  </span>
                  {membership.status === 'active' && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active
                    </span>
                  )}
                </div>
                <h1 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                  Welcome Back, {user?.name}
                </h1>
                <p className="text-gray-400 text-xs mt-0.5">
                  Target: <strong className="text-white">{user?.fitnessGoal || 'Peak Athletic Conditioning'}</strong>
                </p>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex items-center gap-3">
              <Link to="/schedule" className="btn-primary text-xs !py-2.5 !px-5">
                <Calendar className="w-4 h-4" />
                <span>Book A Class</span>
              </Link>
              <Link to="/programs" className="btn-outline text-xs !py-2.5 !px-5">
                Programs
              </Link>
            </div>

          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto no-scrollbar text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#ff4612] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#ff4612] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Bookings & Timetable ({upcomingBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'progress'
                ? 'bg-[#ff4612] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Progress Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('membership')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'membership'
                ? 'bg-[#ff4612] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>My Membership</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#ff4612] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Athlete Profile</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* 3 Metric Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-[#111116] border border-white/10">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Membership Status</span>
                <div className="flex items-baseline justify-between mt-2">
                  <h3 className="font-heading font-black text-2xl text-white uppercase">
                    {membership.status === 'active' ? membership.planName : 'Inactive'}
                  </h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    membership.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                  }`}>
                    {membership.status === 'active' ? 'Active' : 'Get Plan'}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  {membership.expiryDate ? `Renews: ${membership.expiryDate}` : 'No active recurring billing'}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#111116] border border-white/10">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Upcoming Sessions</span>
                <div className="flex items-baseline justify-between mt-2">
                  <h3 className="font-heading font-black text-2xl text-[#ff4612]">
                    {upcomingBookings.length}
                  </h3>
                  <span className="text-xs text-gray-400 font-semibold">Reserved spots</span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Next: {upcomingBookings[0] ? `${upcomingBookings[0].className} (${upcomingBookings[0].time})` : 'None booked'}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#111116] border border-white/10">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Current Weight</span>
                <div className="flex items-baseline justify-between mt-2">
                  <h3 className="font-heading font-black text-2xl text-white">
                    {progressLogs.length > 0 ? `${progressLogs[progressLogs.length - 1].weight} kg` : '78.5 kg'}
                  </h3>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> -3.2 kg
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  {progressLogs.length} total biometric logs recorded
                </p>
              </div>
            </div>

            {/* Upcoming Sessions List Preview */}
            <div className="p-6 rounded-xl bg-[#111116] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                  Upcoming Booked Classes
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-bold text-[#ff4612] hover:underline uppercase"
                >
                  View All History →
                </button>
              </div>

              {upcomingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-xs mb-3">You have no upcoming class reservations.</p>
                  <Link to="/schedule" className="btn-primary text-xs !py-2 !px-4">
                    Explore Timetable & Book Spot
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {upcomingBookings.slice(0, 3).map((b) => (
                    <div key={b.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase text-[#ff5e28] bg-[#ff4612]/15 px-2 py-0.5 rounded">
                            {b.category || 'Class'}
                          </span>
                          <span className="font-bold text-white text-sm">{b.className}</span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          {b.bookingDate} at {b.time} • Instructor: {b.trainerName || 'Staff Coach'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="text-xs text-red-400 hover:text-red-300 font-bold px-3 py-1.5 rounded hover:bg-red-500/10 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/schedule"
                className="p-5 rounded-xl bg-[#14141b] border border-white/10 hover:border-[#ff4612]/50 transition-colors text-center group"
              >
                <Calendar className="w-6 h-6 text-[#ff4612] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs text-white uppercase block">Class Timetable</span>
                <span className="text-[10px] text-gray-400">Claim session spot</span>
              </Link>

              <button
                onClick={() => setActiveTab('progress')}
                className="p-5 rounded-xl bg-[#14141b] border border-white/10 hover:border-[#ff4612]/50 transition-colors text-center group"
              >
                <Activity className="w-6 h-6 text-[#ff4612] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs text-white uppercase block">Log Progress</span>
                <span className="text-[10px] text-gray-400">Weights & measures</span>
              </button>

              <button
                onClick={() => setActiveTab('membership')}
                className="p-5 rounded-xl bg-[#14141b] border border-white/10 hover:border-[#ff4612]/50 transition-colors text-center group"
              >
                <CreditCard className="w-6 h-6 text-[#ff4612] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs text-white uppercase block">Membership</span>
                <span className="text-[10px] text-gray-400">Manage plan</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className="p-5 rounded-xl bg-[#14141b] border border-white/10 hover:border-[#ff4612]/50 transition-colors text-center group"
              >
                <User className="w-6 h-6 text-[#ff4612] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs text-white uppercase block">Edit Profile</span>
                <span className="text-[10px] text-gray-400">Goals & emergency info</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BOOKINGS & HISTORY */}
        {/* ========================================================================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                  My Booked Sessions
                </h2>
                <p className="text-gray-400 text-xs mt-1">Review upcoming classes and view attendance history.</p>
              </div>
              <Link to="/schedule" className="btn-primary text-xs !py-2.5 !px-5">
                <Plus className="w-4 h-4" />
                <span>Book New Class</span>
              </Link>
            </div>

            {/* Upcoming Bookings Table */}
            <div className="p-6 rounded-xl bg-[#111116] border border-white/10">
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-4">
                Upcoming Reservations
              </h3>

              {loadingBookings ? (
                <p className="text-xs text-gray-400 py-4">Loading sessions...</p>
              ) : upcomingBookings.length === 0 ? (
                <p className="text-xs text-gray-400 py-4">No upcoming reservations found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Class</th>
                        <th className="py-3 px-4">Trainer</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Studio</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {upcomingBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-white">
                            {b.className}
                          </td>
                          <td className="py-3.5 px-4">{b.trainerName || 'Staff Coach'}</td>
                          <td className="py-3.5 px-4">
                            <strong className="text-white">{b.bookingDate}</strong> • {b.time}
                          </td>
                          <td className="py-3.5 px-4">{b.room || 'Main Studio'}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="px-3 py-1 rounded text-red-400 hover:bg-red-500/10 font-bold border border-red-500/20 transition-colors"
                            >
                              Cancel Spot
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Past / Cancelled History */}
            {pastBookings.length > 0 && (
              <div className="p-6 rounded-xl bg-[#111116] border border-white/10">
                <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-4">
                  Past Attendance & Cancellations
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Class</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {pastBookings.map((b) => (
                        <tr key={b.id}>
                          <td className="py-3 px-4 font-medium text-white">{b.className}</td>
                          <td className="py-3 px-4">{b.bookingDate} at {b.time}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              b.status === 'Completed' ? 'bg-blue-500/15 text-blue-400' : 'bg-gray-500/15 text-gray-400'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PROGRESS TRACKING */}
        {/* ========================================================================= */}
        {activeTab === 'progress' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                  Biometric Progress Tracking
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  Log your body weight, body fat %, and circumference measurements to visualize adaptations.
                </p>
              </div>
            </div>

            {/* Visual Biometric Progress Chart (Pure CSS / SVG responsive visualization) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111116] border border-white/10 shadow-xl">
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-6 flex items-center justify-between">
                <span>Weight Trajectory (kg)</span>
                <span className="text-xs text-[#ff4612] font-semibold">Continuous Progressive Overload</span>
              </h3>

              {progressLogs.length > 0 ? (
                <div className="space-y-4">
                  {/* SVG Line Graph */}
                  <div className="h-44 w-full relative flex items-end justify-between pt-8 pb-4 border-b border-white/10 gap-2">
                    {progressLogs.map((entry, idx) => {
                      const min = 50;
                      const max = 100;
                      const percentage = Math.max(10, Math.min(95, ((entry.weight - min) / (max - min)) * 100));

                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                          <span className="text-[10px] font-bold text-[#ff5e28] opacity-0 group-hover:opacity-100 transition-opacity">
                            {entry.weight} kg
                          </span>
                          <div
                            style={{ height: `${percentage}%` }}
                            className="w-full max-w-[28px] rounded-t bg-gradient-to-t from-[#ff4612]/30 to-[#ff4612] group-hover:to-white transition-all duration-300"
                          ></div>
                          <span className="text-[10px] text-gray-500 font-semibold truncate w-full text-center">
                            {entry.date ? entry.date.slice(5) : `W${idx+1}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    <div className="p-3 bg-white/5 rounded-lg text-center">
                      <span className="text-[10px] text-gray-400 uppercase">Starting Weight</span>
                      <p className="font-bold text-white text-sm mt-1">{progressLogs[0]?.weight || 82.5} kg</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg text-center">
                      <span className="text-[10px] text-gray-400 uppercase">Current Weight</span>
                      <p className="font-bold text-[#ff4612] text-sm mt-1">{progressLogs[progressLogs.length - 1]?.weight || 78.5} kg</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg text-center">
                      <span className="text-[10px] text-gray-400 uppercase">Estimated Body Fat</span>
                      <p className="font-bold text-emerald-400 text-sm mt-1">{progressLogs[progressLogs.length - 1]?.bodyFat || 16.8}%</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg text-center">
                      <span className="text-[10px] text-gray-400 uppercase">Arms Circumference</span>
                      <p className="font-bold text-white text-sm mt-1">{progressLogs[progressLogs.length - 1]?.arms || 38.5} cm</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 py-6 text-center">No progress logs recorded yet.</p>
              )}
            </div>

            {/* Log New Biometric Entry Form */}
            <div className="p-6 rounded-2xl bg-[#111116] border border-white/10">
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#ff4612]" />
                Log Today's Biometric Check-In
              </h3>

              <form onSubmit={handleAddProgress} className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">Weight (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={progressForm.weight}
                    onChange={(e) => setProgressForm({ ...progressForm, weight: e.target.value })}
                    placeholder="e.g. 78.2"
                    required
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff4612]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">Body Fat %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={progressForm.bodyFat}
                    onChange={(e) => setProgressForm({ ...progressForm, bodyFat: e.target.value })}
                    placeholder="e.g. 16.5"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff4612]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">Chest (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={progressForm.chest}
                    onChange={(e) => setProgressForm({ ...progressForm, chest: e.target.value })}
                    placeholder="e.g. 104"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff4612]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-300 mb-1">Waist (cm)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={progressForm.waist}
                    onChange={(e) => setProgressForm({ ...progressForm, waist: e.target.value })}
                    placeholder="e.g. 82"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff4612]"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <button
                    type="submit"
                    disabled={savingProgress}
                    className="btn-primary w-full text-xs !py-2.5"
                  >
                    {savingProgress ? 'Saving...' : 'Record'}
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MY MEMBERSHIP */}
        {/* ========================================================================= */}
        {activeTab === 'membership' && (
          <div className="space-y-8 max-w-3xl">
            <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
              Membership Details
            </h2>

            <div className="p-6 rounded-2xl bg-[#111116] border border-white/10 space-y-4 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Current Plan:</span>
                <span className="font-bold text-white text-base uppercase">{membership.planName || 'None'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Status:</span>
                <span className={`font-bold uppercase px-2.5 py-0.5 rounded text-[10px] ${
                  membership.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                }`}>
                  {membership.status || 'No plan active'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Billing Cycle:</span>
                <span className="font-medium text-white uppercase">{membership.billingCycle || 'Monthly'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Effective Date:</span>
                <span className="font-medium text-white">{membership.startDate || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Renewal / Expiry Date:</span>
                <span className="font-medium text-white">{membership.expiryDate || 'N/A'}</span>
              </div>
            </div>

            {/* Upgrade Plan Offer */}
            <div className="p-6 rounded-2xl bg-[#14141b] border border-[#ff4612]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-black text-lg text-white uppercase">Upgrade or Renew Plan</h3>
                <p className="text-gray-400 text-xs mt-0.5">Switch tiers or convert to annual billing to save 15%.</p>
              </div>
              <Link to="/membership" className="btn-primary text-xs !py-2.5 !px-6 shrink-0">
                View Pricing Tiers
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: ATHLETE PROFILE */}
        {/* ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl space-y-6">
            <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
              Member Profile Settings
            </h2>

            <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-2xl bg-[#111116] border border-white/10 space-y-5 text-xs">
              <div>
                <label className="block font-bold uppercase text-gray-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  required
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ff4612]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-gray-300 mb-1.5">Email (Read Only)</label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full bg-[#181820]/50 border border-white/5 rounded-lg px-3.5 py-2.5 text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-gray-300 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="+91 98765 12345"
                    className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ff4612]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-gray-300 mb-1.5">Profile Photo URL</label>
                <input
                  type="url"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ff4612]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-gray-300 mb-1.5">Primary Fitness Target</label>
                <input
                  type="text"
                  value={profileForm.fitnessGoal}
                  onChange={(e) => setProfileForm({ ...profileForm, fitnessGoal: e.target.value })}
                  placeholder="e.g. Hypertrophy, Deadlift 200kg, Marathon Prep"
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ff4612]"
                />
              </div>

              {/* Emergency Contact */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="font-heading font-bold text-sm text-white uppercase mb-3">Emergency Contact</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-gray-400 mb-1 text-[10px]">Contact Name</label>
                    <input
                      type="text"
                      value={profileForm.emergencyName}
                      onChange={(e) => setProfileForm({ ...profileForm, emergencyName: e.target.value })}
                      placeholder="Priya Sharma"
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff4612]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-gray-400 mb-1 text-[10px]">Contact Phone</label>
                    <input
                      type="tel"
                      value={profileForm.emergencyPhone}
                      onChange={(e) => setProfileForm({ ...profileForm, emergencyPhone: e.target.value })}
                      placeholder="+91 98765 54321"
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff4612]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-gray-400 mb-1 text-[10px]">Relationship</label>
                    <input
                      type="text"
                      value={profileForm.emergencyRelation}
                      onChange={(e) => setProfileForm({ ...profileForm, emergencyRelation: e.target.value })}
                      placeholder="Spouse / Parent"
                      className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff4612]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="btn-primary text-xs !py-3 !px-8 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{savingProfile ? 'Saving Changes...' : 'Save Profile Details'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
