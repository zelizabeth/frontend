import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PredictionCard from '../components/PredictionCard';
import ClusterCard from '../components/ClusterCard';
import './Ppredict_styles.css';

/**
 * PREDICTION PAGE (Ppredict.jsx)
 * 
 * Main prediction interface featuring:
 * - Luxury input form with dropdowns, toggles, and tooltips
 * - Real-time form validation
 * - Loading animations during prediction
 * - Result display with cluster details
 * 
 * Form Fields:
 * 1. ADR Log - Average Daily Rate (logarithmic scale)
 * 2. Lead Time Log - Booking lead time (logarithmic scale)
 * 3. Stay Type - Duration category (with helpful descriptions)
 * 4. Is Family - Solo vs Family toggle
 * 5. Cancellation Profile - Cancellation risk level (with tooltip explanations)
 * 
 * Flow:
 * - User enters all required fields
 * - Click "Get Prediction" button
 * - Loading state shows spinner with animation
 * - Backend processes and returns cluster prediction
 * - Result displays as luxury card with cluster insights
 */
const Ppredict = () => {
  // State for form inputs
  const [form, setForm] = useState({
    adr_log: '',
    lead_time_log: '',
    is_family: 0,
    stay_type: '',
    cancellation_profile: ''
  });

  // State for prediction result
  const [result, setResult] = useState(null);

  // State for loading animation
  const [loading, setLoading] = useState(false);

  // State for error messages
  const [error, setError] = useState('');

  /**
   * Handle form input changes
   * Updates the form state when user types in an input field
   * 
   * @param {Event} e - The input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  /**
   * Handle family toggle button clicks
   * Updates is_family between 0 (solo) and 1 (family)
   * 
   * @param {number} value - 0 for solo, 1 for family
   */
  const handleFamilyToggle = (value) => {
    setForm({
      ...form,
      is_family: value
    });
  };

  /**
   * Validate form before submission
   * Ensures all required fields are filled
   * 
   * @returns {boolean} True if all fields are valid, false otherwise
   */
  const validateForm = () => {
    if (
      !form.adr_log ||
      !form.lead_time_log ||
      form.stay_type === '' ||
      form.cancellation_profile === ''
    ) {
      setError('Please fill in all fields');
      return false;
    }

    // Validate numeric inputs are positive numbers
    if (Number(form.adr_log) <= 0 || Number(form.lead_time_log) < 0) {
      setError('ADR and Lead Time must be valid positive numbers');
      return false;
    }

    return true;
  };

  /**
   * Submit prediction request to backend
   * Sends form data to Flask API endpoint
   * Handles response and errors with animations
   */
  const handlePredict = async () => {
    // Validate form before sending
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Send prediction request to backend
      const response = await axios.post(
        'http://127.0.0.1:5000/predict',
        {
          adr_log: Number(form.adr_log),
          lead_time_log: Number(form.lead_time_log),
          is_family: form.is_family,
          stay_type: form.stay_type,
          cancellation_profile: form.cancellation_profile
        }
      );

      // Update result state with response data
      setResult(response.data);
    } catch (err) {
      // Handle network or backend errors
      setError(
        err.response?.data?.error ||
        'Error connecting to prediction service. Please try again.'
      );
      console.error('Prediction error:', err);
    } finally {
      // Stop loading animation
      setLoading(false);
    }
  };

  return (
    <div className="predict-page">
      {/* Main content container with proper spacing for navbar */}
      <motion.div
        className="predict-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Header */}
        <div className="predict-header">
          <h1 className="heading-lg">Guest Intelligence Platform</h1>
          <p className="text-secondary">
            Predict customer segments using advanced clustering analysis
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="predict-content">
          {/* Left Column: Prediction Form */}
          <motion.div
            className="predict-form-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PredictionCard
              form={form}
              handleChange={handleChange}
              handleFamilyToggle={handleFamilyToggle}
              handlePredict={handlePredict}
              loading={loading}
              error={error}
            />
          </motion.div>

          {/* Right Column: Result Display */}
          <motion.div
            className="predict-result-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {loading ? (
              // Loading state with spinner
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="text-secondary">Processing prediction...</p>
              </div>
            ) : result ? (
              // Display prediction result in luxury card
              <ClusterCard cluster={result} />
            ) : (
              // Placeholder when no prediction yet
              <div className="card placeholder">
                <p className="text-secondary">
                  Fill in the form and click "Get Prediction" to see your customer segment here.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Ppredict;
