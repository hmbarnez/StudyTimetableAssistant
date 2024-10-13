import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from "expo-router"
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="starting"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sign-in"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sign-up"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='forgot-password'
          options={{ headerShown: false }}
        />
        
      </Stack>

      <StatusBar backgroundColor="#161622" barStyle="light" />
    </>
  )
}

export default AuthLayout