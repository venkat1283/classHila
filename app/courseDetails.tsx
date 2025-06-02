import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Share2, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView, VideoContentFit } from 'expo-video';
import LectureSection from './components/LectureSection';
import ReviewItem from './components/ReviewItem';
import FinishCoursePopup from './components/FinishCoursePopup';
import FeedbackPopup from './components/FeedbackPopup';
import { useState } from 'react';
import images from '@/assets/images';

// Dummy data (replace with actual data fetching)
const courseDetails = {
    id: '1',
    title: 'How To Powerfully Influence Anyone ',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Example non-YouTube video link (replace with your link)
    rating: 4.9,
    reviews: 500,
    coursesCount: 12, // Assuming this means number of lessons or modules
    about: 'Available with more options than the line has seen in a while. Three processor choices, two memory configurations, four options for storage. But today, we\'re here to talk about the three color options you\'ve got in front of you: space gray, silver, and gold.',
    instructor: {
        name: 'Mahesh Chari',
        title: 'Digital Human Experts',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', // Placeholder avatar
    },
    lectures: [
        { title: 'Welcome (2 lectures)', lessons: [{ id: '1', title: 'Introduction', duration: '01:23' }, { id: '2', title: 'Public Speaking', duration: '03:23' }] },
        { title: 'Talk Active (8 lectures)', lessons: [] }, // Example with no lessons shown initially
        { title: 'Influence Tips (12 lectures)', lessons: [] },
    ],
    studentFeedback: [
        {
            id: '1',
            name: 'Archana Sabba',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
            rating: 4.9,
            daysAgo: '2 Days Ago',
            comment: 'Very good class and easy to understand very suitable for beginners like me.'
        },
         {
            id: '2',
            name: 'Suresh',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
            rating: 4.9,
            daysAgo: '2 Days Ago',
            comment: 'Very good class and easy to understand very suitable for beginners like me.'
        },
    ]
};

