import React, { useContext } from 'react';
import RevenueMetrics from '../components/RevenueMetrics';
import { RevenueContext } from '../context/RevenueContext';

const Home = () => {
    const { revenueData } = useContext(RevenueContext);

    return (
        <div>
            <h2>Current Revenue Metrics</h2>
            <RevenueMetrics data={revenueData} />
        </div>
    );
};

export default Home;