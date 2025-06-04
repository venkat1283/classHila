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
  Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, 
  BookmarkPlus, 
  Clock, 
  Users, 
  Star, 
  ChevronDown, 
  Play, 
  Lock 
} from 'lucide-react-native';
import { popularCourses, courseContent, reviews } from '@/data/homeData';

const { width } = Dimensions.get('window');

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('curriculum');
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const course = popularCourses.find(course => course.id === id);
  
  if (!course) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Course not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderLessonItem = (lesson, index, sectionIndex) => (
    <TouchableOpacity 
      key={`${sectionIndex}-${index}`}
      style={styles.lessonItem}
      disabled={lesson.isLocked}
    >
      <View style={styles.lessonLeft}>
        {lesson.isLocked ? (
          <View style={styles.lessonLockIcon}>
            <Lock size={16} color="#858597" />
          </View>
        ) : (
          <View style={styles.lessonPlayIcon}>
            <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
          </View>
        )}
        <Text 
          style={[
            styles.lessonTitle,
            lesson.isLocked && styles.lessonTitleLocked
          ]}
        >
          {lesson.title}
        </Text>
      </View>
      <Text style={styles.lessonDuration}>{lesson.duration}</Text>
    </TouchableOpacity>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.reviewAvatar}
        />
        <View style={styles.reviewUser}>
          <Text style={styles.reviewName}>{item.name}</Text>
          <View style={styles.reviewRating}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                color={i < item.rating ? "#FF731F" : "#E5E5E5"} 
                fill={i < item.rating ? "#FF731F" : "#E5E5E5"} 
              />
            ))}
            <Text style={styles.reviewDate}>{item.date}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.animatedHeader,
          { opacity: headerOpacity }
        ]}
      >
        <SafeAreaView  edges={['top','bottom']}>
          <View style={styles.headerContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Image source={images.left} style={styles.leftImg} />
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {course.title}
            </Text>
            <TouchableOpacity style={styles.bookmarkButton}>
              <BookmarkPlus size={24} color="#1F1F39" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.courseHeader}>
          <Image 
            source={{ uri: course.image }} 
            style={styles.courseImage}
            resizeMode="cover"
          />
          
          <SafeAreaView  edges={['top','bottom']} style={styles.courseHeaderOverlay}>
            <View style={styles.courseHeaderContent}>
              <TouchableOpacity 
                style={styles.backButtonTransparent} 
                onPress={() => router.back()}
              >
                <ChevronLeft size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bookmarkButtonTransparent}>
                <BookmarkPlus size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.courseContent}>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{course.category}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FF731F" fill="#FF731F" />
              <Text style={styles.ratingText}>{course.rating}</Text>
              <Text style={styles.reviewCount}>(2,531)</Text>
            </View>
          </View>

          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.instructorName}>{course.instructor}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Clock size={16} color="#858597" />
              <Text style={styles.infoText}>{course.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Users size={16} color="#858597" />
              <Text style={styles.infoText}>15,252 students</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceText}>${course.price}</Text>
            <TouchableOpacity style={styles.enrollButton}>
              <Text style={styles.enrollButtonText}>Enroll Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About Course</Text>
            <Text style={styles.descriptionText}>
              {course.description}
            </Text>
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[
                styles.tabButton,
                activeTab === 'curriculum' && styles.activeTabButton
              ]}
              onPress={() => setActiveTab('curriculum')}
            >
              <Text 
                style={[
                  styles.tabButtonText,
                  activeTab === 'curriculum' && styles.activeTabButtonText
                ]}
              >
                Curriculum
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tabButton,
                activeTab === 'reviews' && styles.activeTabButton
              ]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text 
                style={[
                  styles.tabButtonText,
                  activeTab === 'reviews' && styles.activeTabButtonText
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'curriculum' ? (
            <View style={styles.curriculumContainer}>
              {courseContent.map((section, sectionIndex) => (
                <View key={sectionIndex} style={styles.sectionContainer}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <ChevronDown size={20} color="#1F1F39" />
                  </View>
                  {section.lessons.map((lesson, index) => 
                    renderLessonItem(lesson, index, sectionIndex)
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.reviewsContainer}>
              <View style={styles.reviewsHeader}>
                <Text style={styles.reviewsHeaderTitle}>Student Feedback</Text>
                <View style={styles.overallRating}>
                  <Text style={styles.overallRatingValue}>{course.rating}</Text>
                  <View style={styles.starsContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        color={i < Math.floor(course.rating) ? "#FF731F" : "#E5E5E5"} 
                        fill={i < Math.floor(course.rating) ? "#FF731F" : "#E5E5E5"} 
                      />
                    ))}
                  </View>
                  <Text style={styles.totalReviews}>2,531 reviews</Text>
                </View>
              </View>
              
              <FlatList
                data={reviews}
                renderItem={renderReviewItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.reviewsList}
              />
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F3FD',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: 'DMSans_SBD',
    fontSize: 16,
    color: '#1F1F39',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  bookmarkButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  courseHeader: {
    position: 'relative',
    height: 250,
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  courseHeaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  courseHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButtonTransparent: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
  },
  bookmarkButtonTransparent: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
  },
  courseContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#F4F3FD',
    borderRadius: 4,
  },
  categoryText: {
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
    fontSize: 14,
    color: '#1F1F39',
    marginLeft: 4,
    marginRight: 2,
  },
  reviewCount: {
    fontFamily: 'Roboto_RG',
    fontSize: 12,
    color: '#858597',
  },
  courseTitle: {
    fontFamily: 'DMSans_SBD',
    fontSize: 20,
    color: '#1F1F39',
    marginBottom: 8,
  },
  instructorName: {
    fontFamily: 'Roboto_RG',
    fontSize: 14,
    color: '#858597',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  infoText: {
    fontFamily: 'Roboto_RG',
    fontSize: 14,
    color: '#858597',
    marginLeft: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  priceText: {
    fontFamily: 'Roboto_BD',
    fontSize: 24,
    color: '#3D5CFF',
  },
  enrollButton: {
    backgroundColor: '#3D5CFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  enrollButtonText: {
    fontFamily: 'Roboto_MD',
    fontSize: 14,
    color: '#FFFFFF',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontFamily: 'DMSans_SBD',
    fontSize: 16,
    color: '#1F1F39',
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: 'Roboto_RG',
    fontSize: 14,
    color: '#858597',
    lineHeight: 22,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F3FD',
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#3D5CFF',
  },
  tabButtonText: {
    fontFamily: 'Roboto_MD',
    fontSize: 14,
    color: '#858597',
  },
  activeTabButtonText: {
    color: '#3D5CFF',
  },
  curriculumContainer: {
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F4F3FD',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F3FD',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontFamily: 'Roboto_MD',
    fontSize: 14,
    color: '#1F1F39',
  },
  lessonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F3FD',
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonPlayIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3D5CFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonLockIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F4F3FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonTitle: {
    fontFamily: 'Roboto_RG',
    fontSize: 14,
    color: '#1F1F39',
    flex: 1,
  },
  lessonTitleLocked: {
    color: '#858597',
  },
  lessonDuration: {
    fontFamily: 'Roboto_RG',
    fontSize: 12,
    color: '#858597',
  },
  reviewsContainer: {
    marginBottom: 16,
  },
  reviewsHeader: {
    marginBottom: 16,
  },
  reviewsHeaderTitle: {
    fontFamily: 'DMSans_SBD',
    fontSize: 16,
    color: '#1F1F39',
    marginBottom: 12,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overallRatingValue: {
    fontFamily: 'Roboto_BD',
    fontSize: 32,
    color: '#1F1F39',
    marginRight: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 12,
  },
  totalReviews: {
    fontFamily: 'Roboto_RG',
    fontSize: 12,
    color: '#858597',
  },
  reviewsList: {
    paddingTop: 8,
  },
  reviewItem: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F4F3FD',
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewUser: {
    flex: 1,
  },
  reviewName: {
    fontFamily: 'Roboto_MD',
    fontSize: 14,
    color: '#1F1F39',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontFamily: 'Roboto_RG',
    fontSize: 12,
    color: '#858597',
    marginLeft: 12,
  },
  reviewComment: {
    fontFamily: 'Roboto_RG',
    fontSize: 14,
    color: '#858597',
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Roboto_MD',
    fontSize: 18,
    color: '#1F1F39',
    marginBottom: 16,
  },
  backButtonText: {
    fontFamily: 'Roboto_MD',
    fontSize: 16,
    color: '#3D5CFF',
  },
});