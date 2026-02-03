import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/config';

/**
 * MAYAVERSE - Admin Route Component
 * 
 * This component protects admin-only routes.
 * If user is not logged in, redirected to admin login.
 * If user is logged in but not admin, redirected to home.
 * 
 * Usage:
 * <Route element={<AdminRoute />}>
 *   <Route path="/admin/dashboard" element={<AdminDashboard />} />
 * </Route>
 */

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect to admin login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  // Redirect to home if not admin
  if (!isAdmin()) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Render children if admin
  return children;
};

export default AdminRoute;