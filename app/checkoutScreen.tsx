import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import images from '@/assets/images';

interface PaymentMethod {
    id: string;
    name: string;
    // Add other relevant fields like icon, etc.
}

// Dummy data for payment methods
const paymentMethods: PaymentMethod[] = [
    { id: 'card', name: 'Card' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'googlepay', name: 'Google Pay' },
    // Add more payment methods as needed
];

const CheckoutScreen = () => {
    const router = useRouter();
    const [saveCardDetails, setSaveCardDetails] = useState(false);
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(paymentMethods[0]?.id || null); // Select the first method by default

    const handleBackPress = () => {
        router.back();
    };

    const handleMenuPress = () => {
        // Handle menu action
        console.log('Menu button pressed');
    };

    const handlePayPress = () => {
        // Handle payment logic here
        console.log('Pay button pressed');
        router.push('/checkoutSuccessScreen');
    };
    

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            {/* Header */}
            <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={images.left} style={styles.leftImg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
        {/* Placeholder to balance the header if needed */}
        <View style={styles.headerRightPlaceholder} />
        </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Payment Method Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    {/* Payment Method Cards Placeholder */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.paymentMethodsContainer}>
                        {paymentMethods.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.paymentMethodCard,
                                    selectedPaymentMethodId === method.id && styles.selectedPaymentMethod,
                                ]}
                                onPress={() => setSelectedPaymentMethodId(method.id)}
                            >
                                {/* You can add icons or text for each payment method here */}
                                {/* <Text>{method.name}</Text> */}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Personal Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <Text style={styles.inputLabel}>Card number</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="2471 2351 8062 8124"
                        keyboardType="number-pad"
                    />

                    <Text style={styles.inputLabel}>Expiry</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="24/25"
                        keyboardType="number-pad"
                    />

                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="221"
                        keyboardType="number-pad"
                        secureTextEntry
                    />

                    {/* Save Card Details Toggle */}
                    <View style={styles.saveCardContainer}>
                        <Text style={styles.saveCardText}>Save My Card Details</Text>
                        <Switch
                            trackColor={{ false: '#E0E0E0', true: '#FF731F' }}
                            thumbColor={saveCardDetails ? '#FFFFFF' : '#FFFFFF'}
                            ios_backgroundColor="#E0E0E0"
                            onValueChange={setSaveCardDetails}
                            value={saveCardDetails}
                            style={styles.saveCardSwitch}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Pay Button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
                    <Text style={styles.payButtonText}>Pay</Text>
                </TouchableOpacity>
            </View>

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
        // borderBottomWidth: 1,
        // borderBottomColor: '#F3F3F3',
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    leftImg:{
        width:24,
        height:24
      },
    headerTitle: {
        flex: 1,
        fontFamily: 'Raleway_BD',
        fontSize: 17,
        color: '#000',
        textAlign: 'center',
    },
    headerRightPlaceholder: {
        width: 24 + 16, // Width of back button + its margin to balance the title
      },
    menuButton: {
        padding: 8,
        marginLeft: 8,
    },
    section: {
        padding: 16,
        // borderBottomWidth: 1,
        // borderBottomColor: '#F3F3F3',
    },
    sectionTitle: {
        fontFamily: 'Raleway_BD',
        fontSize: 17,
        color: '#000',
        marginBottom: 16,
    },
    paymentMethodsContainer:{
        paddingVertical: 8, // Add vertical padding for scrollview content
    },
    paymentMethodCard: {
        width: 100, // Placeholder width
        height: 60, // Placeholder height
        backgroundColor: '#F3F3F3',
        borderRadius: 8,
        marginRight: 12,
    },
    selectedPaymentMethod: {
        borderColor: '#FF731F',
        borderWidth: 1,
    },
    inputLabel:{
        fontFamily: 'DMSans_BD',
        fontSize: 14,
        color: '#000',
        marginBottom: 8,
        // marginTop: 8,
    },
    textInput:{
        fontFamily: 'Roboto_RG',
        fontSize: 12,
        color: '#000',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 11,
        marginBottom:16
    },
    saveCardContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    saveCardText:{
        fontFamily: 'DMSans_RG',
        fontSize: 14,
        color: '#000',
    },
    saveCardSwitch: {
        transform: [{ scale: 1.8 }]
    },
    bottomButtonContainer:{
        padding: 16,
        marginBottom:40
        // borderTopWidth: 1,
        // borderTopColor: '#F3F3F3',
    },
    payButton:{
        backgroundColor: '#FF731F',
        borderRadius: 8,
        paddingVertical: 13,
        alignItems: 'center',
    },
    payButtonText:{
        fontFamily: 'DMSans_BD',
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default CheckoutScreen; 