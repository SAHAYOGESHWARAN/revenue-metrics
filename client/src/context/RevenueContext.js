import React, { createContext, useEffect, useState } from 'react';
import { fetchRevenueData } from '../services/revenueService';

export const RevenueContext = createContext();

export const RevenueProvider = ({ children }) => {
    const [revenueData, setRevenueData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchRevenueData();
                setRevenueData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return (
        <RevenueContext.Provider value={{ revenueData, loading, error }}>
            {children}
        </RevenueContext.Provider>
    );
};