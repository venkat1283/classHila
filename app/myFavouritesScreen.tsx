import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical, Search } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';
import FavoriteCourseItem from './components/FavoriteCourseItem';
import { Home, BookOpen, Heart } from 'lucide-react-native';
import CustomBottomNavigationView from './components/CustomBottomNavigationView';
import { Image } from 'react-native';
import images from '@/assets/images';

// Dummy data for favorite courses (replace with actual data fetching)
const myFavoritesData = [
    {
        id: 'f1',
        title: 'How To Powerfully Influence Anyone',
        imageUrl: '', // Placeholder for image
        college: 'TanahAir College',
        rating: 4.9,
        reviews: 500,
        coursesCount: 12, // Number of courses/lessons
    },
     {
        id: 'f2',
        title: 'How To Powerfully Influence Anyone',
        imageUrl: '', // Placeholder for image
        college: 'TanahAir College',
        rating: 4.9,
        reviews: 500,
        coursesCount: 12, // Number of courses/lessons
    },
    // Add more dummy courses as needed
];

// Reusable component for a single favorite course item will go here
// const FavoriteCourseItem = ({ course }) => { ... };

const MyFavouritesScreen = () => {
    const router = useRouter();
    const pathname = usePathname();

    // Determine the active tab based on the current pathname
    const activeTab = pathname === '/index' ? 'Home'
                    : pathname === '/myCoursesScreen' ? 'My Courses'
                    : pathname === '/myFavouritesScreen' ? 'Favorites'
                    : 'Favorites'; // Default to Favorites for this screen

    const handleBackPress = () => {
        router.back();
    };

    const handleMenuPress = () => {
        // Handle menu action
        console.log('Menu button pressed');
    };

    // Render function for FlatList
    const renderFavoriteCourseItem = ({ item }: { item: any }) => (<FavoriteCourseItem course={item} />); // TODO: Replace 'any' with actual type

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={images.left} style={styles.leftImg} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Favorite</Text>
                <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                    <MoreVertical size={24} color="#1F1F39" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <Search size={20} color="#858597" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Design" // Placeholder text from screenshot
                    placeholderTextColor="#858597"
                />
            </View>

            {/* Favorite Courses List */}
            <FlatList
                data={myFavoritesData}
                renderItem={renderFavoriteCourseItem}
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
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16, // Adjust horizontal margin
        marginTop: 16,
        backgroundColor: '#F3F3F3',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Roboto_RG',
        fontSize: 16,
        color: '#1F1F39',
        paddingVertical: 0, // Remove default vertical padding
    },
    listContent:{
        padding: 16,
        paddingBottom: 80,
    },
    bottomNavigationView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal:30,
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        position:'absolute',
        bottom:20,
        left:10,
        right:10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      
      },
    navButton: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    navButtonText: {
        fontFamily: 'Roboto_MD',
        fontSize: 12,
        color: '#8A8A8E',
        marginTop: 4,
    },
    activeNavButtonText: {
        color: '#FF731F',
    },
});

export default MyFavouritesScreen; 