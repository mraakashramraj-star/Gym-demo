import { db } from '../config/db.js';

// Get All Trainers
export const getTrainers = async (req, res) => {
  try {
    const trainers = db.trainers.getAll();
    res.status(200).json({ success: true, count: trainers.length, trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve trainers.' });
  }
};

// Get Single Trainer by Slug
export const getTrainerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const trainer = db.trainers.findOne(t => t.slug === slug || t.id === slug);

    if (!trainer) {
      return res.status(404).json({ success: false, message: 'Trainer not found.' });
    }

    // Get upcoming classes taught by this trainer
    const trainerClasses = db.classes.find(c => 
      c.instructor.toLowerCase().includes(trainer.name.toLowerCase()) ||
      trainer.name.toLowerCase().includes(c.instructor.toLowerCase())
    );

    res.status(200).json({
      success: true,
      trainer,
      classes: trainerClasses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve trainer details.' });
  }
};

// Create Trainer (Admin)
export const createTrainer = async (req, res) => {
  try {
    const { name, role, experience, photo, specialties, certifications, bio, philosophy, availableDays } = req.body;
    if (!name || !role) {
      return res.status(400).json({ success: false, message: 'Trainer name and role are required.' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newTrainer = db.trainers.create({
      slug,
      name,
      role,
      experience: experience || '3+ Years',
      photo: photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      specialties: specialties || ['Strength Training', 'Conditioning'],
      certifications: certifications || ['Certified Fitness Trainer'],
      bio: bio || '',
      philosophy: philosophy || 'Consistency breeds mastery.',
      availableDays: availableDays || ['Monday', 'Wednesday', 'Friday']
    });

    res.status(201).json({ success: true, message: 'Trainer profile created.', trainer: newTrainer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create trainer profile.' });
  }
};

// Update Trainer (Admin)
export const updateTrainer = async (req, res) => {
  try {
    const updated = db.trainers.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Trainer not found.' });

    res.status(200).json({ success: true, message: 'Trainer updated.', trainer: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update trainer.' });
  }
};

// Delete Trainer (Admin)
export const deleteTrainer = async (req, res) => {
  try {
    const deleted = db.trainers.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Trainer not found.' });

    res.status(200).json({ success: true, message: 'Trainer profile removed.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete trainer.' });
  }
};
