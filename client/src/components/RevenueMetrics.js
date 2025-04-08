import React from 'react';
import '../styles/RevenueMetrics.css'; 

const RevenueMetrics = ({ data }) => {
    // Check if data is available
    if (!data || data.length === 0) {
        return <div className="no-data">No revenue data available.</div>;
    }

    return (
        <div className="revenue-metrics">
            <h3>Revenue Data</h3>
            <table className="revenue-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>{item.amount.toFixed(2)}</td>
                            <td>{item.currency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RevenueMetrics;