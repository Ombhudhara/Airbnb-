/**
 * src/utils/date.js
 *
 * Lightweight utilities for date math without relying on external libraries.
 * All functions operate on native Date objects and ignore time components by resetting them.
 */

/** Removes time component to ensure safe date comparisons */
export const startOfDay = (date) => {
  if (!date) return null;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const isBefore = (d1, d2) => {
  if (!d1 || !d2) return false;
  return startOfDay(d1).getTime() < startOfDay(d2).getTime();
};

export const isAfter = (d1, d2) => {
  if (!d1 || !d2) return false;
  return startOfDay(d1).getTime() > startOfDay(d2).getTime();
};

export const isBetween = (date, start, end) => {
  if (!date || !start || !end) return false;
  const time = startOfDay(date).getTime();
  return time > startOfDay(start).getTime() && time < startOfDay(end).getTime();
};

export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const diffNights = (d1, d2) => {
  if (!d1 || !d2) return 0;
  const ms = startOfDay(d2).getTime() - startOfDay(d1).getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
};

/**
 * Generates an array of Date objects representing the days in the calendar grid for a given month.
 * It pads the start with nulls to align the 1st of the month with the correct weekday column.
 */
export const getMonthGrid = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
  
  const grid = [];
  
  // Pad empty slots before the 1st of the month
  for (let i = 0; i < startDayOfWeek; i++) {
    grid.push(null);
  }
  
  // Fill actual dates
  for (let day = 1; day <= daysInMonth; day++) {
    grid.push(new Date(year, month, day));
  }
  
  return grid;
};

/** Formats a Date object to "October 2026" */
export const formatMonthYear = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
};

/** Formats a Date object to "Oct 18" */
export const formatShortDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

/** Formats a Date object for Screen Readers (e.g. "October 18, 2026") */
export const formatAriaDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};
