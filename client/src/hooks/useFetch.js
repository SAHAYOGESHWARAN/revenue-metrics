import { useEffect, useState } from 'react';
import { fetchRevenueData } from '../services/revenueService';

const useFetch = (url, options = {}, retryCount = 0) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true); // Start loading
            setError(null); // Reset error state

            try {
                const response = await fetchRevenueData(url, options);
                setData(response);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
                if (retryCount > 0) {
                    console.warn(`Retrying... (${retryCount} attempts left)`);
                    setTimeout(() => {
                        getData(); // Retry fetching data
                    }, 1000); // Retry after 1 second
                }
            } finally {
                setLoading(false); // End loading
            }
        };

        getData();
    }, [url, options, retryCount]);

    return { data, loading, error };
};

export default useFetch;