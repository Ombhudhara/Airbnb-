/**
 * src/components/listing/NearbyStays.jsx
 *
 * Horizontal-scroll carousel — swipe with touchpad or use arrow buttons.
 * Buttons call scrollBy() on the container; a scroll listener keeps
 * the page indicator and disabled states in sync.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import listing from '../../data/listing';
import styles from './NearbyStays.module.css';

const ChevronLeftIcon = () => (
  <span className={styles.arrowIcon} aria-hidden="true">&lt;</span>
);

const ChevronRightIcon = () => (
  <span className={styles.arrowIcon} aria-hidden="true">&gt;</span>
);

const StarIcon = () => (
  <svg className={styles.starIcon} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.621 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
  </svg>
);

const NearbyStays = () => {
  const { nearbyStays } = listing;
  const trackRef = useRef(null);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // How much to scroll per button click (approx. 3 card widths + gaps)
  const getScrollAmount = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 300;
    // one card width = (scrollWidth - gaps) / cardCount, scroll 3 at a time
    const cardCount = nearbyStays.length;
    const gap = 16;
    const cardWidth = (el.scrollWidth - gap * (cardCount - 1)) / cardCount;
    return cardWidth * 3 + gap * 2;
  }, [nearbyStays.length]);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setIsPrevDisabled(scrollLeft <= 1);
    setIsNextDisabled(scrollLeft >= maxScroll - 1);

    // Page indicator based on scroll fraction
    const pages = Math.round(scrollWidth / clientWidth);
    const page = Math.round((scrollLeft / maxScroll) * (pages - 1)) + 1;
    setTotalPages(pages);
    setCurrentPage(isNaN(page) ? 1 : page);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateState();
    el.addEventListener('scroll', updateState, { passive: true });
    const ro = new ResizeObserver(updateState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateState);
      ro.disconnect();
    };
  }, [updateState]);

  const handlePrev = () => {
    trackRef.current?.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  };

  const handleNext = () => {
    trackRef.current?.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="nearby-stays-heading"
      role="region"
      aria-label="More stays nearby"
    >
      <div className={styles.header}>
        <h2 id="nearby-stays-heading" className={styles.heading}>More stays nearby</h2>

        <div className={styles.controls}>
          <span className={styles.pageIndicator} aria-live="polite">
            {currentPage} / {totalPages}
          </span>
          <div className={styles.btnGroup}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={handlePrev}
              disabled={isPrevDisabled}
              aria-label="Previous stays"
              aria-disabled={isPrevDisabled}
              tabIndex={isPrevDisabled ? -1 : 0}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={handleNext}
              disabled={isNextDisabled}
              aria-label="Next stays"
              aria-disabled={isNextDisabled}
              tabIndex={isNextDisabled ? -1 : 0}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Native-scroll track — touchpad swipe works here */}
      <div className={styles.carouselContainer} ref={trackRef}>
        {nearbyStays.map((stay) => {
          const accessibleName = `${stay.title}, ${stay.price} per stay, rated ${stay.rating} out of 5`;
          return (
            <a
              key={stay.id}
              href="#"
              className={styles.card}
              aria-label={accessibleName}
            >
              <div className={styles.imageWrapper}>
                <img src={stay.imageUrl} alt="" className={styles.image} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>{stay.title}</h3>
              <div className={styles.cardDetails}>
                <span className={styles.price}>{stay.price}</span>
                <span className={styles.rating}>
                  <StarIcon />
                  {stay.rating}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default NearbyStays;
