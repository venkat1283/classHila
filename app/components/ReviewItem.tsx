import { View, Text, StyleSheet, Image } from 'react-native';
import { Star } from 'lucide-react-native';

interface Review {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    daysAgo: string;
    comment: string;
}

interface ReviewItemProps {
    review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
    return (
        <View style={styles.reviewContainer}>
            <Image source={{ uri: review.avatar }} style={styles.avatar} />
            <View style={styles.contentContainer}>
                <Text style={styles.name}>{review.name}</Text>
                <View style={styles.ratingAndDateContainer}>
                    <View style={styles.ratingContainer}>
                        <Star size={12} color="#FF731F" fill="#FF731F" />
                        <Text style={styles.ratingText}>{review.rating}</Text>
                    </View>
                    <Text style={styles.daysAgoText}>{review.daysAgo}</Text>
                </View>
                <Text style={styles.commentText}>{review.comment}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        // No borderBottomWidth here as it seems the border is on the section in courseDetails
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0', // Placeholder background
        marginRight: 12,
    },
    contentContainer: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontFamily: 'DMSans_BD',
        fontSize: 16,
        color: '#000',
    },
    ratingAndDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 4,
    },
    ratingContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    ratingText:{
        fontFamily: 'DMSans_RG',
        fontSize: 12,
        color: '#AEAEB2',
        marginLeft: 4,
    },
    daysAgoText:{
        fontFamily: 'DMSans_RG',
        fontSize: 12,
        color: '#AEAEB2',
    },
    commentText:{
        fontFamily: 'DMSans_RG',
        fontSize: 12,
        color: '#AEAEB2',
    }
});

export default ReviewItem; 