import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  classId: { type: String, required: true },
  className: { type: String, required: true },
  trainerName: { type: String },
  bookingDate: { type: String, required: true },
  time: { type: String, required: true },
  category: { type: String },
  status: { 
    type: String, 
    enum: ['Upcoming', 'Completed', 'Cancelled'], 
    default: 'Upcoming' 
  }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
