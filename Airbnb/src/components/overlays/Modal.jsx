/**
 * src/components/overlays/Modal.jsx
 *
 * Reusable modal overlay using React Portals.
 * Features:
 * - Slide up / fade in animation
 * - Escape key to close
 * - Focus trap while open
 * - Returns focus to the element that opened it upon closing
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, children, ariaLabel }) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      previousFocusRef.current = document.activeElement;
      
      // Delay visibility toggle slightly to ensure DOM mounts first (for CSS transition)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
      
      document.body.style.overflow = 'hidden';
    } else if (isRendered) {
      setIsVisible(false);
      
      // Wait for CSS transition (300ms) before unmounting
      const timer = setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = '';
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isRendered]);

  // Focus trap and Escape key handler
  useEffect(() => {
    if (!isVisible) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  // Focus the close button when opened
  useEffect(() => {
    if (isVisible && modalRef.current) {
      const closeBtn = modalRef.current.querySelector('button');
      if (closeBtn) closeBtn.focus();
    }
  }, [isVisible]);

  // Cleanup body overflow on unmount just in case
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isRendered) return null;

  return createPortal(
    <div 
      className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}
      onClick={(e) => {
        // Close if clicking directly on the overlay backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={styles.modal} 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
      >
        <div className={styles.header}>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true" focusable="false">
              <path d="M6 6 L26 26 M26 6 L6 26" />
            </svg>
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
