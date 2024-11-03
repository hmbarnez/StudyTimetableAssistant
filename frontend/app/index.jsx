import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo.png';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from './redux/reducers/userReducer'; // Use login to set the user in Redux
import { jwtDecode } from "jwt-decode";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token)
      if (token) {
        try {
          // Decode the token to get user data
          const decodedToken = jwtDecode(token); // Decode the token

          const userId = decodedToken.id // Log the decoded token for debugging

          // Navigate to HomeScreen
          router.push({ pathname: '/(tabs)/home', params: { userId } })
        } catch (error) {
          console.error('Failed to decode token:', error);
          // Optionally clear the invalid token from storage
          await AsyncStorage.removeItem('token');
          router.push('/(auth)/starting');
        }
      } else {
        // User is not authenticated, navigate to the starting screen
        router.push('/(auth)/starting');
      }
    };

    const timer = setTimeout(() => {
      checkUserAuth();
    }, 3000);

    return () => clearTimeout(timer); // Cleanup function to clear the timer
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#4DC591]">
      <View className="w-full justify-center items-center min-h-[100vh]">
        <Image source={logo} />
        <StatusBar style='auto' />
      </View>
    </SafeAreaView>
  );
}
