/**
 * src/components/listing/ThingsToKnow.jsx
 *
 * Renders a 3-column policy grid with modals for "Learn more" details.
 */

import { useState } from 'react';
import listing from '../../data/listing';
import Modal from '../overlays/Modal';
import styles from './ThingsToKnow.module.css';

// Outline Icons
const ClockIcon = () => (
  <svg className={styles.icon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="16" r="14" />
    <path d="M16 8v8l6 4" />
  </svg>
);

const ShieldIcon = () => (
  <svg className={styles.icon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 2l12 5.5v7.8c0 8.3-5.2 15-12 16.7-6.8-1.7-12-8.4-12-16.7V7.5L16 2z" />
  </svg>
);

const CalendarXIcon = () => (
  <svg className={styles.icon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="6" width="24" height="22" rx="2" />
    <path d="M4 14h24M10 3v6M22 3v6M12 20l8 4M20 20l-8 4" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className={styles.chevronIcon} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M5.5 3.5L10 8l-4.5 4.5.7.7L11.4 8 6.2 2.8l-.7.7z" />
  </svg>
);

const ThingsToKnow = () => {
  const { policies } = listing;
  const [activePolicy, setActivePolicy] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'safety': return <ShieldIcon />;
      case 'cancellation': return <CalendarXIcon />;
      case 'houseRules':
      default:
        return <ClockIcon />;
    }
  };

  return (
    <section className={styles.section} aria-labelledby="things-to-know-heading">
      <h2 id="things-to-know-heading" className={styles.heading}>Things to know</h2>

      <div className={styles.grid}>
        {policies.map((policy) => (
          <div key={policy.id} className={styles.column}>
            {getIcon(policy.icon)}
            <h3 className={styles.subheading}>{policy.title}</h3>
            
            <ul className={styles.itemList}>
              {policy.items.map((item, idx) => (
                <li key={idx} className={styles.item}>{item}</li>
              ))}
            </ul>

            {policy.fullPolicyText && (
              <button 
                type="button" 
                className={styles.learnMoreBtn}
                onClick={() => setActivePolicy(policy)}
                aria-label={`Learn more about ${policy.title}`}
              >
                Learn more
                <ChevronRightIcon />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Shared Modal for Full Policy Text */}
      <Modal 
        isOpen={!!activePolicy} 
        onClose={() => setActivePolicy(null)}
        ariaLabel={activePolicy ? `${activePolicy.title} details` : 'Policy details'}
      >
        {activePolicy && (
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{activePolicy.title}</h2>
            </div>
            <div className={styles.modalContent}>
              <p>{activePolicy.fullPolicyText}</p>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
};

export default ThingsToKnow;
