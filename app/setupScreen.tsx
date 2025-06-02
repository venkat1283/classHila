import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

const SetupScreen = () => {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
    };

    const handleNextPress = () => {
        // Navigate to the next screen (e.g., home page)
        console.log('Next pressed on setup screen');
        router.replace('/'); // Example navigation to home
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.header}>
                <View style={{ flex: 1 }} /> 
            </View>

            <View style={styles.content}>
                <View style={styles.imagePlaceholder}></View>

                <Text style={styles.title}>Welcome, Chari</Text>
                <Text style={styles.description}>Your profile was created, let's learn something together!</Text>

                <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        justifyContent: 'flex-start', // Align items to the start
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    imagePlaceholder: {
        width: '100%',
        height: 300, // Adjust height as needed
        backgroundColor: '#f0f0f0', // Placeholder background
        borderRadius: 10,
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginBottom: 40,
    },
    nextButton: {
        backgroundColor: '#FF731F',
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 30,
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SetupScreen; 