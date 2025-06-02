import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import images from '@/assets/images'; // Assuming images are managed here
import { ArrowLeft,ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Define interface for onboarding step data
interface OnboardingStep {
    key: string;
    image: any; // Or a more specific type if you have one for images
    title: string;
    description: string;
}

// Dummy data for onboarding steps (replace with your actual data)
const onboardingSteps: OnboardingStep[] = [
    {
        key: '1',
        image: images.emptyProfileImg, // Use a placeholder image key
        title: 'Watch and Learn',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nUllamcorper dia auctor volutpat quis.',
    },
    {
        key: '2',
        image: images.emptyProfileImg, // Use a placeholder image key
        title: 'Practice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nUllamcorper dia auctor volutpat quis',
    },
    {
        key: '3',
        image: images.emptyProfileImg, // Use a placeholder image key
        title: 'Achieve',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nUllamcorper dia auctor volutpat quis.',
    },
];

const OnboardingScreen = () => {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0); // State to track current step
    const flatListRef = useRef<FlatList>(null); // Ref for FlatList

    const handleSkipPress = () => {
        // Navigate to the interest selection screen
        router.replace('/welcomeScreen');
    };

    // Update active index when viewable items change
    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index || 0);
        }
    });

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    });

    const handleNext = () => {
        if (activeIndex < onboardingSteps.length - 1) {
            flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
        } else {
            // If on the last step, navigate to the next screen (e.g., interest selection)
            router.replace('/welcomeScreen');
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: activeIndex - 1 });
        }
    };

    const renderItem = ({ item }: { item: OnboardingStep }) => (
        <View style={styles.slide}>
            {/* Image Section */}
            <Image source={item.image} style={styles.imageContainer} />
                 {/* <Image
                    source={item.image} // Use item.image for the source
                    style={styles.onboardingImage}
                    resizeMode="contain"
                /> */}
            {/* </Image> */}

            {/* Text Content */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Skip button */}
            <View style={styles.header}>
                <Text style={styles.headerPlaceholder}></Text>{/* Placeholder to balance skip button */}
                <TouchableOpacity onPress={handleSkipPress}>
                    <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Onboarding Slides */}
            <FlatList
                ref={flatListRef}
                data={onboardingSteps}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
                keyExtractor={(item) => item.key}
            />

            {/* Pagination Dots */}

            {/* Navigation Buttons */}
            <View style={styles.navigationButtonsContainer}>
                 {/* Left Button */}
                <TouchableOpacity 
                     style={[styles.navButton, activeIndex === 0 && styles.disabledNavButton]} 
                     onPress={handlePrev} 
                     disabled={activeIndex === 0} // Disable if on the first slide
                 >
                     <ArrowLeft size={24} color={activeIndex === 0 ? '#fff' : '#FF731F'} />
                 </TouchableOpacity>


                 <View style={styles.paginationContainer}>
                {onboardingSteps.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.paginationDot, index === activeIndex ? styles.activeDot : null]}
                    />
                ))}
            </View>

                 {/* Right Button */}
                 <TouchableOpacity 
                     style={[styles.navButton, styles.rightNavButton]} 
                     onPress={handleNext} 
                 >
                     <ArrowRight size={24} color="#fff" />{/* White arrow for next button */}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerPlaceholder: {
        width: 50, // Match the width of the skip button for centering
    },
    skipButtonText: {
        fontFamily:'DMSans_BD',
        fontSize: 16,
        color: '#FF731F', // Orange color
    },
    slide: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop:20,
    },
    imageContainer:{
        width: '100%',
        height: '65%', // Adjust height as needed
        marginBottom: 40,
        // backgroundColor: '#FFFFFF', // Add white background to the container
        borderRadius:10, // Rounded top-right corner
        // overflow: 'hidden', // Clip image to the container's rounded corners
        backgroundColor:'#F3F3F5',
        resizeMode:'cover'
    },
    onboardingImage: {
        width: '100%', // Make image fill the container width
        height: '100%', // Adjust size as needed
        resizeMode: "contain", // Ensure the image fits within the container
    },
    textContainer:{
        alignItems:'center',
        paddingHorizontal: 20,
        marginBottom:40
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color:'#000',
        fontFamily: 'Raleway_BD',
    },
    description: {
        fontSize: 12,
        color: '#8A8A8E',
        textAlign: 'center',
        fontFamily: 'DMSans_RG',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc', // Inactive dot color
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#FF731F', // Active dot color (Orange)
    },
    navigationButtonsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    navButton:{
        width: 40, // Adjust size as needed
        height: 40, // Adjust size as needed
        borderRadius: 8, // Half of width/height for a circle
        backgroundColor: '#Fff', // Light grey background
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'#FF731F',
        alignItems: 'center',
    },
    rightNavButton:{
         backgroundColor: '#FF731F', // Orange background for right button
    },
     disabledNavButton:{
         backgroundColor: '#fff', // Lighter grey for disabled button
         borderWidth:0,
         
     }
});

export default OnboardingScreen; 