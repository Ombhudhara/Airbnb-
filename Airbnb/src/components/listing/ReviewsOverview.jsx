/**
 * src/components/listing/ReviewsOverview.jsx
 *
 * Redesigned to match reference Airbnb layout:
 * - Centered: large rating + laurels, "Guest favourite" heading, description, link
 * - Horizontal categories row: "Overall rating" histogram + 6 category columns
 * - Draggable tag pills carousel
 */

import { useRef, useState, useEffect } from 'react';
import listing from '../../data/listing';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './ReviewsOverview.module.css';

/* ── SVG Icons per category (32x32 matching Airbnb reference) ────────── */
const SprayIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 8h6v3h-6z" />
    <path d="M11 11h10v16a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V11z" />
    <path d="M14 8V5h-3" />
    <path d="M22 11l4-3" />
    <circle cx="26" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="29" cy="8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="16" r="12" />
    <path d="M10 16l4 4 8-8" />
  </svg>
);

const KeyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="15" r="5.5" />
    <circle cx="12" cy="15" r="2" fill="currentColor" stroke="none" />
    <path d="M16 19L27 28" />
    <path d="M22.5 25.5l2.5-2.5" />
    <path d="M25 28l2-2" />
  </svg>
);

const ChatIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M26 7H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h4l4 4 4-4h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
  </svg>
);

const MapIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 7l8-3 8 3 8-3v20l-8 3-8-3-8 3V7z" />
    <path d="M12 4v20M20 7v20" />
  </svg>
);

const TagIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 5h10l12 12a2 2 0 0 1 0 3l-7 7a2 2 0 0 1-3 0L5 15V5z" />
    <circle cx="10" cy="10" r="2" fill="currentColor" stroke="none" />
  </svg>
);

const CATEGORY_ICONS = {
  cleanliness: SprayIcon,
  accuracy: CheckCircleIcon,
  checkin: KeyIcon,
  communication: ChatIcon,
  location: MapIcon,
  value: TagIcon,
};

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 24L12 16L20 8" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M12 24L20 16L12 8" />
  </svg>
);

/* ── Static category data (matches reference image) ─────────── */
const CATEGORIES = [
  { id: 'cleanliness',   label: 'Cleanliness',   score: 5.0, iconKey: 'cleanliness' },
  { id: 'accuracy',      label: 'Accuracy',       score: 5.0, iconKey: 'accuracy' },
  { id: 'checkin',       label: 'Check-in',       score: 5.0, iconKey: 'checkin' },
  { id: 'communication', label: 'Communication',  score: 5.0, iconKey: 'communication' },
  { id: 'location',      label: 'Location',       score: 4.8, iconKey: 'location' },
  { id: 'value',         label: 'Value',          score: 4.8, iconKey: 'value' },
];

/* Histogram distribution — star level : percentage of reviews */
const OVERALL_BARS = [
  { star: 5, pct: 92 },
  { star: 4, pct: 6  },
  { star: 3, pct: 1  },
  { star: 2, pct: 1  },
  { star: 1, pct: 0  },
];

