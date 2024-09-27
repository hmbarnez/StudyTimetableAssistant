import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_REACT_APP_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_REACT_APP_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_REACT_APP_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_REACT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export app and db separately for easier imports
export { app, db };
