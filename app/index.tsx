import { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  Animated,
  Platform
} from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell, ChevronRight, Star, Menu } from 'lucide-react-native';
import { popularCourses, categories } from '@/data/homeData';
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';

// Define types for data
interface Course {
  id: string; // Corrected type based on error
  title: string;
  image: string;
  instructor: string; // Added missing property
  category: string; // Added missing property
  price: number; // Added missing property
  rating: number;
  lessons: number;
  isBestseller: boolean; // Added missing property
  duration: string; // Added missing property
  level: string; // Added missing property
  description: string; // Added missing property
  // Removed 'sold' property as it's missing in the data
}

type Category = string; // Assuming category item is a string

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderCourseCard = ({ item }: { item: Course }) => (
    <Link href={`/course/${item.id}`} asChild>
      <TouchableOpacity style={styles.courseCard}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.courseImage} 
          resizeMode="cover"
        />
        <View style={styles.courseCardContent}>
          <View style={styles.courseCardTop}>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#FFC107" fill="#FFC107" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.courseCardBottom}>
            <Text style={styles.coursePrice}>{item.lessons} courses</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem, 
        activeCategory === item && styles.activeCategoryItem
      ]}
      onPress={() => setActiveCategory(item)}
    >
      <Text 
        style={[
          styles.categoryItemText,
          activeCategory === item && styles.activeCategoryItemText
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.customHeader}>
            <TouchableOpacity style={styles.menuButton}>
              <Menu size={24} color="#1F1F39" />
            </TouchableOpacity>
            <View style={styles.statusInfoPlaceholder}>
              {/* Icons or Text can be added here if functionality is implemented later */}
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#FF5454" />
              {/* Notification badge if needed */}
            </TouchableOpacity>
          </View>

          <View style={styles.searchBarContainer}>
            <Search size={20} color="#858597" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#858597"
            />
          </View>
{/* 
          <View style={styles.banner}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/4144100/pexels-photo-4144100.jpeg' }} 
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>New Course!</Text>
              <Text style={styles.bannerDescription}>Find out the best course for you</Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Join Course</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Link href="/categories" asChild>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonText}>See All</Text>
                <ChevronRight size={16} color="#3D5CFF" />
              </TouchableOpacity>
            </Link>
          </View>

          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />

          <View style={styles.dailyQuoteContainer}>
            <Text style={styles.dailyQuoteText}>Daily Quote</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommendation Course</Text>
            <Link href="/courses" asChild>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonText}>See All</Text>
                <ChevronRight size={16} color="#3D5CFF" />
              </TouchableOpacity>
            </Link>
          </View>

          <FlatList
            data={popularCourses}
            renderItem={renderCourseCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendationCoursesList}
          />
        </Animated.ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuButton: {
    padding: 8,
  },
  statusInfoPlaceholder: {
    flex: 1,
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5454',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
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
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1F1F39',
    paddingVertical: 0,
  },
  banner: {
    marginHorizontal: 24,
    marginTop: 16,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#3D5CFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F1F39',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#3D5CFF',
    marginRight: 4,
  },
  categoriesList: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  categoryItem: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  activeCategoryItem: {
    backgroundColor: '#3D5CFF',
  },
  categoryItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1F1F39',
  },
  activeCategoryItemText: {
    color: '#FFFFFF',
  },
  dailyQuoteContainer: {
    backgroundColor: '#F3F3F3',
    marginHorizontal: 24,
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  dailyQuoteText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1F1F39',
    textAlign: 'center',
  },
  recommendationCoursesList: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  courseCard: {
    width: 250,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseImage: {
    width: '100%',
    height: 150,
  },
  courseCardContent: {
    padding: 12,
  },
  courseCardTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:20
  },
  ratingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#858597',
    marginLeft: 4,
  },
  courseTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1F1F39',
    marginBottom: 8,
  },
  courseCardBottom: {
    // Adjusted for horizontal list item display
  },
  coursePrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#3D5CFF',
  },
});