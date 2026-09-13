import React from 'react';
import styles from './LightboxNavArrows.module.css';

const ChevronLeft = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    style={{ display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentColor', strokeWidth: 4, overflow: 'visible' }}
  >
    <g fill="none">
      <path d="m20 28-11.2928932-11.2928932c-.3905243-.3905243-.3905243-1.0236893 0-1.4142136l11.2928932-11.2928932" />
    </g>
  </svg>
);

const ChevronRight = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    style={{ display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentColor', strokeWidth: 4, overflow: 'visible' }}
  >
    <g fill="none">
      <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932" />
    </g>
  </svg>
);

const LightboxNavArrows = ({ onPrev, onNext, hasPrev, hasNext }) => {
  return (
    <>
      {hasPrev && (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={onPrev}
          aria-label="Previous photo"
        >
          <ChevronLeft />
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={onNext}
          aria-label="Next photo"
        >
          <ChevronRight />
        </button>
      )}
    </>
  );
};

export default LightboxNavArrows;
