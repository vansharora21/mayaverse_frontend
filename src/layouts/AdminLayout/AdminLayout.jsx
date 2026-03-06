import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ROUTES, APP_NAME } from '../../constants/config';
import { useAuth } from '../../hooks/useAuth';
import styles from './AdminLayout.module.css';

/**
 * MAYAVERSE - Admin Layout
 * 
 * Layout for admin dashboard pages.
 * Includes:
 * - Sidebar navigation
 * - Header with admin info
 * - Main content area
 * 
 * This layout provides administrative functionality for managing the techfest.
 */

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link to={ROUTES.HOME} className={styles.logo}>
            {APP_NAME} Admin
          </Link>
        </div>
        
        <nav className={styles.sidebarNav}>
          <Link to={ROUTES.ADMIN_DASHBOARD} className={styles.navItem}>
            <span>📊</span> Dashboard
          </Link>
          <Link to={ROUTES.ADMIN_EVENTS} className={styles.navItem}>
            <span>📅</span> Events
          </Link>
          <Link to={ROUTES.ADMIN_SPONSORS} className={styles.navItem}>
            <span>🤝</span> Sponsors
          </Link>
          <Link to={ROUTES.ADMIN_MERCHANDISE} className={styles.navItem}>
            <span>🛍️</span> Merchandise
          </Link>
          <Link to={ROUTES.ADMIN_USERS} className={styles.navItem}>
            <span>👥</span> Users
          </Link>
          <Link to={ROUTES.HOME} className={styles.navItem}>
            <span>🏠</span> View Site
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
          <h1 className={styles.headerTitle}>Admin Panel</h1>
          <div className={styles.userInfo}>
            <span className={styles.adminBadge}>Admin</span>
            <span className={styles.userName}>{user?.name}</span>
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

export default AdminLayout;