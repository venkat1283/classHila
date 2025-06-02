import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { categories } from '@/data/homeData';
import CategoryItem from '../components/CategoryItem'; // Import the reusable component
import images from '@/assets/images';

export default function CategoriesScreen() {
  const router = useRouter(); // Initialize useRouter

  const handleBackPress = () => {
    router.back(); // Use router.back() to navigate back
  };

  return (
    <SafeAreaView style={styles.container}  edges={['top','bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image source={images.left} style={styles.leftImg} />
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
  },
  leftImg:{
    width:24,
    height:24
  },
  backButton: {
    // padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'Raleway_BD',
    fontSize: 17,
    color: '#000',
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
    backgroundColor: '#B9B9BB',
    // marginHorizontal: 16, // Match horizontal padding of list items
  },
}); 