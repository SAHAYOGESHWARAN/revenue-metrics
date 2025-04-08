import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance with default settings
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000, // Set a timeout of 5 seconds
});

// Function to fetch revenue data
export const fetchRevenueData = async (customHeaders = {}) => {
    try {
        const response = await axiosInstance.get('/revenue', {
            headers: {
                ...customHeaders, // Merge custom headers if provided
            },
        });
        return response.data;
    } catch (error) {
        // Handle errors more gracefully
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.message}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('Error: No response received from the server.');
        } else {
            // Something happened in setting up the request
            throw new Error(`Error: ${error.message}`);
        }
    }
};