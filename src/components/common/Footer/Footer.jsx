import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, APP_NAME, SOCIAL_LINKS, CONTACT_INFO } from '../../../constants/config';
import styles from './Footer.module.css';

/**
 * MAYAVERSE - Footer Component
 * 
 * Footer for public pages with links and information.
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* About Section */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>{APP_NAME}</h3>
            <p className={styles.footerText}>
              The ultimate technical fest experience. Join us for an amazing journey of innovation, competition, and learning.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link to={ROUTES.HOME}>Home</Link></li>
              <li><Link to={ROUTES.ABOUT}>About</Link></li>
              <li><Link to={ROUTES.EVENTS}>Events</Link></li>
              <li><Link to={ROUTES.SPONSORS}>Sponsors</Link></li>
              <li><Link to={ROUTES.MERCHANDISE}>Merchandise</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li>
                <strong>Email:</strong> {CONTACT_INFO.EMAIL}
              </li>
              <li>
                <strong>Phone:</strong> {CONTACT_INFO.PHONE}
              </li>
              <li>
                <strong>Address:</strong> {CONTACT_INFO.ADDRESS}
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSubtitle}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href={SOCIAL_LINKS.TWITTER} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>&copy; {currentYear} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;