import React, { useState, useEffect } from 'react';
import { getSponsors } from '../../../services/mockData';
import styles from './Sponsors.module.css';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      const response = await getSponsors();
      setSponsors(response.sponsors);
      setLoading(false);
    } catch (error) {
      console.error('Error loading sponsors:', error);
      setLoading(false);
    }
  };

  const sponsorsByTier = {
    Platinum: sponsors.filter(s => s.tier === 'Platinum'),
    Gold: sponsors.filter(s => s.tier === 'Gold'),
    Silver: sponsors.filter(s => s.tier === 'Silver'),
    Bronze: sponsors.filter(s => s.tier === 'Bronze'),
  };

  if (loading) return <div className={styles.loading}>Loading sponsors...</div>;

  return (
    <div className={styles.sponsorsPage}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Our Sponsors</h1>
          <p className={styles.pageSubtitle}>
            Thanks to our amazing partners for making this event possible
          </p>
        </div>
      </section>

      <section className={styles.sponsorsSection}>
        <div className={styles.container}>
          {Object.entries(sponsorsByTier).map(([tier, tierSponsors]) => (
            tierSponsors.length > 0 && (
              <div key={tier} className={styles.tierSection}>
                <h2 className={styles.tierTitle}>{tier} Sponsors</h2>
                <div className={styles.sponsorsGrid}>
                  {tierSponsors.map(sponsor => (
                    <div key={sponsor.id} className={styles.sponsorCard}>
                      <div className={styles.sponsorLogo}>
                        <div className={styles.logoPlaceholder}>{sponsor.name[0]}</div>
                      </div>
                      <h3 className={styles.sponsorName}>{sponsor.name}</h3>
                      <p className={styles.sponsorDescription}>{sponsor.description}</p>
                      <a 
                        href={sponsor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.sponsorLink}
                      >
                        Visit Website →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sponsors;