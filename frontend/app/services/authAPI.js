import axios from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:3000/users';

// Function to login a user
export const loginUser = async (email, password) => {
    try {

        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
};

// Function to logout a user
export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`);
        return response.data; // You can return a message or status
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging out');
    }
};

export const deleteAccount = async (userId, password) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`, {
            data: { password }, // Send password in the request body
        });
        return response.data; // Return a message or status if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting account');
    }
};
