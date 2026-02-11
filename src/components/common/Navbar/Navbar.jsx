import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Drawer state
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

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
        {/* Hamburger Button */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleDrawer}
          aria-label="Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>

        {/* Center Logo */}
        <Link to="/" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          PARALLAX
        </Link>
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