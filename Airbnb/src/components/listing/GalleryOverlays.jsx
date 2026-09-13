/**
 * src/components/listing/GalleryOverlays.jsx
 *
 * This file wraps the new PhotoTour and Lightbox implementations.
 * It is consumed by Listing.jsx.
 */

import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import PhotoTourImpl from '../../pages/PhotoTour';
import PhotoLightboxImpl from '../../pages/PhotoTour/PhotoLightbox';

export const PhotoTour = () => {
  return <PhotoTourImpl />;
};

export const Lightbox = () => {
  const { isLightboxOpen, currentPhotoIndex, closeOverlay } = useGallery();
  
  if (!isLightboxOpen) return null;
  
  return (
    <PhotoLightboxImpl 
      initialIndex={currentPhotoIndex}
      onClose={closeOverlay}
    />
  );
};
