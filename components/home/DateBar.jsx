import { View, Text, Pressable } from 'react-native'
import React from 'react'

export const DateBar = () => {
  return (
    <View >
      <View className="flex-row h-16 mt-20 mx-12 ">
        <Text className=" text-5xl">24</Text>
        <View className=" ml-2 ">
          <Text className=" text-teal-600 font-pregular">Wed</Text>
          <Text className=" text-teal-600 font-pregular">Jan 2020</Text>
        </View>
        <View className="ml-auto bg-lime-50 w-20 h-10 rounded-lg border-solid items-center justify-center">
          <Text className="font-psemibold text-lime-500">Today</Text>
        </View> 
      </View>

      <View className="flex-row h-16 mx-12">
        <Pressable >
          <Text onPress={() => { }} className="text-xl font-psemibold ">
            {'<'}
          </Text>
        </Pressable>
        <Pressable className="ml-auto ">
          <Text onPress={() => { }} className="text-xl font-psemibold">
            {'>'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}