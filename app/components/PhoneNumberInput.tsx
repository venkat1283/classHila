import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native'; // Assuming ChevronDown is from lucide-react-native
import React from 'react';

interface PhoneNumberInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.countryCodeContainer}>
        <Text style={styles.countryCodeText}>{countryCode}</Text>
        <ChevronDown size={16} color="#000" />
      </TouchableOpacity>
      <TextInput
        style={styles.phoneNumberInput}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={onPhoneNumberChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden', // Ensure no overflow
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    backgroundColor: '#f0f0f0', // Subtle background for country code
  },
  countryCodeText: {
    fontSize: 12,
    fontFamily: 'Roboto_RG',
    marginRight: 4,
  },
  phoneNumberInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 12,
    fontFamily: 'Roboto_RG',
  },
});

export default PhoneNumberInput; 