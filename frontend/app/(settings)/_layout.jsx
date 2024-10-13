import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack >
      <Stack.Screen name="feedback" options={{headerShown: false}}/>
      <Stack.Screen name="notification-settings" options={{headerShown: false}}/>
      <Stack.Screen name="account-settings" options={{headerShown: false}}/>
    </Stack>
  );
}
