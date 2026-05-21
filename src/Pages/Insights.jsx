import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Insights_styles.css';

/**
 * INSIGHTS PAGE
 * 
 * Detailed cluster insights and strategies featuring:
 * - Deep dive into each cluster's characteristics
 * - Customer behavior patterns
 * - Recommended hotel strategies for each segment
 * - Actionable recommendations
 * - Interactive cluster cards with expandable details
 * 
 * Three Main Clusters:
 * 1. Premium Planner - High-value, early-booking guests
 * 2. Budget Traveler - Price-sensitive guests
 * 3. Last-Minute High Spender - Opportunistic, high-value guests
 */
const Insights = () => {
  // State to track which cluster is expanded
  const [expandedCluster, setExpandedCluster] = useState(0);

  /**
   * Comprehensive cluster definitions with behaviors and strategies
   */
  const clusterInsights = [
    {
      id: 0,
      name: 'Premium Planner',
      icon: '👑',
      color: '#d4af37',
      summary: 'High-value guests who book early and spend generously',
      characteristics: [
        'Books 30-60 days in advance',
        'Average ADR: $180-200',
        'Repeat booking rate: 45%',
        'Cancellation rate: <5%',
        'Prefers premium room types',
        'Values service consistency'
      ],
      behaviors: {
        title: 'Behavioral Patterns',
        items: [
          'Plans vacations meticulously',
          'Researches properties extensively',
          'Often books during off-peak to maximize value',
          'Flexible with dates but fixed on quality',
          'Checks reviews and ratings carefully',
          'Communicates special requests in advance'
        ]
      },
      strategies: {
        title: 'Hotel Revenue Strategies',
        items: [
          '🎁 VIP Loyalty Program - Reward early bookings with points multipliers',
          '💎 Premium Packages - Create exclusive all-inclusive premium packages',
          '📧 Email Campaigns - Send targeted offers matching their booking patterns',
          '⭐ Concierge Service - Offer complimentary planning assistance',
          '🏆 Recognition - Greet returning guests by name, remember preferences',
          '📱 Mobile App - Exclusive app perks for members'
        ]
      },
      kpis: [
        { label: 'Lifetime Value', value: '$2,500+' },
        { label: 'Booking Lead Time', value: '45 days avg' },
        { label: 'Room Upgrade Success', value: '68%' },
        { label: 'Ancillary Revenue', value: '$450/stay' }
      ]
    },
    {
      id: 1,
      name: 'Budget Traveler',
      icon: '💰',
      color: '#10b981',
      summary: 'Price-conscious guests seeking value and flexibility',
      characteristics: [
        'Books 10-20 days in advance',
        'Average ADR: $60-90',
        'Repeat booking rate: 25%',
        'Cancellation rate: 15-20%',
        'Prefers economy rooms',
        'Sensitive to hidden charges'
      ],
      behaviors: {
        title: 'Behavioral Patterns',
        items: [
          'Compares multiple properties before booking',
          'Uses price comparison websites',
          'Looks for promotional codes',
          'Often travels during shoulder seasons',
          'Tends to book at last minute for better rates',
          'Avoids add-on services but appreciates free amenities'
        ]
      },
      strategies: {
        title: 'Hotel Revenue Strategies',
        items: [
          '💵 Dynamic Pricing - Aggressive discounting during low-occupancy periods',
          '🎯 Targeted Promotions - Offer OTA-exclusive deals and flash sales',
          '📦 Value Bundles - Create room+breakfast or room+parking bundles',
          '🏃 Quick Upsells - Simple, high-value upsells at check-in',
          '👥 Group Discounts - Offer corporate and group rates',
          '📍 Location Marketing - Target nearby attractions and events'
        ]
      },
      kpis: [
        { label: 'Lifetime Value', value: '$600-800' },
        { label: 'Booking Lead Time', value: '15 days avg' },
        { label: 'Occupancy Impact', value: 'High volume' },
        { label: 'Ancillary Revenue', value: '$50-100/stay' }
      ]
    },
    {
      id: 2,
      name: 'Last-Minute High Spender',
      icon: '⚡',
      color: '#f59e0b',
      summary: 'Spontaneous, high-value guests who book at the last minute',
      characteristics: [
        'Books 1-7 days before arrival',
        'Average ADR: $150-180',
        'Repeat booking rate: 30%',
        'Cancellation rate: 12-18%',
        'Often upgrades room type',
        'Willing to pay premium for convenience'
      ],
      behaviors: {
        title: 'Behavioral Patterns',
        items: [
          'Makes impulsive booking decisions',
          'Often traveling for emergencies or unexpected plans',
          'Uses mobile booking primarily',
          'Not price-sensitive for last-minute options',
          'Requires immediate confirmation',
          'Often books for short stays (1-2 nights)'
        ]
      },
      strategies: {
        title: 'Hotel Revenue Strategies',
        items: [
          '📱 Last-Minute App Notifications - Push notifications for available premium inventory',
          '💳 Premium Pricing - Apply surge pricing for last-minute bookings',
          '🎁 Quick Add-ons - Pre-select high-margin services (parking, late checkout)',
          '🚀 Express Service - Offer fast check-in, room preference priority',
          '🍷 Welcome Packages - Complimentary amenity to encourage satisfaction',
          '📞 Personal Touch - Direct phone support for seamless booking'
        ]
      },
      kpis: [
        { label: 'Lifetime Value', value: '$900-1,200' },
        { label: 'Booking Lead Time', value: '3-4 days' },
        { label: 'Premium Upsell Rate', value: '55%' },
        { label: 'Ancillary Revenue', value: '$200-350/stay' }
      ]
    }
  ];

  /**
   * Toggle cluster expansion
   * Shows/hides detailed information for a cluster
   */
  const toggleCluster = (clusterId) => {
    setExpandedCluster(expandedCluster === clusterId ? -1 : clusterId);
  };

  return (
    <div className="insights-page">
      <motion.div
        className="insights-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Header */}
        <div className="insights-header">
          <h1 className="heading-lg">Cluster Insights & Strategies</h1>
          <p className="text-secondary">
            Deep dive analysis of guest segments to maximize revenue and satisfaction
          </p>
        </div>

        {/* Introduction Section */}
        <motion.div
          className="card insights-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="heading-sm">Understanding Your Guests</h2>
          <p className="text-body">
            Our AI clustering model identifies three distinct guest segments, each with unique behaviors, 
            preferences, and revenue potential. By understanding these segments, you can tailor your marketing, 
            pricing, and service strategies to maximize guest satisfaction and revenue optimization.
          </p>
        </motion.div>

        {/* Cluster Cards - Interactive */}
        <div className="clusters-grid">
          {clusterInsights.map((cluster, index) => (
            <motion.div
              key={cluster.id}
              className={`cluster-insight-card ${expandedCluster === cluster.id ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => toggleCluster(cluster.id)}
            >
              {/* Cluster Header - Always Visible */}
              <div className="cluster-header-compact">
                <div className="cluster-icon-large">{cluster.icon}</div>
                <div className="cluster-info">
                  <h3 className="cluster-name-compact">{cluster.name}</h3>
                  <p className="cluster-summary">{cluster.summary}</p>
                </div>
                <div className="expand-icon">
                  {expandedCluster === cluster.id ? '▼' : '▶'}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedCluster === cluster.id && (
                <motion.div
                  className="cluster-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Characteristics */}
                  <div className="detail-section">
                    <h4 className="detail-title">📊 Key Characteristics</h4>
                    <ul className="detail-list">
                      {cluster.characteristics.map((char, idx) => (
                        <li key={idx}>{char}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Behavioral Patterns */}
                  <div className="detail-section">
                    <h4 className="detail-title">{cluster.behaviors.title}</h4>
                    <ul className="detail-list">
                      {cluster.behaviors.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* KPIs */}
                  <div className="detail-section">
                    <h4 className="detail-title">💡 Key Metrics</h4>
                    <div className="kpis-mini-grid">
                      {cluster.kpis.map((kpi, idx) => (
                        <div key={idx} className="kpi-mini">
                          <span className="kpi-mini-label">{kpi.label}</span>
                          <span className="kpi-mini-value">{kpi.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategies */}
                  <div className="detail-section strategies-section">
                    <h4 className="detail-title">{cluster.strategies.title}</h4>
                    <ul className="strategies-list">
                      {cluster.strategies.items.map((strategy, idx) => (
                        <li key={idx} className="strategy-item">{strategy}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary Section */}
        <motion.div
          className="card insights-summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="heading-sm">Implementation Guide</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <h4>🎯 Step 1: Segment Your Database</h4>
              <p>Use our prediction model to classify all historical guests into these three segments.</p>
            </div>
            <div className="summary-item">
              <h4>💻 Step 2: Customize Systems</h4>
              <p>Integrate segment data into your CRM, PMS, and marketing automation platforms.</p>
            </div>
            <div className="summary-item">
              <h4>📈 Step 3: Test & Measure</h4>
              <p>Pilot segment-specific strategies and measure ROI improvements over 30-60 days.</p>
            </div>
            <div className="summary-item">
              <h4>🚀 Step 4: Scale & Optimize</h4>
              <p>Roll out successful strategies across all channels and continually refine based on results.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Insights;
