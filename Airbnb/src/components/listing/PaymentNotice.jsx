/**
 * src/components/listing/PaymentNotice.jsx
 *
 * Full-width row with a shield icon and payment protection text.
 */

import styles from './PaymentNotice.module.css';

const ShieldOutlineIcon = () => (
  <svg 
    className={styles.icon}
    viewBox="0 0 32 32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    aria-hidden="true"
  >
    <path d="M16 2l12 5.5v7.8c0 8.3-5.2 15-12 16.7-6.8-1.7-12-8.4-12-16.7V7.5L16 2z" />
  </svg>
);

const PaymentNotice = () => {
  return (
    <div className={styles.container}>
      <ShieldOutlineIcon />
      <p className={styles.text}>
        To help protect your payment, always use Airbnb to send money and communicate with hosts.
      </p>
    </div>
  );
};

export default PaymentNotice;
