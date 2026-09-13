/**
 * src/components/layout/StickySubNav.jsx
 *
 * Sticky sub-navigation bar.
 * - Pins to viewport top (below main navbar) once user scrolls past Gallery.
 * - Left: four section tabs with a sliding active underline.
 * - Right: stacked price/rating summary + red "Reserve" pill button.
 *
 * Props:
 *   isSticky  {boolean}  — controlled by parent via useStickyNav hook
 *   sentinelRef          — not needed here; parent observes it
 */

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import listing from '../../data/listing';
import { useBooking } from '../../context/BookingContext';
import styles from './StickySubNav.module.css';

/* ─────────────────────────────────────────────────────────────
   Tab definitions — id must match section heading id in DOM
   ───────────────────────────────────────────────────────────── */
const TABS = [
  { id: 'section-photos',    label: 'Photos'    },
  { id: 'section-amenities', label: 'Amenities' },
  { id: 'section-reviews',   label: 'Reviews'   },
  { id: 'section-location',  label: 'Location'  },
];

/* ─────────────────────────────────────────────────────────────
   Utility: scroll to section and move focus to its heading
   ───────────────────────────────────────────────────────────── */
const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (!el) return;

  // Smooth scroll with offset for the two sticky bars
  const offset = 80 + 64; // navbar + subnav height
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });

  // Move focus to the section heading for screen reader context
  const heading = el.querySelector('h2, h3, [role="heading"]') ?? el;
  // Defer until scroll settles
  setTimeout(() => {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }, 350);
};

/* ─────────────────────────────────────────────────────────────
   StickySubNav Component
   ───────────────────────────────────────────────────────────── */
const StickySubNav = ({ isSticky }) => {
  const { nights, totalPrice, formatINR } = useBooking();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const tabRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef(null);

  /* ── Scroll-spy: update active tab when section enters viewport ── */
  useEffect(() => {
    const observers = [];
    const OFFSET = (80 + 64) * 2; // account for sticky bars

    TABS.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(tab.id);
          }
        },
        {
          rootMargin: `-${80 + 64}px 0px -50% 0px`,
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Update the sliding indicator position whenever activeTab changes */
  const updateIndicator = useCallback(() => {
    const activeIndex = TABS.findIndex((t) => t.id === activeTab);
    const activeEl = tabRefs.current[activeIndex];
    const container = tabsRef.current;
    if (!activeEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeEl.getBoundingClientRect();

    setIndicatorStyle({
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    });
  }, [activeTab]);

  /* Run after paint so rects are accurate */
  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  /* Re-measure on window resize */
  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  /* Keyboard: Enter/Space handled natively on <button>;
     Arrow keys cycle through tabs */
  const handleTabKeyDown = useCallback(
    (e, index) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (index + 1) % TABS.length;
        tabRefs.current[next]?.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (index - 1 + TABS.length) % TABS.length;
        tabRefs.current[prev]?.focus();
      }
    },
    []
  );

  const handleTabClick = useCallback((tabId) => {
    setActiveTab(tabId);
    scrollToSection(tabId);
  }, []);

  /* Price label */
  const priceLabel = `${formatINR(totalPrice)} for ${nights} night${nights !== 1 ? 's' : ''}`;

  if (!isSticky) return null;

  return (
    <nav
      className={styles.bar}
      aria-label="Listing sections"
      role="navigation"
    >
      <div className={styles.inner}>

        {/* ── Left: tabs ────────────────────────────────────── */}
        <div
          className={styles.tabs}
          ref={tabsRef}
          role="tablist"
          aria-label="Page sections"
        >
          {TABS.map((tab, index) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[index] = el; }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'page' : undefined}
                aria-controls={tab.id}
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                tabIndex={isActive ? 0 : -1}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Sliding underline indicator */}
          <span
            className={styles.indicator}
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            aria-hidden="true"
          />
        </div>

        {/* ── Right: price + reserve ────────────────────────── */}
        <div className={styles.right}>

          {/* Price summary */}
          <div className={styles.priceBlock}>
            <span className={styles.priceMain}>
              {priceLabel}
            </span>
            <span className={styles.priceMeta}>
              <span className={styles.starIcon} aria-hidden="true">★</span>
              {listing.rating} · {listing.reviewCount} reviews
            </span>
          </div>

          {/* Reserve CTA */}
          <button
            type="button"
            className={styles.reserveBtn}
            aria-label="Reserve this listing"
            onClick={() => scrollToSection('section-booking')}
          >
            Reserve
          </button>

        </div>
      </div>
    </nav>
  );
};

export default StickySubNav;
