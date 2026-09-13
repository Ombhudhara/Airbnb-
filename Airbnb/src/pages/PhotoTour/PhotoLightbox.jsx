import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './PhotoLightbox.module.css';
import LightboxHeader from './LightboxHeader';
import LightboxNavArrows from './LightboxNavArrows';
import { allPhotosFlat } from '../../data/photoTourData';

const PhotoLightbox = ({ initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState(null);
  const overlayRef = useRef(null);
  
  const totalPhotos = allPhotosFlat.length;
  const currentPhoto = allPhotosFlat[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(totalPhotos - 1, prev + 1));
  }, [totalPhotos]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalPhotos - 1;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext, hasPrev, hasNext]);

  // Prevent background scrolling
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const preventScroll = (e) => e.preventDefault();
    el.addEventListener('wheel', preventScroll, { passive: false });
    el.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      el.removeEventListener('wheel', preventScroll);
      el.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  // Swipe support
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // threshold of 50px for swipe
    if (diff > 50 && hasNext) {
      handleNext();
    } else if (diff < -50 && hasPrev) {
      handlePrev();
    }
    setTouchStart(null);
  };

  if (!currentPhoto) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Photo carousel"
    >
      <LightboxHeader
        onClose={onClose}
        title={currentPhoto.category}
        currentIndex={currentPhoto.displayIndex}
        totalPhotos={totalPhotos}
      />
      
      <div 
        className={styles.body}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <LightboxNavArrows
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
        
        <div className={styles.imageWrap}>
          {/* We use a key based on the image id to trigger animation if needed,
              but for simplicity and performance we just let React update the src */}
          <img
            key={currentPhoto.id}
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className={styles.image}
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoLightbox;
