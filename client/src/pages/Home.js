import React, { useContext } from 'react';
import RevenueMetrics from '../components/RevenueMetrics';
import { RevenueContext } from '../context/RevenueContext';
import './Home.css'; // Importing CSS for styling

const Home = () => {
    const { revenueData, loading, error } = useContext(RevenueContext);

    return (
        <div className="home-container">
            <h2>Current Revenue Metrics</h2>
            {loading && <div className="loading">Loading revenue metrics...</div>}
            {error && <div className="error">Error: {error}</div>}
            {revenueData && revenueData.length > 0 ? (
                <RevenueMetrics data={revenueData} />
            ) : (
                !loading && <div className="no-data">No revenue data available.</div>
            )}
        </div>
    );
};

export default Home;