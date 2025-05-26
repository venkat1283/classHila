import { Stack } from 'expo-router';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="courses" />
      <Stack.Screen name="search" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}