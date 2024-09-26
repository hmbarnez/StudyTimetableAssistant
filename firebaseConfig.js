import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB78N4Y_4-NHu8peczpTuoNZqQePZwpKAI",
  authDomain: "studyplanner-77733.firebaseapp.com",
  projectId: "studyplanner-77733",
  storageBucket: "studyplanner-77733.appspot.com",
  messagingSenderId: "243223055493",
  appId: "1:243223055493:web:0ce703fad0e93779652dec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export app and db separately for easier imports
export { app, db };
