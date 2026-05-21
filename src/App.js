import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Ppredict from './Pages/Ppredict';
import Dashboard from './Pages/Dashboard';
import Insights from './Pages/Insights';
import './App.css';

/**
 * Main App Component
 * 
 * This is the root component that:
 * - Sets up routing for all pages using React Router
 * - Renders the navbar on all pages (persistent across navigation)
 * - Manages the overall layout structure
 * 
 * Routes:
 * - "/" → Prediction page (main input form)
 * - "/dashboard" → Analytics dashboard with KPIs and charts
 * - "/insights" → Detailed cluster insights and strategies
 */
function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar appears on all pages */}
        <Navbar />
        
        {/* Routes define which page is shown based on URL */}
        <Routes>
          {/* Main prediction page - default route */}
          <Route path="/" element={<Ppredict />} />
          
          {/* Dashboard page - shows KPIs and charts */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Insights page - detailed analysis and cluster info */}
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
        </button>

        <h2>Cluster: {result.cluster}</h2>
        <h3>Segment: {result.segment}</h3>        
                </div>
    );
    }

    export default App;