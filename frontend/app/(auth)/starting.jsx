import { View, Text, Image, Button, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import logo from '../../assets/images/logo.png';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

export default function StartingScreen() {
    const user = useSelector((state) => state.user.user);

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
            // fontFamily: "Poppins"
        }
    })

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-[#4DC591]">
            <View className="w-full justify-center items-center min-h-[100vh]">
                <Image source={logo} />
                <View>
                    <Pressable style={styles.button}>
                        <Text className="font-pregular" style={styles.buttonText} onPress={() => { router.navigate('sign-in') }}>
                            Sign In
                        </Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => { router.navigate('sign-up') }}>
                        <Text className="font-pregular" style={styles.buttonText}>
                            Create An Account
                        </Text>
                    </Pressable>
                </View>
                <StatusBar style='auto' />
            </View>
        </SafeAreaView>
    );



}