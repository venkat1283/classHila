import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCheckIcon, ChevronLeft, Star } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {reviews, topics} from '@/data/homeData'
import { useRoute } from '@react-navigation/native';
import TopicItem from './components/TopicItem';
import images from '@/assets/images';

const categoryDetails = () => {
    const router = useRouter(); // Initialize useRouter
    const route = useRoute()
    // Safely access the category parameter, providing a default if undefined
    const categoryName = (route.params as { category?: string })?.category || 'Category';
    const handleBackPress = () => {
      router.back(); // Use router.back() to navigate back
    };
    const handleSharePress = () => {
        // Handle share action
        console.log('Share button pressed');
    };
  
    return (
      <SafeAreaView style={styles.container}  edges={['top','bottom']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={images.left} style={styles.leftImg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          {/* Placeholder to balance the header if needed */}
          <TouchableOpacity style={styles.shareButton} onPress={handleSharePress}>
          <Image source={images.more} style={styles.leftImg} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
            <FlatList
            data={topics}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({item})=>{
                return <TopicItem 
                item={item} 
                onPress={() => router.push({ pathname: '/courseDetails', params: { courseId: item.id } })} // Navigate to course details on press
            />
            }}
            keyExtractor={(item)=>item.id.toString()}
            />
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
    },
    backButton: {
      marginRight: 8,
    },
    leftImg:{
        width:24,
        height:24
      },
    headerTitle: {
      flex: 1,
      fontFamily: 'Raleway_BD',
      fontSize: 17,
      color: '#000',
      textAlign: 'center', // Center the title
    },
    shareButton: {
        padding: 8,
        marginLeft: 8,
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

