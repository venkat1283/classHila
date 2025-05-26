import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';

const categoryDetails = () => {
    const router = useRouter(); // Initialize useRouter
    const route = useRoute()
    const categoryName = route.params['category'];
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
          <Text style={styles.headerTitle}>{categoryName}</Text>
          {/* Placeholder to balance the header if needed */}
          <View style={styles.headerRightPlaceholder} />
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

export default categoryDetails

