import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginService } from '../../../services/mockData';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES, APP_NAME } from '../../../constants/config';
import { isValidEmail } from '../../../utils/helpers';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      const response = await loginService(formData.email, formData.password);
      
      if (response.user.role !== 'admin') {
        setError('Access denied. Admin credentials required.');
        setLoading(false);
        return;
      }

      login(response.user);
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminLoginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.adminBadge}>🔒 Admin Access</div>
          <h1 className={styles.logo}>{APP_NAME} Admin</h1>
          <p className={styles.subtitle}>Admin Panel Login</p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter admin email"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Logging in...' : 'Login to Admin Panel'}
            </button>
          </form>

          <div className={styles.links}>
            <Link to={ROUTES.HOME} className={styles.link}>
              Back to Home
            </Link>
          </div>

          <div className={styles.demoCredentials}>
            <p><strong>Demo Admin:</strong></p>
            <p>admin@mayaverse.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;