/**
 * src/components/listing/Amenities.jsx
 *
 * "What this place offers" section displaying an amenities grid
 * and a modal for showing all 50 amenities grouped by category.
 */

import { useState, useMemo } from 'react';
import listing from '../../data/listing';
import Modal from '../overlays/Modal';
import { getAmenityIcon } from './AmenityIcons';
import styles from './Amenities.module.css';

const Amenities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Take the first 10 for the quick grid
  const quickAmenities = listing.amenities.slice(0, 10);

  // Group all amenities by category for the modal
  const categorizedAmenities = useMemo(() => {
    return listing.amenities.reduce((acc, amenity) => {
      if (!acc[amenity.category]) acc[amenity.category] = [];
      acc[amenity.category].push(amenity);
      return acc;
    }, {});
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <section className={styles.section} aria-labelledby="amenities-heading">
        <h2 id="amenities-heading" className={styles.heading}>
          What this place offers
        </h2>

        <div className={styles.grid}>
          {quickAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className={`${styles.amenityRow} ${!amenity.available ? styles.unavailable : ''}`}
            >
              {getAmenityIcon(amenity.icon, styles.icon)}
              <p className={styles.label}>
                {amenity.name}
                {!amenity.available && (
                  <span className={styles.srOnly}> — not available</span>
                )}
              </p>
            </div>
          ))}
        </div>

        <button 
          type="button" 
          className={styles.showAllBtn}
          onClick={handleOpenModal}
        >
          Show all 50 amenities
        </button>
      </section>

      {/* Reusable Modal for "Show all amenities" */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title="What this place offers"
      >
        <div className={styles.modalCategories}>
          {Object.entries(categorizedAmenities).map(([category, items]) => (
            <div key={category} className={styles.categoryBlock}>
              <h3>{category}</h3>
              <div className={styles.categoryGrid}>
                {items.map(amenity => (
                  <div 
                    key={amenity.id} 
                    className={`${styles.modalAmenityRow} ${!amenity.available ? styles.unavailable : ''}`}
                  >
                    {getAmenityIcon(amenity.icon, styles.icon)}
                    <p className={styles.label}>
                      {amenity.name}
                      {!amenity.available && (
                        <span className={styles.srOnly}> — not available</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Amenities;
