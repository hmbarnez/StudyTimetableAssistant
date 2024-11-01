import axios from 'axios';

// Base URL for your backend API
const api = axios.create({
    baseURL: 'http://10.0.0.206:3000/events', // Use your local IP
});

// Update user function
export const fetchEvents = async (userId) => {
    try {
        const response = await api.get(`/${userId}`);
        return response.data; // Return the updated user data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating user');
    }
};
