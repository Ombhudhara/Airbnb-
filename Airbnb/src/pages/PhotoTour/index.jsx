import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.css';
import { useGallery } from '../../context/GalleryContext';
import PhotoTourHeader from './PhotoTourHeader';
import CategoryThumbnailNav from './CategoryThumbnailNav';
import RoomSection from './RoomSection';
import PhotoLightbox from './PhotoLightbox';
import { enrichedCategories as photoCategories, allPhotosFlat } from '../../data/photoTourData';

const PhotoTour = () => {
  const { 
    isPhotoTourOpen, 
    closeOverlay 
  } = useGallery();

  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const [localLightboxOpen, setLocalLightboxOpen] = useState(false);
  const pageRef = useRef(null);

  // Prevent background scrolling when tour is open
  useEffect(() => {
    if (isPhotoTourOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setLocalLightboxOpen(false); // reset when closed
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPhotoTourOpen]);

  // Lock Tour Page scrolling when lightbox is open WITHOUT jumping
  useLayoutEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    if (localLightboxOpen) {
      // Save current scroll position
      const currentScroll = el.scrollTop;
      el.style.overflowY = 'hidden';
      // Force scroll position to remain exactly where it was
      el.scrollTop = currentScroll;
    } else {
      const currentScroll = el.scrollTop;
      el.style.overflowY = 'auto';
      el.scrollTop = currentScroll;
    }
  }, [localLightboxOpen]);

  if (!isPhotoTourOpen) return null;

  const handlePhotoClick = (photoId) => {
    const globalIndex = allPhotosFlat.findIndex(p => p.id === photoId);
    setLightboxInitialIndex(globalIndex !== -1 ? globalIndex : 0);
    setLocalLightboxOpen(true);
  };

  return (
    <div 
      ref={pageRef}
      className={styles.page} 
      role="dialog" 
      aria-modal="true" 
      aria-label="Photo tour"
    >
      <PhotoTourHeader onClose={closeOverlay} />
      
      <div className={styles.content}>
        <CategoryThumbnailNav categories={photoCategories} />
        
        {/* We need a little spacing between nav and the first section */}
        <div style={{ height: '32px' }} />

        {photoCategories.map((category) => (
          <RoomSection 
            key={category.id}
            categoryData={category}
            onPhotoClick={handlePhotoClick}
          />
        ))}
      </div>

      {localLightboxOpen && createPortal(
        <PhotoLightbox 
          initialIndex={lightboxInitialIndex}
          onClose={() => setLocalLightboxOpen(false)}
        />,
        document.body
      )}
    </div>
  );
};

export default PhotoTour;
