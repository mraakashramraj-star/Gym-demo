import express from 'express';
import { submitContact, subscribeNewsletter, getGallery, getTestimonials } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContact);
router.post('/newsletter', subscribeNewsletter);
router.get('/gallery', getGallery);
router.get('/testimonials', getTestimonials);

export default router;
