import images from '@/assets/images';
import { useRouter } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen'; // Renamed import
import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
// import { Asset } from 'expo-asset'; // No longer needed for this approach

const AppSplashScreen = () => { // Renamed component
    const router = useRouter();
    const overlayOpacity = useRef(new Animated.Value(1)).current; // Animated value for overlay opacity

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
      
        const hideSplash = async () => {
          try {
            await ExpoSplashScreen.hideAsync();
          } catch (e) {
            console.warn('Splash already hidden or failed to hide');
          }
      
          timer = setTimeout(() => {
            Animated.timing(overlayOpacity, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }).start(() => {
              router.replace('/onboardingScreen');
            });
          }, 1000);
        };
      
        hideSplash();
      
        return () => clearTimeout(timer); // cleanup
      }, []);
      
      

    return (
        <View style={styles.container}>
            {/* Single Splash Image */}
            <Image
                source={images.splash} // Use the single splash image
                style={styles.splashImage}
                resizeMode="cover" // Use cover or contain based on desired fit
            />
            {/* Transparent Overlay */}
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333333', // Dark grey background
    },
    splashImage: {
        width: '100%',
        height: '100%',
    },
    overlay: { // Style for the transparent overlay
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black (adjust opacity as needed)
    },
});

export default AppSplashScreen; 