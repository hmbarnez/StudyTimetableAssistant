import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useState } from 'react'
import AuthFormField from '../../components/AuthFormField'
import AuthButton from '../../components/AuthButton'
import { router , Link} from 'expo-router'


const ForgotPassword = () => {

  const [form, setform] = useState({
    email: '',
  })

  const submit = () => {
    //sign in logic here
    console.log(form)
    router.navigate('/sign-in')
  }

  return (
    //change to use bg-primary later from tailwind config
    <SafeAreaView className="bg-[#4DC591] h-full">
      <View>
        <Text>arrow button up here</Text>
      </View>
      <View className="w-full justify-around min-h-[85vh] mt-40 px-4 bg-white rounded-3xl">
        <View>
          <Text className="text-black text-4xl text-semibold mt-10 font-psemibold text-center">
            Forgot Password?
          </Text>

          <AuthFormField
            title="Email"
            placeholder={'Email'}
            value={form.email}
            handleChangeText={(e) => setform({...form, email: e})}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />
          

          <View className="justify-center pt-5  px-5 flex-row gap-2">
            <Text className="text-base text-center font-pregular"
            >Reset your password if you already have an account</Text>
          </View>
        </View>
        <View>
          <AuthButton
            title="Reset Password"
            handlesPress={submit}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword