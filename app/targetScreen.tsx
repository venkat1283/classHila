import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';
import StudyTargetCard from '../components/StudyTargetCard';
import AddNewTargetModal from '../components/AddNewTargetModal';

export default function TargetScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);

  const dummyStudyTargets = [
    {
      id: '1',
      title: 'Physics Chapter 4',
      subject: 'Physics',
      estimationTime: '45 Mins',
      dueDate: '05-06-2025',
    },
    {
      id: '2',
      title: 'Physics Chapter 4',
      subject: 'Mathematics',
      estimationTime: '45 Mins',
      dueDate: '05-06-2025',
    },
  ];

  const handleSaveNewTarget = (target: { title: string; estimationTime: string; dueDate: string; subject: string; notes: string }) => {
    console.log('New Target Saved:', target);
    // In a real app, you would add this to your state or a backend
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => {
          console.log('Back button pressed');
          router.back();
        }} style={styles.backButton} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <ChevronLeft size={24} color="#1F1F39" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Study Targets</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={24} color="#1F1F39" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.goalsProgressContainer}>
          <Text style={styles.goalsText}>My Goals</Text>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.goalsCount}>5/8</Text>
        </View>

        {dummyStudyTargets.map((target) => (
          <StudyTargetCard
            key={target.id}
            title={target.title}
            subject={target.subject}
            estimationTime={target.estimationTime}
            dueDate={target.dueDate}
            onEdit={() => console.log('Edit target:', target.id)}
            onDelete={() => console.log('Delete target:', target.id)}
          />
        ))}

        <TouchableOpacity style={styles.addNewTargetButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addNewTargetButtonText}>+ Add New Target</Text>
        </TouchableOpacity>
      </ScrollView>

      <AddNewTargetModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveNewTarget}
      />
    </SafeAreaView>
  );
}

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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    zIndex: 10,
  },
  backButton: {
    padding: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F1F39',
  },
  moreButton: {
    padding: 5,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  goalsProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goalsText: {
    fontFamily: 'DMSans_MD',
    fontSize: 14,
    color: '#1F1F39',
    marginRight: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
  },
  progressBarFill: {
    width: '62.5%', // 5/8 = 62.5%
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  goalsCount: {
    fontFamily: 'DMSans_RG',
    fontSize: 12,
    color: '#858597',
    marginLeft: 10,
  },
  addNewTargetButton: {
    backgroundColor: '#FF731F',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  addNewTargetButtonText: {
    fontFamily: 'DMSans_BD',
    fontSize: 16,
    color: '#FFFFFF',
  },
}); 