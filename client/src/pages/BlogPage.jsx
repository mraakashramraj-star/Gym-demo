import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { BlogCard } from '../components/cards/BlogCard.jsx';
import { Search } from 'lucide-react';

export const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Fitness', 'Nutrition', 'Workout', 'Recovery', 'Lifestyle', 'Success Stories'];

  const fetchPosts = () => {
    setLoading(true);
    api.getBlogPosts({
      category: category === 'All' ? undefined : category,
      search: search ? search : undefined
    })
      .then(res => {
        if (res.posts) setPosts(res.posts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  return (
    <div className="pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="relative py-16 bg-[#0a0a0e] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-4 inline-block">
            Evidence-Based Coaching Insights
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight">
            FITNESS & NUTRITION BLOG
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Clinical sports science, progressive overload mechanics, and nutrition blueprints crafted by our coaching directors.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto mt-8 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, workouts, recipes..."
              className="w-full bg-[#14141b] border border-white/10 rounded-xl px-4 py-3 pl-11 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ff4612]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </form>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-6 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all ${
                  category === cat
                    ? 'bg-[#ff4612] text-white shadow-lg shadow-[#ff4612]/30'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-16 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-[#ff4612] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs uppercase font-bold text-gray-400">Loading Articles...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-[#111116] border border-white/10 rounded-2xl max-w-lg mx-auto">
              <h3 className="font-heading font-black text-xl text-white uppercase">No Articles Found</h3>
              <p className="text-gray-400 text-xs mt-1">Try clearing your search query or selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
