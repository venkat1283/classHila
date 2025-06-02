import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';

interface FeedbackPopupProps {
    isVisible: boolean;
    onClose: () => void;
    onSendFeedback: (rating: number, feedback: string) => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({
    isVisible,
    onClose,
    onSendFeedback,
}) => {
    const [rating, setRating] = useState(0); // State for star rating
    const [feedback, setFeedback] = useState(''); // State for feedback text

    const handleSend = () => {
        onSendFeedback(rating, feedback);
        setRating(0); // Reset rating after sending
        setFeedback(''); // Reset feedback after sending
    };

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
                            <Text style={styles.modalTitle}>Rate this Course</Text>

                            {/* Star Rating Placeholder */}
                            <View style={styles.ratingContainer}>
                                {/* You would typically render interactive stars here */}
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                        <Text style={star <= rating ? styles.filledStar : styles.emptyStar}>★</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.feedbackLabel}>Feedback</Text>
                            <TextInput
                                style={styles.feedbackInput}
                                placeholder="Input your Feedback"
                                placeholderTextColor="#999"
                                multiline={true}
                                value={feedback}
                                onChangeText={setFeedback}
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
                                    <Text style={[styles.buttonText, styles.closeButtonText]}>Close</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, styles.sendButton]} onPress={handleSend}>
                                    <Text style={[styles.buttonText, styles.sendButtonText]}>Send</Text>
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
        maxWidth: 400, // Max width for larger screens
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    emptyStar: {
        fontSize: 35,
        color: '#ccc',
        marginHorizontal: 2,
    },
    filledStar: {
        fontSize: 35,
        color: '#FF731F', // Gold color for filled stars
        marginHorizontal: 2,
    },
    feedbackLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        alignSelf: 'flex-start', // Align label to the left
    },
    feedbackInput: {
        width: '100%',
        height: 100, // Adjust height as needed
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top', // Align text to the top for multiline input
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    closeButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    sendButton: {
        backgroundColor: '#ff731f', // Orange color
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButtonText: {
        color: '#333',
    },
    sendButtonText: {
        color: '#fff',
    },
});

export default FeedbackPopup; 