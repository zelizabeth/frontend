import React from 'react';
import { motion } from 'framer-motion';
import './Insights_styles.css';

const Landing = () => {

  return (
    <div className="insights-intro">

      <motion.div
        className="landing-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >

        {/*Spacer*/}
        <div style={{ height: '7rem', background: 'linear-gradient(to bottom, #0a0e27)' }}></div>


        {/* App Name */}
        <motion.section
          className="card about-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >

            <h1 className="heading-lg">InnSight AI - Hotel Booking Segmentation</h1>
            <p>An AI customer segmentation platform that predicts hotel guest behavior clusters using a machine learning model trained on booking data. 
                It also provides a dashboard and landing experience that visualizes insights like guest segments, revenue patterns, and cancellation risk 
                for hospitality decision-making.</p>

        </motion.section>

        {/* BUSINESS VALUE */}
        <motion.div
            className="card insights-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            >
            <h2 className="heading-sm">Business Value</h2>

            <div className="summary-item">
                <h3>Personalized Experiences</h3>
                <p>
                    Provides the ability to tailor guest services and marketing campaigns to unique customer segments.
                </p>
            </div>


            <div className="summary-item">
                <h3>Revenue Optimization</h3>
                <p>
                    Effective pricing, occupancy management, and customer targeting are critical to hotel 
                profitability in this fiercely competitive and demand-sensitive industry.
                </p>
            </div>


            <div className="summary-item">
                <h3>Predictive Intelligence</h3>
                <p>
                Anticipate booking patterns and customer tendencies using AI-driven analytics.
                </p>
            </div>
        </motion.div>

        {/* TEAM SECTION */}
            <motion.div
                className="card insights-summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h2 className="heading-sm">Developed By</h2>
                <div className="summary-grid">
                <div className="summary-item">
                    <h4>Danielle Simpson</h4>
                    </div>
                    <div className="summary-item">
                        <h4>Sha Morgan</h4>
                    </div>
                    <div className="summary-item">
                        <h4>Michalea Banton</h4>
                    </div>
                    </div>
                </motion.div>
        </motion.div>
    </div>
    );
};

export default Landing;

