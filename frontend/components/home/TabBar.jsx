import { Text, View, Pressable } from 'react-native'
import React from 'react'

export const TabBar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View className="flex-row mx-12 justify-between">
      {tabs.map((tab) => (
        <Pressable
          key={tab.name}
          onPress={() => setActiveTab(tab.name)}
          className={`border-solid w-24 rounded-lg h-11 items-center justify-center ${activeTab === tab.name ? 'bg-gray-300' : 'bg-green-500'}`}
        >
          <Text onPress={() => { }} className=" text-lime-800 font-pregular">
            {tab.count > 0 ? `${tab.count} ${tab.name}` : `0 ${tab.name}`}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}