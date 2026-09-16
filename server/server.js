import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { gymConfig } from './config/gymConfig.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import classRoutes from './routes/classRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';
import programRoutes from './routes/programRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Public Gym Identity & Configuration Endpoint
app.get('/api/config', (req, res) => {
  res.status(200).json({
    success: true,
    config: {
      name: gymConfig.name,
      brandFallback: gymConfig.brandFallback,
      tagline: gymConfig.tagline,
      subheading: gymConfig.subheading,
      location: gymConfig.location,
      address: gymConfig.address,
      phone: gymConfig.phone,
      email: gymConfig.email,
      displayDetails: gymConfig.displayDetails,
      hours: gymConfig.hours,
      currency: gymConfig.currency,
      currencyCode: gymConfig.currencyCode,
      hasLiveRazorpay: Boolean(gymConfig.razorpayKeyId && gymConfig.razorpayKeySecret),
      socials: gymConfig.socials
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error occurred.'
  });
});

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 [Server Running]: Fitness Backend API listening at http://localhost:${PORT}`);
  });
}

startServer();
