import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { Star } from 'lucide-react-native';

interface FavoriteCourseItemProps {
    course: {
        id: string;
        title: string;
        imageUrl: string;
        college: string;
        rating: number;
        reviews: number;
        coursesCount: number; // Number of courses/lessons
    };
}

const FavoriteCourseItem = ({ course }: FavoriteCourseItemProps) => {
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.imagePlaceholder} >
                {/* <Image source={{ uri: course.imageUrl }} style={styles.courseImage} resizeMode="cover" /> */}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                <Text style={styles.collegeText}>{course.college}</Text>
                <View style={styles.ratingContainer}>
                    {/* <Star size={12} color="#FF731F" fill="#FF731F" /> */}
                    <Text style={styles.ratingText}>{course.rating} ({course.reviews} Reviews)</Text>
                </View>
                 {/* Display courses count instead of progress */}
                 <Text style={styles.coursesCountText}>{course.coursesCount} courses</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: 'row', // Arrange image and info horizontally
    },
    imagePlaceholder: {
        width: '35%', // Placeholder width
        height: '100%', // Take full height of the card
        backgroundColor: '#E0E0E0', // Grey placeholder
        // If using Image, use style={styles.courseImage}
    },
     courseImage:{
         width: '100%',
         height: '100%',
     },
    infoContainer: {
        padding: 12,
        flex: 1, // Allow info to take remaining space
    },
    courseTitle: {
        fontFamily: 'DMSans_SBD',
        fontSize: 16,
        color: '#1F1F39',
        marginBottom: 4,
    },
    collegeText: {
        fontFamily: 'Roboto_RG',
        fontSize: 12,
        color: '#6A6A85',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        fontFamily: 'Roboto_RG',
        fontSize: 12,
        color: '#1F1F39',
        marginLeft: 4,
    },
    coursesCountText:{
         fontFamily: 'Roboto_RG',
         fontSize: 12,
         color: '#FF731F', // Orange color
         marginTop: 4, // Space above courses count
    },
});

export default FavoriteCourseItem; 