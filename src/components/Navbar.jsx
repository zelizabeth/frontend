import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar_styles.css';

/**
 * Navbar Component
 * 
 * Renders a minimal, floating glassmorphic navigation bar with:
 * - Fixed position at top center
 * - Links to main pages: Predict, Dashboard, Insights
 * - Active link highlighting
 * - Smooth hover effects with gold accents
 * 
 * Props: None
 * 
 * Features:
 * - Glassmorphism effect with backdrop blur
 * - Dark translucent background
 * - Gold hover effects
 * - Responsive design for mobile
 */
const Navbar = () => {
  // Get current location to highlight active link
  const location = useLocation();

  /**
   * Checks if a link is active (matches current path)
   * 
   * @param {string} path - The route path to check
   * @returns {boolean} True if path matches current location
   */
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      {/* Logo/Title Section */}
      <Link to="/" className="navbar-logo">
        🏨 Connaître
      </Link>

      {/* Navigation Links */}
      <ul className="navbar-links">
        {/* Predict Page Link */}
        <li>
          <Link
            to="/Ppredict"
            className={`navbar-link ${isActive('/Ppredict') ? 'active' : ''}`}
          >
            Predict
          </Link>
        </li>

        {/* Dashboard Page Link */}
        <li>
          <Link
            to="/dashboard"
            className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </li>

        {/* Insights Page Link */}
        <li>
          <Link
            to="/insights"
            className={`navbar-link ${isActive('/insights') ? 'active' : ''}`}
          >
            Insights
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
