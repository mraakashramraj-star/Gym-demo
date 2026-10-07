import React, { useState, useEffect } from 'react';
import MetallicPaint from './MetallicPaint.jsx';
import logoPaintImg from '../../assets/batron-logo-paint.png';

export const BatronIntro = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Auto-advance after metallic shine animation finishes
    const timer = setTimeout(() => {
      dismiss();
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setMounted(false);
      if (onComplete) onComplete();
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div
      onClick={dismiss}
      role="button"
      tabIndex={0}
      aria-label="Skip Intro"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') dismiss();
      }}
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black cursor-pointer select-none transition-opacity duration-700 ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#000000' }}
    >
      {/* Full Black Backdrop with Centered Liquid Metallic Logo Alone (No text) */}
      <div className="relative w-[280px] h-[220px] sm:w-[380px] sm:h-[300px] md:w-[480px] md:h-[380px] lg:w-[560px] lg:h-[440px] flex items-center justify-center">
        {/* Subtle ambient fiery backdrop aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,80,0,0.2)_0%,_rgba(230,0,57,0.1)_45%,_transparent_70%)] blur-3xl pointer-events-none -z-10" />

        <MetallicPaint
          imageSrc={logoPaintImg}
          seed={42}
          scale={4}
          patternSharpness={1.2}
          noiseScale={0.5}
          speed={0.35}
          liquid={0.8}
          mouseAnimation={false}
          brightness={2.4}
          contrast={0.65}
          refraction={0.015}
          blur={0.012}
          chromaticSpread={2.2}
          fresnel={1.2}
          angle={20}
          waveAmplitude={1.1}
          distortion={0.9}
          contour={0.2}
          lightColor="#ffffff"
          darkColor="#0a0104"
          tintColor="#ff3c00"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default BatronIntro;

