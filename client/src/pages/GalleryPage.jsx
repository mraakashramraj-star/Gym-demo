import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { Lightbox } from '../components/common/Lightbox.jsx';
import { Maximize2 } from 'lucide-react';

export const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Facility', 'Equipment', 'Training', 'Classes', 'Events', 'Community'];

  useEffect(() => {
    setLoading(true);
    api.getGallery(selectedCategory === 'All' ? undefined : selectedCategory)
      .then(res => {
        if (res.gallery) setImages(res.gallery);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="relative py-16 bg-[#0a0a0e] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-3 py-1 rounded border border-[#ff4612]/30 mb-4 inline-block">
            Visual Experience
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight">
            FACILITY GALLERY
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Step inside our 20,000 sq.ft state-of-the-art training grounds. Precision design meets unyielding athletic grit.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-8 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat
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

      {/* Masonry-Style Gallery Grid */}
      <section className="py-16 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-[#ff4612] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs uppercase font-bold text-gray-400">Loading Gallery...</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxIndex(index)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-zinc-900 break-inside-avoid shadow-xl transition-all duration-300 hover:border-[#ff4612]/60 hover:shadow-2xl hover:shadow-[#ff4612]/20"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#ff5e28] bg-black/60 px-2 py-0.5 rounded border border-white/10 w-max mb-2">
                      {item.category}
                    </span>
                    <h4 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[#ff4612] font-bold">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Fullscreen</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        images={images}
        activeIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onIndexChange={(idx) => setActiveLightboxIndex(idx)}
      />

    </div>
  );
};
