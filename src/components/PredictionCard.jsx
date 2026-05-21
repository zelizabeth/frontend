import React from 'react';
import { motion } from 'framer-motion';
import './PredictionCard_styles.css';

/**
 * PredictionCard Component
 * 
 * Renders the luxury prediction form with:
 * - Text input for ADR (Average Daily Rate)
 * - Text input for Lead Time
 * - Dropdown for Stay Type with descriptions
 * - Toggle buttons for Family status
 * - Dropdown for Cancellation Profile with tooltips
 * - Submit button with loading state
 * 
 * Props:
 * - form: Object containing all form field values
 * - handleChange: Function to handle input changes
 * - handleFamilyToggle: Function to handle family toggle
 * - handlePredict: Function to submit prediction
 * - loading: Boolean indicating if prediction is loading
 * - error: String containing error message if any
 */
const PredictionCard = ({
    form,
    handleChange,
    handleFamilyToggle,
    handlePredict,
    loading,
    error
    }) => {
    return (
        <motion.div
        className="card prediction-card"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        >
        <h2 className="heading-sm">Guest Profile</h2>
        <p className="text-secondary" style={{ marginBottom: '2rem' }}>
            Enter guest characteristics to receive personalized recommendations
        </p>

        {/* Error Message Display */}
        {error && (
            <motion.div
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            >
            ⚠️ {error}
            </motion.div>
        )}

        {/* Field 1: ADR (Average Daily Rate) */}
        <div className="form-group">
            <label className="form-label">
            Average Daily Rate (ADR)
            <span className="tooltip-wrapper">
                <span className="tooltip-icon">?</span>
                <span className="tooltip-text">
                Log of the average price per night. Higher = premium pricing.
                </span>
            </span>
            </label>
            <input
            type="number"
            name="adr_log"
            placeholder="Enter ADR (e.g., 180)"
            value={form.adr_log}
            onChange={handleChange}
            step="0.1"
            min="0"
            />
            <span className="form-hint">Average revenue per room per day</span>
        </div>

        {/* Field 2: Lead Time (Days in advance) */}
        <div className="form-group">
            <label className="form-label">
            Lead Time (Days)
            <span className="tooltip-wrapper">
                <span className="tooltip-icon">?</span>
                <span className="tooltip-text">
                Log of days between booking and check-in. Higher = plans far ahead.
                </span>
            </span>
            </label>
            <input
            type="number"
            name="lead_time_log"
            placeholder="Enter lead time (days) (e.g., 45)"
            value={form.lead_time_log}
            onChange={handleChange}
            step="0.1"
            min="0"
            />
            <span className="form-hint">Days booked in advance</span>
        </div>

        {/* Field 3: Stay Type (Dropdown with descriptions) */}
        <div className="form-group">
            <label className="form-label">
            Stay Duration
            <span className="tooltip-wrapper">
                <span className="tooltip-icon">?</span>
                <span className="tooltip-text">
                Categorized length of stay for analysis
                </span>
            </span>
            </label>
            <select
            name="stay_type"
            value={form.stay_type}
            onChange={handleChange}
            >
            <option value="">— Select Stay Duration —</option>
            <option value="short_stay">Short Stay (1–3 nights)</option>
            <option value="medium_stay">Medium Stay (4–7 nights)</option>
            <option value="extended_stay">Extended Stay (8+ nights)</option>
            </select>
            <div className="dropdown-descriptions">
            {form.stay_type === 'short_stay' && (
                <p className="description">✓ Business travelers, weekend getaways</p>
            )}
            {form.stay_type === 'medium_stay' && (
                <p className="description">✓ Leisure travelers, small holidays</p>
            )}
            {form.stay_type === 'extended_stay' && (
                <p className="description">✓ Long-term guests, relocations</p>
            )}
            </div>
        </div>

        {/* Field 4: Is Family (Toggle Buttons) */}
        <div className="form-group">
            <label className="form-label">Guest Type</label>
            <div className="toggle-group">
            {/* Solo Traveler Option */}
            <button
                className={`toggle-option ${form.is_family === 0 ? 'active' : ''}`}
                onClick={() => handleFamilyToggle(0)}
                type="button"
            >
                <span className="toggle-icon">👤</span> Solo Traveler
            </button>

            {/* Family Guest Option */}
            <button
                className={`toggle-option ${form.is_family === 1 ? 'active' : ''}`}
                onClick={() => handleFamilyToggle(1)}
                type="button"
            >
                <span className="toggle-icon">👨‍👩‍👧‍👦</span> Family Guest
            </button>
            </div>
        </div>

        {/* Field 5: Cancellation Profile (Dropdown with risk levels) */}
        <div className="form-group">
            <label className="form-label">
            Cancellation Profile
            <span className="tooltip-wrapper">
                <span className="tooltip-icon">?</span>
                <span className="tooltip-text">
                Risk level based on past cancellation behavior
                </span>
            </span>
            </label>
            <select
            name="cancellation_profile"
            value={form.cancellation_profile}
            onChange={handleChange}
            >
            <option value="">— Select Cancellation Risk —</option>
            <option value="low_risk">Low Risk (No prior cancellations)</option>
            <option value="moderate_risk">Moderate Risk (Occasional cancellations)</option>
            <option value="high_risk">High Risk (Frequent cancellations)</option>
            </select>
            <div className="dropdown-descriptions">
            {form.cancellation_profile === 'low_risk' && (
                <p className="description success">✓ Reliable guest, low risk</p>
            )}
            {form.cancellation_profile === 'moderate_risk' && (
                <p className="description warning">⚠ Some risk, flexible policies recommended</p>
            )}
            {form.cancellation_profile === 'high_risk' && (
                <p className="description danger">⚠ High risk, strict policies needed</p>
            )}
            </div>
        </div>

        {/* Submit Button */}
        <motion.button
            className={`btn btn-primary btn-predict ${loading ? 'btn-loading' : ''}`}
            onClick={handlePredict}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
        >
            {loading ? (
            <>
                <span className="spinner-icon">⟳</span> Processing...
            </>
            ) : (
            '✨ Get Prediction'
            )}
        </motion.button>

        <p className="form-hint" style={{ textAlign: 'center', marginTop: '1rem' }}>
            Using advanced ML clustering · Instant results
        </p>
        </motion.div>
    );
};

export default PredictionCard;
