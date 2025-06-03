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
import { Link, useRouter, usePathname } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Bell, ChevronRight, Star, Menu, Home, BookOpen, Heart } from 'lucide-react-native';
import { popularCourses, categories } from '@/data/homeData';
import { TextInput, GestureHandlerRootView } from 'react-native-gesture-handler';
import images from '@/assets/images';
import CustomBottomNavigationView from './components/CustomBottomNavigationView';

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
  soldCount: number; // Add soldCount property
  // Removed 'sold' property as it's missing in the data
}

type Category = string; // Assuming category item is a string

export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const scrollY = useRef(new Animated.Value(0)).current;

  const activeTab = pathname === '/index' ? 'Home'
    : pathname === '/myCoursesScreen' ? 'My Courses'
    : pathname === '/myFavouritesScreen' ? 'Favorites'
    : 'Home';

  const renderCourseCard = ({ item }: { item: Course }) => (
    <Link href={`/courseDetails`} asChild>
      <TouchableOpacity style={styles.courseCard}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.courseImage} 
          resizeMode="cover"
        />
        <View style={styles.courseCardContent}>
          <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.ratingAndSoldContainer}>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#FF731F" fill="#FF731F" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.soldCountText}>{item.soldCount} Sold</Text>
          </View>
          <Text style={styles.coursePrice}>{item.lessons} courses</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <Link href={{ pathname: "/categoryDetails", params: { category: item } }} asChild>
    <TouchableOpacity style={styles.categoryItemContainer}>
      <View
        style={[
          styles.categoryPlaceholder,
          activeCategory === item && styles.activeCategoryPlaceholder,
        ]}
      />
      <Text
        style={[
          styles.categoryItemText,
          activeCategory === item && styles.activeCategoryItemText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
    </Link>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.contentContainer}>
          <Animated.ScrollView
            contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            <View style={styles.customHeader}>
              <TouchableOpacity style={styles.menuButton}>
                <Image source={images.burgerMenu} style={styles.menuImg} />
              </TouchableOpacity>
              <View style={styles.statusInfoPlaceholder}>
                {/* Icons or Text can be added here if functionality is implemented later */}
              </View>
              <TouchableOpacity style={styles.iconButton}>
                <Image source={images.bell} style={styles.notifImg} />
                {/* Notification badge if needed */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileImageContainer} onPress={() => router.push('/profileScreen')}>
              <Image source={images.emptyProfileImg} style={styles.menuImg} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBarContainer}>
            <Image source={images.search} style={styles.notifImg} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#858597"
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <Link href="/categories" asChild>
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllButtonText}>See All</Text>
                  {/* <ChevronRight size={16} color="#FF731F" /> */}
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
              <Link href="/recommendationCourses" asChild>
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllButtonText}>See All</Text>
                  {/* <ChevronRight size={16} color="#FF731F" /> */}
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
        </View>
        <CustomBottomNavigationView activeTab={activeTab} />

      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    // paddingBottom: 100, // Removed static padding
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuButton: {
  },
  menuImg:{
    width:24,
    height:24,
    resizeMode:'cover'
  },
  notifImg:{
    width:22,
    height:22
  },
  searchImg:{
    width:24,
    height:24
  },
  statusInfoPlaceholder: {
    flex: 1,
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
    marginLeft: 8,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 8,
    backgroundColor: '#F2F2F7',
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
    fontSize: 12,
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
    fontFamily: 'Roboto_BD',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerDescription: {
    fontFamily: 'Roboto_RG',
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
    fontFamily: 'Roboto_MD',
    fontSize: 14,
    color: '#3D5CFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'DMSans_SBD',
    fontSize: 18,
    color: '#1F1F39',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllButtonText: {
    fontFamily: 'DMSans_BD',
    fontSize: 16,
    color: '#FF731F',
    marginRight: 4,
  },
  categoriesList: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  categoryItemContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F4F4F5',
    marginBottom: 8,
  },
  activeCategoryPlaceholder: {
    backgroundColor: '#FF731F',
  },
  categoryItemText: {
    fontFamily: 'DMSans_MD',
    fontSize: 12,
    color: '#8A8A8E',
    textAlign: 'center',
  },
  activeCategoryItemText: {
    color: '#FF731F',
  },
  dailyQuoteContainer: {
    backgroundColor: '#F4F4F5',
    marginHorizontal: 24,
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  dailyQuoteText: {
    fontFamily: 'DMSans_BD',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  recommendationCoursesList: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  courseCard: {
    width:250,
    marginRight: 16,
    backgroundColor: '#FFF',
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
    marginTop:8,
    padding: 8,
  },
  ratingAndSoldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  ratingText: {
    fontFamily: 'DMSans_RG',
    fontSize: 9,
    color: '#AEAEB2',
    marginLeft: 4,
  },
  soldCountText: {
    fontFamily: 'DMSans_RG',
    fontSize: 9,
    color: '#AEAEB2',
  },
  courseTitle: {
    fontFamily: 'DMSans_MD',
    fontSize: 12,
    color: '#000',
    marginBottom: 9,
  },
  coursePrice: {
    fontFamily: 'DMSans_MD',
    fontSize: 12,
    color: '#FF731F',
  },
  profileImageContainer: {
    marginLeft: 8,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 20,
    // backgroundColor: '#E0E0E0',
  },
});