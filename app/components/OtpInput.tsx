import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

interface OtpInputProps {
    value: string;
    onChangeText: (text: string) => void;
    onKeyPress?: (e: any) => void; // To handle backspace etc.
    keyboardType?: 'number-pad' | 'default';
    ref?: React.Ref<TextInput>; // Add ref to the interface
}

const OtpInput: React.FC<OtpInputProps> = React.forwardRef<TextInput, OtpInputProps>(({
    value: stringValue,
    onChangeText,
    onKeyPress,
    keyboardType = 'number-pad',
}, ref) => { // Accept ref here
    return (
        <View style={styles.container}> {/* Optional: if you need a wrapper view */}
            <Text> {/* Added Text wrapper */}
                <TextInput
                    style={styles.input}
                    value={stringValue}
                    onChangeText={(text) => onChangeText(text.slice(-1))} // Only allow one character
                    onKeyPress={onKeyPress}
                    keyboardType={keyboardType}
                    maxLength={1} // Only allow one character
                    textAlign="center"
                    ref={ref} // Assign the ref to the TextInput
                />
            </Text> {/* Closed Text wrapper */}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        width: 41, // Adjust size as needed based on reference image
        height: 40, // Adjust size as needed
        marginHorizontal: 8, // Space between input boxes
        borderWidth: 1,
        borderColor: '#E0E0E0', // Light grey border
        borderRadius: 8,
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
    },
    input: {
        width: '100%', // Make input fill the container
        height: '100%', // Make input fill the container
        padding: 0, // Remove default padding
        fontFamily: 'DMSans_SBD', // Example font
        fontSize: 20, // Adjust font size
        color: '#1F1F39', // Dark text color
    },
});

export default OtpInput; 