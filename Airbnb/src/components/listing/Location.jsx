/**
 * src/components/listing/Location.jsx
 *
 * Renders the Location section including a stylized CSS map and the neighbourhood description.
 */

import listing from '../../data/listing';
import ExpandableText from '../ui/ExpandableText';
import styles from './Location.module.css';

const HomeIcon = () => (
  <svg className={styles.pinIcon} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M16 2.372l12 9.544V29.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11.916l12-9.544zm0 2.556L6 12.879V28.5h7v-9h6v9h7V12.879L16 4.928z" />
  </svg>
);

const SearchIcon = () => (
  <svg className={styles.searchIcon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3l9 9" />
  </svg>
);

const PlusIcon = () => (
  <svg className={styles.zoomIcon} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M26 15H17V6h-2v9H6v2h9v9h2v-9h9v-2z" />
  </svg>
);

const MinusIcon = () => (
  <svg className={styles.zoomIcon} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M26 15H6v2h20v-2z" />
  </svg>
);

const Location = () => {
  const { location, neighbourhoodHighlights } = listing;
  const locationString = `${location.city}, ${location.state}, ${location.country}`;

  return (
    <section className={styles.section} aria-labelledby="location-heading">
      <h2 id="location-heading" className={styles.heading}>Where you’ll be</h2>
      <p className={styles.locationText}>{locationString}</p>

      {/* Stylized Static Map */}
      <div className={styles.mapContainer} aria-hidden="true">
        {/* Abstract shapes */}
        <div className={styles.waterArea} />
        <div className={styles.highlightCircle1} />
        <div className={styles.highlightCircle2} />

        {/* Central Pin */}
        <div className={styles.pinMarker}>
          <HomeIcon />
        </div>

        {/* Floating Controls */}
        <button type="button" className={styles.searchBtn} aria-label="Search this area">
          <SearchIcon />
        </button>

        <div className={styles.zoomControls}>
          <button type="button" className={styles.zoomBtn} aria-label="Zoom in">
            <PlusIcon />
          </button>
          <button type="button" className={styles.zoomBtn} aria-label="Zoom out">
            <MinusIcon />
          </button>
        </div>
      </div>
      
      {/* Visually hidden description of the map for screen readers */}
      <div className="sr-only">
        Map showing the location of the property in {locationString}. Exact location will be provided after booking.
      </div>

      <p className={styles.mapCaption}>Exact location will be provided after booking.</p>

      <h3 className={styles.subHeading}>Neighbourhood highlights</h3>
      <ExpandableText text={neighbourhoodHighlights} clampLineCount={4} id="neighbourhood-text" />
    </section>
  );
};

export default Location;
