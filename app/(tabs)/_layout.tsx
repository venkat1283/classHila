import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
// import * as SplashScreen from 'expo-splash-screen'; // Removed
import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

// Prevent splash screen from auto-hiding // Removed
// SplashScreen.preventAutoHideAsync(); // Removed

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index" // Corresponds to app/(tabs)/index.tsx (the Home tab)
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color }}>Home</Text>, // Use Home icon
        }}
      />
      <Tabs.Screen
        name="myCoursesScreen" // Corresponds to app/(tabs)/myCoursesScreen.tsx
        options={{
          title: 'My Courses',
          tabBarIcon: ({ color }) => <Text style={{ color }}>Courses</Text>, // Use BookOpen icon
        }}
      />
      <Tabs.Screen
        name="myFavouritesScreen" // Corresponds to app/(tabs)/myFavouritesScreen.tsx
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Text style={{ color }}>Favs</Text>, // Use Heart icon
        }}
      />
      <Tabs.Screen
        name="profile" // Corresponds to app/(tabs)/profile.tsx
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color }}>Profile</Text>, // Use User icon
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({}); // Add an empty stylesheet if no specific styles are needed in this file