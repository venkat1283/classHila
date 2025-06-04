import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import images from '@/assets/images'; // Assuming images are in assets/images

const StartTestScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image source={images.left} style={styles.leftImg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={images.test} // You'll need to add this image to your assets
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Questions</Text>
          <Text style={styles.detailValue}>: 05</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Marks</Text>
          <Text style={styles.detailValue}>: 05</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Time</Text>
          <Text style={styles.detailValue}>: 10 mins</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={() => router.push('/testScreen')}>
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
  },
  leftImg:{
    width:24,
    height:24
  },
  headerTitle: {
    fontFamily: 'Raleway_BD', // Assuming you have this font or similar
    fontSize: 17,
    color: '#000',
  },
  headerRightPlaceholder: {
    width: 24, // To balance the back button
  },
  imageContainer: {
    width:'90%',
    alignSelf:'center',
    alignItems: 'center',
    marginVertical: 25,
    paddingHorizontal: 24,
    backgroundColor:'#FFEFC3',
  },
  illustrationImage: {
    width: '100%',
    resizeMode:'center',
    aspectRatio:0.9
    // height: 200,
    // aspectRatio:0.88
    
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 24,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent:'space-around',
    marginBottom: 8,
  },
  detailLabel: {
    fontFamily: 'DMSans_SBD', // Assuming you have this font or similar
    fontSize: 15,
    color: '#000',
    width:'50%',
  },
  detailValue: {
    flex:1,
    fontFamily: 'DMSans_SBD', // Assuming you have this font or similar
    fontSize: 15,
    color: '#000',
    marginLeft: 16,
    textAlign:'left',
  },
  startButton: {
    backgroundColor: '#FF731F',
    borderRadius: 8,
    marginHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    position:'absolute',
    bottom:60,
    left:16,
    right:16  
  },
  startButtonText: {
    fontFamily: 'DMSans_BD', // Assuming you have this font or similar
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default StartTestScreen; 