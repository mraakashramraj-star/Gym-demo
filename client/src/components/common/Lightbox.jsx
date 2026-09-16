import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Lightbox = ({ images, activeIndex, onClose, onIndexChange }) => {
  if (activeIndex === null || !images || images.length === 0) return null;

  const current = images[activeIndex];

  const handlePrev = (e) => {
    e?.stopPropagation();
    onIndexChange((activeIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    onIndexChange((activeIndex + 1) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 z-50 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div
        className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center relative select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.image}
          alt={current.title}
          className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
        />
        <div className="mt-4 text-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4612] bg-[#ff4612]/15 px-2.5 py-0.5 rounded border border-[#ff4612]/30">
            {current.category}
          </span>
          <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mt-1.5">
            {current.title}
          </h3>
          {current.description && (
            <p className="text-xs text-gray-400 mt-1 max-w-lg">
              {current.description}
            </p>
          )}
          <span className="text-[11px] text-gray-500 mt-2 block font-medium">
            {activeIndex + 1} of {images.length}
          </span>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 z-50 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
