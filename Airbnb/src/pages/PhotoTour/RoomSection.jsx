import React from 'react';
import styles from './RoomSection.module.css';
import ImageMosaic from './ImageMosaic';

const RoomSection = ({ categoryData, onPhotoClick }) => {
  const { id, category, amenities, images } = categoryData;
  const hasAmenities = amenities && amenities.length > 0;
  const subtitle = hasAmenities ? amenities.join(' · ') : null;

  return (
    <section id={id} className={styles.section} aria-label={`${category} photos`}>
      <div className={styles.leftCol}>
        <h2 className={styles.title}>{category}</h2>
        {subtitle && <p className={styles.amenities}>{subtitle}</p>}
      </div>
      <div className={styles.rightCol}>
        <ImageMosaic images={images} onPhotoClick={onPhotoClick} categoryName={category} />
      </div>
    </section>
  );
};

export default RoomSection;
