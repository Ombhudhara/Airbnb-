import React from 'react';
import styles from './CategoryThumbnailNav.module.css';

const CategoryThumbnailNav = ({ categories }) => {
  const handleScrollToSection = (categoryId) => {
    const el = document.getElementById(categoryId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={styles.nav} aria-label="Photo categories">
      <div className={styles.grid}>
        {categories.map((cat) => {
          // Use the first image of the category for the thumbnail
          const thumb = cat.images[0];
          if (!thumb) return null;

          return (
            <button
              key={cat.id}
              type="button"
              className={styles.thumbBtn}
              onClick={() => handleScrollToSection(cat.id)}
              aria-label={`Scroll to ${cat.category} photos`}
            >
              <div className={styles.thumbImgWrap}>
                <img
                  src={thumb.src}
                  alt={cat.category}
                  className={styles.thumbImg}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className={styles.thumbLabel}>{cat.category}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryThumbnailNav;
