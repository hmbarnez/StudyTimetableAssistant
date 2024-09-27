import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo.png';
import { useEffect } from 'react';
import { router} from 'expo-router'

export default function App() {
  useEffect(() => {
    // Automatically navigate to 'auth' screen after 3 seconds
    const timer = setTimeout(() => {
      router.push('(tabs)/starting'); // 'push' navigates to (auth) screen
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    //can change bg color later using tailwind config file
    <SafeAreaView className="flex-1 items-center justify-center bg-emerald-500">
      <View className="w-full justify-center items-center min-h-[100vh]">
        <Image source={logo} />
        {/* <Text className="text-4xl font-pregular">Landing Page</Text>
          <Link href={""} className="text-blue-500">Home</Link> */}
        <StatusBar style='auto' />
      </View>
    </SafeAreaView>
  );
}
