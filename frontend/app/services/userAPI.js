import axios from 'axios';

// Base URL for your backend API
const api = axios.create({
    baseURL: 'http://localhost:3000/users', // Use your local IP
});

export const fetchUser = async (userId) => {
    try {
        const response = await api.get(`/${userId}`);
        return response.data; // Return the updated user data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating user');
    }
};
// Update user function
export const updateUser = async (id, updatedData) => {
    try {
        const response = await api.patch(`/${id}`, updatedData);
        return response.data; // Return the updated user data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating user');
    }
};
