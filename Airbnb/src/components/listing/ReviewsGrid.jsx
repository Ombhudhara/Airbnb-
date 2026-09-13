/**
 * src/components/listing/ReviewsGrid.jsx
 *
 * Renders the 2-column grid of individual reviews and handles the "Show all reviews" modal.
 */

import { useState, useRef } from 'react';
import listing from '../../data/listing';
import ExpandableText from '../ui/ExpandableText';
import Modal from '../overlays/Modal';
import styles from './ReviewsGrid.module.css';

const StarIcon = () => (
  <svg className={styles.starIcon} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.554 1.703l7.292 6.895-1.9 9.596a1 1 0 0 0 1.481 1.061L16 25.951l8.571 4.938a1 1 0 0 0 1.48-1.061l-1.9-9.596 7.293-6.895a1 1 0 0 0-.554-1.703l-9.86-1.27-4.125-8.885a1 1 0 0 0-1.811 0z" />
  </svg>
);

const ReviewCard = ({ review, clampLineCount = 3 }) => {
  const { id, authorName, authorAvatar, memberSince, rating, date, text } = review;
  const initial = authorName ? authorName.charAt(0).toUpperCase() : '?';

  return (
    <article className={styles.reviewCard}>
      <div className={styles.cardHeader}>
        {authorAvatar ? (
          <img src={authorAvatar} alt={`${authorName}'s profile`} className={styles.avatar} />
        ) : (
          <div className={styles.avatarInitials} aria-hidden="true">
            {initial}
          </div>
        )}
        <div className={styles.authorInfo}>
          <h3 className={styles.authorName}>{authorName}</h3>
          <p className={styles.memberSince}>{memberSince}</p>
        </div>
      </div>
      
      <div className={styles.metaRow}>
        <div 
          className={styles.starsRow} 
          role="img" 
          aria-label={`Rated ${rating} out of 5 stars`}
        >
          {[...Array(5)].map((_, i) => (
            // A simple approach: render solid stars up to `rating`, though our mock data only uses 4 and 5
            <span key={i} style={{ opacity: i < Math.floor(rating) ? 1 : 0.3 }}>
              <StarIcon />
            </span>
          ))}
        </div>
        <span aria-hidden="true">·</span>
        <span>{date}</span>
      </div>

      <ExpandableText text={text} clampLineCount={clampLineCount} id={`review-text-${id}`} />
    </article>
  );
};

const ReviewsGrid = () => {
  const { reviews, reviewsOverview } = listing;
  const totalReviews = reviewsOverview?.totalReviews ?? reviews.length;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const triggerRef = useRef(null);

  // We only show up to 6 reviews initially on the grid
  const displayedReviews = reviews.slice(0, 6);

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => {
    setIsModalOpen(false);
    // Return focus to the trigger button
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <section className={styles.section} aria-labelledby="reviews-grid-heading">
      <h2 id="reviews-grid-heading" className="sr-only">Recent Reviews</h2>
      
      <div className={styles.grid}>
        {displayedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <button 
          ref={triggerRef}
          type="button" 
          className={styles.showAllBtn} 
          onClick={openModal}
        >
          Show all {totalReviews} reviews
        </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>All reviews</h2>
          </div>
          <div className={styles.modalContent}>
            {reviews.map((review) => (
              // Inside the modal, we might want more lines or no clamp, but clamping to 6 is a good compromise
              <ReviewCard key={`modal-${review.id}`} review={review} clampLineCount={6} />
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ReviewsGrid;
