import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard_styles.css';

/**
 * DASHBOARD PAGE
 * 
 * Comprehensive analytics dashboard featuring:
 * - KPI Cards: Total Guests, Premium %, Avg ADR, Cancellation Risk
 * - Cluster Distribution Chart: Pie chart showing cluster percentages
 * - Cluster Comparison Table: Side-by-side metrics
 * - Real-time data fetching from backend
 * 
 * Data Flow:
 * 1. Component mounts → useEffect triggers data fetch
 * 2. Fetch /dashboard-data endpoint from backend
 * 3. Parse response and set state
 * 4. Charts and KPIs update with data
 * 5. Error handling with fallback UI
 */
const Dashboard = () => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * Fetch dashboard data from backend
   * Called on component mount
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:5000/dashboard-data');
        setDashboardData(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Unable to load dashboard data. Backend may not be running.');
        // Use mock data for demonstration
        setDashboardData(getMockDashboardData());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  /**
   * Mock data for demo purposes when backend is unavailable
   * Shows realistic hotel guest segmentation metrics
   */
  const getMockDashboardData = () => ({
    total_guests: 12541,
    premium_percentage: 38,
    avg_adr: 142,
    cancellation_risk: 12,
    cluster_distribution: [
      { name: 'Premium Planner', value: 42, count: 5267 },
      { name: 'Budget Traveler', value: 31, count: 3888 },
      { name: 'Last-Minute High Spender', value: 27, count: 3386 }
    ],
    cluster_comparison: [
      { cluster: 'Premium Planner', avg_adr: 185, lead_time: 45, risk: 8 },
      { cluster: 'Budget Traveler', avg_adr: 78, lead_time: 14, risk: 22 },
      { cluster: 'Last-Minute High Spender', avg_adr: 165, lead_time: 2, risk: 18 }
    ]
  });

  // Colors for pie chart
  const CLUSTER_COLORS = ['#d4af37', '#10b981', '#f59e0b'];

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p className="text-secondary">Loading dashboard analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <motion.div
        className="dashboard-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Header */}
        <div className="dashboard-header">
          <h1 className="heading-lg">Analytics Dashboard</h1>
          <p className="text-secondary">
            Real-time insights into guest segmentation and booking patterns
          </p>
        </div>

        {/* Error Message (if any) */}
        {error && (
          <motion.div
            className="warning-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ℹ️ {error} (Showing demo data)
          </motion.div>
        )}

        {dashboardData && (
          <>
            {/* KPI Cards Section */}
            <section className="kpi-section">
              <h2 className="section-title">Key Performance Indicators</h2>
              <div className="kpi-grid">
                {/* KPI 1: Total Guests */}
                <motion.div
                  className="kpi-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="kpi-icon">👥</div>
                  <div className="kpi-content">
                    <p className="kpi-label">Total Guests</p>
                    <p className="kpi-value">
                      {dashboardData.total_guests?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                </motion.div>

                {/* KPI 2: Premium Percentage */}
                <motion.div
                  className="kpi-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="kpi-icon">👑</div>
                  <div className="kpi-content">
                    <p className="kpi-label">Premium Guests</p>
                    <p className="kpi-value">
                      {dashboardData.premium_percentage || 'N/A'}%
                    </p>
                  </div>
                </motion.div>

                {/* KPI 3: Average ADR */}
                <motion.div
                  className="kpi-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="kpi-icon">💰</div>
                  <div className="kpi-content">
                    <p className="kpi-label">Avg ADR</p>
                    <p className="kpi-value">
                      ${dashboardData.avg_adr || 'N/A'}
                    </p>
                  </div>
                </motion.div>

                {/* KPI 4: Cancellation Risk */}
                <motion.div
                  className="kpi-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="kpi-icon">⚠️</div>
                  <div className="kpi-content">
                    <p className="kpi-label">Cancellation Risk</p>
                    <p className="kpi-value">
                      {dashboardData.cancellation_risk || 'N/A'}%
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Charts Section */}
            <section className="charts-section">
              <div className="charts-grid">
                {/* Cluster Distribution Pie Chart */}
                <motion.div
                  className="chart-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="chart-title">Cluster Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardData.cluster_distribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dashboardData.cluster_distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CLUSTER_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => `${value}%`}
                        contentStyle={{
                          backgroundColor: 'rgba(10, 14, 39, 0.8)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '8px',
                          color: '#e8e8e8'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="chart-legend">
                    {dashboardData.cluster_distribution.map((cluster, idx) => (
                      <div key={idx} className="legend-item">
                        <span
                          className="legend-color"
                          style={{ backgroundColor: CLUSTER_COLORS[idx] }}
                        ></span>
                        <span>{cluster.name}</span>
                        <span className="legend-count">({cluster.count} guests)</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Average ADR by Cluster Bar Chart */}
                <motion.div
                  className="chart-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="chart-title">Average ADR by Cluster</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.cluster_comparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
                      <XAxis dataKey="cluster" stroke="var(--text-secondary)" />
                      <YAxis stroke="var(--text-secondary)" />
                      <Tooltip
                        formatter={(value) => `$${value}`}
                        contentStyle={{
                          backgroundColor: 'rgba(10, 14, 39, 0.8)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '8px',
                          color: '#e8e8e8'
                        }}
                      />
                      <Bar dataKey="avg_adr" fill="#d4af37" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </section>

            {/* Cluster Comparison Table */}
            <section className="table-section">
              <h2 className="section-title">Cluster Comparison</h2>
              <motion.div
                className="table-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Cluster</th>
                      <th>Avg ADR</th>
                      <th>Lead Time (days)</th>
                      <th>Cancellation Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.cluster_comparison.map((row, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                      >
                        <td className="cluster-cell">
                          <span className="cluster-badge">
                            {row.cluster}
                          </span>
                        </td>
                        <td>${row.avg_adr}</td>
                        <td>{row.lead_time} days</td>
                        <td>
                          <span className={`risk-badge risk-${row.risk < 10 ? 'low' : row.risk < 20 ? 'medium' : 'high'}`}>
                            {row.risk}%
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </section>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
