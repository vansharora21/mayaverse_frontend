import React, { useState, useEffect } from 'react';
import { getEvents, getSponsors, getMerchandise, getAllUsers } from '../../../services/mockData';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    events: 0,
    sponsors: 0,
    merchandise: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [eventsRes, sponsorsRes, merchRes, usersRes] = await Promise.all([
        getEvents(),
        getSponsors(),
        getMerchandise(),
        getAllUsers(),
      ]);

      setStats({
        events: eventsRes.events.length,
        sponsors: sponsorsRes.sponsors.length,
        merchandise: merchRes.merchandise.length,
        users: usersRes.users.length,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error loading stats:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading dashboard...</div>;

  return (
    <div className={styles.dashboardPage}>
      <h1 className={styles.pageTitle}>Dashboard Overview</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statNumber}>{stats.events}</div>
          <div className={styles.statLabel}>Total Events</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🤝</div>
          <div className={styles.statNumber}>{stats.sponsors}</div>
          <div className={styles.statLabel}>Active Sponsors</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🛍️</div>
          <div className={styles.statNumber}>{stats.merchandise}</div>
          <div className={styles.statLabel}>Merchandise Items</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statNumber}>{stats.users}</div>
          <div className={styles.statLabel}>Registered Users</div>
        </div>
      </div>

      <div className={styles.actionsGrid}>
        <div className={styles.actionCard}>
          <h3>Quick Actions</h3>
          <ul>
            <li>Manage Events</li>
            <li>View User Registrations</li>
            <li>Update Sponsor Information</li>
            <li>Process Orders</li>
            <li>Generate Reports</li>
          </ul>
        </div>

        <div className={styles.actionCard}>
          <h3>Recent Activity</h3>
          <p>Activity feed will be displayed here when connected to backend.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;