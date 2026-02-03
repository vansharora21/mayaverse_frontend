import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginService } from '../../../services/mockData';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES, APP_NAME } from '../../../constants/config';
import { isValidEmail } from '../../../utils/helpers';
import styles from './Login.module.css';

const Login = () => {
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
      login(response.user);
      
      if (response.user.role === 'admin') {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        navigate(ROUTES.USER_PROFILE);
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.logo}>{APP_NAME}</h1>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>Login to your account</p>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className={styles.links}>
            <p>
              Don't have an account?{' '}
              <Link to={ROUTES.SIGNUP} className={styles.link}>
                Sign up
              </Link>
            </p>
            <Link to={ROUTES.HOME} className={styles.link}>
              Back to Home
            </Link>
          </div>

          <div className={styles.demoCredentials}>
            <p><strong>Demo Credentials:</strong></p>
            <p>User: user@mayaverse.com / user123</p>
            <p>Admin: admin@mayaverse.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;