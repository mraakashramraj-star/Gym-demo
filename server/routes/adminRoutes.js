import express from 'express';
import { getAdminStats, getMembers, createMember, updateMember, deleteMember } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/stats', getAdminStats);
router.get('/members', getMembers);
router.post('/members', createMember);
router.put('/members/:id', updateMember);
router.delete('/members/:id', deleteMember);

export default router;
