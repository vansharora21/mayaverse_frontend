import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useResponsive } from '../../../animations/hooks/useResponsive';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Drawer state
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Header Logic (Same as before)
      if (isHomePage) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Hide on Scroll Down
        } else {
          setIsVisible(true); // Show on Scroll Up
        }

        // Hide at very top initially? User phrasing was tricky.
        // "until... scroll to the top... he wont see"
        // Let's stick to standard behavior for now: Hide when scrolling down, Show when scrolling up.
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isHomePage]);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Header Strip */}
      <header className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
        {/* Mobile Hamburger - Visible only on small screens */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleDrawer}
          aria-label="Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* Desktop Left Nav */}
        <nav className={styles.leftNav}>
          <Link to="/contacts" className={styles.desktopLink}>Contacts</Link>
          <Link to="/gallery" className={styles.desktopLink}>Gallery</Link>
        </nav>

        {/* Center Logo */}
        <Link to="/" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          PARALLAX
        </Link>

        {/* Desktop Right Nav */}
        <nav className={styles.rightNav}>
          <Link to="/events" className={styles.desktopLink}>Events</Link>
          <Link to="/about" className={styles.desktopLink}>About Us</Link>
        </nav>
      </header>

      {/* Backdrop Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer */}
      <nav className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.navLinks}>
          <Link to="/gallery" className={styles.navLink}>Gallery</Link>
          <Link to="/events" className={styles.navLink}>Events</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
          <Link to="/sponsors" className={styles.navLink}>Sponsors</Link>
          <Link to="/merchandise" className={styles.navLink}>Merchandise</Link>
          <Link to="/about" className={styles.navLink}>About Us</Link>
        </div>

        <div className={styles.drawerFooter}>
          <Link to="/login" className={styles.authButton}>
            Login / Join
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;