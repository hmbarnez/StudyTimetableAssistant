import { View, Text,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{ useState, useEffect }  from 'react';
import AuthButton from '../../components/AuthButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AccountCreation = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null); // State to hold the userId

  // useEffect to retrieve userId from AsyncStorage on component mount
  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          console.log("UserID retrieved from AsyncStorage:", storedUserId);
        } else {
          console.log("No userId found in AsyncStorage.");
        }
      } catch (e) {
        console.error('Failed to fetch userId from AsyncStorage', e);
      }
    };

    getUserIdFromStorage();
  }, []);

  const navigateToForm = () => {
    // Directly navigate to the account form page
    navigation.navigate('account-form', { userId });

  }

  return (
    <SafeAreaView className="bg-[#4DC591] h-full">
      <View className="w-full justify-around min-h-[88vh] mt-[100px] px-4 bg-white rounded-t-3xl">
        <View>
          <Text className="text-black text-4xl text-semibold mt-10 font-psemibold text-center">
            Account Created!
          </Text>
          <Text className=' text-[#61677D] font-pregular text-center mt-5'>
            Answer a few questions to help us determine your account type. Get started now.
          </Text>
        </View>
        <View>
          <AuthButton
            title="Get Started"
            handlesPress={navigateToForm}
            containerStyles={'mb-10'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AccountCreation;
