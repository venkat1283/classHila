import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

interface SignOutConfirmationPopupProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirmSignOut: () => void;
}

const SignOutConfirmationPopup: React.FC<SignOutConfirmationPopupProps> = ({
    isVisible,
    onClose,
    onConfirmSignOut,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.centeredView}>
                    {/* Prevent closing when tapping inside the modal content */}
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Confirm Sign Out</Text>
                            <Text style={styles.modalText}>Are you sure you want to sign out?</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                                    <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={onConfirmSignOut}>
                                    <Text style={[styles.buttonText, styles.signOutButtonText]}>Sign Out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginHorizontal: 20,
        width: '90%', // Adjust width as needed
        maxWidth: 300, // Max width for confirmation popups
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 5,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    signOutButton: {
        backgroundColor: '#FF4500', // Reddish color for sign out
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: '#333',
    },
    signOutButtonText: {
        color: '#fff',
    },
});

export default SignOutConfirmationPopup; 