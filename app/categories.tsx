import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { categories } from '@/data/homeData';
import CategoryItem from '../components/CategoryItem'; // Import the reusable component

export default function CategoriesScreen() {
  const router = useRouter(); // Initialize useRouter

  const handleBackPress = () => {
    router.back(); // Use router.back() to navigate back
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ChevronLeft size={24} color="#1F1F39" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        {/* Placeholder to balance the header if needed */}
        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Categories List */}
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} />}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
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
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1F1F39',
    textAlign: 'center', // Center the title
  },
  headerRightPlaceholder: {
    width: 24 + 16, // Width of back button + its margin to balance the title
  },
  listContent: {
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F3F3',
    marginHorizontal: 16, // Match horizontal padding of list items
  },
}); 