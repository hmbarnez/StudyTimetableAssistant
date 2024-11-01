import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import AuthButton from '../../components/AuthButton';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router'
import { useSelector } from 'react-redux';

const AccountCreated = () => {
  const user = useSelector((state => state.user.user))
  const userType = useSelector((state => state.user.user)) ? user.type : null;
  const userId = useSelector((state => state.user.user)) ? user.id : null;
  const navigateToHome = () => {
    router.push({ pathname: '/(tabs)/home', params: { userId } })
  }


  return (
    <SafeAreaView className="bg-[#4DC591] h-full">
      <View className="w-full justify-around min-h-[88vh] mt-[100px] px-4 bg-white rounded-t-3xl">
        <View>
          <Text className="text-black text-4xl text-semibold mt-10 font-psemibold text-center">
            Your account type is:
          </Text>
          <Text className='text-[#00664F] text-3xl font-psemibold text-center mt-10'>
            {userType}
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