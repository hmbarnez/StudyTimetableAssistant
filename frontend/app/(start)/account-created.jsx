import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import AuthButton from '../../components/AuthButton';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router'



const AccountCreated = () => {

  const route = useRoute(); // Get access to the route object
  const { accountType } = route.params; // Destructure the accountType from route.params

  const navigateToHome = () => {
    router.navigate('/(tabs)/home');  
  }


  return (
    <SafeAreaView className="bg-[#4DC591] h-full">
      <View className="w-full justify-around min-h-[88vh] mt-[100px] px-4 bg-white rounded-t-3xl">
        <View>
          <Text className="text-black text-4xl text-semibold mt-10 font-psemibold text-center">
            Your account type is:
          </Text>
          <Text className=' text-[#00664F] text-3xl font-psemibold text-center mt-10'>
            {accountType}!
          </Text>
        </View>
        <View>
          <AuthButton
            title="Continue"
            handlesPress={navigateToHome}
            containerStyles={'mb-10'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AccountCreated