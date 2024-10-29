import axios from 'axios';

// Base URL for your backend API
const API_URL = 'http://localhost:3000/users';

// Update user function
export const updateUser = async (id, updatedData) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, updatedData);
        return response.data; // Return the updated user data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating user');
    }
};
