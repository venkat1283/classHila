import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Filter, Star } from 'lucide-react-native';
import { popularCourses, categories } from '@/data/homeData';

export default function CoursesScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [courses, setCourses] = useState(popularCourses);

  const renderCourseItem = ({ item }) => (
    <Link href={`/course/${item.id}`} asChild>
      <TouchableOpacity style={styles.courseItem}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.courseImage}
          resizeMode="cover"
        />
        <View style={styles.courseInfo}>
          <View style={styles.courseTopRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#FFC107" fill="#FFC107" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.instructorName}>{item.instructor}</Text>
          <View style={styles.courseBottomRow}>
            <Text style={styles.price}>${item.price}</Text>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonText}>{item.lessons} lessons</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#1F1F39" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={item => item}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.coursesList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1F1F39',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F3FD',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1F1F39',
    marginLeft: 8,
  },
  categoriesContainer: {
    marginBottom: 16,
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
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1F1F39',
  },
  activeCategoryItemText: {
    color: '#FFFFFF',
  },
  coursesList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  courseItem: {
    flexDirection: 'row',
    marginBottom: 20,
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
    width: 100,
    height: 130,
  },
  courseInfo: {
    flex: 1,
    padding: 12,
  },
  courseTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F4F3FD',
    borderRadius: 4,
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#3D5CFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1F1F39',
    marginLeft: 4,
  },
  courseTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F1F39',
    marginBottom: 4,
  },
  instructorName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#858597',
    marginBottom: 8,
  },
  courseBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#3D5CFF',
  },
  lessonInfo: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F4F3FD',
    borderRadius: 4,
  },
  lessonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#858597',
  },
});