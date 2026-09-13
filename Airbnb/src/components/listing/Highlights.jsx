/**
 * src/components/listing/Highlights.jsx
 *
 * Three-row highlight list: icon (decorative) + bold title + gray description.
 * Data sourced from src/data/listing.ts → listing.highlights.
 *
 * Icons are 32px outline SVGs matching Airbnb's icon style:
 *   pool      → pool/swimming icon
 *   aircon    → fan / air-con icon
 *   checkin   → door / key icon
 *
 * All icons carry aria-hidden="true"; meaning is conveyed by text alone.
 */

import listing from '../../data/listing';
import styles from './Highlights.module.css';

/* ─────────────────────────────────────────────────────────────
   Outline SVG icon map (32 × 32 viewBox, stroke-based)
   ───────────────────────────────────────────────────────────── */

/** Pool / swimming waves */
const PoolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {/* Swimmer body */}
    <circle cx="24" cy="7" r="2.5" />
    <path d="M21.5 11 L18 16 L12 14 L8 20" />
    {/* Water waves */}
    <path d="M2 24 Q5 21 8 24 Q11 27 14 24 Q17 21 20 24 Q23 27 26 24 Q29 21 32 24" />
    <path d="M2 28 Q5 25 8 28 Q11 31 14 28 Q17 25 20 28 Q23 31 26 28 Q29 25 32 28" />
  </svg>
);

/** Fan / air-conditioning blades */
const AirconIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {/* Centre hub */}
    <circle cx="16" cy="16" r="2.5" />
    {/* Fan blade top */}
    <path d="M16 13.5 C16 8 20 4 24 6 C22 10 18 12 16 13.5Z" />
    {/* Fan blade bottom-right */}
    <path d="M17.2 17.2 C21.5 20.5 22.5 25.5 20 28 C17 25.5 16 21 17.2 17.2Z" />
    {/* Fan blade bottom-left */}
    <path d="M14.8 17.2 C10.5 20.5 5.5 19.5 4 16.5 C7.5 14.5 12.5 15.5 14.8 17.2Z" />
    {/* Fan blade top-left */}
    <path d="M14.8 14.8 C11.5 10.5 12.5 5.5 15.5 4 C17.5 7.5 16.5 12.5 14.8 14.8Z" />
  </svg>
);

/** Door with handle — self check-in */
const CheckinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {/* Door frame */}
    <rect x="6" y="3" width="20" height="26" rx="1.5" />
    {/* Door panel inset */}
    <rect x="9" y="7" width="14" height="14" rx="1" />
    {/* Door handle */}
    <circle cx="20.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
    {/* Keyhole */}
    <circle cx="16" cy="14" r="1.2" fill="currentColor" stroke="none" />
    <path d="M15.2 14.8 L14.8 17.5 L17.2 17.5 L16.8 14.8" fill="currentColor" stroke="none" />
    {/* Threshold line */}
    <line x1="6" y1="29" x2="26" y2="29" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Icon registry — maps icon id → component
   ───────────────────────────────────────────────────────────── */
const ICON_MAP = {
  pool:     <PoolIcon />,
  aircon:   <AirconIcon />,
  checkin:  <CheckinIcon />,
};

/* ─────────────────────────────────────────────────────────────
   Highlights Component
   ───────────────────────────────────────────────────────────── */
const Highlights = () => (
  <section
    className={styles.highlights}
    aria-label="Property highlights"
  >
    {listing.highlights.map((highlight) => (
      <div key={highlight.id} className={styles.row}>

        {/* Decorative icon — hidden from AT, text carries the meaning */}
        <span className={styles.iconWrap}>
          {ICON_MAP[highlight.icon]}
        </span>

        {/* Text block */}
        <div className={styles.text}>
          <p className={styles.title}>{highlight.title}</p>
          <p className={styles.description}>{highlight.description}</p>
        </div>

      </div>
    ))}
  </section>
);

export default Highlights;
