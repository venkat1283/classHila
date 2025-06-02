import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';

const CheckoutSuccessScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerTitle: '', headerShadowVisible: false }} />
      <View style={styles.content}>
        <Text style={styles.title}>Congratulations on your premium account</Text>
        <View style={styles.imagePlaceholder}></View>
        <Text style={styles.description}>Enjoy the best full access course service{"\n"}that will improve your skills.</Text>
      </View>
      <TouchableOpacity style={styles.findCourseButton} onPress={()=>{
        router.push('/')
      }}>
          <Text style={styles.findCourseButtonText}>Find Course</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily:'Raleway_BD',
    color:'#000',
    textAlign: 'center',
    marginBottom: 32,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio:0.85,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 24,
  },
  description: {
    fontFamily:'DMSans_RG',
    fontSize: 12,
    textAlign: 'center',
    color: '#8A8A8E',
    marginBottom: 40,
  },
  findCourseButton: {
    backgroundColor: '#FF731F',
    paddingVertical: 15,
    marginHorizontal: 20,
    alignItems:'center',
    borderRadius: 8,
    position:'absolute',
    bottom:20,
    left:16,
    right:16
  },
  findCourseButtonText: {
    fontSize: 16,
    fontFamily:'DMSans_BD',
    color: '#fff',
  },
});

export default CheckoutSuccessScreen; 