/**
 * src/components/listing/HostSection.jsx
 *
 * Renders the "Meet Your Host" section including host stats, co-hosts, and bio information.
 */

import { useState } from 'react';
import listing from '../../data/listing';
import styles from './HostSection.module.css';

// Reusable icons
const VerifiedBadgeIcon = () => (
  <svg className={styles.badgeIcon} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M12.33 24.33l-7.33-7.33 1.88-1.88 5.45 5.45 13.45-13.45 1.88 1.88z" />
  </svg>
);

const BalloonIcon = () => (
  <svg className={styles.bioIcon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="16" cy="12" r="8" />
    <path d="M16 20v10M12 28h8" />
  </svg>
);

const GraduationIcon = () => (
  <svg className={styles.bioIcon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 4L2 11l14 7 14-7-14-7z" />
    <path d="M6 13v8c0 3 4 5 10 5s10-2 10-5v-8" />
  </svg>
);

const WorkIcon = () => (
  <svg className={styles.bioIcon} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="10" width="24" height="18" rx="2" />
    <path d="M10 10V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v4" />
  </svg>
);

const StarIcon = () => (
  <svg className={styles.statStar} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.621 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
  </svg>
);


const HostSection = () => {
  const { host, guestFavourite } = listing;

  // Prepare the main host data in the same shape as co-hosts to allow switching
  const mainHostData = {
    name: host.name,
    avatarUrl: host.avatarUrl,
    reviewsCount: guestFavourite.reviewCount,
    rating: guestFavourite.rating,
    yearsHosting: host.yearsHosting,
    bio: host.bio,
    isMainHost: true,
  };

  const [selectedHost, setSelectedHost] = useState(mainHostData);

  // Combine main host and co-hosts for the selectable grid
  const allHosts = [mainHostData, ...(host.coHosts || [])];

  const renderBioIcon = (iconName) => {
    switch (iconName) {
      case 'balloon': return <BalloonIcon />;
      case 'graduation': return <GraduationIcon />;
      case 'work': return <WorkIcon />;
      default: return <BalloonIcon />;
    }
  };

  // Helper to color fallback initials randomly like the screenshot
  const getInitialColor = (idx) => {
    const colors = ['#FBE3EB', '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5'];
    return colors[idx % colors.length];
  };
  const getTextColor = (idx) => {
    const colors = ['#C13554', '#1565C0', '#2E7D32', '#EF6C00', '#6A1B9A'];
    return colors[idx % colors.length];
  };

  return (
    <section className={styles.section} aria-labelledby="host-heading">
      <h2 id="host-heading" className={styles.heading}>Meet your host</h2>

      <div className={styles.layout}>
        {/* ── Left Column ── */}
        <div className={styles.leftCol}>
          {/* Main Host Card */}
          <div className={styles.hostCard}>
            <div className={styles.cardLeft}>
              <div className={styles.avatarWrapper}>
                <img src={selectedHost.avatarUrl} alt={`${selectedHost.name}'s profile`} className={styles.avatar} />
                {selectedHost.isMainHost && (
                  <div className={styles.badge} aria-label="Identity verified" role="img">
                    <VerifiedBadgeIcon />
                  </div>
                )}
              </div>
              <h3 className={styles.hostName}>{selectedHost.name}</h3>
              <p className={styles.hostSubtext}>{selectedHost.isMainHost ? 'Host' : 'Co-Host'}</p>
            </div>

            <div className={styles.cardRight}>
              <div className={styles.statRow}>
                <span className={styles.statValue}>{selectedHost.reviewsCount ?? 0}</span>
                <span className={styles.statLabel}>Reviews</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statValue}>
                  {selectedHost.rating ?? 0}
                  <StarIcon />
                </span>
                <span className={styles.statLabel}>Rating</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statValue}>{selectedHost.yearsHosting ?? 0}</span>
                <span className={styles.statLabel}>Years hosting</span>
              </div>
            </div>
          </div>

          {/* Bio Rows */}
          {selectedHost.bio && selectedHost.bio.length > 0 && (
            <div className={styles.bioList}>
              {selectedHost.bio.map((item, idx) => (
                <div key={idx} className={styles.bioRow}>
                  {renderBioIcon(item.icon)}
                  <p className={styles.bioText}>{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right Column ── */}
        <div className={styles.rightCol}>
          {/* Co-Hosts */}
          {allHosts.length > 1 && (
            <>
              <h3 className={styles.subHeading}>Co-Hosts</h3>
              <div className={styles.coHostsList}>
                {allHosts.map((h, idx) => {
                  const isActive = selectedHost.name === h.name;
                  return (
                    <button 
                      key={idx} 
                      className={`${styles.coHostItem} ${isActive ? styles.active : ''}`}
                      onClick={() => setSelectedHost(h)}
                      aria-pressed={isActive}
                    >
                      {h.avatarUrl ? (
                        <img src={h.avatarUrl} alt={`${h.name} profile`} className={styles.coHostAvatar} />
                      ) : (
                        <div 
                          className={styles.coHostInitials} 
                          aria-label={h.name}
                          style={{ backgroundColor: getInitialColor(idx), color: getTextColor(idx) }}
                        >
                          {h.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <p className={styles.coHostName}>{h.name}</p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Host Details */}
          <h3 className={styles.subHeading}>Host details</h3>
          <div className={styles.detailsList}>
            <p className={styles.detailRow}>Response rate: {host.responseRate}</p>
            <p className={styles.detailRow}>Responds {host.responseTime}</p>
          </div>

          {/* Message Button */}
          <button type="button" className={styles.messageBtn}>
            Message host
          </button>
        </div>
      </div>
    </section>
  );
};

export default HostSection;
