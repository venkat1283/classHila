import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Star } from 'lucide-react-native';
import * as Progress from 'react-native-progress';
import React from 'react';
import { useRouter } from 'expo-router';
// Note: ProgressBarAndroid is for Android. For iOS, consider using a custom view or a library like react-native-progress

interface MyCourseItemProps {
    course: {
        id: string;
        title: string;
        imageUrl: string;
        college: string;
        rating: number;
        reviews: number;
        progress: number; // Progress in percentage
    };
    isFinished: boolean; // Add the isFinished prop
}

const MyCourseItem = ({ course, isFinished }: MyCourseItemProps) => {
    const progressBarValue = course.progress / 100; // Convert percentage to a 0-1 value
    const router = useRouter();

    const handleTakeTestPress = () => {
        router.push('/startTestScreen');
    };

    return (
        <View style={styles.card}>
            <View style={styles.imageAndInfoContainer}>
                <View style={styles.imagePlaceholder} >
                    {/* <Image source={{ uri: course.imageUrl }} style={styles.courseImage} resizeMode="cover" /> */}
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                    <Text style={styles.collegeText}>{course.college}</Text>
                    <View style={styles.ratingContainer}>
                        <Star size={12} color="#FF731F" fill="#FF731F" />
                        <Text style={styles.ratingText}>{course.rating} ({course.reviews} Reviews)</Text>
                    </View>
                    <View style={styles.progressContainer}>
                        <Text style={styles.progressLabel}>My progress</Text>
                        <Progress.Bar
                            progress={progressBarValue}
                            width={null} // Allow bar to take flex width
                            color="#FF731F" // Orange color
                            unfilledColor="#E0E0E0" // Grey unfilled color
                            borderWidth={0} // No border
                            borderRadius={3} // Match border radius
                            style={styles.progressBar}
                        />
                        <Text style={styles.progressText}>{course.progress}%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                {isFinished ? (
                    <TouchableOpacity style={styles.giveRatingButton}>
                        <Text style={styles.giveRatingButtonText}>Give a Rating</Text>
                    </TouchableOpacity>
                ) : (
                    
                     <View style={styles.buttonsContainer}>
                         <TouchableOpacity style={styles.takeTestButton} onPress={handleTakeTestPress}>
                             <Text style={styles.takeTestButtonText}>Take a Test</Text>
                         </TouchableOpacity>
                          <TouchableOpacity style={styles.continueButton}>
                             <Text style={styles.continueButtonText}>Continue</Text>
                         </TouchableOpacity>
                     </View>
                )}
            </View>
        </View>
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
        flexDirection: 'column',
        paddingBottom:20
    },
    imageAndInfoContainer: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingTop: 12,
    },
    imagePlaceholder: {
        width: 100,
        height: '100%',
        aspectRatio: 1,
        backgroundColor: '#E0E0E0',
    },
    courseImage:{
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        padding: 12,
        flex: 1,
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
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressLabel: {
        fontFamily: 'Roboto_RG',
        fontSize: 12,
        color: '#1F1F39',
        marginRight: 8,
    },
    progressBar:{
        flex: 1,
    },
    progressText: {
        fontFamily: 'Roboto_RG',
        fontSize: 12,
        color: '#FFFFFF',
        marginLeft: 8,
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    buttonsContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10,
    },
    takeTestButton:{
       width:'45%',
        paddingVertical: 8,
        marginRight: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FF731F',
        alignItems: 'center',
    },
    takeTestButtonText:{
        fontFamily: 'DMSans_SBD',
        fontSize: 14,
        color: '#FF731F',
    },
    continueButton:{
        width:'45%',
        paddingVertical: 8,
        backgroundColor: '#FF731F',
        borderRadius: 8,
        marginLeft:10,
        alignItems: 'center',
    },
    continueButtonText:{
        fontFamily: 'DMSans_SBD',
        fontSize: 14,
        color: '#FFFFFF',
    },
    giveRatingButton: {
        flex: 1,
        marginHorizontal:16,
        paddingVertical: 8,
        backgroundColor: '#FF731F',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    giveRatingButtonText: {
        fontFamily: 'DMSans_SBD',
        fontSize: 14,
        color: '#FFFFFF',
    },
});

export default MyCourseItem; 