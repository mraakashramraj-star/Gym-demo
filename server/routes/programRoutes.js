import express from 'express';
import { getPrograms, getProgramBySlug } from '../controllers/programController.js';

const router = express.Router();

router.get('/', getPrograms);
router.get('/:slug', getProgramBySlug);

export default router;
