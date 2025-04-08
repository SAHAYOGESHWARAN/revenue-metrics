import React, { createContext, useEffect, useState } from 'react';
import { fetchRevenueData } from '../services/revenueService';

export const RevenueContext = createContext();

export const RevenueProvider = ({ children }) => {
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(3); // Number of retries

    useEffect(() => {
        const getData = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset error state

            try {
                const data = await fetchRevenueData();
                setRevenueData(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch revenue data');
                if (retryCount > 0) {
                    console.warn(`Retrying... (${retryCount} attempts left)`);
                    setRetryCount(retryCount - 1); // Decrease retry count
                    setTimeout(getData, 1000); // Retry after 1 second
                }
            } finally {
                setLoading(false); // End loading
            }
        };

        getData();
    }, [retryCount]); // Dependency on retryCount

    return (
        <RevenueContext.Provider value={{ revenueData, loading, error }}>
            {loading ? (
                <div className="loading">Loading revenue data...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                children
            )}
        </RevenueContext.Provider>
    );
};