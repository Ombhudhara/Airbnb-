import { useState } from 'react';
import styles from './PhotoTourHeader.module.css';

const ChevronLeftIcon = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    style={{ display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentColor', strokeWidth: 3, overflow: 'visible' }}
  >
    <g fill="none">
      <path d="m20 28-11.2928932-11.2928932c-.3905243-.3905243-.3905243-1.0236893 0-1.4142136l11.2928932-11.2928932" />
    </g>
  </svg>
);

const ShareIcon = () => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    style={{ display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentColor', strokeWidth: 2, overflow: 'visible' }}
  >
    <path d="M27 12v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V12m11-9v19m0-19 6 6m-6-6-6 6" />
  </svg>
);

const HeartIcon = ({ isFilled }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    style={{
      display: 'block',
      fill: isFilled ? 'var(--color-brand, #FF385C)' : 'none',
      height: 16,
      width: 16,
      stroke: isFilled ? 'var(--color-brand, #FF385C)' : 'currentColor',
      strokeWidth: 2,
      overflow: 'visible',
      transition: 'fill 200ms ease, stroke 200ms ease',
    }}
  >
    <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
  </svg>
);

const PhotoTourHeader = ({ onClose, title = 'Photo tour' }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Photo tour - Romantic Jacuzzi 1BHK Candolim',
          url: window.location.href,
        });
      } catch {
        // User dismissed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftCol}>
        <button
          type="button"
          className={styles.backBtn}
          aria-label="Back to listing"
          onClick={onClose}
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <div className={styles.titleCol}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.rightCol}>
        <button
          type="button"
          className={styles.actionBtn}
          aria-label="Share listing"
          onClick={handleShare}
        >
          <ShareIcon />
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          onClick={() => setIsSaved((prev) => !prev)}
        >
          <HeartIcon isFilled={isSaved} />
        </button>
      </div>
    </header>
  );
};

export default PhotoTourHeader;
