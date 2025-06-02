import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import SegmentedControl from './components/SegmentedControl';
import images from '@/assets/images'; // Assuming social icons are in images

const LoginScreen = () => {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = React.useState<number>(0); // 0 for Email, 1 for Phone
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');

    const handleBackPress = () => {
        router.back();
    };

    const handleSignUpPress = () => {
        // Navigate to the Sign Up screen
        console.log('Navigate to Sign Up');
        router.push('/signUpScreen'); // Uncomment and replace with your sign-up route
    };

    const handleLoginPress = () => {
        if (selectedIndex === 0) {
            // Handle Email login
            console.log('Email Login:', { email, password });
            // Implement login logic
            // Navigate to the next screen after successful email login
            router.replace('/');
        } else {
            // Handle Phone login - navigate to OTP verification
            console.log('Phone Login - Navigating to OTP:', { phoneNumber });
            router.push({ pathname: '/otpVerificationScreen', params: { from: 'login' } });
        }
    };

    const handleForgotPasswordPress = () => {
        // Navigate to Forgot Password screen
        console.log('Forgot Password');
        router.push('/forgotPasswordScreen'); // Uncomment and replace with your forgot password route
    };

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Image source={images.left} style={styles.leftImg} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignUpPress} style={styles.backButton}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper dia auctor volutpat quis.</Text>

                    {/* Segmented Control */}
                    {['Email', 'Phone Number'].length > 0 && (
                        <SegmentedControl
                            options={['Email', 'Phone Number']}
                            selectedIndex={selectedIndex}
                            onPress={(index: number) => setSelectedIndex(index)}
                        />
                    )}

                    {/* Input Fields (Conditional) */}
                    {selectedIndex === 0 ? (
                        <>
                            <View>
                                <Text style={styles.inputLabel}>Email Address</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Input your Email Address"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <View>
                                <Text style={styles.inputLabel}>Password</Text>
                            </View>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Input your Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                                <View style={styles.eyeIconPlaceholder}>
                                     <Image source={images.eye} style={{width:20,height:20,resizeMode:'center'}} />
                                </View>
                            </View>

                            <TouchableOpacity onPress={handleForgotPasswordPress} style={styles.forgotPasswordButton}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View>
                                <Text style={styles.inputLabel}>Phone Number</Text>
                            </View>
                            <View style={styles.phoneInputContainer}>
                                <View style={styles.countryCodeContainer}>
                                    <Text style={styles.countryCodeText}>+91</Text>
                                </View>
                                <TextInput
                                    style={styles.phoneNumberInput}
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </View>
                        </>
                    )}
                </View>

                {/* Terms and Conditions */}
                <View style={styles.termsContainer}>
                    <Text style={styles.termsBaseText}>By continuing you agree to our </Text>
                    <TouchableOpacity onPress={() => console.log('Terms & Conditions Pressed')}>
                        <Text style={styles.termsLink}>Terms & Conditions</Text>
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
                    <Text style={styles.loginButtonText}>{selectedIndex === 0 ? 'Sign In Now' : 'Continue'}</Text>
                </TouchableOpacity>

                {/* Or Separator */}
                <View style={styles.orSeparatorContainer}>
                    <View style={styles.orSeparatorLine} />
                    <Text style={styles.orText}>Or</Text>
                    <View style={styles.orSeparatorLine} />
                </View>
                 <Text style={styles.continueWithText}>Continue with</Text>

                {/* Social Login Icons */}
                <View style={styles.socialIconsContainer}>
                    <TouchableOpacity style={styles.socialIcon}>
                         <Image source={images.apple} style={styles.iconImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIcon}>
                         <Image source={images.gmail} style={[styles.iconImage,{width:31,height:23}]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialIcon}>
                         <Image source={images.facebook} style={styles.iconImage} />
                    </TouchableOpacity>
                </View>

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
        paddingBottom: 40, 
    },
    title:{
        fontFamily: 'Raleway_BD', // Example font
        fontSize: 24,
        color: '#1F1F39', // Dark blue color
        marginBottom: 16,
        marginTop: 20,
    },
    description:{
        fontFamily: 'DMSans_RG', // Example font
        fontSize: 12,
        color: '#858597', // Grey color
        marginBottom: 32,
    },
    inputLabel:{
        fontFamily: 'DMSans_BD', // Example font
        fontSize: 14,
        color: '#000', // Dark blue color
        marginBottom: 8,
        marginTop: 16, 
    },
    input:{
        borderWidth: 1,
        borderColor: '#E0E0E0', 
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontFamily: 'Roboto_RG', 
        fontSize: 12,
        color: '#C5C5C7',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 16,
    },
     passwordInput:{
         flex: 1, 
         paddingVertical: 12,
         fontFamily: 'Roboto_RG', 
         fontSize: 12,
         color: '#C5C5C7',
     },
     eyeIconPlaceholder:{
         width: 24, 
         height: 24,
         marginLeft: 12, 
         justifyContent: 'center',
         alignItems: 'center',
     },
    forgotPasswordButton:{
        alignSelf: 'flex-end', 
        marginTop: 12,
        marginBottom: 24,
    },
    forgotPasswordText:{
        fontFamily: 'DMSans_MD', 
        fontSize: 13,
        color: '#FF731F', 
    },
    phoneInputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        overflow: 'hidden', 
    },
    countryCodeContainer:{
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRightWidth: 1,
        borderRightColor: '#E0E0E0',
        backgroundColor: '#F3F3F3', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    countryCodeText:{
        fontFamily: 'Roboto_RG', 
        fontSize: 12,
        color: '#000',
    },
    phoneNumberInput:{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontFamily: 'Roboto_RG', 
        fontSize: 12,
        color: '#000'
    },
    termsContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 23,
        marginBottom: 6,
    },
    termsBaseText: { 
        fontFamily: 'DMSans_RG', 
        fontSize: 12,
        color: '#C5C5C7',
    },
    termsLink:{
        fontFamily: 'DMSans_MD', 
        fontSize: 12,
        color: '#3D5CFF', 
    },
    loginButton:{
        backgroundColor: '#FF731F', 
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 21,
        marginHorizontal:16
    },
    loginButtonText:{
        fontFamily: 'DMSans_BD', 
        fontSize: 16,
        color: '#FFFFFF', 
    },
    orSeparatorContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    orSeparatorLine:{
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0', 
    },
    orText:{
        fontFamily: 'DMSans_MD', 
        fontSize: 14,
        color: '#8A8A8E', 
        marginHorizontal: 10,
    },
    continueWithText:{
        fontFamily: 'DMSans_MD', 
        fontSize: 14,
        color: '#8A8A8E', 
        textAlign: 'center',
        marginBottom: 10,
    },
    socialIconsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
    },
    socialIcon:{
        width: 50, 
        height: 50, 
        borderRadius: 8, 
        borderWidth: 1,
        borderColor: '#FF731F', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage:{
        width: 44, 
        height: 44,
        resizeMode: 'contain',
    },
});

export default LoginScreen; 