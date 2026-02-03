import React, { createContext, useState, useEffect } from 'react';
import { storage } from '../utils/helpers';
import { USER_DATA_KEY, AUTH_TOKEN_KEY } from '../constants/config';

/**
 * MAYAVERSE - Authentication Context
 * 
 * This context provides authentication state and functions throughout the app.
 * It manages:
 * - User login/logout
 * - User registration
 * - Authentication persistence (localStorage)
 * - User role and permissions
 */

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = storage.get(USER_DATA_KEY);
    const token = storage.get(AUTH_TOKEN_KEY);
    
    if (storedUser && token) {
      setUser(storedUser);
    }
    
    setLoading(false);
  }, []);

  /**
   * Login function
   * @param {Object} userData - User data from login API
   */
  const login = (userData) => {
    // Store user data and token
    storage.set(USER_DATA_KEY, userData);
    storage.set(AUTH_TOKEN_KEY, 'mock-jwt-token'); // In production, use real JWT
    setUser(userData);
  };

  /**
   * Logout function
   */
  const logout = () => {
    // Clear storage and user state
    storage.remove(USER_DATA_KEY);
    storage.remove(AUTH_TOKEN_KEY);
    setUser(null);
  };

  /**
   * Update user data
   * @param {Object} updates - Updated user data
   */
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    storage.set(USER_DATA_KEY, updatedUser);
    setUser(updatedUser);
  };

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  const isAuthenticated = () => {
    return user !== null;
  };

  /**
   * Check if user is admin
   * @returns {boolean}
   */
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  /**
   * Check if user has registered for an event
   * @param {string} eventId - Event ID to check
   * @returns {boolean}
   */
  const hasRegisteredForEvent = (eventId) => {
    return user?.registeredEvents?.includes(eventId) || false;
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated,
    isAdmin,
    hasRegisteredForEvent,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};