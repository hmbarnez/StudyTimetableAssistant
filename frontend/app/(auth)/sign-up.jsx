import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useState } from 'react'
import AuthFormField from '../../components/AuthFormField'
import AuthButton from '../../components/AuthButton'
import { router, Link } from 'expo-router'
import { icons } from '../../constants'
import { useDispatch } from 'react-redux';
import { setLoading, setError, setUser } from '../redux/reducers/userReducer';
import { signUp } from '../services/authAPI'

const SignUp = () => {

  const [form, setform] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: '',
    password: '',
    confirmPassword: '',
  })
  const dispatch = useDispatch();

  const submit = async () => {
    dispatch(setLoading());
    try {
      // Perform the sign-up with first name, last name, email, and password
      const userData = await signUp(form.email, form.firstName, form.lastName, form.type, form.password);

      // Store the user data (like ID) in Redux so it can be accessed later for type update
      dispatch(setUser(userData));

      router.push('/(start)/account-creation'); // Assuming '/select-user-type' is the route for selecting user type
    } catch (err) {
      console.error('Sign-up error:', err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data.message : 'An error occurred during sign-up');
    }
  };

  return (
    //change to use bg-primary later from tailwind config
    <SafeAreaView className="bg-[#4DC591] h-full">
      <ScrollView>
        <View>
          <TouchableOpacity onPress={() => { router.back() }}>
            <Image source={icons.lefticon} className="w-6 h-6 mt-10 ml-5" />
          </TouchableOpacity>
        </View>
        <View className="w-full justify-around min-h-[88vh] mt-[80px] px-4 bg-white rounded-3xl">
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
              handleChangeText={(e) => setform({ ...form, firstName: e })}
              otherStyles="mt-4"
            />
            <AuthFormField
              title="Last Name"
              placeholder={'Last Name'}
              value={form.lastName}
              handleChangeText={(e) => setform({ ...form, lastName: e })}
              otherStyles="mt-4"
            />
            <AuthFormField
              title="Email"
              placeholder={'Email'}
              value={form.email}
              handleChangeText={(e) => setform({ ...form, email: e })}
              otherStyles="mt-4"
              keyBoardType="email-address"
            />
            <AuthFormField
              title='Password'
              placeholder={'Password'}
              value={form.password}
              handleChangeText={(e) => setform({ ...form, password: e })}
              otherStyles="mt-4"
            />
            <AuthFormField
              title='Password'
              placeholder={'Confirm Password'}
              value={form.confirmPassword}
              handleChangeText={(e) => setform({ ...form, confirmPassword: e })}
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp