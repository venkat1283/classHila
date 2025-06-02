import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

interface SubscriptionOption {
    id: string;
    duration: string;
    price: string;
    discount?: string;
}

const subscriptionOptions: SubscriptionOption[] = [
    { id: '12month', duration: '12 Month', price: '₹599/Month' },
    { id: '6month', duration: '6 Month', price: '₹499/Month', discount: '38% Off' },
    { id: '1month', duration: '1 Month', price: '₹599/Month' },
];

interface SubscriptionOptionsModalProps {
    isVisible: boolean;
    onClose: () => void;
    onContinue: (selectedOptionId: string | null) => void; // Callback with selected option ID
    router: ReturnType<typeof useRouter>;
}

const SubscriptionOptionsModal = ({ isVisible, onClose, onContinue, router }: SubscriptionOptionsModalProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedOption) {
            onContinue(selectedOption);
            router.push('/checkoutScreen'); // Navigate to Checkout screen
        }
    };

    const renderSubscriptionOption = (option: SubscriptionOption) => (
        <TouchableOpacity
            key={option.id}
            style={styles.optionContainer}
            onPress={() => setSelectedOption(option.id)}
        >
            <View style={styles.radioButton}>
                {selectedOption === option.id && <View style={styles.radioFill} />}
            </View>
            <Text style={styles.optionText}>{`${option.duration} for ${option.price}`}</Text>
            {option.discount && (
                <View style={styles.discountTag}>
                    <Text style={styles.discountText}>{option.discount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Classhila</Text>

                    {/* Image Placeholder */}
                    <View style={styles.imagePlaceholder} />

                    <Text style={styles.descriptionText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Ullamcorper dia auctor volutpat quis.
                    </Text>

                    {/* Subscription Options */}
                    <View style={styles.optionsList}>
                        {subscriptionOptions.map(renderSubscriptionOption)}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.continueButton, !selectedOption && styles.continueButtonDisabled]}
                            onPress={handleContinue}
                            disabled={!selectedOption}
                        >
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        width: '90%', // Adjust width as needed
        maxHeight: '80%', // Adjust max height
    },
    modalTitle: {
        fontFamily: 'Raleway_BD',
        fontSize: 17,
        color: '#000',
        textAlign: 'center',
        marginBottom: 16,
    },
    imagePlaceholder: {
        width: '70%',
        aspectRatio: 0.967, // Maintain a 1:1 aspect ratio (square)
        alignSelf: 'center', // Center the image horizontallys
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        marginBottom: 12,
    },
    descriptionText: {
        fontFamily: 'DMSans_RG',
        fontSize: 12,
        color: '#8A8A8E',
        textAlign: 'center',
        marginBottom: 32,
    },
    optionsList: {
        marginBottom: 40,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FF731F',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    radioFill: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#FF731F',
    },
    optionText: {
        flex: 1,
        fontFamily: 'DMSans_RG',
        fontSize: 14,
        color: '#000',
    },
    discountTag: {
        backgroundColor: '#F7DCDC',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 8,
    },
    discountText: {
        fontFamily: 'DMSans_MD',
        fontSize: 12,
        color: '#FF2F2F',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    closeButton: {
        flex: 1,
        paddingVertical: 13,
        marginRight: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#8A8A8E'
    },
    closeButtonText: {
        fontFamily: 'DMSans_BD',
        fontSize: 16,
        color: '#8A8A8E',
    },
    continueButton: {
        flex: 1,
        paddingVertical: 13,
        backgroundColor: '#FF731F',
        borderRadius: 8,
        alignItems: 'center',
    },
    continueButtonText: {
        fontFamily: 'DMSans_BD',
        fontSize: 16,
        color: '#FFFFFF',
    },
    continueButtonDisabled: {
        backgroundColor: '#FF731F50', // Faded orange when disabled
    },
});

export default SubscriptionOptionsModal; 