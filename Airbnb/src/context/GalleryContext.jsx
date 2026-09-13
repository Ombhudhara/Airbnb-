/**
 * src/context/GalleryContext.jsx
 *
 * Shared gallery/lightbox state consumed by:
 *   - Gallery     (opens photo tour or lightbox to a specific index)
 *   - PhotoTour   (full-screen grid overlay — Section 19)
 *   - LightBox    (single-image overlay — Section 19)
 *
 * Usage:
 *   1. Wrap the page (or app root) with <GalleryProvider>
 *   2. Call useGallery() inside any child component
 */

import { createContext, useContext, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────
   Context shape
   ───────────────────────────────────────────────────────────── */
const GalleryContext = createContext(null);

/* ─────────────────────────────────────────────────────────────
   Provider
   ───────────────────────────────────────────────────────────── */
export const GalleryProvider = ({ children }) => {
  /** true → full photo-tour grid overlay is open */
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);

  /** true → single-image lightbox overlay is open */
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  /** Index of the photo currently focused in either overlay */
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // ── Actions ────────────────────────────────────────────────

  /** Open the photo-tour grid overlay, optionally jumping to a photo */
  const openPhotoTour = useCallback((index = 0) => {
    setCurrentPhotoIndex(index);
    setIsPhotoTourOpen(true);
    setIsLightboxOpen(false);
  }, []);

  /** Open the lightbox (single-image) to a specific photo */
  const openLightbox = useCallback((index = 0) => {
    setCurrentPhotoIndex(index);
    setIsLightboxOpen(true);
    setIsPhotoTourOpen(false);
  }, []);

  /** Close whichever overlay is active */
  const closeOverlay = useCallback(() => {
    setIsPhotoTourOpen(false);
    setIsLightboxOpen(false);
  }, []);

  /** Navigate to prev/next photo within the active overlay */
  const goTo = useCallback((index) => {
    setCurrentPhotoIndex(index);
  }, []);

  const value = {
    isPhotoTourOpen,
    isLightboxOpen,
    currentPhotoIndex,
    openPhotoTour,
    openLightbox,
    closeOverlay,
    goTo,
  };

  return (
    <GalleryContext.Provider value={value}>
      {children}
    </GalleryContext.Provider>
  );
};

/* ─────────────────────────────────────────────────────────────
   Hook
   ───────────────────────────────────────────────────────────── */
export const useGallery = () => {
  const ctx = useContext(GalleryContext);
  if (!ctx) {
    throw new Error('useGallery must be used inside <GalleryProvider>');
  }
  return ctx;
};
