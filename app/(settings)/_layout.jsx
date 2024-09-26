import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="feedback" />
      <Stack.Screen name="notification-settings" />
      <Stack.Screen name="account-settings" />
    </Stack>
  );
}
