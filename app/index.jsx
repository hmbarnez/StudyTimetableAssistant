import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo.png';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
        // Automatically navigate to 'Details' screen after 3 seconds
        const timer = setTimeout(() => {
            router.push('/(auth)/StartingScreen');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    

    return (

        <SafeAreaView className="flex-1 items-center justify-center bg-[#4DC591]">
            <View className="w-full justify-center items-center min-h-[100vh]">
                <Image source={logo} />
                <StatusBar style='auto' />
            </View>
        </SafeAreaView>

    );
}
