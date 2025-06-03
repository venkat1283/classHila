import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// import { useFrameworkReady } from '@/hooks/useFrameworkReady'; // Commented out or removed
// import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
// import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
// import {DMSans_400Regular, DMSans_600SemiBold, DMSans_700Bold,DMSans_500Medium} from '@expo-google-fonts/dm-sans'
// import {Raleway_700Bold} from '@expo-google-fonts/raleway'
// import {Montserrat_600SemiBold} from '@expo-google-fonts/montserrat'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Home, BookOpen, Heart } from 'lucide-react-native';
import React from 'react';
import * as SystemUI from 'expo-system-ui';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    // 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    Roboto_MD: require('../assets/fonts/Roboto-Medium.ttf'),
    Roboto_RG: require('../assets/fonts/Roboto-Regular.ttf'),
    Roboto_BD: require('../assets/fonts/Roboto-Bold.ttf'),
    DMSans_RG: require('../assets/fonts/DMSans-Regular.ttf'),
    DMSans_MD: require('../assets/fonts/DMSans-Medium.ttf'),
    DMSans_SBD: require('../assets/fonts/DMSans-SemiBold.ttf'),
    DMSans_BD: require('../assets/fonts/DMSans-Bold.ttf'),
    Raleway_BD: require('../assets/fonts/Raleway-Bold.ttf'),
    Montserrat_SBD: require('../assets/fonts/Montserrat-SemiBold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      if (fontError) {
        console.error('Font loading error:', fontError);
      }
      SplashScreen.hideAsync();
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('visible');
        NavigationBar.setBehaviorAsync('inset-swipe');
      }
      setAppIsReady(true);
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (appIsReady) {
      // Simulate a check for onboarding completion or user authentication
      const onboardingComplete = false; // Replace with actual logic from AsyncStorage or similar
      const userAuthenticated = false; // Replace with actual authentication logic

      if (!onboardingComplete) {
        router.replace('/splashScreen');
      } else if (!userAuthenticated) {
        router.replace('/welcomeScreen');
      } else {
        router.replace('/'); // Changed from '/index' to '/'
      }
    }
  }, [appIsReady, router]);

  if (!appIsReady) {
    return null; 
  }

  return (
    <>
      <Stack initialRouteName="splashScreen">
        <Stack.Screen name="splashScreen" options={{ headerShown: false }} />
        <Stack.Screen name="onboardingScreen" options={{ headerShown: false }} />
        <Stack.Screen name="welcomeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="categories" options={{ headerShown: false }} />
        <Stack.Screen name="categoryDetails" options={{ headerShown: false }} />
        <Stack.Screen name="recommendationCourses" options={{ headerShown: false }} />
        <Stack.Screen name="courseDetails" options={{ headerShown: false }} />
        <Stack.Screen name="profileScreen" options={{ headerShown: false }} />
        <Stack.Screen name="myCoursesScreen" options={{ headerShown: false }} />
        <Stack.Screen name="myCertificatesScreen" options={{ headerShown: false }} />
        <Stack.Screen name="myFavouritesScreen" options={{ headerShown: false}} />
        <Stack.Screen name="checkoutScreen" options={{ headerShown: false }} />
        <Stack.Screen name="checkoutSuccessScreen" options={{ headerShown: false }} />
        <Stack.Screen name="loginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="otpVerificationScreen" options={{ headerShown: false }} />
        <Stack.Screen name="forgotPasswordScreen" options={{ headerShown: false }} />
        <Stack.Screen name="resetPasswordScreen" options={{ headerShown: false }} />
        <Stack.Screen name="signUpScreen" options={{ headerShown: false }} />
        <Stack.Screen name="lookingFor" options={{ headerShown: false }} />
        <Stack.Screen name="interestSelectionScreen" options={{ headerShown: false }} />
        <Stack.Screen name="setupScreen" options={{ headerShown: false }} />
        <Stack.Screen name="startTestScreen" options={{ headerShown: false }} />
        <Stack.Screen name="testScreen" options={{ headerShown: false }} />
        <Stack.Screen name="scoreScreen" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
export default RootLayout;