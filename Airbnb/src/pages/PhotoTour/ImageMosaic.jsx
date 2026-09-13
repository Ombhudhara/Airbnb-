import React from 'react';
import styles from './ImageMosaic.module.css';
import ImageWithPlaceholder from './ImageWithPlaceholder';

/**
 * ImageMosaic
 * Renders the 1 large + 2 half-width repeating pattern
 */
const ImageMosaic = ({ images, onPhotoClick, categoryName }) => {
  // Build the rows array based on pattern: large, pair, large, pair, etc.
  // 0: large (1 img)
  // 1: pair (2 imgs)
  // 2: large (1 img)
  // 3: pair (2 imgs)
  const rows = [];
  let i = 0;
  let isLarge = true;

  while (i < images.length) {
    if (isLarge) {
      rows.push({ type: 'large', items: [images[i]] });
      i += 1;
    } else {
      // It's a pair, take up to 2 images
      const pair = [images[i]];
      if (i + 1 < images.length) {
        pair.push(images[i + 1]);
      }
      rows.push({ type: 'pair', items: pair });
      i += 2;
    }
    isLarge = !isLarge;
  }

  return (
    <div className={styles.mosaic}>
      {rows.map((row, rIdx) => {
        if (row.type === 'large') {
          const img = row.items[0];
          return (
            <button
              key={img.id}
              className={`${styles.tile} ${styles.large}`}
              onClick={() => onPhotoClick(img.id)}
              aria-label={`View photo ${img.displayIndex}: ${img.alt}`}
            >
              <ImageWithPlaceholder
                src={img.src}
                alt={img.alt}
                categoryName={categoryName}
                aspectRatio="3 / 2"
              />
            </button>
          );
        }

        // pair
        return (
          <div key={`row-${rIdx}`} className={styles.row}>
            {row.items.map((img) => (
              <button
                key={img.id}
                className={`${styles.tile} ${styles.half}`}
                onClick={() => onPhotoClick(img.id)}
                aria-label={`View photo ${img.displayIndex}: ${img.alt}`}
              >
                <ImageWithPlaceholder
                  src={img.src}
                  alt={img.alt}
                  categoryName={categoryName}
                  aspectRatio="4 / 3"
                />
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ImageMosaic;
