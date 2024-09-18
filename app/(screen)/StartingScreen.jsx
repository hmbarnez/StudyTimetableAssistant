import { View, Text, Image, Button, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import logo from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';

export default function StartingScreen() {

    const styles = StyleSheet.create({
        buttonContainer: {

        },
        button: {
            width: 335,
            height: 56,
            borderRadius: 15,
            borderColor: "red",
            margin: 10,
            backgroundColor: "#00664F"
        },
        buttonText: {
            color: "white",
            textAlign: "center",
            padding: 16,
            fontSize: 16,
            fontFamily: "Poppins"
        }
    })

    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-emerald-500">
            <View className="w-full justify-center items-center min-h-[100vh]">
                <Image source={logo} />
                <View>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => { navigation.navigate('Sign In') }}>
                            Sign In
                        </Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => { navigation.navigate('Sign Up') }}>
                        <Text style={styles.buttonText}>
                            Create An Account
                        </Text>
                    </Pressable>
                </View>
                <StatusBar style='auto' />
            </View>
        </SafeAreaView>
    );



}