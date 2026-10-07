import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Link } from 'react-router-dom';

export const BookingModal = ({ gymClass, onClose, onBookingSuccess }) => {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  
  // Default to today or tomorrow formatted YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!gymClass) return null;

  const isFull = (gymClass.reserved || 0) >= (gymClass.capacity || 15);

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      addToast('Please sign in to book your spot.', 'info');
      return;
    }

    if (isFull) {
      addToast('This class is already full.', 'error');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.bookClass({
        classId: gymClass.id,
        bookingDate
      });

      if (res.success) {
        setSuccessData(res.booking);
        addToast(res.message || 'Booking confirmed!', 'success');
        if (onBookingSuccess) onBookingSuccess(res.booking);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#111116] border border-white/10 rounded-xl max-w-md w-full p-6 relative shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {successData ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
              You're Booked!
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Your spot in <span className="text-[#ff4612] font-bold">{gymClass.name}</span> has been confirmed for {bookingDate} at {gymClass.time}.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <Link
                to="/member"
                onClick={onClose}
                className="btn-primary text-xs w-full text-center"
              >
                View in Member Portal
              </Link>
              <button
                onClick={onClose}
                className="btn-outline text-xs w-full"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-2.5 py-0.5 rounded border border-[#ff4612]/30">
                {gymClass.category}
              </span>
              <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight mt-2">
                {gymClass.name}
              </h3>
            </div>

            {/* Class Details Pill Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg border border-white/5">
                <Clock className="w-4 h-4 text-[#ff4612] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Time & Duration</p>
                  <p className="font-bold text-white">{gymClass.time} ({gymClass.duration})</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg border border-white/5">
                <User className="w-4 h-4 text-[#ff4612] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Instructor</p>
                  <p className="font-bold text-white truncate">{gymClass.instructor}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg border border-white/5">
                <MapPin className="w-4 h-4 text-[#ff4612] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Studio</p>
                  <p className="font-bold text-white truncate">{gymClass.room || 'Main Studio'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg border border-white/5">
                <Calendar className="w-4 h-4 text-[#ff4612] shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Slots Available</p>
                  <p className={`font-bold ${isFull ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isFull ? 'Class Full' : `${Math.max(0, gymClass.capacity - gymClass.reserved)} Spots Left`}
                  </p>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Date Selection */}
            <form onSubmit={handleConfirm} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Select Session Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  className="w-full bg-[#181820] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff4612]"
                />
              </div>

              {!isAuthenticated ? (
                <div className="pt-2">
                  <p className="text-xs text-amber-400 mb-3 text-center">
                    Authentication required to claim your slot.
                  </p>
                  <Link
                    to="/login"
                    className="btn-primary text-xs w-full text-center block"
                  >
                    Sign In to Book
                  </Link>
                </div>
              ) : isFull ? (
                <button
                  type="button"
                  disabled
                  className="w-full py-3 rounded bg-red-500/20 border border-red-500/40 text-red-400 font-bold uppercase tracking-wider text-xs cursor-not-allowed"
                >
                  Class Full — No Slots Available
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-xs !py-3 w-full"
                >
                  {loading ? 'Securing Your Spot...' : 'Confirm Class Booking'}
                </button>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
