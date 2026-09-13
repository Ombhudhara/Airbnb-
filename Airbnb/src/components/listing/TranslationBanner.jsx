/**
 * src/components/listing/TranslationBanner.jsx
 *
 * Translation notice displayed above the listing description.
 */

import { useState, useRef } from 'react';
import styles from './TranslationBanner.module.css';

const TranslationBanner = () => {
  const [isOriginal, setIsOriginal] = useState(false);
  const buttonRef = useRef(null);

  const toggleTranslation = () => {
    setIsOriginal(!isOriginal);
    
    // As per requirement: "if it swaps the description text below, move focus sensibly afterward"
    // Since we don't have the actual description element yet to move focus to,
    // we keep focus on the button to ensure a smooth keyboard experience for now.
    // When the Description component is built, this can be updated to focus the description header.
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  return (
    <section className={styles.banner} aria-label="Translation notice">
      <div className={styles.text}>
        <span>Some info has been automatically translated.</span>
        <button
          ref={buttonRef}
          type="button"
          className={styles.button}
          onClick={toggleTranslation}
          aria-label={isOriginal ? "Show translated text" : "Show original, untranslated text"}
        >
          {isOriginal ? "Show translation" : "Show original"}
        </button>
      </div>
    </section>
  );
};

export default TranslationBanner;
