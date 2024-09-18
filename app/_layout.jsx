import { Text, View } from 'react-native'
import React from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { NativeWindStyleSheet } from "nativewind";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './(screen)/LandingScreen';
import StartingScreen from './(screen)/StartingScreen';
import SignIn from './(auth)/sign-in'
import SignUp from './(auth)/sign-up'

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

  const Stack = createStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ title: 'Landing', headerShown: false }}
        />
        <Stack.Screen
          name="Starting"
          component={StartingScreen}
          options={{ title: 'Starting', headerShown: false }}
        />
        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{ title: 'Sign In', headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ title: 'Sign Up', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootLayout
