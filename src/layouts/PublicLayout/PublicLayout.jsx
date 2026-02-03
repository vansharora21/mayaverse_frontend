import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import styles from './PublicLayout.module.css';

/**
 * MAYAVERSE - Public Layout
 * 
 * Layout for all public pages (Home, About, Events, etc.)
 * Includes:
 * - Navbar at the top
 * - Main content area (Outlet)
 * - Footer at the bottom
 * 
 * This layout will be perfect for adding page transitions later,
 * as all public pages share this structure.
 */

const PublicLayout = () => {
  return (
    <div className={styles.publicLayout}>
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Main Content Area */}
      {/* The Outlet component renders the matched child route */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;