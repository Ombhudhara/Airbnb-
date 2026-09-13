/**
 * src/components/layout/ListingLayout.jsx
 *
 * A two-column shell used on desktop for the listing page.
 * The left column holds all sequential sections (Overview -> NearbyStays).
 * The right column holds the sticky BookingSidebar.
 */

import styles from './ListingLayout.module.css';

const ListingLayout = ({ leftContent, rightContent }) => {
  return (
    <div className={styles.layoutContainer}>
      {/* Left Column: Scrolling content */}
      <div className={styles.leftColumn}>
        {leftContent}
      </div>

      {/* Right Column: Sticky container */}
      <div className={styles.rightColumn}>
        <div className={styles.stickySidebar}>
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default ListingLayout;
