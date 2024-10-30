import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.192:3000/users', // Use your local IP
});

// Function to login a user
export const loginUser = async (email, password) => {
    try {

        const response = api.post(`/login`, {
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
        const response = api.post(`/logout`);
        return response.data; // You can return a message or status
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging out');
    }
};

export const signUp = async (email, firstName, lastName, type, password) => {
    try {
        const response = api.post(`/signup`, {
            email,
            firstName,
            lastName,
            type,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error signing up');
    }
};

export const deleteAccount = async (userId, password) => {
    try {
        const response = api.delete(`/${userId}`, {
            data: { password }, // Send password in the request body
        });
        return response.data; // Return a message or status if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting account');
    }
};
