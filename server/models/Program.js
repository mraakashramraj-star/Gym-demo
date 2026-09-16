import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, default: 'Dumbbell' },
  tagline: { type: String },
  image: { type: String },
  description: { type: String, required: true },
  benefits: [String],
  process: [{
    step: String,
    title: String,
    desc: String
  }],
  targetAudience: { type: String },
  leadTrainer: { type: String }
}, { timestamps: true });

export default mongoose.models.Program || mongoose.model('Program', ProgramSchema);
