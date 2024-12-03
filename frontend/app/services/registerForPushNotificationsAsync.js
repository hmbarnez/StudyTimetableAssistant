// src/utils/notifications.js
import * as Notifications from 'expo-notifications';
import axios from 'axios';

export async function registerForPushNotificationsAsync() {
    let token;
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);
        // Optionally, send this token to your backend for future notifications
    } else {
        alert('Push notifications permission denied');
    }
    return token;
}

export async function sendUserId(userId) {
    try {
        await axios.post('http://10.0.0.192:3000/notifications/id', {
            userId: userId,
        });
    } catch (error) {
        console.error('Error sending userId:', error);
    }
}

