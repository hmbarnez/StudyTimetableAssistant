import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://192.168.1.169:3000/users', // Use your local IP
});

// Function to login a user
export const loginUser = async (email, password) => {

    try {
        const response = await api.post(`/login`, {
            email,
            password,
        });

        const { token, user } = response.data;
        await AsyncStorage.setItem('token', token);

        return user;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
};

// Function to logout a user
export const logoutUser = async () => {
    try {
        const response = await api.post(`/logout`);
        return response.data; // You can return a message or status
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging out');
    }
};

export const signUp = async (email, firstName, lastName, type, password) => {
    try {
        // Await the response from the axios post request
        const response = await api.post(`/signup`, {
            email,
            firstName,
            lastName,
            type,
            password,
        });

        const { token, user } = response.data;

        await AsyncStorage.setItem('token', token);

        return user;

    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error signing up');
    }
};

export const deleteAccount = async (userId, password) => {
    try {
        const response = await api.delete(`/${userId}`, {
            data: { password }, // Send password in the request body
        });
        return response.data; // Return a message or status if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting account');
    }
};


