import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, BookOpen, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomBottomNavigationViewProps {
  activeTab: 'Home' | 'My Courses' | 'Favorites';
}

const CustomBottomNavigationView: React.FC<CustomBottomNavigationViewProps> = ({ activeTab }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.bottomNavigationView}>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => router.replace('/')}
      >
        <Home size={24} color={activeTab === 'Home' ? '#FF731F' : '#8A8A8E'} />
        <Text style={[
          styles.navButtonText,
          activeTab === 'Home' && styles.activeNavButtonText
        ]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => router.replace('/myCoursesScreen')}
      >
        <BookOpen size={24} color={activeTab === 'My Courses' ? '#FF731F' : '#8A8A8E'} />
        <Text style={[
          styles.navButtonText,
          activeTab === 'My Courses' && styles.activeNavButtonText
        ]}>My Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => router.replace('/myFavouritesScreen')}
      >
        <Heart size={24} color={activeTab === 'Favorites' ? '#FF731F' : '#8A8A8E'} />
        <Text style={[
          styles.navButtonText,
          activeTab === 'Favorites' && styles.activeNavButtonText
        ]}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal:30,
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    height: 60,
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
    fontFamily: 'DMSans_MD',
    fontSize: 12,
    color: '#8A8A8E',
  },
  activeNavButtonText: {
    color: '#FF731F',
  },
});

export default CustomBottomNavigationView; 