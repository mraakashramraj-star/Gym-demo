import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api.js';
import { SectionHeading } from '../components/common/SectionHeading.jsx';
import { ScrollFloat } from '../components/common/ScrollFloat.jsx';
import { Lightbox } from '../components/common/Lightbox.jsx';
import { Maximize2, Compass, Sparkles, Camera, Dumbbell, Award, Flame } from 'lucide-react';
import FadeContent from '../components/common/FadeContent.jsx';
import Magnet from '../components/common/Magnet.jsx';
import { PageHero } from '../components/common/PageHero.jsx';
import heroAthlete from '../assets/hero_athlete.jpg';
import CircularCarousel from '../components/common/CircularCarousel.jsx';

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

  const carouselItems = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((item, idx) => ({
      src: item.image,
      alt: item.title || `Batron Club Highlight ${idx + 1}`,
      title: item.title,
      subtitle: item.category,
      category: item.category,
      description: item.description,
      galleryIndex: idx
    }));
  }, [images]);

  return (
    <div className="pb-20">
      
      {/* Header Banner */}
      <PageHero
        badge="Visual Experience"
        title="FACILITY GALLERY"
        breadcrumb="Gallery"
        subtitle="Step inside our 20,000 sq.ft state-of-the-art training grounds. Precision design meets unyielding athletic grit."
        bgImage={heroAthlete}
        highlights={[
          { label: '20,000 Sq. Ft Arena', icon: Award },
          { label: 'Eleiko Olympic Decks', icon: Dumbbell },
          { label: 'Arsenal Strength Deck', icon: Flame },
          { label: 'Recovery & Cold Plunge', icon: Camera }
        ]}
      >
        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-[#ff4612] text-white shadow-lg shadow-[#ff4612]/30 scale-105'
                  : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </PageHero>

      {/* 3D Panorama Carousel Showcase */}
      <section className="relative py-12 bg-gradient-to-b from-[#0a0a0e] via-[#09090d] to-[#08080a] border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeContent blur={true} duration={750} threshold={0.1}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#ff4612] flex items-center gap-1.5 mb-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  3D Spatial Panorama
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  IMMERSIVE 3D PANORAMA
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Drag with mouse or trackpad to pan the curved cylinder. Click any photo to inspect in full resolution.
                </p>
              </div>
            </div>

            {/* CircularCarousel 3D Stage (Locked to Panorama Animation) */}
            <div className="relative w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden bg-black/50 border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center">
              {carouselItems.length >= 3 ? (
                <CircularCarousel
                  items={carouselItems}
                  preset="panorama"
                  intro="rise"
                  cardWidth={680}
                  aspectRatio={1.55}
                  speed={12}
                  fadeColor="#08080a"
                  cornerRadius={18}
                  captions
                  onItemClick={(item, index) => {
                    const targetIndex = item.galleryIndex ?? index;
                    setActiveLightboxIndex(targetIndex);
                  }}
                />
              ) : (
                <div className="text-gray-400 text-xs">Loading 3D panorama showcase...</div>
              )}
            </div>
          </FadeContent>
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
                <FadeContent key={item.id} blur={true} duration={650} delay={(index % 4) * 80} threshold={0.1}>
                  <div
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
                </FadeContent>
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
