import axios from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:3000/events';

// Update user function
export const fetchEvents = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data; // Return the updated user data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating user');
    }
};
