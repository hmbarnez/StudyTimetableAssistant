import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo.png';
import { useEffect, useState } from 'react';

// Firebase imports
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    // Set persistence to local so user stays signed in
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Listen to user authentication state changes
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("User is signed in:", user);
            setIsAuthenticated(true);
          } else {
            console.log("No user is signed in.");
            setIsAuthenticated(false);
          }
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // After authentication state is checked, navigate to the appropriate screen
    if (!loading) {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          router.push('/(tabs)/home');  // Assuming HomeScreen is for authenticated users
        } else {
          router.push('/(auth)/starting');  // Assuming StartingScreen is for non-authenticated users
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#4DC591]">
      <View className="w-full justify-center items-center min-h-[100vh]">
        <Image source={logo} />
        <StatusBar style='auto' />
      </View>
    </SafeAreaView>
  );
}
