import { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  Animated
} from 'react-native';
import { Link, useRouter, useLocalSearchParams, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Search, Bell, ChevronRight, Star, Home, BookOpen, Heart } from 'lucide-react-native';
import { popularCourses, categories } from '@/data/homeData';

interface Course {
  id: string;
  image: string;
  category: string;
  rating: number;
  title: string;
  instructor: string;
  lessons: number;
  price: number;
  isBestseller: boolean;
}

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollY = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = pathname === '/(tabs)' || pathname === '/(tabs)/index' ? 'Home'
                    : pathname === '/(tabs)/myCoursesScreen' ? 'My Courses'
                    : pathname === '/(tabs)/myFavouritesScreen' ? 'Favorites'
                    : 'Home';

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
            <View style={styles.courseCategory}>
              <Text style={styles.courseCategoryText}>{item.category}</Text>
            </View>
            <View style={styles.ratingContainer}>
              {/* <Star size={12} color="#FF731F" fill="#FF731F" /> */}
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.courseInfo}>
            <Text style={styles.courseInstructor}>{item.instructor}</Text>
            <View style={styles.lessonContainer}>
              <Text style={styles.lessonText}>{item.lessons} lessons</Text>
            </View>
          </View>
          <View style={styles.courseCardBottom}>
            <Text style={styles.coursePrice}>${item.price}</Text>
            {item.isBestseller && (
              <View style={styles.bestsellerBadge}>
                <Text style={styles.bestsellerText}>Bestseller</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const renderCategoryItem = ({ item }: { item: string }) => (
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
    <SafeAreaView style={styles.container}  edges={['top','bottom']}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Emma!</Text>
            <Text style={styles.subGreeting}>Let's start learning</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              {/* <Search size={24} color="#1F1F39" /> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              {/* <Bell size={24} color="#1F1F39" /> */}
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner */}
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
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See All</Text>
            {/* <ChevronRight size={16} color="#3D5CFF" /> */}
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        {/* Popular Courses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Courses</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See All</Text>
            {/* <ChevronRight size={16} color="#3D5CFF" /> */}
          </TouchableOpacity>
        </View>

        {popularCourses.map((course) => (
          <View key={course.id}>
            {renderCourseCard({ item: course })}
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  greeting: {
    fontFamily: 'DMSans_SBD',
    fontSize: 24,
    color: '#1F1F39',
  },
  subGreeting: {
    fontFamily: 'Roboto_RG',
    fontSize: 14,
    color: '#858597',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF731F',
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
    fontFamily: 'Roboto_MD',
    fontSize: 14,
    color: '#3D5CFF',
    marginRight: 4,
  },
  categoriesList: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F4F3FD',
    marginRight: 12,
  },
  activeCategoryItem: {
    backgroundColor: '#3D5CFF',
  },
  categoryItemText: {
    fontFamily: 'Roboto_MD',
    fontSize: 14,
    color: '#1F1F39',
  },
  activeCategoryItemText: {
    color: '#FFFFFF',
  },
  courseCard: {
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  courseImage: {
    width: '100%',
    height: 150,
  },
  courseCardContent: {
    padding: 16,
  },
  courseCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseCategory: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#F4F3FD',
    borderRadius: 4,
  },
  courseCategoryText: {
    fontFamily: 'Roboto_MD',
    fontSize: 12,
    color: '#3D5CFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Roboto_MD',
    fontSize: 12,
    color: '#1F1F39',
    marginLeft: 4,
  },
  courseTitle: {
    fontFamily: 'DMSans_SBD',
    fontSize: 16,
    color: '#1F1F39',
    marginBottom: 8,
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseInstructor: {
    fontFamily: 'Roboto_RG',
    fontSize: 12,
    color: '#858597',
  },
  lessonContainer: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E5E5',
  },
  lessonText: {
    fontFamily: 'Roboto_RG',
    fontSize: 12,
    color: '#858597',
  },
  courseCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursePrice: {
    fontFamily: 'Roboto_BD',
    fontSize: 18,
    color: '#3D5CFF',
  },
  bestsellerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFD60A',
    borderRadius: 4,
  },
  bestsellerText: {
    fontFamily: 'Roboto_MD',
    fontSize: 12,
    color: '#1F1F39',
  },
});