import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, APP_NAME, APP_TAGLINE } from '../../../constants/config';
import styles from './Home.module.css';

/**
 * MAYAVERSE - Home Page
 * 
 * Landing page with hero section and quick access to main sections.
 * This page will later have:
 * - Scroll-based animations
 * - Parallax effects
 * - Video backgrounds
 */

const Home = () => {
  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{APP_NAME}</h1>
          <p className={styles.heroTagline}>{APP_TAGLINE}</p>
          <div className={styles.heroButtons}>
            <Link to={ROUTES.EVENTS} className={styles.primaryButton}>
              Explore Events
            </Link>
            <Link to={ROUTES.ABOUT} className={styles.secondaryButton}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Events</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>5000+</div>
              <div className={styles.statLabel}>Participants</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100+</div>
              <div className={styles.statLabel}>Colleges</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>₹10L+</div>
              <div className={styles.statLabel}>Prize Money</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What We Offer</h2>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏆</div>
              <h3 className={styles.featureTitle}>Competitions</h3>
              <p className={styles.featureDescription}>
                Compete in technical, cultural, and gaming events with exciting prizes.
              </p>
              <Link to={ROUTES.EVENTS} className={styles.featureLink}>
                View Events →
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎓</div>
              <h3 className={styles.featureTitle}>Workshops</h3>
              <p className={styles.featureDescription}>
                Learn from industry experts through hands-on workshops and seminars.
              </p>
              <Link to={ROUTES.EVENTS} className={styles.featureLink}>
                Join Workshops →
              </Link>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🛍️</div>
              <h3 className={styles.featureTitle}>Merchandise</h3>
              <p className={styles.featureDescription}>
                Get exclusive techfest merchandise and collectibles.
              </p>
              <Link to={ROUTES.MERCHANDISE} className={styles.featureLink}>
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Join?</h2>
          <p className={styles.ctaText}>
            Register now and be part of the biggest technical fest of the year!
          </p>
          <Link to={ROUTES.SIGNUP} className={styles.ctaButton}>
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;