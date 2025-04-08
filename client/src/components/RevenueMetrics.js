import React from 'react';

const RevenueMetrics = ({ data }) => {
    return (
        <div>
            <h3>Revenue Data</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default RevenueMetrics;