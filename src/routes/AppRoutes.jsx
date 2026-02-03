import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/config';

// Import Route Guards
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Import Layouts
import PublicLayout from '../layouts/PublicLayout/PublicLayout';
import UserLayout from '../layouts/UserLayout/UserLayout';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';

// Import Public Pages
import Home from '../pages/public/Home/Home';
import About from '../pages/public/About/About';
import Events from '../pages/public/Events/Events';
import Sponsors from '../pages/public/Sponsors/Sponsors';
import Merchandise from '../pages/public/Merchandise/Merchandise';

// Import Auth Pages
import Login from '../pages/user/Login/Login';
import Signup from '../pages/user/Signup/Signup';

// Import User Pages
import UserProfile from '../pages/user/UserProfile/UserProfile';

// Import Admin Pages
import AdminLogin from '../pages/admin/AdminLogin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard/AdminDashboard';

/**
 * MAYAVERSE - Application Routes
 * 
 * This component defines all routes in the application.
 * Routes are organized into three categories:
 * 1. Public Routes - Accessible to everyone
 * 2. User Routes - Require authentication
 * 3. Admin Routes - Require admin authentication
 * 
 * Each category uses its own layout component for consistent UI.
 */

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES - Wrapped in PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.EVENTS} element={<Events />} />
        <Route path={ROUTES.SPONSORS} element={<Sponsors />} />
        <Route path={ROUTES.MERCHANDISE} element={<Merchandise />} />
      </Route>

      {/* AUTH ROUTES - No layout, standalone pages */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />

      {/* USER ROUTES - Protected, wrapped in UserLayout */}
      <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
        <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
        {/* Add more user routes here as needed */}
      </Route>

      {/* ADMIN ROUTES - Admin protected, wrapped in AdminLayout */}
      <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        {/* Add more admin routes here as needed */}
      </Route>

      {/* 404 NOT FOUND - Redirect to home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;