import { View, Text , TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth' // Import Firebase Auth functions
import AuthFormField from '../../components/AuthFormField'
import AuthButton from '../../components/AuthButton'
import { router, Link } from 'expo-router'
import { icons } from '../../constants'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Handle sign in
  const submit = async () => {
    const auth = getAuth(); // Get Firebase Auth instance
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log('User signed in');
      router.push('/home'); // Redirect to the profile page after successful sign-in
    } catch (err) {
      console.error('Sign in error:', err.message);
      setError("Sign-in Failed. Please try again with the correct credentials of an Existing Account"); // Display error if sign-in fails
    }
  };

  return (
    <SafeAreaView className="bg-[#4DC591] h-full">
      <View>
        <TouchableOpacity onPress={() => {router.back()}}>
          <Image source={icons.lefticon} className="w-6 h-6 mt-10 ml-5" />
        </TouchableOpacity>
      </View>
      <View className="w-full justify-around min-h-[88vh] mt-[80px] px-4 bg-white rounded-3xl">
        <View>
          <Text className="text-black text-4xl text-semibold mt-10 font-psemibold text-center">
            Log in with email
          </Text>

          <AuthFormField
            title="Email"
            placeholder={'Email'}
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />
          <AuthFormField
            title='Password'
            placeholder={'Password'}
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-4"
            secureTextEntry
          />

          {/* Display error message if sign-in fails */}
          {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}

          <View className="justify-end pt-5 px-5 flex-row gap-2">
            <Text>
              <Link className="text-base text-secondary font-pregular" href='/forgot-password'>
                Forgot Password?
              </Link>
            </Text>
          </View>
        </View>

        <View>
          <AuthButton
            title="Sign in"
            handlesPress={submit}
            containerStyles={'mb-10'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignIn;
