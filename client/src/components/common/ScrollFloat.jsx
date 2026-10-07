'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollFloat = ({
  children,
  as: Component = 'h2',
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : (React.Children.toArray(children).join('') || '');
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll('.char');
    if (!charElements.length) return;

    const ctx = gsap.context(() => {
      // Check if element is already within initial viewport
      const rect = el.getBoundingClientRect();
      const inInitialViewport = rect.top < (window.innerHeight || 800);

      if (inInitialViewport) {
        // Immediate smooth entrance animation so header is NEVER blank!
        gsap.fromTo(
          charElements,
          {
            willChange: 'opacity, transform',
            opacity: 0,
            yPercent: 70,
            scaleY: 1.4,
            scaleX: 0.85,
            transformOrigin: '50% 0%'
          },
          {
            duration: Math.min(animationDuration, 0.8),
            ease: 'power3.out',
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            stagger: stagger,
            delay: 0.05
          }
        );
      } else {
        // Elements down page reveal on scroll and STAY visible once scrolled into view
        gsap.fromTo(
          charElements,
          {
            willChange: 'opacity, transform',
            opacity: 0,
            yPercent: 70,
            scaleY: 1.4,
            scaleX: 0.85,
            transformOrigin: '50% 0%'
          },
          {
            duration: animationDuration,
            ease: ease,
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            stagger: stagger,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: scrollStart,
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, splitText]);

  return (
    <Component ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </Component>
  );
};

export default ScrollFloat;
