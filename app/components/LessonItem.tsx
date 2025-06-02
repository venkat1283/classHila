import { View, Text, StyleSheet, Image } from 'react-native';
import { PlayCircle } from 'lucide-react-native';
import images from '@/assets/images';

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface LessonItemProps {
  lesson: Lesson;
}

const LessonItem = ({ lesson }: LessonItemProps) => {
  return (
    <View style={styles.lessonContainer}>
      <Image source={images.playFilled} style={[styles.playImg,{marginRight:8}]} />
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <Text style={styles.lessonDuration}>{lesson.duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
  },
  playImg:{
    width:24,
    height:24
  },
  lessonTitle: {
    flex: 1, // Allow title to take up available space
    fontFamily: 'DMSans_RG',
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  lessonDuration: {
    fontFamily: 'DMSans_RG',
    fontSize: 14,
    color: '#000',
  },
});

export default LessonItem; 