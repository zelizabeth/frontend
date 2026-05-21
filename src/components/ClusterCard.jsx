import React from 'react';
import { motion } from 'framer-motion';
import './ClusterCard_styles.css';

/**
 * ClusterCard Component
 * 
 * Displays the prediction result in a luxury format with:
 * - Cluster number and segment name
 * - Cluster-specific description and characteristics
 * - Recommended hotel strategy
 * - Luxury card styling with glow effect
 * 
 * Props:
 * - cluster: Object containing cluster and segment data from prediction
 *   {
 *     cluster: 0|1|2,
 *     segment: "Premium Planner"|"Budget Traveler"|"Last-Minute High Spender"
 *   }
 * 
 * Cluster Definitions:
 * 0: Premium Planner
 *    - Books early (high lead time)
 *    - High spending behavior (high ADR)
 *    - Likely repeat customer
 *    - Strategy: VIP loyalty targeting
 * 
 * 1: Budget Traveler
 *    - Price-sensitive
 *    - Flexible timing
 *    - Lower spend
 *    - Strategy: Volume & promotions
 * 
 * 2: Last-Minute High Spender
 *    - Books last minute
 *    - High spending
 *    - Opportunistic
 *    - Strategy: Dynamic pricing, premium services
 */
const ClusterCard = ({ cluster }) => {
  // Define cluster personalities and strategies
  const clusterDetails = {
    0: {
      name: 'Premium Planner',
      icon: '👑',
      color: '#d4af37',
      description: 'Books early with high spending behavior',
      characteristics: [
        '• Books well in advance',
        '• High average daily rate',
        '• Likely repeat customer',
        '• Values quality and exclusivity'
      ],
      strategy: 'VIP Loyalty Program',
      recommendations: [
        'Offer loyalty rewards for early bookings',
        'Premium room upgrades and amenities',
        'Dedicated concierge service',
        'Exclusive member events'
      ]
    },
    1: {
      name: 'Budget Traveler',
      icon: '💰',
      color: '#10b981',
      description: 'Price-conscious with flexible travel dates',
      characteristics: [
        '• Price-sensitive decision making',
        '• Flexible booking timeline',
        '• Lower average spend',
        '• Values convenience and value'
      ],
      strategy: 'Volume & Value Optimization',
      recommendations: [
        'Competitive pricing strategy',
        'Bundle deals and packages',
        'Seasonal promotions',
        'Group discounts'
      ]
    },
    2: {
      name: 'Last-Minute High Spender',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Books last-minute with premium spending',
      characteristics: [
        '• Last-minute booking pattern',
        '• High spending capacity',
        '• Opportunistic traveler',
        '• Often requires immediate availability'
      ],
      strategy: 'Dynamic Pricing & Premium Services',
      recommendations: [
        'Dynamic pricing for last-minute bookings',
        'Premium room categories available',
        'Express check-in/check-out services',
        'Upsell high-margin services'
      ]
    }
  };

  // Get cluster details or use defaults
  const details = clusterDetails[cluster.cluster] || clusterDetails[0];

  return (
    <motion.div
      className="card cluster-card card-gold-glow"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {/* Cluster Header with Icon */}
      <div className="cluster-header">
        <span className="cluster-icon">{details.icon}</span>
        <div>
          <h2 className="cluster-name">{details.name}</h2>
          <p className="cluster-description">{details.description}</p>
        </div>
      </div>

      {/* Cluster Divider */}
      <div className="cluster-divider"></div>

      {/* Characteristics Section */}
      <div className="cluster-section">
        <h3 className="section-title">Guest Profile</h3>
        <ul className="characteristics-list">
          {details.characteristics.map((char, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {char}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Recommended Strategy Section */}
      <div className="cluster-section">
        <h3 className="section-title strategy-title">
          <span className="strategy-badge">{details.strategy}</span>
        </h3>
        <ul className="recommendations-list">
          {details.recommendations.map((rec, index) => (
            <motion.li
              key={index}
              className="recommendation-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="bullet">→</span> {rec}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Footer Note */}
      <p className="cluster-footer">
        💡 Use these insights to personalize guest experience and maximize revenue
      </p>
    </motion.div>
  );
};

export default ClusterCard;
