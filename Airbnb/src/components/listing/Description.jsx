/**
 * src/components/listing/Description.jsx
 *
 * Renders the property description using the reusable ExpandableText component.
 */

import listing from '../../data/listing';
import ExpandableText from '../ui/ExpandableText';
import styles from './Description.module.css';

const Description = () => (
  <section className={styles.section} aria-label="About this space">
    <ExpandableText
      text={listing.description}
      clampLineCount={3}
      id="property-description"
    />
  </section>
);

export default Description;
