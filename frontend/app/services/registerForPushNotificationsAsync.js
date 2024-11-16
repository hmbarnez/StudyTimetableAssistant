// src/utils/notifications.js
import * as Notifications from 'expo-notifications';

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
