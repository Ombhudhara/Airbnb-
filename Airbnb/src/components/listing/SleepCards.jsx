/**
 * src/components/listing/SleepCards.jsx
 *
 * "Where you'll sleep" section displaying room cards.
 * Sourced from listing.sleepRooms.
 */

import listing from '../../data/listing';
import { useGallery } from '../../context/GalleryContext';
import styles from './SleepCards.module.css';

const SleepCards = () => {
  const { openPhotoTour } = useGallery();

  return (
    <section className={styles.section} aria-labelledby="sleep-heading">
      <h2 id="sleep-heading" className={styles.heading}>
        Where you'll sleep
      </h2>

      <div className={styles.grid}>
        {listing.sleepRooms.map((room, index) => (
          <button
            key={room.id}
            type="button"
            className={styles.card}
            onClick={() => openPhotoTour(index + 1)} // Map roughly to photo indices
            aria-label={`Show photos of ${room.roomName}, ${room.bedsDescription}`}
          >
            <div className={styles.imageWrap}>
              <img
                className={styles.image}
                src={room.imageUrl}
                alt={room.altText}
                loading="lazy"
              />
            </div>
            <p className={styles.roomName}>{room.roomName}</p>
            <p className={styles.bedsDesc}>{room.bedsDescription}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SleepCards;
