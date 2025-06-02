import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
// import OtpInput from './components/OtpInput'; // Removed import
import { useLocalSearchParams } from 'expo-router';
import images from '@/assets/images';

const OtpVerificationScreen = () => {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const { from } = useLocalSearchParams();

    const otpInputs = useRef<Array<TextInput | null>>([]);

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to the next input if a digit is entered
        if (text.length > 0 && index < otp.length - 1) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Move to the previous input if backspace is pressed and current input is empty
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    const handleResendOtp = () => {
        setTimer(60);
        setCanResend(false);
        setOtp(Array(6).fill('')); // Clear OTP fields
        // Implement OTP resend logic here
        console.log('Resending OTP...');
    };

    const handleVerifyOtp = () => {
        const fullOtp = otp.join('');
        console.log('Entered OTP:', fullOtp);
        // Implement OTP verification logic
        // Example: if OTP is correct, navigate to reset password screen
        if (fullOtp.length === 6) {
            router.push('/resetPasswordScreen');
        }
    };

    const handleBackPress = () => {
        router.back();
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>
                 {/* Placeholder to balance the header if needed */}
                 <View style={styles.headerRightPlaceholder} />
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Enter Verification Code</Text>
                {from === 'forgotPassword' && <Text style={styles.description}>We have sent the OTP to your Email Id *****@*mail.com</Text>}
                {from !== 'forgotPassword' && <Text style={styles.description}>We have sent the OTP to your phone number ***** **123</Text>}

                {/* OTP Input Fields (Direct TextInput usage) */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInputBox}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType={'number-pad'}
                            maxLength={1}
                            textAlign="center"
                            ref={(ref) => { otpInputs.current[index] = ref; }}
                        />
                    ))}
                </View>

                {/* Timer */}
                <Text style={styles.timerText}>Code expires in <Text style={styles.timerValue}>{formatTime(timer)}</Text></Text>

                {/* Resend OTP */}
                <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>Didn't receive code?</Text>
                    <TouchableOpacity onPress={canResend ? handleResendOtp : undefined}>
                        <Text style={[styles.resendButtonText, !canResend && { opacity: 0.5 }]}>Resend</Text>
                    </TouchableOpacity>
                </View>

                {/* Verify Button */}
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
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
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'space-between', // To space out back button and placeholder
    },
    backButton: {
        padding: 8,
    },
    headerRightPlaceholder: {
        width: 24, // Match width of back button for centering title (adjust if back button has padding/margin)
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Raleway_BD', // Example font
        fontSize: 24,
        color: '#1F1F39', // Dark blue color
        marginBottom: 8,
        marginTop: 20,
    },
    description: {
        fontFamily: 'DMSans_RG', // Example font
        fontSize: 12,
        color: '#858597', // Grey color
        marginBottom: 24,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%', // Adjust as needed
        marginBottom: 24,
    },
    otpInputBox: { // New style for direct TextInput
        width: 41,
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'DMSans_SBD',
        color: '#1F1F39',
    },
    timerText: {
        fontFamily: 'Roboto_RG', // Example font
        fontSize: 14,
        color: '#858597',
        marginBottom: 16,
    },
    timerValue: {
        fontFamily: 'Roboto_MD', // Example font
        fontSize: 14,
        color: '#FF731F', // Orange color
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    resendText: {
        fontFamily: 'Roboto_RG', // Example font
        fontSize: 14,
        color: '#858597',
        marginRight: 5,
    },
    resendButtonText: {
        fontFamily: 'Roboto_MD', // Example font
        fontSize: 14,
        color: '#FF731F', // Orange color
        textDecorationLine: 'underline',
    },
    verifyButton: {
        backgroundColor: '#FF731F', // Orange background
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%', // Make button full width
    },
    verifyButtonText: {
        fontFamily: 'DMSans_SBD', // Example font
        fontSize: 16,
        color: '#FFFFFF', // White text
    },
});

export default OtpVerificationScreen; 