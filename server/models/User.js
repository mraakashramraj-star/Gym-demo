import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['member', 'admin'], default: 'member' },
  avatar: { type: String },
  fitnessGoal: { type: String },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  membership: {
    planId: String,
    planName: String,
    billingCycle: { type: String, enum: ['monthly', 'annual'] },
    status: { type: String, enum: ['active', 'expired', 'cancelled', 'none'], default: 'none' },
    startDate: String,
    expiryDate: String,
    amountPaid: Number
  },
  progress: [{
    date: String,
    weight: Number,
    bodyFat: Number,
    chest: Number,
    waist: Number,
    arms: Number
  }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
