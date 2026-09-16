import express from 'express';
import { getTiers, createOrder, verifyPayment } from '../controllers/membershipController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/tiers', getTiers);
router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);

export default router;
