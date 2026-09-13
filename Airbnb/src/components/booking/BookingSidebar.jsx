/**
 * src/components/booking/BookingSidebar.jsx
 *
 * Renders the sticky booking widget (price, date selection form, Reserve CTA).
 * Consumes BookingContext to display selected dates and dynamically calculated prices.
 */

import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import styles from './BookingSidebar.module.css';

const TagIcon = () => (
  <svg className={styles.promoIcon} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M26.29 4.3a2.98 2.98 0 0 0-2.12.87L9.42 19.92a2.98 2.98 0 0 0 0 4.23l4.24 4.24a2.98 2.98 0 0 0 4.24 0L32.65 13.63a2.98 2.98 0 0 0 .87-2.12V6.2A1.9 1.9 0 0 0 31.62 4.3zM25.5 11.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className={styles.guestsChevron} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M11.4 5.2l.7.7-4.5 4.5-4.5-4.5.7-.7L8 9.1l3.4-3.9z" />
  </svg>
);

const FlagIcon = () => (
  <svg className={styles.flagIcon} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M10 2a2 2 0 0 0-2 2v26h2V18h4.5a3 3 0 0 1 1.76.57l1.45 1.05A5 5 0 0 0 20.64 21H28a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7.36a3 3 0 0 1-1.76-.57l-1.45-1.05A5 5 0 0 0 14.5 0H10zm0 2h4.5a3 3 0 0 1 1.76.57l1.45 1.05A5 5 0 0 0 20.64 5H28v14h-7.36a3 3 0 0 1-1.76-.57l-1.45-1.05A5 5 0 0 0 14.5 16H10V4z" />
  </svg>
);

const formatDate = (dateObj) => {
  if (!dateObj) return null;
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const yyyy = dateObj.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

const getCancellationDate = (checkInDate) => {
  if (!checkInDate) return '17 October'; // Default fallback
  const d = new Date(checkInDate);
  d.setDate(d.getDate() - 1); // e.g. day before
  const day = d.getDate();
  const month = d.toLocaleString('en-GB', { month: 'long' });
  return `${day} ${month}`;
};

const BookingSidebar = () => {
  const { 
    checkIn, 
    checkOut, 
    guests, 
    setGuests,
    nights, 
    totalPrice, 
    formatINR 
  } = useBooking();

  const [showGuestPopup, setShowGuestPopup] = useState(false);

  const scrollToCalendar = () => {
    document.getElementById('calendar-heading')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div>
      {/* Promotion Banner */}
      <div className={styles.promoBanner}>
        <div className={styles.promoText}>
          <TagIcon />
          <div>
            <div className={styles.promoTitle}>Get 10% off your next stay.</div>
            <a href="#" className={styles.promoLink}>Terms apply</a>
          </div>
        </div>
        <button type="button" className={styles.promoBtn}>Claim</button>
      </div>

      <div className={styles.sidebarCard}>
        {/* Header */}
        <div className={styles.priceHeader}>
          <span className={styles.priceAmount}>{formatINR(totalPrice)}</span>
          <span className={styles.priceSubtext}>for {nights} night{nights !== 1 ? 's' : ''}</span>
        </div>

        {/* Form Grid */}
        <div className={styles.formGrid}>
          <div className={styles.datesRow}>
            <div className={`${styles.dateField} ${styles.checkIn}`} onClick={scrollToCalendar} role="button" tabIndex="0">
              <span className={styles.label}>Check-In</span>
              <span className={`${styles.value} ${!checkIn ? styles.placeholder : ''}`}>
                {checkIn ? formatDate(checkIn) : 'Add date'}
              </span>
            </div>
            <div className={styles.dateField} onClick={scrollToCalendar} role="button" tabIndex="0">
              <span className={styles.label}>Checkout</span>
              <span className={`${styles.value} ${!checkOut ? styles.placeholder : ''}`}>
                {checkOut ? formatDate(checkOut) : 'Add date'}
              </span>
            </div>
          </div>
          <div 
            className={styles.guestsRow} 
            tabIndex="0" 
            role="button" 
            aria-haspopup="true" 
            aria-expanded={showGuestPopup}
            onClick={() => setShowGuestPopup(!showGuestPopup)}
          >
            <span className={styles.label}>Guests</span>
            <span className={styles.value}>{guests} guest{guests !== 1 ? 's' : ''}</span>
            <ChevronDownIcon />
            
            {/* Guest Popup */}
            {showGuestPopup && (
              <div className={styles.guestPopup} onClick={e => e.stopPropagation()}>
                <div className={styles.guestRow}>
                  <div className={styles.guestInfo}>
                    <h4>Adults</h4>
                    <p>Age 13+</p>
                  </div>
                  <div className={styles.guestControls}>
                    <button 
                      type="button" 
                      className={styles.circleBtn} 
                      disabled={guests <= 1}
                      onClick={() => setGuests(g => Math.max(1, g - 1))}
                    >
                      -
                    </button>
                    <span className={styles.guestCount}>{guests}</span>
                    <button 
                      type="button" 
                      className={styles.circleBtn}
                      disabled={guests >= 10}
                      onClick={() => setGuests(g => Math.min(10, g + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cancellation Notice */}
        <div className={styles.cancellationBanner}>
          Free cancellation before <span>{getCancellationDate(checkIn)}</span>
        </div>

        {/* Reserve Button */}
        <button type="button" className={styles.reserveBtn}>
          Reserve
        </button>

        {/* Charge Notice */}
        <p className={styles.chargeNotice}>You won't be charged yet</p>
      </div>

      {/* Report Listing */}
      <div className={styles.reportContainer}>
        <button type="button" className={styles.reportLink}>
          <FlagIcon />
          Report this listing
        </button>
      </div>
    </div>
  );
};

export default BookingSidebar;
