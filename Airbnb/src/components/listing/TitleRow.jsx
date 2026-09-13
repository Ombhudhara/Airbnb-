import { useState, useCallback } from 'react';
import listing from '../../data/listing';
import styles from './TitleRow.module.css';

/* ─────────────────────────────────────────────────────────────
   Inline SVG icons — no external dependencies
   ───────────────────────────────────────────────────────────── */

/** Upload / share arrow */
const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {/* Arrow shaft */}
    <line x1="16" y1="20" x2="16" y2="4" />
    {/* Arrowhead */}
    <polyline points="9 11 16 4 23 11" />
    {/* Base tray */}
    <path d="M6 20v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6" />
  </svg>
);

/** Heart — outline when unsaved, filled when saved
 * @param {{ filled: boolean }} props
 */
const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="18"
    height="18"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M16 28S4 20.5 4 11.5a7.5 7.5 0 0 1 12-6 7.5 7.5 0 0 1 12 6C28 20.5 16 28 16 28z" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   TitleRow Component
   ───────────────────────────────────────────────────────────── */
const TitleRow = () => {
  const [saved, setSaved] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  /** Toggle saved state + trigger bounce animation */
  const handleSave = useCallback(() => {
    setSaved((prev) => !prev);
    // Trigger bounce keyframe by toggling class
    setBouncing(true);
  }, []);

  /** Remove the bounce class once animation ends so it can retrigger */
  const handleAnimationEnd = useCallback(() => {
    setBouncing(false);
  }, []);

  /** Keyboard support: Enter / Space act as click */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSave();
      }
    },
    [handleSave]
  );

  const heartClass = [
    styles.heartIcon,
    saved ? styles.heartSaved : '',
    bouncing ? styles.heartBounce : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.row}>
      {/* ── Property title ──────────────────────────────────── */}
      <h1 className={styles.title}>{listing.title}</h1>

      {/* ── Action buttons ──────────────────────────────────── */}
      <div className={styles.actions} role="group" aria-label="Listing actions">

        {/* Share */}
        <button
          type="button"
          className={styles.actionBtn}
          aria-label="Share this listing"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: listing.title,
                url: window.location.href,
              }).catch(() => {/* user cancelled */});
            } else {
              navigator.clipboard?.writeText(window.location.href);
            }
          }}
        >
          <span className={styles.icon}>
            <ShareIcon />
          </span>
          <span className={styles.label}>Share</span>
        </button>

        {/* Save / Wishlist */}
        <button
          type="button"
          className={styles.actionBtn}
          aria-label={saved ? 'Remove from saved listings' : 'Save this listing'}
          aria-pressed={saved}
          onClick={handleSave}
          onKeyDown={handleKeyDown}
        >
          <span
            className={heartClass}
            onAnimationEnd={handleAnimationEnd}
          >
            <HeartIcon filled={saved} />
          </span>
          <span className={styles.label}>{saved ? 'Saved' : 'Save'}</span>
        </button>

      </div>
    </div>
  );
};

export default TitleRow;
