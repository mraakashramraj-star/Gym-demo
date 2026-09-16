import { db } from '../config/db.js';

// Get All 10 Programs
export const getPrograms = async (req, res) => {
  try {
    const programs = db.programs.getAll();
    res.status(200).json({ success: true, count: programs.length, programs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve programs.' });
  }
};

// Get Program by Slug
export const getProgramBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const program = db.programs.findOne(p => p.slug === slug || p.id === slug);

    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found.' });
    }

    // Find lead trainer info if present
    let trainerInfo = null;
    if (program.leadTrainer) {
      trainerInfo = db.trainers.findOne(t => t.name.toLowerCase() === program.leadTrainer.toLowerCase());
    }

    res.status(200).json({
      success: true,
      program,
      trainer: trainerInfo
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve program details.' });
  }
};
