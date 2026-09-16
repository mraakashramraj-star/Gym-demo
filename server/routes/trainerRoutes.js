import express from 'express';
import { getTrainers, getTrainerBySlug, createTrainer, updateTrainer, deleteTrainer } from '../controllers/trainerController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTrainers);
router.get('/:slug', getTrainerBySlug);
router.post('/', protect, adminOnly, createTrainer);
router.put('/:id', protect, adminOnly, updateTrainer);
router.delete('/:id', protect, adminOnly, deleteTrainer);

export default router;
