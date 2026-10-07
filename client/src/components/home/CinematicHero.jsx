import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import arnoldThemed from '../../assets/arnold-themed.png';
import Magnet from '../common/Magnet.jsx';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero = ({ onWatchLiveDemo }) => {
  const heroRef = useRef(null);
  const athleteContainerRef = useRef(null);
  const athleteFloatRef = useRef(null);
  const athleteScaleRef = useRef(null);
  const workTextRef = useRef(null);
  const harderTextRef = useRef(null);
  const glowBackRef = useRef(null);
  const floorGlowRef = useRef(null);
  const sweepRef = useRef(null);
  const rimPulseRef = useRef(null);
  const canvasRef = useRef(null);

  // Animation starts ONLY after the logo intro has finished
  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof document === 'undefined') return true;
    return !document.querySelector('[aria-label="Skip Intro"]');
  });

  useEffect(() => {
    if (introFinished) return;

    const checkIntro = () => {
      const el = document.querySelector('[aria-label="Skip Intro"]');
      if (!el) {
        setIntroFinished(true);
        return true;
      }
      return false;
    };

    if (checkIntro()) return;

    const observer = new MutationObserver(() => {
      if (checkIntro()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Fallback safety timeout (4.5s max)
    const timeout = setTimeout(() => {
      observer.disconnect();
      setIntroFinished(true);
    }, 4500);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [introFinished]);

  // Subtle floating ember / dust particles canvas
  useEffect(() => {
    if (!introFinished) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Small number of subtle particles (18 particles)
    const particleCount = 18;
    const particles = [];
    const colors = [
      'rgba(255, 122, 0, ',
      'rgba(255, 60, 0, ',
      'rgba(230, 0, 57, ',
      'rgba(255, 180, 50, '
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * Math.min(width * 0.5, 460),
        y: height * 0.25 + Math.random() * (height * 0.65),
        radius: Math.random() * 1.5 + 0.8,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.35 + 0.15,
        alphaOffset: Math.random() * Math.PI * 2,
        vy: -(Math.random() * 0.22 + 0.12),
        vx: (Math.random() - 0.5) * 0.15,
        swaySpeed: Math.random() * 0.02 + 0.01
      });
    }

    let time = 0;
    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += Math.sin(time * p.swaySpeed + p.alphaOffset) * 0.2 + p.vx;

        // Reset if drifted above top
        if (p.y < height * 0.15) {
          p.y = height * 0.85 + Math.random() * (height * 0.1);
          p.x = width * 0.5 + (Math.random() - 0.5) * Math.min(width * 0.45, 420);
        }

        const currentAlpha = p.baseAlpha + Math.sin(time + p.alphaOffset) * 0.12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${Math.max(0.05, Math.min(0.65, currentAlpha))})`;
        ctx.shadowColor = 'rgba(255, 80, 0, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [introFinished]);

  // Main GSAP Animations & Interactive Parallax
  useEffect(() => {
    if (!introFinished) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // 1. Slow floating movement of 6-10px
        gsap.to(athleteFloatRef.current, {
          y: -8,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        // 2. Subtle breathing scale from 1.0 to 1.025 and back
        gsap.to(athleteScaleRef.current, {
          scale: 1.022,
          duration: 5.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        // 3. Soft warm rim-light pulse around the athlete every few seconds
        gsap.to(rimPulseRef.current, {
          opacity: 0.9,
          scale: 1.07,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        // 4. Subtle horizontal orange light sweep behind athlete every 5-6s
        const sweepTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 4.5
        });

        sweepTl.fromTo(
          sweepRef.current,
          { xPercent: -130, opacity: 0 },
          {
            xPercent: 130,
            duration: 1.45,
            ease: 'power2.inOut',
            onStart: () => {
              gsap.to(sweepRef.current, { opacity: 0.75, duration: 0.6, yoyo: true, repeat: 1 });
            }
          }
        );
      }

      // 5. Cinematic Scroll Transition using ScrollTrigger
      // - Athlete slowly moves upward and scales slightly larger
      // - WORK moves subtly toward the left
      // - HARDER moves subtly toward the right
      // - Red glow fades
      // - Next section smoothly enters without a hard cut
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      scrollTl
        .to(
          athleteContainerRef.current,
          {
            yPercent: -14,
            scale: 1.055,
            ease: 'power1.out'
          },
          0
        )
        .to(
          workTextRef.current,
          {
            x: -70,
            opacity: 0.5,
            ease: 'power1.out'
          },
          0
        )
        .to(
          harderTextRef.current,
          {
            x: 70,
            opacity: 0.5,
            ease: 'power1.out'
          },
          0
        )
        .to(
          [glowBackRef.current, floorGlowRef.current, rimPulseRef.current],
          {
            opacity: 0,
            ease: 'power1.out'
          },
          0
        );
    }, heroRef);

    // 6. Interactive Mouse-based Parallax with smooth quickTo
    if (!prefersReducedMotion) {
      const hero = heroRef.current;

      const athleteX = gsap.quickTo(athleteContainerRef.current, 'x', { duration: 0.9, ease: 'power2.out' });
      const athleteY = gsap.quickTo(athleteContainerRef.current, 'y', { duration: 0.9, ease: 'power2.out' });
      const athleteRotY = gsap.quickTo(athleteContainerRef.current, 'rotationY', { duration: 0.9, ease: 'power2.out' });
      const athleteRotX = gsap.quickTo(athleteContainerRef.current, 'rotationX', { duration: 0.9, ease: 'power2.out' });

      // Opposite direction for glow to create optical stereo depth
      const glowX = gsap.quickTo(glowBackRef.current, 'x', { duration: 1.2, ease: 'power2.out' });
      const glowY = gsap.quickTo(glowBackRef.current, 'y', { duration: 1.2, ease: 'power2.out' });

      // Subtle 2-4px parallax for WORK and HARDER
      const workX = gsap.quickTo(workTextRef.current, 'x', { duration: 1.1, ease: 'power2.out' });
      const workY = gsap.quickTo(workTextRef.current, 'y', { duration: 1.1, ease: 'power2.out' });
      const harderX = gsap.quickTo(harderTextRef.current, 'x', { duration: 1.1, ease: 'power2.out' });
      const harderY = gsap.quickTo(harderTextRef.current, 'y', { duration: 1.1, ease: 'power2.out' });

      const handleMouseMove = (e) => {
        const rect = hero.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        // Athlete follows mouse smoothly
        athleteX(normX * 14);
        athleteY(normY * 9);
        athleteRotY(normX * 2);
        athleteRotX(-normY * 1.5);

        // Glow moves in OPPOSITE direction
        glowX(-normX * 18);
        glowY(-normY * 14);

        // Typography moves extremely subtly (2-4px)
        workX(normX * 3.5);
        workY(normY * 2);
        harderX(normX * 3.5);
        harderY(normY * 2);
      };

      const handleMouseLeave = () => {
        athleteX(0);
        athleteY(0);
        athleteRotY(0);
        athleteRotX(0);
        glowX(0);
        glowY(0);
        workX(0);
        workY(0);
        harderX(0);
        harderY(0);
      };

      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        ctx.revert();
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    return () => ctx.revert();
  }, [introFinished]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden bg-[#060608] pt-16 sm:pt-20 pb-0"
      style={{ perspective: 1200 }}
    >
      {/* Background Atmospheric Crimson Fog Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.42)_0%,_rgba(255,69,0,0.18)_42%,_transparent_75%)] blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060608]/40 to-[#060608]"></div>
      </div>

      {/* Floating Dust / Ember Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-15"
      />

      {/* Top Header Labels */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between pt-1 sm:pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff3c00] animate-ping"></span>
          <span className="font-athletic font-black text-xs sm:text-sm text-[#ff3c00] tracking-[0.25em] uppercase">
            GET IN SHAPE NOW!
          </span>
        </div>
        <div className="hidden sm:block">
          <span className="font-athletic font-bold text-xs sm:text-sm text-gray-400 tracking-[0.18em] uppercase">
            FITNESS REVEALS PLEASURE
          </span>
        </div>
      </div>

      {/* Centerpiece: WORK | Arnold | HARDER */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-end items-center my-0">
        <div className="relative w-full flex items-end justify-center">

          {/* Left Word: "WORK" (Extremely subtle 2-4px parallax, almost stationary) */}
          <div
            ref={workTextRef}
            className="hidden lg:flex items-center justify-end select-none pointer-events-none flex-1 self-center pr-3 xl:pr-6 will-change-transform"
          >
            <h1 className="font-athletic font-black italic text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10.5rem] 2xl:text-[12rem] text-white/95 uppercase tracking-tighter leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] text-right">
              WORK
            </h1>
          </div>

          {/* Central Bodybuilder (Parallax + Idle Floating + Breathing) */}
          <div
            ref={athleteContainerRef}
            className="relative z-20 w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] flex-shrink-0 flex flex-col items-center justify-end mx-auto lg:mx-0 group will-change-transform"
          >
            {/* Background Red/Orange Glow (Moves in opposite parallax direction) */}
            <div
              ref={glowBackRef}
              className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] md:w-[500px] h-[460px] bg-[radial-gradient(ellipse_at_center,_rgba(255,80,0,0.45)_0%,_rgba(230,0,57,0.22)_48%,_transparent_75%)] blur-3xl pointer-events-none -z-10 will-change-transform"
            />

            {/* Soft Warm Rim-Light Pulse (Glow intensity oscillates every few seconds) */}
            <div
              ref={rimPulseRef}
              className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] md:w-[440px] h-[420px] bg-[radial-gradient(ellipse_at_center,_rgba(255,140,0,0.32)_0%,_rgba(255,60,0,0.15)_40%,_transparent_70%)] blur-2xl pointer-events-none -z-10 opacity-60 will-change-transform"
            />

            {/* Horizontal Orange Light Sweep (Sweeps across silhouette every 5-6s) */}
            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-24 overflow-hidden pointer-events-none -z-10">
              <div
                ref={sweepRef}
                className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,122,0,0.65)_0%,_rgba(255,60,0,0.25)_45%,_transparent_75%)] blur-xl opacity-0 will-change-transform"
              />
            </div>

            {/* Ground Fiery Floor Glow anchoring the lower body */}
            <div
              ref={floorGlowRef}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[380px] sm:w-[540px] h-[140px] bg-[radial-gradient(ellipse_at_bottom,_rgba(255,60,0,0.55)_0%,_rgba(230,0,57,0.25)_50%,_transparent_75%)] blur-2xl pointer-events-none -z-10"
            />

            {/* Floating Container (6-10px slow float) */}
            <div ref={athleteFloatRef} className="w-full flex items-end justify-center will-change-transform">
              {/* Breathing Scale Container (1.0 to 1.025 and back) */}
              <div ref={athleteScaleRef} className="w-full flex items-end justify-center will-change-transform origin-bottom">
                <img
                  src={arnoldThemed}
                  alt="Arnold Schwarzenegger - Batron Gym"
                  className="w-full h-auto max-h-[66vh] sm:max-h-[72vh] lg:max-h-[76vh] object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(255,60,0,0.25)] select-none pointer-events-auto"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Right Word: "HARDER" (Extremely subtle 2-4px parallax, almost stationary) */}
          <div
            ref={harderTextRef}
            className="hidden lg:flex items-center justify-start select-none pointer-events-none flex-1 self-center pl-3 xl:pl-6 will-change-transform"
          >
            <h1 className="font-athletic font-black italic text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[10.5rem] 2xl:text-[12rem] text-white/95 uppercase tracking-tighter leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] text-left">
              HARDER
            </h1>
          </div>

          {/* Mobile / Tablet Unified Headline */}
          <div className="lg:hidden absolute bottom-6 left-0 right-0 text-center select-none pointer-events-none z-30">
            <h1 className="font-athletic font-black italic text-5xl sm:text-7xl text-white uppercase tracking-tighter leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]">
              WORK HARDER
            </h1>
          </div>

          {/* Floating "WATCH LIVE DEMO" Pill */}
          <div className="hidden xl:block absolute right-0 bottom-6 z-30">
            <Magnet padding={70} magnetStrength={3}>
              <div
                onClick={onWatchLiveDemo}
                className="flex items-center gap-3 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 hover:border-[#ff3c00]/60 transition-all shadow-2xl group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="Watch Live Demo"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onWatchLiveDemo) onWatchLiveDemo();
                  }
                }}
              >
                <div
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#d00036] via-[#ff3b00] to-[#ff6a00] flex items-center justify-center text-white shadow-[0_0_18px_rgba(255,60,0,0.6)] group-hover:scale-110 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-athletic font-black uppercase tracking-[0.2em] text-white">
                    WATCH LIVE DEMO
                  </span>
                  <span className="text-[9px] text-gray-400 font-medium">
                    Experience the club
                  </span>
                </div>
              </div>
            </Magnet>
          </div>

        </div>
      </div>

      {/* Dynamic Curved / Angled Neon Energy Horizon Stripes */}
      <div className="relative w-full overflow-hidden pointer-events-none z-10 -mb-1">
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          className="w-full h-24 sm:h-32 md:h-40"
          preserveAspectRatio="none"
        >
          <path
            d="M-50,45 C420,135 1020,135 1490,45"
            stroke="#ff7a00"
            strokeWidth="9"
            strokeLinecap="round"
            filter="drop-shadow(0 0 10px rgba(255,122,0,0.7))"
          />
          <path
            d="M-50,75 C420,165 1020,165 1490,75"
            stroke="#ff3c00"
            strokeWidth="9"
            strokeLinecap="round"
            filter="drop-shadow(0 0 10px rgba(255,60,0,0.7))"
          />
          <path
            d="M-50,105 C420,195 1020,195 1490,105"
            stroke="#e60039"
            strokeWidth="9"
            strokeLinecap="round"
            filter="drop-shadow(0 0 10px rgba(230,0,57,0.7))"
          />
          <path
            d="M-50,135 C420,225 1020,225 1490,135"
            stroke="#a80024"
            strokeWidth="9"
            strokeLinecap="round"
            filter="drop-shadow(0 0 10px rgba(168,0,36,0.7))"
          />
        </svg>
      </div>
    </section>
  );
};

export default CinematicHero;
