import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import LookingForItem from './components/LookingForItem';
import images from '@/assets/images';

const LookingForScreen = () => {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleBackPress = () => {
        router.back();
    };

    const handleSkipPress = () => {
        // Handle skip action
        console.log('Skip button pressed');
        router.push('/setupScreen')
        // Navigate to the next screen or home
    };

    const handleNextPress = () => {
        // Handle next action with selected item
        console.log('Next button pressed. Selected item:', selectedItem);
        // Navigate to the next screen, potentially passing the selected item
        router.push('/setupScreen')
    };

    const handleItemPress = (label: string) => {
        setSelectedItem(label);
    };

    const options = ['Coaching', 'Professional Growth', 'Groups', 'Railway', 'IT', 'UPSC', 'Self Improvment'];

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Image source={images .left} style={styles.leftImg} />
                </TouchableOpacity>
                <View style={styles.progressBar}>
                     <View style={styles.progressFill}></View>
                </View>
                <TouchableOpacity onPress={handleSkipPress}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>What are you looking for?</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper dia auctor volutpat quis.</Text>

                {/* Options List */}
                <View style={styles.optionsContainer}>
                    {options.map((option) => (
                        <LookingForItem
                            key={option}
                            label={option}
                            isSelected={selectedItem === option}
                            onPress={() => handleItemPress(option)}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={[styles.nextButton, !selectedItem && styles.nextButtonDisabled]} // Disable if no item is selected
                    onPress={handleNextPress}
                    disabled={!selectedItem} // Disable button functionality
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingBottom:60
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'space-between',
    },
    backButton: {
        paddingRight: 10, // Add some space to the right of the back button
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
        width: '100%', // Example: 50% filled. Adjust dynamically.
        height: '100%',
        backgroundColor: '#FF731F', // Orange color for the filled part
        borderRadius: 2,
    },
    skipText: {
        fontFamily: 'Roboto_RG', // Example font
        fontSize: 16,
        color: '#FF731F', // Orange color
    },
    contentContainer:{
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 100, // Add padding to the bottom to avoid button overlaying content
    },
    title:{
        fontFamily: 'DMSans_SBD', // Example font
        fontSize: 24,
        color: '#1F1F39', // Dark blue color
        marginBottom: 8,
    },
    description:{
        fontFamily: 'Roboto_RG', // Example font
        fontSize: 14,
        color: '#858597', // Grey color
        marginBottom: 24,
    },
    optionsContainer:{
        // Spacing is handled by marginBottom in LookingForItem
    },
    bottomButtonContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#FFFFFF', // White background for the button container
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0', // Light grey border at the top
    },
    nextButton:{
        backgroundColor: '#FF731F', // Orange background
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    nextButtonDisabled:{
        backgroundColor: '#FFB27F', // Lighter orange when disabled
    },
    nextButtonText:{
        fontFamily: 'DMSans_SBD', // Example font
        fontSize: 16,
        color: '#FFFFFF', // White text
    },
});

export default LookingForScreen; 