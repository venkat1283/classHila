import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import images from '@/assets/images';

const WelcomeScreen = () => {
  const router = useRouter();

  const handleLoginPress = () => {
    try {
      console.log("Attempting to navigate to login screen...");
      router.push('/loginScreen');
    } catch (error) {
      console.error("Error navigating to login screen:", error);
    }
  };

  const handleGetStartedPress = () => {
    try {
      console.log("Attempting to navigate to sign up screen...");
      router.push('/signUpScreen');
    } catch (error) {
      console.error("Error navigating to sign up screen:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <Text style={styles.subtitle}>India's First</Text>
        <Text style={styles.title}>Competitive Exam App with</Text>
        <Text style={styles.title}>Personalised & Inclusive Learning</Text>
        {/* Replace with actual logo */}
        <Image source={images.titleImg} style={styles.titleImg} />
        {/* Removed illustrationPlaceholder View for testing */}
        <View style={styles.illustrationPlaceholder}></View>
        
        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStartedPress}>
          <Text style={styles.getStartedButtonText}>Get start</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 13,
    fontFamily:'Montserrat_SBD',
    textAlign: 'center',
    color: '#000',
  },
  title: {
    fontSize: 13,
    fontFamily:'Montserrat_SBD',
    textAlign: 'center',
    color: '#000',
  },
  titleImg:{
    width:'46%',
    height:'3.5%',
    marginTop:30,
    resizeMode:'cover'
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF731F',
    marginBottom: 30,
  },
  illustrationPlaceholder: {
    width: '99%',
    aspectRatio:1.15, // Adjust height as needed
    backgroundColor: '#f0f0f0', // Placeholder background
    marginVertical: 63,
  },
  getStartedButton: {
    backgroundColor: '#FF731F',
    paddingVertical: 10,
    // paddingHorizontal: 80,
    width: '58%', // Make button wider
    alignSelf: 'center', // Center the button
    borderRadius: 6,
    marginBottom: 15,
    height:40,
    alignItems: 'center', // Center text inside button
  },
  getStartedButtonText: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Montserrat_SBD', // Assuming Poppins font is used
  },
  loginText: {
    fontSize: 10,
    color: '#FF731F',
    fontFamily: 'Montserrat_SBD', // Assuming Poppins font is used
  },
});

export default WelcomeScreen; 