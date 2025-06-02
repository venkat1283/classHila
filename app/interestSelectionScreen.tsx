import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import images from '@/assets/images';

const { width } = Dimensions.get('window');
const numColumns = 3; // Number of columns in the grid
const itemMargin = 15;
// Calculate item size considering padding and margins to ensure 3 columns fit evenly
const screenPaddingHorizontal = 30;
const totalHorizontalMargin = (numColumns - 1) * itemMargin;
const availableWidth = width - (screenPaddingHorizontal * 2);
const itemSize = (availableWidth - totalHorizontalMargin) / numColumns;

// Dummy data for interests
const interests = [
    { id: '1', name: 'Business' },
    { id: '2', name: 'Design' },
    { id: '3', name: 'Health' },
    { id: '4', name: 'Humanity' },
    { id: '5', name: 'Innovation' },
    { id: '6', name: 'Lifestyle' },
    { id: '7', name: 'Technology' },
    { id: '8', name: 'Science' },
    { id: '9', name: 'Finance' },
    // Add more interests as needed for scrolling
    { id: '10', name: 'Art' },
    { id: '11', name: 'Music' },
    { id: '12', name: 'Sports' },
];

function InterestItem({ item, selected, onPress }: { item: { id: string; name: string }; selected: boolean; onPress: () => void }) {
    return (
        <TouchableOpacity 
            style={styles.interestItemContainer} // Container for margin
            onPress={onPress}
        >
            <View style={styles.interestItemContent}>
                <View style={[styles.interestIconPlaceholder, selected && styles.selectedInterestIconPlaceholder]}></View>
                <Text style={[styles.interestText, selected && styles.selectedInterestText]}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const InterestSelectionScreen = () => {
    const router = useRouter();
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const handleBackPress = () => {
        router.back();
    };

    const handleSkipPress = () => {
        // Navigate to the next screen or home
        console.log('Skip pressed');
        router.push('/lookingFor'); // Navigate to LookingForScreen
    };

    const handleNextPress = () => {
        // Process selected interests and navigate
        console.log('Selected Interests:', selectedInterests);
        router.push('/lookingFor'); // Navigate to LookingForScreen
    };

    const toggleInterest = (interestId: string) => {
        setSelectedInterests(prevSelected =>
            prevSelected.includes(interestId)
                ? prevSelected.filter(id => id !== interestId)
                : [...prevSelected, interestId]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                <Image source={images.left} style={styles.leftImg} />
                </TouchableOpacity>
                 <View style={styles.progressBar}> 
                     <View style={styles.progressFill}></View>
                </View>
                <TouchableOpacity onPress={handleSkipPress}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>What interest you?</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.{"\n"}Ullamcorper dia auctor volutpat quis.</Text>

                <FlatList
                    data={interests}
                    renderItem={({ item }) => (
                        <InterestItem
                            item={item}
                            selected={selectedInterests.includes(item.id)}
                            onPress={() => toggleInterest(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns}
                    // columnWrapperStyle={styles.row} // Removed as margin is handled in item container
                    showsVerticalScrollIndicator={false}
                />

            </View>
            {/* Next Button - Conditionally render based on selectedInterests */}
            {selectedInterests.length > 0 && (
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    leftImg:{
        width:24,
        height:24
      },
      progressBar:{
        flex: 1,
        height: 4,
        backgroundColor: '#E0E0E0', // Grey background for the progress bar track
        borderRadius: 2,
        marginHorizontal: 16,
        overflow: 'hidden', // Hide overflow of the filled part
    },
    progressFill:{
        width: '50%', // Example: 50% filled. Adjust dynamically.
        height: '100%',
        backgroundColor: '#FF731F', // Orange color for the filled part
        borderRadius: 2,
    },
    skipText: {
        fontSize: 16,
        fontFamily:'DMSans_BD',
        color: '#FF731F',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        fontFamily:'Raleway_BD',
        color: '#000',
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        fontFamily:'DMSans_RG',
        fontSize: 12,
        color: '#8A8A8E',
        marginBottom: 40,
        textAlign: 'center',
    },
    // row: {
    //     justifyContent: 'space-between',
    // },
    interestItemContainer: { // Container for margin
        width: itemSize + itemMargin, // Add margin to the width for spacing
        height: itemSize + itemMargin + 20, // Add margin and space for text below
        marginBottom: itemMargin,
        alignItems: 'center', // Center content horizontally
        // backgroundColor: 'red', // For debugging
    },
    interestItemContent: { // Inner content for flex layout
        width: itemSize,
        // height: itemSize,
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'blue', // For debugging
    },
    interestIconPlaceholder: {
        width: itemSize,
        height: itemSize, // Make it square
        borderRadius: 30, // Rounded corners
        backgroundColor: '#f0f0f0', // Background color
        marginBottom: 16, // Space between placeholder and text
    },
    selectedInterestIconPlaceholder: {
        borderColor: '#FF731F',
        borderWidth: 2,
    },
    interestText: {
        fontSize: 12,
        fontFamily:'DMSans_MD',
        color: '#8A8A8E',
        textAlign: 'center',
    },
    selectedInterestText: {
        color: '#FF731F',
    },
    bottomButtonContainer:{
        padding: 16,
    },
    nextButton: {
        backgroundColor: '#FF731F',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    nextButtonText: {
        fontFamily:'DMSans_BD',
        fontSize: 16,
        color: '#fff',
    },
});

export default InterestSelectionScreen; 