import { useEffect, useState } from 'react';
import { fetchRevenueData } from '../services/revenueService';

const useFetch = () => {
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

    return { revenueData, loading, error };
};

export default useFetch;