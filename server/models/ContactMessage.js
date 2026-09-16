import mongoose from 'mongoose';

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'archived'], default: 'unread' }
}, { timestamps: true });

export default mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
