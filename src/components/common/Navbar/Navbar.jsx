import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, APP_NAME } from '../../../constants/config';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Navbar.module.css';

/**
 * MAYAVERSE - Public Navbar Component
 * 
 * Navigation bar for public pages.
 * Shows different options based on authentication status.
 */

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to={ROUTES.HOME} className={styles.logo}>
          {APP_NAME}
        </Link>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li>
            <Link to={ROUTES.HOME} className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to={ROUTES.ABOUT} className={styles.navLink}>
              About
            </Link>
          </li>
          <li>
            <Link to={ROUTES.EVENTS} className={styles.navLink}>
              Events
            </Link>
          </li>
          <li>
            <Link to={ROUTES.SPONSORS} className={styles.navLink}>
              Sponsors
            </Link>
          </li>
          <li>
            <Link to={ROUTES.MERCHANDISE} className={styles.navLink}>
              Merchandise
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className={styles.authButtons}>
          {isAuthenticated() ? (
            <>
              <Link to={ROUTES.USER_PROFILE} className={styles.profileButton}>
                {user?.name}
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className={styles.loginButton}>
                Login
              </Link>
              <Link to={ROUTES.SIGNUP} className={styles.signupButton}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;