/**
 * src/components/listing/Gallery.jsx
 *
 * Photo hero gallery grid:
 *   - One large hero image on the left (full height)
 *   - 2×2 grid of four smaller images on the right
 *   - "Show all photos" pill button bottom-right
 *
 * Shared state (opens Photo Tour / Lightbox) is managed via
 * GalleryContext — consumed here, provided by <Listing>.
 */

import { useCallback } from 'react';
import listing from '../../data/listing';
import { useGallery } from '../../context/GalleryContext';
import styles from './Gallery.module.css';

/* ─────────────────────────────────────────────────────────────
   Grid icon SVG (for the pill button)
   ───────────────────────────────────────────────────────────── */
const GridIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="14"
    height="14"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M3 3h11v11H3zM18 3h11v11H18zM3 18h11v11H3zM18 18h11v11H18z" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Individual tile — a focusable <button> wrapping an <img>
   ───────────────────────────────────────────────────────────── */
const Tile = ({ photo, index, onClick, role, extraClass }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(index);
    }
  };

  return (
    <div className={`${styles.tile} ${extraClass ?? ''}`} role={role}>
      <button
        type="button"
        className={styles.tileBtn}
        aria-label={`View photo ${index + 1}: ${photo.alt}`}
        onClick={() => onClick(index)}
        onKeyDown={handleKeyDown}
      >
        <img
          className={styles.img}
          src={photo.url}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Gallery Component
   ───────────────────────────────────────────────────────────── */
const Gallery = () => {
  const { openPhotoTour, openLightbox } = useGallery();
  const photos = listing.photos;

  // Need at least 5 photos for the grid
  if (!photos || photos.length < 5) {
    return null;
  }

  const [hero, ...rest] = photos;
  const gridPhotos = rest.slice(0, 4);  // exactly 4 for the 2×2

  /** Clicking any tile opens the lightbox to that photo */
  const handleTileClick = useCallback(
    (index) => openLightbox(index),
    [openLightbox]
  );

  /** "Show all photos" opens the photo-tour grid overlay */
  const handleShowAll = useCallback(() => {
    openPhotoTour(0);
  }, [openPhotoTour]);

  const handleShowAllKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleShowAll();
      }
    },
    [handleShowAll]
  );

  return (
    <section
      className={styles.gallery}
      aria-label="Property photo gallery"
    >
      <div className={styles.grid} role="list">

        {/* ── Hero tile — left column, full height ──────────── */}
        <div
          className={`${styles.tile} ${styles.heroTile}`}
          role="listitem"
        >
          <button
            type="button"
            className={styles.tileBtn}
            aria-label={`View hero photo: ${hero.alt}`}
            onClick={() => handleTileClick(0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTileClick(0);
              }
            }}
          >
            <img
              className={styles.img}
              src={hero.url}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              loading="eager"
              decoding="async"
            />
          </button>
        </div>

        {/* ── Right 2×2 tiles ───────────────────────────────── */}
        {gridPhotos.map((photo, i) => (
          <Tile
            key={photo.id}
            photo={photo}
            index={i + 1}      /* offset by 1 because hero is index 0 */
            onClick={handleTileClick}
            role="listitem"
          />
        ))}

      </div>

      {/* ── "Show all photos" pill button ─────────────────── */}
      <div className={styles.showAllWrap}>
        <button
          type="button"
          className={styles.showAllBtn}
          aria-label={`Show all ${photos.length} photos`}
          onClick={handleShowAll}
          onKeyDown={handleShowAllKeyDown}
        >
          <span className={styles.gridIcon}>
            <GridIcon />
          </span>
          Show all photos
        </button>
      </div>
    </section>
  );
};

export default Gallery;
