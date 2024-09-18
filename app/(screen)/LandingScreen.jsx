import { View, Text, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/images/logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

export default function LandingScreen() {

    useEffect(() => {
        // Automatically navigate to 'Details' screen after 3 seconds
        const timer = setTimeout(() => {
            navigation.navigate('Starting');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);

    const navigation = useNavigation();

    return (

        <SafeAreaView className="flex-1 items-center justify-center bg-emerald-500">
            <View className="w-full justify-center items-center min-h-[100vh]">
                <Image source={logo} />

                <StatusBar style='auto' />
            </View>
        </SafeAreaView>


    );


}