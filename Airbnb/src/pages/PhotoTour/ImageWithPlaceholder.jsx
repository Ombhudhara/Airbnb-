import { useState, useRef, useEffect } from 'react';
import styles from './ImageWithPlaceholder.module.css';

/**
 * ImageWithPlaceholder
 * Implements genuine lazy-loading with a light-gray placeholder displaying
 * the category/alt text in small gray text top-left, fading to the real image
 * upon load without layout shift.
 */
const ImageWithPlaceholder = ({
  src,
  alt,
  categoryName,
  aspectRatio = '4 / 3',
  className = '',
  imgClassName = '',
  onClick,
  style = {},
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.wrap} ${className}`}
      style={{ aspectRatio, ...style }}
      onClick={onClick}
    >
      {/* Placeholder with small gray category/alt text */}
      <div
        className={`${styles.placeholder} ${
          isLoaded ? styles.placeholderHidden : ''
        }`}
        aria-hidden="true"
      >
        <span className={styles.placeholderText}>
          {categoryName || alt || 'Photo'}
        </span>
      </div>

      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${styles.img} tourImg ${imgClassName} ${
            isLoaded ? styles.imgLoaded : ''
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default ImageWithPlaceholder;
