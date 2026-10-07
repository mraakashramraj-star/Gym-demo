import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Copy, 
  Check 
} from 'lucide-react';
import { TwitterIcon } from '../components/common/SocialIcons.jsx';
import { api } from '../services/api.js';
import { BlogCard } from '../components/cards/BlogCard.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { gymConfig } from '../config/gymConfig.js';
import FadeContent from '../components/common/FadeContent.jsx';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.getBlogPostBySlug(slug)
      .then(res => {
        if (res.post) setPost(res.post);
        if (res.related) setRelated(res.related);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    addToast('Article link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Reading "${post?.title}" on ${gymConfig.name} Fitness Blog:`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-[#ff4612] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#08080a] flex flex-col items-center justify-center text-center p-4 pt-20">
        <h2 className="font-heading font-black text-3xl text-white uppercase mb-4">Article Not Found</h2>
        <Link to="/blog" className="btn-primary text-xs">Back to Articles</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#ff4612]" />
          <span>Back to Articles</span>
        </Link>

        <div className="mb-6">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-3 inline-block">
            {post.category}
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10 text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <User className="w-4 h-4 text-[#ff4612]" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-500" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-500" />
                {post.readTime}
              </span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-bold uppercase text-[10px] mr-1">Share:</span>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Link'}</span>
              </button>
              <button
                onClick={handleShareTwitter}
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="Share on X"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-12 aspect-[16/9] bg-zinc-900">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content Body */}
        <div className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-6 font-normal">
          {post.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.trim().startsWith('###')) {
              return (
                <h3 key={idx} className="font-heading font-black text-2xl text-white uppercase tracking-tight mt-8 mb-4 border-l-4 border-[#ff4612] pl-3">
                  {paragraph.replace('###', '').trim()}
                </h3>
              );
            }
            if (paragraph.trim().startsWith('>')) {
              return (
                <blockquote key={idx} className="p-4 bg-[#14141b] border-l-4 border-[#ff4612] rounded-r-lg italic text-white text-base my-6 font-medium">
                  {paragraph.replace('>', '').trim()}
                </blockquote>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {paragraph.trim()}
              </p>
            );
          })}
        </div>

        {/* Author Bio Box */}
        <FadeContent blur={true} duration={800} threshold={0.1}>
          <div className="mt-14 p-6 rounded-xl bg-[#111116] border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#ff4612] flex items-center justify-center text-white font-black text-lg">
              {post.author.charAt(0)}
            </div>
            <div>
              <h4 className="font-heading font-black text-base text-white uppercase">{post.author}</h4>
              <p className="text-xs text-gray-400 mt-0.5">Performance Editorial Staff & Athletic Director at {gymConfig.name}.</p>
            </div>
          </div>
        </FadeContent>

      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="mt-20 pt-16 border-t border-white/10 bg-[#0a0a0e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight mb-8">
              RELATED ARTICLES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(r => (
                <BlogCard key={r.id} post={r} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
