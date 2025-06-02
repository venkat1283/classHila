import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye } from 'lucide-react-native'; // Assuming Eye icon is from lucide-react-native
import { useRouter, Stack } from 'expo-router';
import images from '@/assets/images';
import React, { useState } from 'react'; // Import useState
import PhoneNumberInput from './components/PhoneNumberInput'; // Import the new component

const SignUpScreen = () => {
    const router = useRouter();

    const [countryCode, setCountryCode] = useState('+91'); // State for country code
    const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number
    const [email, setEmail] = useState(''); // State for email
    const [fullName, setFullName] = useState(''); // State for full name
    const [password, setPassword] = useState(''); // State for password
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password

    const handleBackPress = () => {
        router.back();
    };

    const handleSignInPress = () => {
        // Navigate to Sign In screen
        router.replace('/loginScreen'); // Assuming login screen route is /loginScreen
    };

    const handleSignUpNowPress = () => {
        // Handle Sign Up logic
        console.log('Sign Up Now pressed');
        // Navigate after successful sign up (example)
        router.replace('/interestSelectionScreen'); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignInPress}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.createAccountTitle}>Create your Account</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.{"\n"}Ullamcorper dia auctor volutpat quis.</Text>

                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Input your Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                />

                <Text style={styles.inputLabel}>phone Number</Text>
                <PhoneNumberInput
                    countryCode={countryCode}
                    phoneNumber={phoneNumber}
                    onCountryCodeChange={setCountryCode}
                    onPhoneNumberChange={setPhoneNumber}
                />

                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Input your Email Address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Input your Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.eyeIconContainer}>
                        <Image source={images.eye} style={styles.eyeImg} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Input your Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity style={styles.eyeIconContainer}>
                        <Image source={images.eye} style={styles.eyeImg} />
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpNowPress}>
                    <Text style={styles.signUpButtonText}>Sign Up Now</Text>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    signInText: {
        fontFamily: 'DMSans_BD',
        fontSize: 16,
        color: '#FF731F',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    createAccountTitle: {
        fontSize: 24,
        fontFamily: 'Raleway_BD',
        color: '#000',
        marginBottom: 16,
    },
    description: {
        fontSize: 12,
        fontFamily: 'DMSans_RG',
        color: '#8A8A8E',
        marginBottom: 32,
    },
    inputLabel: {
        fontSize: 14,
        fontFamily: 'DMSans_BD',
        color: '#000',
        marginBottom: 2,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 12,
        fontFamily: 'Roboto_RG',
        marginBottom: 16,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 12,
        fontFamily: 'Roboto_RG',
    },
    eyeIconContainer: {
        padding: 4,
    },
    eyeImg:{
        width:20,
        height:20,
        resizeMode:'contain'
    },
    signUpButton: {
        backgroundColor: '#FF731F',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    signUpButtonText: {
        fontFamily: 'DMSans_BD',
        fontSize: 16,
        color: '#fff',
    },
    buttonContainer: {
        padding: 16,
    },
});

export default SignUpScreen; 