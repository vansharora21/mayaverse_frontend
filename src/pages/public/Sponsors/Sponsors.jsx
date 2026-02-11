import React, { useState, useEffect, useRef } from 'react';
import { getSponsors } from '../../../services/mockData';
import { useGSAP } from '../../../animations/hooks/useGSAP';
import styles from './Sponsors.module.css';

/**
 * MAYAVERSE - Sponsors Page (Pact Chamber)
 * 
 * Displays sponsors organized by tier.
 * 
 * ANIMATIONS:
 * - Pillar scroll animation (vertical scroll mapped to pillar movement)
 * - Active pillar highlighting
 * - Background lighting shifts
 * - Tier section reveals
 * 
 * To enable full animations, implement SponsorsAnimations.js from the guide
 */

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs for animated elements
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const pillarsContainerRef = useRef(null);
  const bgElementRef = useRef(null);

  // Simple entrance animation (can be enhanced with SponsorsAnimations.js)
  useGSAP(() => {
    if (!heroTitleRef.current) return;

    const { gsap } = window;
    if (!gsap) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(heroTitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
    })
    .from(heroSubtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.6');

    return () => tl.kill();
  }, []);

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
    <div className={styles.sponsorsPage} ref={bgElementRef}>
      {/* Hero Section - Pact Chamber */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 ref={heroTitleRef} className={styles.pageTitle}>Our Sponsors</h1>
          <p ref={heroSubtitleRef} className={styles.pageSubtitle}>
            Thanks to our amazing partners for making this event possible
          </p>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className={styles.sponsorsSection} ref={pillarsContainerRef}>
        <div className={styles.container}>
          {Object.entries(sponsorsByTier).map(([tier, tierSponsors]) => (
            tierSponsors.length > 0 && (
              <div 
                key={tier} 
                className={styles.tierSection}
                data-tier-section
                data-sponsor-pillar
              >
                <h2 className={styles.tierTitle}>{tier} Sponsors</h2>
                <div className={styles.sponsorsGrid}>
                  {tierSponsors.map(sponsor => (
                    <div 
                      key={sponsor.id} 
                      className={styles.sponsorCard}
                      data-sponsor-card
                    >
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