const ReviewsOverview = () => {
  const { reviewsOverview, guestFavourite } = listing;
  const rating = reviewsOverview?.rating ?? guestFavourite?.rating ?? 4.95;
  const description = reviewsOverview?.description ?? 'This home is a guest favourite based on ratings, reviews and reliability';
  const tags = reviewsOverview?.tags ?? [];

  const [gridRef, inView] = useIntersectionObserver({ threshold: 0.2 });

  /* Drag-to-scroll for tag pills */
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkArrows = () => {
    if (!scrollRef.current) return;
    const { scrollLeft: sl, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(sl > 0);
    setShowRightArrow(Math.ceil(sl + clientWidth) < scrollWidth);
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    return () => window.removeEventListener('resize', checkArrows);
  }, []);

  const handleScrollClick = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className={styles.section} aria-labelledby="reviews-heading">

      {/* ── 1. Centered Rating Header ───────────────────────── */}
      <div className={styles.topHeader}>
        <div className={styles.ratingRow}>
          {/* Laurel left — stacked leaf shapes */}
          <svg className={styles.laurel} viewBox="0 0 40 100" fill="currentColor" aria-hidden="true">
            <ellipse cx="20" cy="88" rx="6" ry="4" opacity="0.3"/>
            {/* Stem */}
            <line x1="20" y1="85" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5"/>
            {/* Leaves left of stem */}
            <ellipse cx="12" cy="72" rx="9" ry="5" transform="rotate(-30 12 72)" opacity="0.85"/>
            <ellipse cx="10" cy="57" rx="9" ry="5" transform="rotate(-40 10 57)" opacity="0.85"/>
            <ellipse cx="11" cy="42" rx="9" ry="5" transform="rotate(-45 11 42)" opacity="0.85"/>
            <ellipse cx="14" cy="28" rx="8" ry="4" transform="rotate(-50 14 28)" opacity="0.85"/>
            {/* Leaves right of stem */}
            <ellipse cx="28" cy="72" rx="9" ry="5" transform="rotate(30 28 72)" opacity="0.65"/>
            <ellipse cx="30" cy="57" rx="9" ry="5" transform="rotate(40 30 57)" opacity="0.65"/>
            <ellipse cx="29" cy="42" rx="9" ry="5" transform="rotate(45 29 42)" opacity="0.65"/>
            <ellipse cx="26" cy="28" rx="8" ry="4" transform="rotate(50 26 28)" opacity="0.65"/>
            {/* Top bud */}
            <ellipse cx="20" cy="16" rx="5" ry="7" opacity="0.9"/>
          </svg>

          <p className={styles.largeRating} aria-label={`Rating ${rating} out of 5`}>
            {rating}
          </p>

          {/* Laurel right (mirrored) */}
          <svg className={styles.laurel} viewBox="0 0 40 100" fill="currentColor" aria-hidden="true" style={{ transform: 'scaleX(-1)' }}>
            <ellipse cx="20" cy="88" rx="6" ry="4" opacity="0.3"/>
            <line x1="20" y1="85" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5"/>
            <ellipse cx="12" cy="72" rx="9" ry="5" transform="rotate(-30 12 72)" opacity="0.85"/>
            <ellipse cx="10" cy="57" rx="9" ry="5" transform="rotate(-40 10 57)" opacity="0.85"/>
            <ellipse cx="11" cy="42" rx="9" ry="5" transform="rotate(-45 11 42)" opacity="0.85"/>
            <ellipse cx="14" cy="28" rx="8" ry="4" transform="rotate(-50 14 28)" opacity="0.85"/>
            <ellipse cx="28" cy="72" rx="9" ry="5" transform="rotate(30 28 72)" opacity="0.65"/>
            <ellipse cx="30" cy="57" rx="9" ry="5" transform="rotate(40 30 57)" opacity="0.65"/>
            <ellipse cx="29" cy="42" rx="9" ry="5" transform="rotate(45 29 42)" opacity="0.65"/>
            <ellipse cx="26" cy="28" rx="8" ry="4" transform="rotate(50 26 28)" opacity="0.65"/>
            <ellipse cx="20" cy="16" rx="5" ry="7" opacity="0.9"/>
          </svg>
        </div>

        <h2 id="reviews-heading" className={styles.title}>Guest favourite</h2>
        <p className={styles.description}>{description}</p>
        <button className={styles.link} type="button">How reviews work</button>
      </div>

      {/* ── 2. Category Row ─────────────────────────────────── */}
      <div className={styles.categoriesRow} ref={gridRef}>

        {/* Overall rating histogram */}
        <div className={styles.overallCol}>
          <p className={styles.overallLabel}>Overall rating</p>
          <div className={styles.histogram}>
            {OVERALL_BARS.map(({ star, pct }) => (
              <div key={star} className={styles.histRow}>
                <span className={styles.histStar}>{star}</span>
                <div className={styles.histTrack}>
                  <div
                    className={styles.histFill}
                    style={{ width: inView ? `${pct}%` : '0%' }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical separator */}
        <div className={styles.colDivider} aria-hidden="true" />

        {/* 6 Category columns */}
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.iconKey];
          return (
            <div key={cat.id} className={styles.catCol} role="group" aria-label={`${cat.label}: ${cat.score}`}>
              <p className={styles.catLabel}>{cat.label}</p>
              <p className={styles.catScore}>{cat.score.toFixed(1)}</p>
              {Icon && <Icon />}
            </div>
          );
        })}
      </div>

      {/* ── 3. Tag Pills Carousel ────────────────────────────── */}
      {tags.length > 0 && (
        <div className={styles.tagsSection}>
          <button
            className={`${styles.carouselArrow} ${styles.arrowLeft} ${!showLeftArrow ? styles.hidden : ''}`}
            onClick={() => handleScrollClick('left')}
            aria-label="Scroll tags left"
            tabIndex={showLeftArrow ? 0 : -1}
            type="button"
          >
            <ChevronLeft />
          </button>

          <div
            className={styles.tagsContainer}
            ref={scrollRef}
            onMouseDown={(e) => { setIsDragging(true); setStartX(e.pageX - scrollRef.current.offsetLeft); setScrollLeft(scrollRef.current.scrollLeft); }}
            onMouseLeave={() => setIsDragging(false)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (!isDragging) return;
              e.preventDefault();
              const x = e.pageX - scrollRef.current.offsetLeft;
              scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
            }}
            onScroll={checkArrows}
            role="region"
            aria-label="Review tags"
            tabIndex={0}
          >
            {tags.map(tag => (
              <button key={tag.id} className={styles.tagPill} type="button">
                <span className={styles.tagIcon} aria-hidden="true">{tag.icon}</span>
                <span>{tag.label}</span>
                <span className={styles.tagCount} aria-label={`${tag.count} mentions`}>{tag.count}</span>
              </button>
            ))}
          </div>

          <button
            className={`${styles.carouselArrow} ${styles.arrowRight} ${!showRightArrow ? styles.hidden : ''}`}
            onClick={() => handleScrollClick('right')}
            aria-label="Scroll tags right"
            tabIndex={showRightArrow ? 0 : -1}
            type="button"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default ReviewsOverview;
