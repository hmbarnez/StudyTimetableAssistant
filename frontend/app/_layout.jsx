import { Text, View } from 'react-native'
import React from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { NativeWindStyleSheet } from "nativewind";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

//necessary for native wind to work
NativeWindStyleSheet.setOutput({
  default: "native",
});

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  //loads fonts from assets/fonts
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false}}/>
        <Stack.Screen name="(auth)" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
<<<<<<< HEAD:app/_layout.jsx
        <Stack.Screen name="(start)" options={{ headerShown: false }} />
        <Stack.Screen name="(settings)" options={{ headerShown: false }} />

=======
        <Stack.Screen name="(start)" options={{ headerShown: false}}/>
        <Stack.Screen name="(settings)" options={{ headerShown: false}}/>
>>>>>>> b062798bbb29039f312b691b258946ea7f439710:frontend/app/_layout.jsx
    </Stack>
  )
}

export default RootLayout
