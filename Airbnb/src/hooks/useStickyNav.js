/**
 * src/hooks/useStickyNav.js
 *
 * Returns `isSticky` (true once the gallery sentinel scrolls above the
 * top of the viewport) and `setSentinelEl` — a callback ref to attach
 * to the 1px sentinel element placed below the Gallery.
 *
 * Strategy: use a scroll listener with getBoundingClientRect for
 * reliability across all viewport sizes and content heights.
 *
 * @returns {{ isSticky: boolean, setSentinelEl: (el: HTMLElement|null) => void }}
 */

import { useState, useCallback, useRef, useEffect } from 'react';

const NAVBAR_HEIGHT = 80; // matches --navbar-height token

const useStickyNav = () => {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelElRef = useRef(null);

  /* Check sentinel position on every scroll tick */
  const checkSticky = useCallback(() => {
    const el = sentinelElRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Sticky when the sentinel's top edge is AT or above 0 (top of viewport)
    setIsSticky(rect.top <= 0);
  }, []);

  /* Attach/detach scroll listener whenever the sentinel element changes */
  const setSentinelEl = useCallback(
    (el) => {
      sentinelElRef.current = el;
      if (el) {
        // Run once immediately to set initial state correctly
        const rect = el.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      } else {
        setIsSticky(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', checkSticky, { passive: true });
    // Also re-check on resize
    window.addEventListener('resize', checkSticky, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkSticky);
      window.removeEventListener('resize', checkSticky);
    };
  }, [checkSticky]);

  return { isSticky, setSentinelEl };
};

export default useStickyNav;
