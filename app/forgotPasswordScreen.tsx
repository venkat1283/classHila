import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import images from '@/assets/images'; // Assuming social icons are in images

const ForgotPasswordScreen = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleBackPress = () => {
        router.back();
    };

    const handleSignUpPress = () => {
        console.log('Navigate to Sign Up');
    };

     const handleVerifyPress = () => {
         console.log('Verify button pressed for phone number:', phoneNumber);
         router.push({ pathname: '/otpVerificationScreen', params: { from: 'forgotPassword' } });
     };

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Image source={images.left} style={styles.leftImg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUpPress}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper dia auctor volutpat quis.</Text>

                {/* Phone Number Input */}
                <View>
                    <Text style={styles.inputLabel}>Email Id</Text>
                    <View style={styles.phoneInputContainer}> 
                        <TextInput
                            style={styles.phoneNumberInput}
                            placeholder="Input your Email Id"
                            placeholderTextColor="#C5C5C7"
                            keyboardType="email-address"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                </View>

                {/* Verify Button */}
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyPress}>
                    <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        // padding: 8,
    },
    leftImg:{
        width:24,
        height:24
      },
    signUpText: {
        fontFamily: 'DMSans_BD', // Example font
        fontSize: 16,
        color: '#FF731F', // Orange color
    },
    contentContainer:{
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    title:{
        fontFamily: 'Raleway_BD', // Example font
        fontSize: 24,
        color: '#000', // Dark blue color
        marginBottom: 8,
        marginTop: 20,
    },
    description:{
        fontFamily: 'DMSans_RG', // Example font
        fontSize: 12,
        color: '#6D6D6D', // Grey color
        marginBottom: 24,
    },
    inputLabel:{
        fontFamily: 'DMSans_BD', // Example font
        fontSize: 14,
        color: '#000', // Dark blue color
        marginBottom: 8,
        marginTop: 16,
    },
    phoneInputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    countryCodeContainer:{},
    countryCodeText:{},
    phoneNumberInput:{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontFamily: 'Roboto_RG', // Example font
        fontSize: 12,
        color: '#000',
    },
    verifyButton:{
        backgroundColor: '#FF731F', // Orange background
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%', // Make button full width
        marginTop: 40, // Space above the button
    },
    verifyButtonText:{
        fontFamily: 'DMSans_BD', // Example font
        fontSize: 16,
        color: '#FFFFFF', // White text
    },
});

export default ForgotPasswordScreen; 