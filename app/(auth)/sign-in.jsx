import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useState } from 'react'
import AuthFormField from '../../components/AuthFormField'
import AuthButton from '../../components/AuthButton'
import { router , Link} from 'expo-router'


const SignIn = () => {

  const [form, setform] = useState({
    email: '',
    password: ''
  })

  const submit = () => {
    //sign in logic here
    console.log(form)
    router.navigate('../(tabs)/home')
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
            Log in with email
          </Text>

          <AuthFormField
            title="Email"
            placeholder={'Email'}
            value={form.email}
            handleChangeText={(e) => setform({...form, email: e})}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />
          <AuthFormField
            title='Password'
            placeholder={'Password'}
            value={form.password}
            handleChangeText={(e) => setform({...form, password: e})}
            otherStyles="mt-4"
          />

          <View className="justify-end pt-5  px-5 flex-row gap-2">
            <Text>
              <Link 
                className="text-base text-secondary font-pregular"
                href='/forgot-password'>Forgot Password?</Link>
              </Text>
          </View>
        </View>
        <View>
          <AuthButton
            title="Sign in"
            handlesPress={submit}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignIn