import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import images from '@/assets/images';

interface FinishCoursePopupProps {
    isVisible: boolean;
    onClose: () => void;
    onGiveFeedback: () => void;
    onBackToHome: () => void;
    courseTitle?: string; // Optional prop for dynamic course title
}

const FinishCoursePopup: React.FC<FinishCoursePopupProps> = ({
    isVisible,
    onClose,
    onGiveFeedback,
    onBackToHome,
    courseTitle = 'the course', // Default title if not provided
}) => {
    const router = useRouter();

    const handleBackToHome = () => {
        onBackToHome();
        // Example: navigate to home page
        // router.replace('/');
    };

    const handleGiveFeedback = () => {
        onGiveFeedback();
        // Example: navigate to feedback screen or open a feedback modal
        // console.log('Navigate to feedback');
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
                    <View style={styles.modalView}>
                        {/* Add your trophy/celebration image here */}
                        <Image
                            source={images.emptyProfileImg} // Replace with your actual image path
                            style={styles.trophyImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.modalTitle}>Congratulation!</Text>
                        <Text style={styles.modalText}>You have finished {courseTitle}</Text>

                        {/* Button Container */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.feedbackButton]} onPress={onGiveFeedback}>
                                <Text style={[styles.buttonText, styles.feedbackButtonText]}>Give Feedback</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.backToHomeButton]} onPress={onBackToHome}>
                                <Text style={[styles.buttonText, styles.backToHomeButtonText]}>Back to Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    trophyImage: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Or 'space-around', 'space-evenly'
        width: '100%', // Buttons take full width of the modal view
        paddingHorizontal: 10, // Add some horizontal padding
    },
    button: {
        flex: 1, // Each button takes equal space
        paddingVertical: 12,
        borderRadius: 8, // Adjust border radius as needed
        alignItems: 'center',
        marginHorizontal: 5, // Space between buttons
    },
    feedbackButton: {
        borderWidth: 1,
        borderColor: '#FF731F',
        backgroundColor: '#fff',
    },
    backToHomeButton: {
        backgroundColor: '#FF731F',
    },
    buttonText: {
        fontSize: 16, // Adjust font size as needed
        fontWeight: 'bold',
    },
    feedbackButtonText: {
        color: '#FF731F',
    },
    backToHomeButtonText: {
        color: '#fff',
    },
});

export default FinishCoursePopup; 