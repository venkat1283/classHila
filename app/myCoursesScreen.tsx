import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';
import MyCourseItem from './components/MyCourseItem';
import React, { useState } from 'react';
import SegmentedControl from './components/SegmentedControl';
import CustomBottomNavigationView from './components/CustomBottomNavigationView';
import { Image } from 'react-native';
import images from '@/assets/images';

// Dummy data (replace with actual data fetching)
const myCoursesData = [
    {
        id: 'mc1',
        title: 'How To Powerfully Influence Anyone',
        imageUrl: '', // Placeholder for image
        college: 'TanahAir College',
        rating: 4.9,
        reviews: 500,
        progress: 70, // Progress in percentage
        status: 'ongoing', // Add status field
    },
     {
        id: 'mc2',
        title: 'How To Powerfully Influence Anyone',
        imageUrl: '', // Placeholder for image
        college: 'TanahAir College',
        rating: 4.9,
        reviews: 500,
        progress: 70, // Progress in percentage
        status: 'finished', // Add status field
    },
    // Add more dummy courses as needed
];

// Reusable component for a single course item will go here
// const MyCourseItem = ({ course }) => { ... };

const MyCoursesScreen = () => {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState(0); // 0 for Ongoing, 1 for Finished
    const pathname = usePathname();

    // Determine the active tab based on the current pathname
    const activeTab = pathname === '/index' ? 'Home'
                    : pathname === '/myCoursesScreen' ? 'My Courses'
                    : pathname === '/myFavouritesScreen' ? 'Favorites'
                    : 'My Courses'; // Default to My Courses for this screen

    // Filter data based on selected tab
    const filteredCourses = myCoursesData.filter(course => {
        if (selectedIndex === 0) {
            return course.status === 'ongoing';
        } else {
            return course.status === 'finished';
        }
    });

    const handleBackPress = () => {
        router.back();
    };

    const handleMenuPress = () => {
        // Handle menu action
        console.log('Menu button pressed');
    };

    // Render function for FlatList
    const renderCourseItem = ({ item }: { item: any }) => (
        <MyCourseItem course={item} isFinished={selectedIndex === 1} /> // Pass isFinished prop
    );

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={images.left} style={styles.leftImg} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Course</Text>
                <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                    <MoreVertical size={24} color="#1F1F39" />
                </TouchableOpacity>
            </View>

            {/* Segmented Control */}
            <View style={styles.segmentedControlContainer}>
                <SegmentedControl
                    options={['Ongoing', 'Finished']}
                    selectedIndex={selectedIndex}
                    onPress={setSelectedIndex}
                />
            </View>

            {/* My Courses List */}
            <FlatList
                data={filteredCourses}
                renderItem={renderCourseItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Custom Bottom Navigation View */}
            <CustomBottomNavigationView activeTab={activeTab} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
    },
    backButton: {
        marginRight: 8,
    },
    leftImg:{
        width:24,
        height:24
      },
    headerTitle: {
        flex: 1,
        fontFamily: 'DMSans_SBD',
        fontSize: 18,
        color: '#1F1F39',
        textAlign: 'center',
    },
    menuButton: {
        padding: 8,
        marginLeft: 8,
    },
     listContent:{
        padding: 16,
        paddingBottom: 80,
     },
    segmentedControlContainer: {
        paddingHorizontal: 16,
        marginBottom: 16, // Space below the segmented control
    },
});

export default MyCoursesScreen; 