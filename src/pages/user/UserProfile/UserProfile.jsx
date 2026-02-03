import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getUserProfile, getUserOrders } from '../../../services/mockData';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const [profileResponse, ordersResponse] = await Promise.all([
        getUserProfile(authUser.id),
        getUserOrders(authUser.id),
      ]);
      
      setUser(profileResponse.user);
      setOrders(ordersResponse.orders);
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading profile...</div>;
  if (!user) return <div className={styles.error}>Failed to load profile</div>;

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <h2>Profile Information</h2>
        <div className={styles.profileInfo}>
          <div className={styles.infoRow}>
            <strong>Name:</strong>
            <span>{user.name}</span>
          </div>
          <div className={styles.infoRow}>
            <strong>Email:</strong>
            <span>{user.email}</span>
          </div>
          <div className={styles.infoRow}>
            <strong>Phone:</strong>
            <span>{user.phone || 'Not provided'}</span>
          </div>
          <div className={styles.infoRow}>
            <strong>College:</strong>
            <span>{user.college || 'Not provided'}</span>
          </div>
          <div className={styles.infoRow}>
            <strong>Member Since:</strong>
            <span>{formatDate(user.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{user.registeredEvents?.length || 0}</div>
          <div className={styles.statLabel}>Events Registered</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{orders.length}</div>
          <div className={styles.statLabel}>Orders Placed</div>
        </div>
      </div>

      {orders.length > 0 && (
        <div className={styles.ordersSection}>
          <h2>Recent Orders</h2>
          <div className={styles.ordersGrid}>
            {orders.map(order => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderId}>Order #{order.id}</span>
                  <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <div className={styles.orderDate}>{formatDate(order.orderDate)}</div>
                <div className={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                      {item.name} x{item.quantity}
                    </div>
                  ))}
                </div>
                <div className={styles.orderTotal}>
                  Total: {formatCurrency(order.total, 'INR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;