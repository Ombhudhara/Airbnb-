/**
 * src/components/ui/ExpandableText.jsx
 *
 * Reusable component that clamps text to a given number of lines.
 * Provides a "Show more" / "Show less" toggle.
 */

import { useState, useRef, useEffect } from 'react';
import styles from './ExpandableText.module.css';

const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    style={{ width: '10px', height: '10px', display: 'inline-block', marginLeft: '4px' }}
  >
    <path d="M12 8 L20 16 L12 24" />
  </svg>
);

const ExpandableText = ({ text, clampLineCount = 3, id = "property-description" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef(null);
  const [needsClamp, setNeedsClamp] = useState(true);

  useEffect(() => {
    if (!text) {
      setNeedsClamp(false);
      return;
    }
    // If text is longer than 140 characters, it will definitely exceed 3 lines
    if (text.length > 140) {
      setNeedsClamp(true);
      return;
    }
    if (textRef.current) {
      const isOverflow = textRef.current.scrollHeight > textRef.current.clientHeight + 4;
      setNeedsClamp(isOverflow);
    }
  }, [text, clampLineCount]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.textContainer}
        style={{
          '--clamp-lines': clampLineCount,
        }}
      >
        <p
          id={id}
          ref={textRef}
          className={`${styles.text} ${!isExpanded && needsClamp ? styles.clamped : ''}`}
        >
          {text}
        </p>
      </div>

      {needsClamp && (
        <button
          type="button"
          onClick={handleToggle}
          className={styles.toggleButton}
          aria-expanded={isExpanded}
          aria-controls={id}
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronIcon />
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
