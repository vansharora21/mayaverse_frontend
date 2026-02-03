import React from 'react';
import { APP_NAME } from '../../../constants/config';
import styles from './About.module.css';

/**
 * MAYAVERSE - About Page
 * 
 * Information about the techfest, vision, mission, and team.
 */

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>About {APP_NAME}</h1>
          <p className={styles.pageSubtitle}>
            India's premier technical festival bringing together innovation, technology, and talent
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <h2>Our Vision</h2>
            <p>
              {APP_NAME} aims to be the epicenter of technological innovation and creativity, 
              providing a platform for students to showcase their skills, learn from experts, 
              and network with industry leaders.
            </p>

            <h2>Our Mission</h2>
            <p>
              To create an inclusive environment that fosters innovation, encourages healthy 
              competition, and bridges the gap between academic learning and industry requirements.
            </p>

            <h2>What We Do</h2>
            <p>
              We organize a wide range of events including technical competitions, workshops, 
              cultural performances, and gaming tournaments. With over 50+ events and 5000+ 
              participants from 100+ colleges, we are one of the largest techfests in the country.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>🚀 Innovation</h3>
              <p>Pushing boundaries and thinking beyond limits</p>
            </div>
            <div className={styles.valueCard}>
              <h3>🤝 Collaboration</h3>
              <p>Building connections and working together</p>
            </div>
            <div className={styles.valueCard}>
              <h3>💡 Excellence</h3>
              <p>Striving for the highest standards in everything</p>
            </div>
            <div className={styles.valueCard}>
              <h3>🎯 Impact</h3>
              <p>Creating meaningful change in the tech community</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;