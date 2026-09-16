import express from 'express';
import { bookClass, cancelBooking, getMyBookings, getAllBookings } from '../controllers/bookingController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, bookClass);
router.get('/my-bookings', protect, getMyBookings);
router.put('/:id/cancel', protect, cancelBooking);
router.get('/all', protect, adminOnly, getAllBookings);

export default router;
