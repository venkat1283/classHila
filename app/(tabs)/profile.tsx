import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  FlatList,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, ChevronRight, BookOpen, Award, Clock } from 'lucide-react-native';
import { popularCourses } from '@/data/homeData';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('courses');
  
  const myCourses = popularCourses.slice(0, 2);
  
  const stats = [
    { icon: <BookOpen size={20} color="#3D5CFF" />, value: '12', label: 'Courses' },
    { icon: <Award size={20} color="#3D5CFF" />, value: '8', label: 'Certificates' },
    { icon: <Clock size={20} color="#3D5CFF" />, value: '80', label: 'Hours' },
  ];
  
  const renderCourseItem = ({ item, index }) => (
    <TouchableOpacity 
      style={[
        styles.courseItem, 
        index === myCourses.length - 1 && { marginBottom: 24 }
      ]}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.courseImage}
        resizeMode="cover"
      />
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: index === 0 ? '75%' : '45%' }]} />
          </View>
          <Text style={styles.progressText}>{index === 0 ? '75%' : '45%'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#1F1F39" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }} 
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Emma Watson</Text>
          <Text style={styles.userEmail}>emma.watson@example.com</Text>
          
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  {stat.icon}
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'courses' && styles.activeTabButton]}
            onPress={() => setActiveTab('courses')}
          >
            <Text 
              style={[styles.tabButtonText, activeTab === 'courses' && styles.activeTabButtonText]}
            >
              My Courses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'completed' && styles.activeTabButton]}
            onPress={() => setActiveTab('completed')}
          >
            <Text 
              style={[styles.tabButtonText, activeTab === 'completed' && styles.activeTabButtonText]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>In Progress</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See All</Text>
            <ChevronRight size={16} color="#3D5CFF" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={myCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F1F39',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#858597',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F4F3FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1F1F39',
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#858597',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
  },
  activeTabButton: {
    borderBottomColor: '#3D5CFF',
  },
  tabButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#858597',
  },
  activeTabButtonText: {
    color: '#3D5CFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
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
  courseItem: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  courseImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  courseContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  courseTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#1F1F39',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F4F3FD',
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#3D5CFF',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1F1F39',
  },
  logoutButton: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#F4F3FD',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#3D5CFF',
  },
});