import express from 'express';
import { getBlogPosts, getBlogPostBySlug, createBlogPost, deleteBlogPost } from '../controllers/blogController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post('/', protect, adminOnly, createBlogPost);
router.delete('/:id', protect, adminOnly, deleteBlogPost);

export default router;
