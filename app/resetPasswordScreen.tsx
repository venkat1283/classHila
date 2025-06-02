import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import images from '@/assets/images';

const ResetPasswordScreen = () => {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleBackPress = () => {
        router.back();
    };

    const handleContinuePress = () => {
        console.log('Reset Password:', { newPassword, confirmPassword });
        // Implement password reset logic
        // Navigate to the next screen (e.g., login or success screen)
        // router.replace('/loginScreen'); // Uncomment and replace with your next screen route
    };

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Image source={images.left} style={styles.leftImg} />
                </TouchableOpacity>
                 {/* Placeholder to balance the header if needed */}
                 <View style={styles.headerRightPlaceholder}></View>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper dia auctor volutpat quis.</Text>

                {/* New Password Input */}
                <View>
                    <Text style={styles.inputLabel}>New Password</Text>
                     <View style={styles.passwordContainer}> 
                         <TextInput
                             style={styles.passwordInput}
                             placeholder="Input your Password"
                             placeholderTextColor="#999"
                             secureTextEntry={true} // Hide password
                             value={newPassword}
                             onChangeText={setNewPassword}
                         />
                         {/* Eye icon placeholder */}
                          <TouchableOpacity style={styles.eyeIconPlaceholder}>
                              {/* Add your eye icon here */}
                              <Image source={images.eye} style={{width:16,height:14}} />
                          </TouchableOpacity>
                     </View>
                </View>

                {/* Confirm New Password Input */}
                <View>
                    <Text style={styles.inputLabel}>Confirm New Password</Text>
                     <View style={styles.passwordContainer}>
                         <TextInput
                             style={styles.passwordInput}
                             placeholder="Input your Password"
                             placeholderTextColor="#999"
                             secureTextEntry={true} // Hide password
                             value={confirmPassword}
                             onChangeText={setConfirmPassword}
                         />
                         {/* Eye icon placeholder */}
                          <TouchableOpacity style={styles.eyeIconPlaceholder}>
                              {/* Add your eye icon here */}
                              <Image source={images.eye} style={{width:16,height:14}} />
                          </TouchableOpacity>
                     </View>
                </View>
                 {/* Continue Button */}
                 <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
                    <Text style={styles.continueButtonText}>Verify</Text>
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
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'space-between', // To space out back button and placeholder
    },
    backButton: {
     
    },
    leftImg:{
        width:24,
        height:24
      },
    headerRightPlaceholder: {
        width: 24, // Match width of back button for centering title (adjust if back button has padding/margin)
    },
    contentContainer:{
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    title:{
        // fontFamily: 'Raleway_BD', // Example font
        fontSize: 24,
        color: '#1F1F39', // Dark blue color
        marginBottom: 8,
        marginTop: 20,
    },
    description:{
        // fontFamily: 'DMSans_RG', // Example font
        fontSize: 12,
        color: '#858597', // Grey color
        marginBottom: 24,
    },
    inputLabel:{
        // fontFamily: 'Roboto_MD', // Example font
        fontSize: 14,
        color: '#1F1F39', // Dark blue color
        marginBottom: 8,
        marginTop: 16,
    },
    passwordContainer: { // Reused from login screen
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 16,
    },
     passwordInput:{ // Reused from login screen
         flex: 1,
         paddingVertical: 12,
        //  fontFamily: 'Roboto_RG', // Example font
         fontSize: 14,
         color: '#1F1F39',
     },
     eyeIconPlaceholder:{ // Reused from login screen
         width: 24,
         height: 24,
         marginLeft: 12,
         justifyContent: 'center',
         alignItems: 'center',
         // Add styling for the actual eye icon if used
     },
     continueButton:{
        backgroundColor: '#FF731F', // Orange background
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%', // Make button full width
        marginTop: 40, // Space above the button
    },
    continueButtonText:{
        // fontFamily: 'DMSans_SBD', // Example font
        fontSize: 16,
        color: '#FFFFFF', // White text
    },
});

export default ResetPasswordScreen; 