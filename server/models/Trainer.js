import mongoose from 'mongoose';

const TrainerSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  experience: { type: String, default: '5+ Years' },
  photo: { type: String },
  cover: { type: String },
  specialties: [String],
  certifications: [String],
  bio: { type: String },
  philosophy: { type: String },
  availableDays: [String]
}, { timestamps: true });

export default mongoose.models.Trainer || mongoose.model('Trainer', TrainerSchema);
