import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from "expo-router"
import { StatusBar } from 'expo-status-bar'

const StartLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="account-created"
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="account-form"
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='account-creation'
          options={{headerShown: false}}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" barStyle="light" />
    </>
  )
}

export default StartLayout