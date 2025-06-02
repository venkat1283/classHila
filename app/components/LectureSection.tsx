import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, Image } from 'react-native';
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react-native'; // Added PlayCircle for consistency
import LessonItem from './LessonItem'; // Import the LessonItem component
import images from '@/assets/images';

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface LectureSectionProps {
  section: { title: string; lessons: Lesson[] };
}

const LectureSection = ({ section }: LectureSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={toggleExpanded} style={styles.headerContainer}>
        <View style={styles.headerLeft}>
           {/* Icon indicating playability or section type - using PlayCircle as example */}
          {/* You might want a different icon here depending on design */}
          {/* <PlayCircle size={20} color="#FF731F" style={{ marginRight: 8 }}/> */}
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
        {expanded ? (
          <Image source={images.left} style={[styles.arrowImg, { transform: [{ rotate: '90deg' }] }]} />
        ) : (
          <Image source={images.left} style={[styles.arrowImg, { transform: [{ rotate: '-90deg' }] }]} />
        )}
      </TouchableOpacity>
      {expanded && ( // Conditionally render lessons
        <View style={styles.lessonsList}>
          {section.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
    paddingVertical: 12,
  },
   headerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16, // Add horizontal padding
   },
    headerLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Allow title to take space
        marginRight: 8, // Space between title and icon
    },
  sectionTitle: {
    fontFamily: 'DMSans_BD',
    fontSize: 14,
    color: '#000',
  },
  arrowImg:{
    width:24,
    height:24,
    
  },
  lessonsList: {
    marginTop: 8,
    paddingHorizontal: 16, // Match header padding
  },
});

export default LectureSection; 