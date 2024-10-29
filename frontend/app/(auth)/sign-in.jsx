import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import AuthFormField from '../../components/AuthFormField';
import AuthButton from '../../components/AuthButton';
import { router } from 'expo-router';
import { login, setLoading } from '../redux/reducers/userReducer';
import { loginUser } from '../services/authAPI';
import { icons } from '../../constants'
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const submit = async () => {
    dispatch(setLoading());

    try {
      const userData = await loginUser(form.email, form.password);
      dispatch(login(userData)); // Dispatch the login action with user data
      router.push('/(tabs)/home'); // Redirect to home after successful login
    } catch (err) {
      console.error('Sign in error:', err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data.message : 'An error occurred'); // Set error message to display
    }
  };

  return (
    <SafeAreaView className="bg-[#4DC591] h-full">
      <View>
        <TouchableOpacity onPress={() => router.push('starting')}>
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
            placeholder="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />
          <AuthFormField
            title="Password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
            secureTextEntry
          />
          {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
        </View>
        <View>
          <AuthButton
            title="Sign in"
            handlesPress={submit}
            containerStyles="mb-10"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
