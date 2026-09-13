/**
 * src/components/booking/Calendar.jsx
 *
 * Availability Calendar (Section 11).
 * Reads/writes to BookingContext. Renders two months.
 * Enforces 15-day limit, renders hover tooltips, handles accessibility.
 */

import { useState, useRef, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  startOfDay,
  isSameDay,
  isBefore,
  isAfter,
  isBetween,
  addMonths,
  getMonthGrid,
  formatMonthYear,
  formatAriaDate,
  diffNights
} from '../../utils/date';
import styles from './Calendar.module.css';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const TODAY = startOfDay(new Date());

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: 16, height: 16 }}>
    <path d="M20 24L12 16L20 8" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" style={{ width: 16, height: 16 }}>
    <path d="M12 24L20 16L12 8" />
  </svg>
);

const Calendar = () => {
  const { checkIn, checkOut, nights, clearDates, selectDate, maxCheckoutDate, MAX_NIGHTS } = useBooking();

  // Ensure viewDate starts at today, or checkIn if set
  const initialView = checkIn ? new Date(checkIn.getFullYear(), checkIn.getMonth(), 1) : new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
  
  const [viewDate, setViewDate] = useState(initialView);
  const [hoverDate, setHoverDate] = useState(null);
  const [focusedDate, setFocusedDate] = useState(null);
  const [announcement, setAnnouncement] = useState('');

  // Throttle aria-live announcements for hover
  const announcementTimeout = useRef(null);

  // Two months to display
  const month1Date = viewDate;
  const month2Date = addMonths(viewDate, 1);

  const month1Grid = getMonthGrid(month1Date.getFullYear(), month1Date.getMonth());
  const month2Grid = getMonthGrid(month2Date.getFullYear(), month2Date.getMonth());

  // Focus management ref
  const dayRefs = useRef({});

  // Dynamic Heading
  let headingText = 'Select check-in date';
  let subText = 'Add your travel dates for exact pricing';
  
  if (checkIn && !checkOut) {
    headingText = `Select checkout date`;
    subText = `up to ${MAX_NIGHTS} nights`;
  } else if (checkIn && checkOut) {
    headingText = `${nights} nights in Candolim`;
    subText = `${formatAriaDate(checkIn)} - ${formatAriaDate(checkOut)}`;
  }

  // Keyboard navigation logic
  const handleGridKeyDown = (e) => {
    if (!focusedDate) return;
    
    let newFocus = null;
    const current = new Date(focusedDate);
    
    switch (e.key) {
      case 'ArrowRight':
        newFocus = new Date(current.setDate(current.getDate() + 1));
        break;
      case 'ArrowLeft':
        newFocus = new Date(current.setDate(current.getDate() - 1));
        break;
      case 'ArrowDown':
        newFocus = new Date(current.setDate(current.getDate() + 7));
        break;
      case 'ArrowUp':
        newFocus = new Date(current.setDate(current.getDate() - 7));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleDayClick(focusedDate);
        return;
      default:
        return;
    }

    if (newFocus) {
      e.preventDefault();
      
      // Ensure we can't focus past dates or dates beyond maxCheckoutDate
      if (isBefore(newFocus, TODAY)) return;
      if (maxCheckoutDate && isAfter(newFocus, maxCheckoutDate)) return;
      
      setFocusedDate(startOfDay(newFocus));
      handleHoverSet(startOfDay(newFocus));

      // Page months if focus leaves the current 2-month view
      if (isBefore(newFocus, month1Date)) {
        setViewDate(new Date(newFocus.getFullYear(), newFocus.getMonth(), 1));
      } else if (isAfter(newFocus, new Date(month2Date.getFullYear(), month2Date.getMonth() + 1, 0))) {
        setViewDate(new Date(newFocus.getFullYear(), newFocus.getMonth() - 1, 1));
      }
    }
  };

  // Sync actual focus with React state focus
  useEffect(() => {
    if (focusedDate) {
      const key = focusedDate.getTime();
      if (dayRefs.current[key]) {
        dayRefs.current[key].focus();
      }
    }
  }, [focusedDate, viewDate]);

  const handleHoverSet = (day) => {
    setHoverDate(day);
    
    if (checkIn && !checkOut && isAfter(day, checkIn)) {
      const hNights = diffNights(checkIn, day);
      if (hNights <= MAX_NIGHTS) {
        if (announcementTimeout.current) clearTimeout(announcementTimeout.current);
        announcementTimeout.current = setTimeout(() => {
          setAnnouncement(`${hNights} nights, checkout ${formatAriaDate(day)}`);
        }, 500); // throttle
      }
    }
  };

  const handleDayClick = (date) => {
    // Rely on BookingContext to handle the actual selection rules
    selectDate(date);
    setFocusedDate(date);
    
    // Announce the action
    if (!checkIn) {
      setAnnouncement(`Check-in selected: ${formatAriaDate(date)}. Select checkout date, up to ${MAX_NIGHTS} nights.`);
    } else if (checkIn && !checkOut) {
      if (isBefore(date, checkIn) || isSameDay(date, checkIn)) {
        setAnnouncement(`Check-in selected: ${formatAriaDate(date)}. Select checkout date, up to ${MAX_NIGHTS} nights.`);
      } else {
        const finalNights = diffNights(checkIn, date);
        if (finalNights <= MAX_NIGHTS) {
          setAnnouncement(`${finalNights} nights selected, ${formatAriaDate(checkIn)} to ${formatAriaDate(date)}.`);
        } else {
          setAnnouncement(`Date exceeds maximum limit. Check-in changed to ${formatAriaDate(date)}.`);
        }
      }
    } else {
      setAnnouncement(`Check-in selected: ${formatAriaDate(date)}. Select checkout date, up to ${MAX_NIGHTS} nights.`);
    }
  };

  const handleNextMonth = () => setViewDate(prev => addMonths(prev, 1));
  const handlePrevMonth = () => {
    const nextPrev = addMonths(viewDate, -1);
    // Don't page completely back to past months where everything is disabled
    if (isBefore(new Date(nextPrev.getFullYear(), nextPrev.getMonth() + 1, 0), TODAY)) return;
    setViewDate(nextPrev);
  };

  // Determine if a date should be shaded
  const getShadingClasses = (date) => {
    if (!date) return '';
    const isStart = isSameDay(date, checkIn);
    const isEnd = isSameDay(date, checkOut);
    
    // Solid range
    let inRange = isBetween(date, checkIn, checkOut);
    
    // Hovering temporary range
    if (checkIn && !checkOut && hoverDate && isAfter(hoverDate, checkIn)) {
      if (isBetween(date, checkIn, hoverDate) || isSameDay(date, hoverDate)) {
        if (!maxCheckoutDate || !isAfter(date, maxCheckoutDate)) {
          inRange = true;
        }
      }
    }

    const classes = [];
    if (inRange) classes.push(styles.inRange);
    if (isStart) classes.push(styles.rangeStart);
    if (isEnd || (isSameDay(date, hoverDate) && checkIn && !checkOut && isAfter(date, checkIn) && (!maxCheckoutDate || !isAfter(date, maxCheckoutDate)))) {
      classes.push(styles.rangeEnd);
    }
    
    return classes.join(' ');
  };

  const renderMonth = (dateObj, gridArray) => (
    <div className={styles.monthBlock} role="grid" aria-label={formatMonthYear(dateObj)} onKeyDown={handleGridKeyDown}>
      <h3 className={styles.monthTitle} aria-hidden="true">{formatMonthYear(dateObj)}</h3>
      
      <div className={styles.grid}>
        {/* Headers */}
        {WEEKDAYS.map(d => (
          <div key={d} className={styles.weekday} role="columnheader">{d}</div>
        ))}
        
        {/* Cells */}
        {gridArray.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} role="gridcell" />;
          
          const isPast = isBefore(day, TODAY);
          const isExceedsLimit = maxCheckoutDate && isAfter(day, maxCheckoutDate);
          const disabled = isPast || isExceedsLimit;
          const selected = isSameDay(day, checkIn) || isSameDay(day, checkOut);
          const shadingClass = getShadingClasses(day);
          const timeKey = day.getTime();
          
          let ariaLabel = formatAriaDate(day);
          if (isSameDay(day, checkIn)) ariaLabel = `Check-in date, ${ariaLabel}`;
          if (isSameDay(day, checkOut)) ariaLabel = `Checkout date, ${ariaLabel}`;
          
          if (isPast) {
             ariaLabel = `${ariaLabel}, unavailable — date has passed`;
          } else if (isExceedsLimit) {
             ariaLabel = `${ariaLabel}, unavailable — exceeds ${MAX_NIGHTS} night maximum`;
          }

          // Tooltip rendering logic
          const showHoverTooltip = checkIn && !checkOut && isSameDay(day, hoverDate) && isAfter(day, checkIn) && !isExceedsLimit;
          const hoverNights = showHoverTooltip ? diffNights(checkIn, day) : 0;

          // Distinct disabled class
          const btnDisabledClass = isExceedsLimit ? styles.disabledMaxLimit : '';

          return (
            <div key={timeKey} className={`${styles.dayCell} ${shadingClass}`} role="gridcell">
              {showHoverTooltip && (
                <div className={styles.hoverTooltip}>{hoverNights} nights</div>
              )}
              
              <button
                ref={el => dayRefs.current[timeKey] = el}
                type="button"
                className={`${styles.dayBtn} ${selected ? styles.selected : ''} ${btnDisabledClass}`}
                onClick={() => !disabled && handleDayClick(day)}
                onMouseEnter={() => !disabled && handleHoverSet(day)}
                onMouseLeave={() => setHoverDate(null)}
                disabled={disabled}
                aria-disabled={disabled}
                aria-label={ariaLabel}
                aria-pressed={selected}
                tabIndex={(!focusedDate && isSameDay(day, TODAY)) || (focusedDate && isSameDay(day, focusedDate)) ? 0 : -1}
              >
                {day.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className={styles.section} aria-labelledby="calendar-heading">
      <div aria-live="polite" className={styles.srOnly}>{announcement}</div>
      
      <div className={styles.headerRow}>
        <div>
          <h2 id="calendar-heading" className={styles.heading}>
            {headingText}
          </h2>
          <p className={styles.subheading}>
            {subText}
          </p>
        </div>
        
        <div className={styles.controls}>
          <button type="button" className={styles.iconBtn} onClick={handlePrevMonth} aria-label="Previous month"
            disabled={isBefore(new Date(addMonths(viewDate, -1).getFullYear(), addMonths(viewDate, -1).getMonth() + 1, 0), TODAY)}
          >
            <ChevronLeft />
          </button>
          <button type="button" className={styles.iconBtn} onClick={handleNextMonth} aria-label="Next month">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.monthsContainer}>
        <div key={viewDate.getTime()} className={styles.slider}>
          {renderMonth(month1Date, month1Grid)}
          {renderMonth(month2Date, month2Grid)}
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.clearBtn} onClick={clearDates}>
          Clear dates
        </button>
      </div>
    </section>
  );
};

export default Calendar;
