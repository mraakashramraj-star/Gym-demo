import { db } from '../config/db.js';

// Book a Class
export const bookClass = async (req, res) => {
  try {
    const { classId, bookingDate } = req.body;
    const userId = req.user.id;

    if (!classId || !bookingDate) {
      return res.status(400).json({ success: false, message: 'Class ID and booking date are required.' });
    }

    const gymClass = db.classes.findById(classId);
    if (!gymClass) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    const currentReserved = gymClass.reserved || 0;
    const maxCapacity = gymClass.capacity || 15;

    // Check capacity: prevent booking when full
    if (currentReserved >= maxCapacity) {
      return res.status(400).json({
        success: false,
        message: 'Class Full. There are no available slots left in this session.'
      });
    }

    // Check duplicate booking by the same user on the same date for this class
    const existing = db.bookings.findOne(b => 
      b.userId === userId && 
      b.classId === classId && 
      b.bookingDate === bookingDate && 
      b.status === 'Upcoming'
    );

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked a spot in this class on this date.'
      });
    }

    // Increment class reserved count
    db.classes.findByIdAndUpdate(classId, { reserved: currentReserved + 1 });

    // Create booking record
    const newBooking = db.bookings.create({
      userId,
      classId,
      className: gymClass.name,
      trainerName: gymClass.instructor,
      bookingDate,
      time: gymClass.time,
      category: gymClass.category,
      room: gymClass.room,
      status: 'Upcoming'
    });

    res.status(201).json({
      success: true,
      message: `Successfully booked spot in ${gymClass.name}!`,
      booking: newBooking
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to complete booking.' });
  }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = db.bookings.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    // Check authorization: must be the booking owner or an admin
    if (booking.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking.' });
    }

    if (booking.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'This booking has already been cancelled.' });
    }

    // Decrement class reserved count
    const gymClass = db.classes.findById(booking.classId);
    if (gymClass && gymClass.reserved > 0) {
      db.classes.findByIdAndUpdate(booking.classId, { reserved: Math.max(0, gymClass.reserved - 1) });
    }

    // Update booking status
    const updated = db.bookings.findByIdAndUpdate(id, { status: 'Cancelled' });

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully.',
      booking: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to cancel booking.' });
  }
};

// Get Current Member's Bookings
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = db.bookings.find(b => b.userId === userId);

    // Sort upcoming first, then completed/cancelled
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve booking history.' });
  }
};

// Get All Bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = db.bookings.getAll();
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Enrich with user name & email
    const enriched = bookings.map(b => {
      const user = db.users.findById(b.userId);
      return {
        ...b,
        userName: user ? user.name : 'Unknown Member',
        userEmail: user ? user.email : 'N/A'
      };
    });

    res.status(200).json({
      success: true,
      count: enriched.length,
      bookings: enriched
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve all bookings.' });
  }
};
