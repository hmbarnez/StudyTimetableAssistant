import { View, Text, Image} from 'react-native'
import React from 'react'
import { NativeWindStyleSheet } from "nativewind";
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';


NativeWindStyleSheet.setOutput({
    default: "native",
});

const TabIcon = ({ icon, color, name, focused}) => {
  return (
    //add gap-2 at the end of this
    <View className="items-center justify-center ">
      <Image 
        source={icon} 
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-5"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'}`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabLayout = () => {
  return (
    <>
      <Tabs 
        screenOptions={{
          tabBarShowLabel: false,
          //changes the color of the icon when active
          tabBarActiveTintColor: '#00654f',
          //inactive color
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            //white background
            backgroundColor: '#FFFFFF',
            //no border for now
            borderTopWidth: 0,
            borderTopColor: '#CDCDE0',
            //height of the footer
            height: 80, 
          }
        }}>
        <Tabs.Screen 
          name="home"
          options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.home} focused={focused} name="Home" color={color}/>
              )
            }}
        />
        <Tabs.Screen 
          name="schedule"
          options={{
              title: 'Schedule',
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.schedule} focused={focused} name="Schedule" color={color}/>
              )
            }}
        />
        <Tabs.Screen 
          name="activity"
          options={{
              title: 'Activity',
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.plus} focused={focused} name="Activity" color={color}/>
              )
            }}
        />
        <Tabs.Screen 
          name="profile"
          options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.profile} focused={focused} name="Profile" color={color}/>
              )
            }}
        />
      </Tabs>
    </>
  )
}

export default TabLayout