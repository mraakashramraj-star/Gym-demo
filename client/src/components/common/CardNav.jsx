'use client';

import { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './CardNav.css';
import Magnet from './Magnet.jsx';

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  className = '',
  ease = 'power3.out',
  baseColor = 'rgba(12, 12, 18, 0.95)',
  menuColor = '#ffffff',
  buttonBgColor = '#ff3c00',
  buttonTextColor = '#ffffff',
  ctaText = 'Get Started',
  ctaLink = '/membership',
  onCtaClick,
  brandTitle = '',
  actions = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        // Force reflow
        void contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 270;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;
    const contentEl = navEl.querySelector('.card-nav-content');
    const validCards = cardsRef.current.filter(Boolean);

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    if (contentEl) {
      gsap.set(contentEl, { visibility: 'hidden', pointerEvents: 'none' });
    }
    if (validCards.length > 0) {
      gsap.set(validCards, { y: 30, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    if (contentEl) {
      tl.set(contentEl, { visibility: 'visible', pointerEvents: 'auto' }, 0);
    }

    tl.to(
      navEl,
      {
        height: calculateHeight,
        duration: 0.38,
        ease
      },
      0
    );

    if (validCards.length > 0) {
      tl.to(
        validCards,
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease,
          stagger: 0.06
        },
        0.08
      );
    }

    return tl;
  }, [calculateHeight, ease]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    if (tl) {
      if (isOpen) {
        tl.progress(1);
      }
      tlRef.current = tl;
    }

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTimeline, items?.length]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (!tlRef.current || !navRef.current) return;
      const newHeight = calculateHeight();

      if (isOpen) {
        gsap.set(navRef.current, { height: newHeight });
      }

      tlRef.current.kill();
      const newTl = createTimeline();
      if (newTl) {
        if (isOpen) {
          newTl.progress(1);
        } else {
          newTl.progress(0);
        }
        tlRef.current = newTl;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, calculateHeight, createTimeline]);

  // Close menu on route transitions
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div ref={containerRef} className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isOpen ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top">
          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            id="navbar-hamburger-toggle"
            className={`hamburger-menu ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            style={{ color: menuColor || '#fff' }}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          {/* Centered Brand / Logo */}
          <Link to="/" className="logo-container group" onClick={handleLinkClick}>
            {logo && <img src={logo} alt={logoAlt} className="logo group-hover:scale-105 transition-transform" />}
            {brandTitle && (
              <span className="font-athletic font-black text-white text-sm sm:text-lg tracking-tight uppercase whitespace-nowrap group-hover:text-orange-200 transition-colors">
                {brandTitle}
              </span>
            )}
          </Link>

          {/* Right Action Buttons */}
          <div className="card-nav-cta-group">
            {actions}
            {ctaLink ? (
              <Magnet padding={40} magnetStrength={3}>
                <Link
                  to={ctaLink}
                  onClick={(e) => {
                    handleLinkClick();
                    if (onCtaClick) onCtaClick(e);
                  }}
                  className="card-nav-cta-button"
                  style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                >
                  {ctaText}
                </Link>
              </Magnet>
            ) : (
              <Magnet padding={40} magnetStrength={3}>
                <button
                  type="button"
                  onClick={(e) => {
                    handleLinkClick();
                    if (onCtaClick) onCtaClick(e);
                  }}
                  className="card-nav-cta-button"
                  style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                >
                  {ctaText}
                </button>
              </Magnet>
            )}
          </div>
        </div>

        {/* Expandable Navigation Cards */}
        <div className="card-nav-content" aria-hidden={!isOpen}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => {
                  const isRouterLink = Boolean(lnk.to);
                  return isRouterLink ? (
                    <Link
                      key={`${lnk.label}-${i}`}
                      to={lnk.to}
                      className="nav-card-link"
                      aria-label={lnk.ariaLabel || lnk.label}
                      onClick={handleLinkClick}
                    >
                      <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                      <span>{lnk.label}</span>
                    </Link>
                  ) : (
                    <a
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link"
                      href={lnk.href || '#'}
                      aria-label={lnk.ariaLabel || lnk.label}
                      onClick={handleLinkClick}
                    >
                      <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                      <span>{lnk.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export { CardNav };
export default CardNav;
