import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';
import { generateToken } from '../middleware/authMiddleware.js';

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingUser = db.users.findOne(u => u.email === cleanEmail);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = db.users.create({
      name: name.trim(),
      email: cleanEmail,
      phone: phone || '',
      password: hashedPassword,
      role: 'member',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80`,
      fitnessGoal: 'Build Muscle & General Conditioning',
      membership: {
        planId: 'none',
        planName: 'None',
        status: 'none'
      },
      progress: []
    });

    const token = generateToken(newUser.id, newUser.role);
    const { password: _, ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = db.users.findOne(u => u.email === cleanEmail);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your email and password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your email and password.' });
    }

    const token = generateToken(user.id, user.role);
    const { password: _, ...safeUser } = user;

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
};

// Get Current User Profile
export const getMe = async (req, res) => {
  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const { password, ...safeUser } = user;
    res.status(200).json({ success: true, user: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve profile.' });
  }
};

// Update Member Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar, fitnessGoal, emergencyContact } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (avatar) updates.avatar = avatar;
    if (fitnessGoal !== undefined) updates.fitnessGoal = fitnessGoal;
    if (emergencyContact) updates.emergencyContact = emergencyContact;

    const updatedUser = db.users.findByIdAndUpdate(req.user.id, updates);
    const { password, ...safeUser } = updatedUser;

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};

// Log New Biometric Progress
export const addProgress = async (req, res) => {
  try {
    const { weight, bodyFat, chest, waist, arms } = req.body;
    const user = db.users.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(weight) || 0,
      bodyFat: parseFloat(bodyFat) || 0,
      chest: parseFloat(chest) || 0,
      waist: parseFloat(waist) || 0,
      arms: parseFloat(arms) || 0
    };

    const progress = user.progress || [];
    progress.push(newEntry);

    db.users.findByIdAndUpdate(req.user.id, { progress });

    res.status(200).json({
      success: true,
      message: 'Biometric progress recorded successfully.',
      progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to log progress.' });
  }
};