const CourseDetailsScreen = () => {
    const router = useRouter();
    const player = useVideoPlayer(courseDetails.videoUrl, player => {
      player.loop = false; // Disable looping
      // player.play(); // Uncomment this line if you want to autoplay
      // Add logic here to show the popup when the video finishes
      player.addListener('playToEnd', () => setIsFinishCoursePopupVisible(true));
    });

    const [isFinishCoursePopupVisible, setIsFinishCoursePopupVisible] = useState(false);
    const [isFeedbackPopupVisible, setIsFeedbackPopupVisible] = useState(false); // State for feedback popup visibility
    const [isLiked, setIsLiked] = useState(false); // State to track if the course is liked

    const handleBackPress = () => {
      router.back();
    };

    const handleSharePress = () => {
        // Handle share action
        console.log('Share button pressed');
    };

    const handleGiveFeedback = () => {
        // Handle navigation or logic for giving feedback
        console.log('Give Feedback button pressed');
        setIsFinishCoursePopupVisible(false); // Close finish course popup
        setIsFeedbackPopupVisible(true); // Open feedback popup
    };

    const handleBackToHome = () => {
        // Handle navigation to the home page
        console.log('Back to Home button pressed');
        setIsFinishCoursePopupVisible(false);
        router.replace('/'); // Example: navigate to home
    };

    const handleSendFeedback = (rating: number, feedbackText: string) => {
        // Handle sending feedback (e.g., API call)
        console.log('Sending Feedback:', { rating, feedbackText });
        setIsFeedbackPopupVisible(false); // Close feedback popup after sending
        // You might want to show a success message or update the UI
    };

    const handleLikePress = () => {
        setIsLiked(!isLiked);
        console.log('Heart icon pressed. Liked status:', !isLiked);
        // You would typically save this liked status to your backend or local storage here
    };

    // Example function to trigger the popup (e.g., called when course completion is detected)
    const triggerFinishCoursePopup = () => {
        setIsFinishCoursePopupVisible(true);
    };

    return (
      <SafeAreaView style={styles.container} edges={['top','bottom']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Image source={images.left} style={styles.leftImg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Course</Text>
          {/* Placeholder to balance the header if needed */}
          <TouchableOpacity style={styles.shareButton} onPress={handleSharePress}>
          <Image source={images.more} style={styles.leftImg} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Video Player Placeholder */}
          <View style={styles.videoPlayerPlaceholder}>
              {player && (
                <VideoView
                  style={styles.videoPlayer}
                  player={player}
                  nativeControls // Use native video controls
                  contentFit={"cover"} // Use string literal value as workaround
                  allowsFullscreen
                  allowsPictureInPicture
                />
              )}
          </View>

          {/* Course Overview */}
          <View style={styles.section}>
              <Text style={styles.courseTitle}>{courseDetails.title}</Text>
              <View style={styles.ratingContainer}>
                  <Star size={16} color="#FF731F" fill="#FF731F" />
                  <Text style={styles.ratingText}>{courseDetails.rating} ({courseDetails.reviews} Reviews)</Text>
                  <Text style={styles.coursesCountText}>{courseDetails.coursesCount} courses</Text>
                   {/* Heart Icon - Placeholder */}
                  <TouchableOpacity style={styles.heartIconPlaceholder} onPress={handleLikePress}>
                       {/* Add Heart icon here */}
                       <Image
                            source={isLiked ? images.heart : images.heart} // Use a placeholder image for now, replace with heartFilled and heartOutline
                            style={styles.heartIcon} // Add a style for the image if needed
                            resizeMode="contain"
                       />
                  </TouchableOpacity>
              </View>
          </View>

          {/* About The Course */}
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>About The Course</Text>
              <Text style={styles.aboutText}>{courseDetails.about}</Text>
          </View>

          {/* Instructor */}
          <View style={styles.section}>
               {/* <Text style={styles.sectionTitle}>Instructor</Text> */}
               <View style={styles.instructorContainer}>
                   <Image source={{ uri: courseDetails.instructor.avatar }} style={styles.instructorAvatar} />
                   <View>
                       <Text style={styles.instructorName}>{courseDetails.instructor.name}</Text>
                       <Text style={styles.instructorTitle}>{courseDetails.instructor.title}</Text>
                   </View>
               </View>
          </View>

          {/* List Courses */}
          <View style={styles.section}>
               <Text style={styles.sectionTitle}>List Courses</Text>
               {courseDetails.lectures.map((lectureSection, index) => (
                   <LectureSection key={index} section={lectureSection} />
               ))}
          </View>

          {/* Student Feedback */}
           <View style={styles.section}>
               <View style={styles.feedbackHeader}>
                   <Text style={styles.sectionTitle}>Student Feedback</Text>
                   <TouchableOpacity>
                       <Text style={styles.seeAllText}>See All</Text>
                   </TouchableOpacity>
               </View>
               <View style={styles.overallRatingContainer}>
                   <Star size={16} color="#FF731F" fill="#FF731F" />
                   <Text style={styles.overallRatingText}>{courseDetails.rating} ({courseDetails.reviews} Reviews)</Text>
               </View>
               {courseDetails.studentFeedback.map((review, index) => (
                   <ReviewItem key={review.id} review={review} />
               ))}
          </View>

        </ScrollView>

        {/* Add to My Course Button */}
        <View style={styles.bottomButtonContainer}>
             <TouchableOpacity style={styles.addToCourseButton} onPress={()=>{
                router.push('./myCoursesScreen')
             }}>
                 <Text style={styles.addToCourseButtonText}>Add to My Course</Text>
             </TouchableOpacity>
        </View>

        {/* Finish Course Popup */}
        <FinishCoursePopup
            isVisible={isFinishCoursePopupVisible}
            onClose={() => setIsFinishCoursePopupVisible(false)}
            onGiveFeedback={handleGiveFeedback}
            onBackToHome={handleBackToHome}
            courseTitle={courseDetails.title} // Pass the course title
        />

        {/* Feedback Popup */}
        <FeedbackPopup
            isVisible={isFeedbackPopupVisible}
            onClose={() => setIsFeedbackPopupVisible(false)}
            onSendFeedback={handleSendFeedback}
        />
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
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
        fontFamily: 'DMSans_SBD',
        fontSize: 18,
        color: '#1F1F39',
        textAlign: 'center',
    },
    shareButton: {
        padding: 8,
        marginLeft: 8,
    },
    videoPlayerPlaceholder: {
        width: '100%',
        aspectRatio:1.5,
        backgroundColor: '#E0E0E0', // Light grey background
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Hide video overflow outside the placeholder
    },
    videoPlaceholderText: {
        fontSize: 18,
        color: '#666',
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
    },
    section: {
        padding: 16,
        borderBottomWidth: 4,
        borderBottomColor: '#F4F4F5',
    },
     courseTitle: {
        fontFamily: 'Raleway_BD',
        fontSize: 17,
        color: '#000',
        marginBottom: 8,
     },
     ratingContainer:{
        flexDirection: 'row',
        alignItems: 'center',
     },
     ratingText:{
        fontFamily: 'DMSans_RG',
        fontSize: 12,
        color: '#AEAEB2',
        marginLeft: 4,
        marginRight: 16, // Space between rating and courses count
     },
     coursesCountText:{
        fontFamily: 'DMSans_MD',
        fontSize: 12,
        color: '#FF731F',
     },
     heartIconPlaceholder: {
        marginLeft: 'auto', // Push heart icon to the right
        padding: 5, // Add some padding to make it easier to tap
     },
     heartIcon:{
         width: 48, // Adjust size as needed
         height: 48, // Adjust size as needed
     },
     sectionTitle:{
        fontFamily: 'DMSans_BD',
        fontSize: 14,
        color: '#000',
        marginBottom: 8,
     },
     aboutText:{
        fontFamily: 'DMSans_RG',
        fontSize: 12,
        color: '#AEAEB2',
     },
     instructorContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
     },
     instructorAvatar:{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0', // Placeholder background
        marginRight: 12,
     },
     instructorName:{
        fontFamily: 'DMSans_BD',
        fontSize: 14,
        color: '#000',
     },
     instructorTitle:{
        fontFamily: 'DMSans_RG',
        fontSize: 10,
        color: '#8A8A8E',
     },
     seeAllText:{
         fontFamily: 'DMSans_BD',
         fontSize: 16,
         color: '#FF731F', // Orange color
     },
     bottomButtonContainer: {
         padding: 16,
         borderTopWidth: 1,
         borderTopColor: '#F3F3F3',
     },
     addToCourseButton:{
         backgroundColor: '#FF731F', // Orange background
         paddingVertical: 12,
         borderRadius: 8,
         alignItems: 'center',
     },
     addToCourseButtonText:{
         fontFamily: 'DMSans_SBD',
         fontSize: 16,
         color: '#FFFFFF',
     },
     feedbackHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8, // Space between header and reviews
    },
    overallRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16, // Space between overall rating and first review
    },
    overallRatingText: {
        fontFamily: 'DMSans_RG',
        fontSize: 12,
        color: '#AEAEB2',
        marginLeft: 4,
    },
});

export default CourseDetailsScreen; 