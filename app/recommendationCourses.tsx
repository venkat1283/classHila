import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import TopicItem from './components/TopicItem'; // Import the reusable component
import React, { useState } from 'react';

// Dummy data for recommended courses (replace with actual data fetching later)
const recommendedCourses = [
    {
        id: '1',
        name: 'How To Powerfully Influence Anyone ',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        rating: 5,
        reviews: 500,
        courses:12,
        college:'XYZ collegee'
      },
      {
        id: '2',
        name: 'How To Powerfully Influence Anyone ',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        rating: 5,
        reviews: 500,
        courses:12,
        college:'XYZ collegee'
      },
      {
        id: '3',
        name: 'How To Powerfully Influence Anyone ',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        rating: 5,
        reviews: 500,
        courses:12,
        college:'XYZ collegee'
      },
      {
        id: '4',
        name: 'How To Powerfully Influence Anyone ',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        rating: 5,
        reviews: 500,
        courses:12,
        college:'XYZ collegee'
      },
];

// Dummy data for categories/filters
const categories = ['All', 'Business', 'Self Improvement', 'Science', 'Design'];

const recommendationCourses = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(categories[0]); // State to track selected category

    const handleBackPress = () => {
      router.back();
    };

    return (
      <SafeAreaView style={styles.container}  edges={['top','bottom']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <ChevronLeft size={24} color="#1F1F39" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recommendation Course</Text>
          {/* Placeholder to balance the header if needed */}
          <View style={styles.headerRightPlaceholder} />
        </View>

        {/* Categories/Filters */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScrollContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.categoryButton}
                onPress={() => setSelectedCategory(category)} // Update selected category on press
              >
                <Text 
                  style={[
                    styles.categoryButtonText,
                    { color: category === selectedCategory ? '#FF731F' : '#C5C5C7' } // Apply conditional color
                  ]}>
                    {category}
                  </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended Courses List */}
        <View style={styles.listContainer}>
            <FlatList
            data={recommendedCourses}
            renderItem={({item})=> (
                <TopicItem 
                    item={item} 
                    onPress={() => router.push({ pathname: '/courseDetails', params: { courseId: item.id } })} // Navigate to course details on press
                />
            )}
            keyExtractor={(item)=>item.id.toString()}
            showsVerticalScrollIndicator={false}
            />
        </View>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
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
      padding: 8,
      marginRight: 8,
    },
    headerTitle: {
      flex: 1,
      fontFamily: 'DMSans_SBD',
      fontSize: 18,
      color: '#1F1F39',
      textAlign: 'center',
    },
    headerRightPlaceholder: {
      width: 24 + 16,
    },
    categoriesContainer: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F3F3',
    },
    categoriesScrollContainer: {
      paddingHorizontal: 16,
    },
    categoryButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
    //   borderRadius: 20,
    //   backgroundColor: '#F3F3F3', // Placeholder background
      marginRight: 8,
    },
    categoryButtonText: {
      fontFamily: 'Roboto_BD',
      fontSize: 12,
      color: '#1F1F39',
    },
    listContainer: {
        flex: 1,
        marginTop: 10, // Add some space between categories and list
    }
  });

export default recommendationCourses; 