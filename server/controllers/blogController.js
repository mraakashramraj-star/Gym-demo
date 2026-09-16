import { db } from '../config/db.js';

// Get All Blog Posts with category filter and search
export const getBlogPosts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let posts = db.blogPosts.getAll();

    if (category && category !== 'All') {
      posts = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    res.status(200).json({ success: true, count: posts.length, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve blog posts.' });
  }
};

// Get Single Blog Post by Slug with Related Posts
export const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = db.blogPosts.findOne(p => p.slug === slug || p.id === slug);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    // Get related posts in same category excluding current
    const related = db.blogPosts
      .find(p => p.id !== post.id && p.category === post.category)
      .slice(0, 3);

    res.status(200).json({ success: true, post, related });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve article.' });
  }
};

// Create Blog Post (Admin)
export const createBlogPost = async (req, res) => {
  try {
    const { title, category, author, excerpt, content, image, readTime } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ success: false, message: 'Title, category, and content are required.' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newPost = db.blogPosts.create({
      slug,
      title,
      category,
      author: author || 'Performance Editorial Team',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: readTime || '5 min read',
      image: image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      excerpt: excerpt || title,
      content
    });

    res.status(201).json({ success: true, message: 'Blog post published.', post: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to publish post.' });
  }
};

// Delete Blog Post (Admin)
export const deleteBlogPost = async (req, res) => {
  try {
    const deleted = db.blogPosts.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Post not found.' });

    res.status(200).json({ success: true, message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete post.' });
  }
};
