import { View, Text , TouchableOpacity, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useState } from 'react'
import AuthFormField from '../../components/AuthFormField'
import AuthButton from '../../components/AuthButton'
import { router , Link} from 'expo-router'
import { icons } from '../../constants'

const SignUp = () => {

  const [form, setform] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const submit = () => {
    //sign in logic here
    console.log(form)
    // router.navigate('/sign-in')
  }

  return (
    //change to use bg-primary later from tailwind config
    <SafeAreaView className="bg-[#4DC591] h-full">
      <View>
      <TouchableOpacity onPress={() =>{router.back()}}>
          <Image source={icons.lefticon} className="w-6 h-6 mt-10 ml-5" />
        </TouchableOpacity>
      </View>
      <View className="w-full justify-around min-h-[85vh] mt-[80px] px-4 bg-white rounded-3xl">
        <View>
          <Text className="text-black text-4xl text-semibold  font-psemibold text-center">
            Sign Up
          </Text>
          <Text className=' text-[#61677D] font-pregular text-center mt-5'>
            Sign up if you do not already have an account.
          </Text>

          <AuthFormField
            title="First Name"
            placeholder={'First Name'}
            value={form.firstName}
            handleChangeText={(e) => setform({...form, firstName: e})}
            otherStyles="mt-4"
          />
          <AuthFormField
            title="Last Name"
            placeholder={'Last Name'}
            value={form.lastName}
            handleChangeText={(e) => setform({...form, lastName: e})}
            otherStyles="mt-4"
          />
          <AuthFormField
            title="Email"
            placeholder={'Email'}
            value={form.email}
            handleChangeText={(e) => setform({...form, email: e})}
            otherStyles="mt-4"
            keyBoardType="email-address"
          />
          <AuthFormField
            title='Password'
            placeholder={'Password'}
            value={form.password}
            handleChangeText={(e) => setform({...form, password: e})}
            otherStyles="mt-4"
          />
          <AuthFormField
            title='Password'
            placeholder={'Confirm Password'}
            value={form.confirmPassword}
            handleChangeText={(e) => setform({...form, confirmPassword: e})}
            otherStyles="mt-4"
          />

          
        </View>
        <View>
          <AuthButton
            title="Create Account"
            handlesPress={submit}
            containerStyles={'mb-20'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp