import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  day: { 
    type: String, 
    required: true, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
  },
  time: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['HIIT', 'Yoga', 'Zumba', 'Strength', 'Cardio', 'Functional Training', 'Mobility'] 
  },
  instructor: { type: String, required: true },
  duration: { type: String, default: '50 mins' },
  capacity: { type: Number, required: true, default: 15 },
  reserved: { type: Number, default: 0 },
  intensity: { type: String, default: 'Medium' },
  room: { type: String, default: 'Main Studio' }
}, { timestamps: true });

export default mongoose.models.Class || mongoose.model('Class', ClassSchema);
