import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const BlogCard = ({ post }) => {
  return (
    <article className="group bg-[#111116] border border-white/10 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-[#ff4612]/50 hover:shadow-2xl hover:shadow-[#ff4612]/15">
      
      {/* Blog Image */}
      <Link to={`/blog/${post.slug}`} className="relative h-48 sm:h-52 overflow-hidden block">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent"></div>
        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-[#ff5e28] px-2.5 py-1 rounded border border-white/10">
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Date & Read Time */}
          <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#ff4612]" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              {post.readTime || '5 min read'}
            </span>
          </div>

          <Link to={`/blog/${post.slug}`} className="block group-hover:text-[#ff5e28] transition-colors">
            <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight line-clamp-2 mb-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium truncate max-w-[150px]">
            By {post.author}
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-bold uppercase tracking-wider text-[#ff4612] hover:text-[#ff5e28] flex items-center gap-1 group-hover:translate-x-1 transition-all"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </article>
  );
};
