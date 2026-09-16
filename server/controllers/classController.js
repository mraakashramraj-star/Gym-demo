import { db } from '../config/db.js';

// Get All Classes with optional filters
export const getClasses = async (req, res) => {
  try {
    const { day, category, instructor } = req.query;

    let classes = db.classes.getAll();

    if (day && day !== 'All') {
      classes = classes.filter(c => c.day.toLowerCase() === day.toLowerCase());
    }

    if (category && category !== 'All') {
      classes = classes.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }

    if (instructor) {
      classes = classes.filter(c => c.instructor.toLowerCase().includes(instructor.toLowerCase()));
    }

    // Enhance with live slot calculations
    const enrichedClasses = classes.map(c => ({
      ...c,
      availableSlots: Math.max(0, (c.capacity || 15) - (c.reserved || 0)),
      isFull: (c.reserved || 0) >= (c.capacity || 15)
    }));

    res.status(200).json({
      success: true,
      count: enrichedClasses.length,
      classes: enrichedClasses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve classes.' });
  }
};

// Get Single Class by ID
export const getClassById = async (req, res) => {
  try {
    const cls = db.classes.findById(req.params.id);
    if (!cls) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    const enriched = {
      ...cls,
      availableSlots: Math.max(0, (cls.capacity || 15) - (cls.reserved || 0)),
      isFull: (cls.reserved || 0) >= (cls.capacity || 15)
    };

    res.status(200).json({ success: true, class: enriched });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve class details.' });
  }
};

// Create New Class (Admin)
export const createClass = async (req, res) => {
  try {
    const { name, day, time, category, instructor, duration, capacity, intensity, room } = req.body;

    if (!name || !day || !time || !category || !instructor) {
      return res.status(400).json({ success: false, message: 'Required class details missing.' });
    }

    const newClass = db.classes.create({
      name,
      day,
      time,
      category,
      instructor,
      duration: duration || '50 mins',
      capacity: parseInt(capacity) || 15,
      reserved: 0,
      intensity: intensity || 'Medium',
      room: room || 'Main Studio'
    });

    res.status(201).json({
      success: true,
      message: 'Class scheduled successfully.',
      class: newClass
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create class.' });
  }
};

// Update Class (Admin)
export const updateClass = async (req, res) => {
  try {
    const updated = db.classes.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Class updated successfully.',
      class: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update class.' });
  }
};

// Delete Class (Admin)
export const deleteClass = async (req, res) => {
  try {
    const deleted = db.classes.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Class deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete class.' });
  }
};
