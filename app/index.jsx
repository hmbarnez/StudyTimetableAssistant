import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-web';
import logo from '../assets/images/logo.png';

export default function App() {
  return (
    //can change bg color later using tailwind config file
    <SafeAreaView className="flex-1 items-center justify-center bg-emerald-500">
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[100vh]">
          <Image source={logo}/>
          {/* <Text className="text-4xl font-pregular">Landing Page</Text>
          <Link href={""} className="text-blue-500">Home</Link> */}
          <StatusBar style='auto' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
