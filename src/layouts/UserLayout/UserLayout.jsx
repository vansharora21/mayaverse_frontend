import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ROUTES, APP_NAME } from '../../constants/config';
import { useAuth } from '../../hooks/useAuth';
import styles from './UserLayout.module.css';

/**
 * MAYAVERSE - User Layout
 * 
 * Layout for user dashboard pages.
 * Includes:
 * - Sidebar navigation
 * - Header with user info
 * - Main content area
 * 
 * This layout provides a dashboard-like experience for logged-in users.
 */

const UserLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className={styles.userLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link to={ROUTES.HOME} className={styles.logo}>
            {APP_NAME}
          </Link>
        </div>
        
        <nav className={styles.sidebarNav}>
          <Link to={ROUTES.USER_PROFILE} className={styles.navItem}>
            <span>👤</span> Profile
          </Link>
          <Link to={ROUTES.USER_EVENTS} className={styles.navItem}>
            <span>📅</span> My Events
          </Link>
          <Link to={ROUTES.USER_ORDERS} className={styles.navItem}>
            <span>🛍️</span> My Orders
          </Link>
          <Link to={ROUTES.HOME} className={styles.navItem}>
            <span>🏠</span> Back to Home
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainArea}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>User Dashboard</h1>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
        </header>

        {/* Content */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;