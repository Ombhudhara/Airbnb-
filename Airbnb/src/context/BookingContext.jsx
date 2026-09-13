/**
 * src/context/BookingContext.jsx
 *
 * Shared booking/date-selection state.
 * Consumed by:
 *   - StickySubNav  (displays price summary for selected dates)
 *   - BookingSidebar (Section 19 — full booking widget)
 *   - Calendar       (Section 11 — date picker)
 *
 * Usage:
 *   1. Already wrapped at the Listing page level.
 *   2. Call useBooking() inside any child component.
 */

import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import listing from '../data/listing';
import { isBefore, isSameDay, addDays, diffNights, startOfDay } from '../utils/date';

/* ─────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────── */

/** Format a price in INR with Indian comma grouping */
export const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

/* ─────────────────────────────────────────────────────────────
   Context
   ───────────────────────────────────────────────────────────── */
const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  // Maximum stay limit
  const MAX_NIGHTS = 15;

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return listing.defaultStayNights;
    return diffNights(checkIn, checkOut);
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(
    () => listing.pricePerNight * nights,
    [nights]
  );

  const clearDates = useCallback(() => {
    setCheckIn(null);
    setCheckOut(null);
  }, []);

  /** The absolute maximum date that can be selected based on the 15-night cap */
  const maxCheckoutDate = useMemo(() => {
    if (!checkIn) return null;
    return addDays(checkIn, MAX_NIGHTS);
  }, [checkIn]);

  /** Shared logic for step-1 / step-2 date picking */
  const selectDate = useCallback((date) => {
    const today = startOfDay(new Date());
    if (isBefore(date, today)) return; // Past dates are always invalid

    if (!checkIn) {
      // Step 1: No dates selected yet
      setCheckIn(date);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      // Step 2: Check-in exists, picking checkout
      if (isBefore(date, checkIn)) {
        // If they click before check-in, just move the check-in to that date
        setCheckIn(date);
      } else if (isSameDay(date, checkIn)) {
        // Do nothing if same day
        return;
      } else {
        // If it's valid, set checkout. But first verify it doesn't exceed MAX_NIGHTS
        if (diffNights(checkIn, date) <= MAX_NIGHTS) {
          setCheckOut(date);
        } else {
          // If they click beyond max nights, we restart the flow with this date as the new checkIn
          setCheckIn(date);
        }
      }
    } else {
      // Step 3: Both dates set, clicking again restarts the flow
      setCheckIn(date);
      setCheckOut(null);
    }
  }, [checkIn, checkOut]);

  const value = {
    checkIn,
    checkOut,
    guests,
    nights,
    totalPrice,
    pricePerNight: listing.pricePerNight,
    currency: listing.currency,
    maxCheckoutDate,
    MAX_NIGHTS,
    setGuests,
    clearDates,
    selectDate,
    formatINR,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
};
