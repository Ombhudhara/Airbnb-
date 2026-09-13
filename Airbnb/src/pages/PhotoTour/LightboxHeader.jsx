import React from 'react';
import styles from './LightboxHeader.module.css';

/* ⠿ Grid icon — returns to tour page */
const GridIcon = () => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    style={{ display: 'block', fill: 'currentColor', height: 16, width: 16 }}
  >
    <circle cx="3" cy="3" r="1.5" />
    <circle cx="8" cy="3" r="1.5" />
    <circle cx="13" cy="3" r="1.5" />
    <circle cx="3" cy="8" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="13" cy="8" r="1.5" />
    <circle cx="3" cy="13" r="1.5" />
    <circle cx="8" cy="13" r="1.5" />
    <circle cx="13" cy="13" r="1.5" />
  </svg>
);

/* ✕ Close icon */
const CloseIcon = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    style={{ display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentColor', strokeWidth: 3, overflow: 'visible' }}
  >
    <path d="m6 6 20 20M26 6 6 26" />
  </svg>
);

const LightboxHeader = ({ onClose, title, currentIndex, totalPhotos }) => {
  return (
    <header className={styles.header}>
      <div className={styles.leftCol}>
        <button
          type="button"
          className={styles.btn}
          aria-label="Back to photo grid"
          onClick={onClose}
        >
          <GridIcon />
        </button>
      </div>

      <div className={styles.titleCol}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.rightCol}>
        <span className={styles.counter} aria-live="polite">
          {currentIndex} of {totalPhotos}
        </span>
        <button
          type="button"
          className={styles.btn}
          aria-label="Close lightbox"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </header>
  );
};

export default LightboxHeader;
