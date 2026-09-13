/**
 * src/components/listing/Overview.jsx
 *
 * Overview block (below Gallery):
 *   1. <h2> — property type / location heading
 *   2. Specs row — guests · bedrooms · beds · baths
 *   3. Guest Favourite box — laurels, rating, divider, review count
 *   4. Host row — circular avatar, name, years hosting
 */

import listing from '../../data/listing';
import styles from './Overview.module.css';

/* ─────────────────────────────────────────────────────────────
   Inline SVG Icons
   ───────────────────────────────────────────────────────────── */

/** Laurel-leaf branch — mirrored for left/right */
const LaurelIcon = ({ flip = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 64"
    width="20"
    height="40"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    style={flip ? { transform: 'scaleX(-1)' } : undefined}
  >
    {/* Stem */}
    <path d="M16 62 Q16 40 16 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Leaf 1 */}
    <ellipse cx="10" cy="50" rx="7" ry="4" transform="rotate(-30 10 50)" />
    {/* Leaf 2 */}
    <ellipse cx="9"  cy="38" rx="7" ry="4" transform="rotate(-40 9 38)" />
    {/* Leaf 3 */}
    <ellipse cx="10" cy="26" rx="6" ry="3.5" transform="rotate(-50 10 26)" />
    {/* Leaf 4 */}
    <ellipse cx="11" cy="16" rx="5" ry="3" transform="rotate(-60 11 16)" />
  </svg>
);

/** Star icon inside superhost badge */
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="10"
    height="10"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M15.1 2.1l-3.5 7.1-7.8 1.1 5.7 5.5-1.3 7.8 7-3.7 7 3.7-1.3-7.8 5.7-5.5-7.8-1.1z" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Spec helpers
   ───────────────────────────────────────────────────────────── */
const pluralise = (n, word) => `${n} ${word}${n !== 1 ? 's' : ''}`;

const buildSpecs = (l) => [
  pluralise(l.guests,   'guest'),
  pluralise(l.bedrooms, 'bedroom'),
  pluralise(l.beds,     'bed'),
  pluralise(l.baths,    'bath'),
];

/* ─────────────────────────────────────────────────────────────
   Overview Component
   ───────────────────────────────────────────────────────────── */
const Overview = () => {
  const { guestFavourite, host, location, guests, bedrooms, beds, baths } = listing;
  const specs = buildSpecs({ guests, bedrooms, beds, baths });

  return (
    <section className={styles.overview} aria-label="Property overview">

      {/* ── 1. Property type / location heading ─────────────── */}
      <h2 className={styles.heading}>
        Entire serviced apartment in {location.city}, {location.country}
      </h2>

      {/* ── 2. Specs row ────────────────────────────────────── */}
      <p className={styles.specs} aria-label="Property specifications">
        {specs.map((spec, i) => (
          <span key={i} className={styles.specItem}>{spec}</span>
        ))}
      </p>

      {/* ── 3. Guest Favourite box ──────────────────────────── */}
      <div
        className={styles.favouriteBox}
        role="region"
        aria-label={`Rated ${guestFavourite.rating} out of 5 from ${guestFavourite.reviewCount} reviews — Guest favourite`}
      >
        {/* Left: laurel + rating value */}
        <div className={styles.ratingSection}>
          <div className={styles.laurelWrap}>
            {/* Left laurel */}
            <span className={styles.laurelIcon}>
              <LaurelIcon />
            </span>

            {/* Rating number */}
            <span className={styles.ratingValue} aria-hidden="true">
              {guestFavourite.rating.toFixed(2)}
            </span>

            {/* Right laurel (flipped) */}
            <span className={styles.laurelIcon}>
              <LaurelIcon flip />
            </span>
          </div>
        </div>

        {/* Middle: Guest favourite label + description */}
        <div className={styles.middleSection}>
          <p className={styles.favouriteLabel}>Guest favourite</p>
          <p className={styles.favouriteDesc}>
            One of the most loved homes on Airbnb, according to guests
          </p>
        </div>

        {/* Vertical divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Right: review count */}
        <div className={styles.reviewSection}>
          <button
            type="button"
            className={styles.reviewCount}
            aria-label={`${guestFavourite.reviewCount} reviews — click to read`}
            onClick={() => {
              const el = document.getElementById('section-reviews');
              if (el) {
                const offset = 80 + 64 + 8;
                window.scrollTo({
                  top: el.getBoundingClientRect().top + window.scrollY - offset,
                  behavior: 'smooth',
                });
              }
            }}
          >
            {guestFavourite.reviewCount}
          </button>
          <span className={styles.reviewLabel} aria-hidden="true">Reviews</span>
        </div>
      </div>

      {/* ── 4. Host row ─────────────────────────────────────── */}
      <a
        href={host.profileUrl}
        className={styles.hostRow}
        aria-label={`Hosted by ${host.displayName} — ${host.yearsHosting} years hosting`}
      >
        {/* Avatar + superhost badge */}
        <div className={styles.avatarWrap}>
          <img
            className={styles.avatar}
            src={host.avatarUrl}
            alt={`${host.displayName}'s profile photo`}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
          {host.isSuperhost && (
            <span
              className={styles.superhostBadge}
              title="Superhost"
              aria-label="Superhost"
            >
              <span className={styles.superhostIcon}>
                <StarIcon />
              </span>
            </span>
          )}
        </div>

        {/* Name + years hosting */}
        <div className={styles.hostInfo}>
          <span className={styles.hostedBy}>
            Hosted by {host.displayName}
          </span>
          <span className={styles.hostMeta}>
            {host.yearsHosting} year{host.yearsHosting !== 1 ? 's' : ''} hosting
          </span>
        </div>
      </a>

    </section>
  );
};

export default Overview;
