import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Fitness', 'Nutrition', 'Workout', 'Recovery', 'Lifestyle', 'Success Stories'] 
  },
  author: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: String, default: '5 min read' },
  image: { type: String },
  excerpt: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
