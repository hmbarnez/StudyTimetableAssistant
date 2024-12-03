import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import logo from '../../assets/images/logo.png';
import { router } from 'expo-router';

export default function StartingScreen() {

    const styles = StyleSheet.create({
        button: {
            width: 335,
            height: 56,
            borderRadius: 15,
            margin: 10,
            backgroundColor: "#00664F",
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            color: "white",
            fontSize: 16,
            textAlign: "center",
        }
    });

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-[#4DC591]">
            <View className="w-full justify-center items-center min-h-[100vh]">
                <Image source={logo} />
                <View>
                    <Pressable style={styles.button} onPress={() => { router.navigate('sign-in') }}>
                        <Text className="font-pregular" style={styles.buttonText}>
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
