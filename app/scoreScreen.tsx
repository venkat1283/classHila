import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye, RotateCcw, Share2, Award } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import images from '@/assets/images';

interface StatItemProps {
  label: string;
  value: string | number;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, color }) => (
  <View style={styles.statItem}>
    <View style={styles.statValueRow}>
      <View style={[styles.statDot, { backgroundColor: color }]} />
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  backgroundColor: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onPress, backgroundColor }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <View style={[styles.actionButtonIconContainer, { backgroundColor }]}>
      {icon}
    </View>
    <Text style={styles.actionButtonText}>{label}</Text>
  </TouchableOpacity>
);

const ScoreScreen = () => {
  const router = useRouter();

  // Dummy data for demonstration
  const score = 2;
  const totalQuestions = 5;
  const completionPercentage = 100; // This would be calculated dynamically
  const correctAnswers = 2;
  const wrongAnswers = 3; // This would be calculated dynamically

  const handleReviewTest = () => {
    console.log('Review Test');
    // Navigate to a test review screen
  };

  const handleReattemptTest = () => {
    console.log('Reattempt Test');
    // Navigate back to the test screen to reattempt
  };

  const handleShareScore = () => {
    console.log('Share Score');
    // Implement sharing functionality
  };

  const handleLeaderBoard = () => {
    console.log('Leader Board');
    // Navigate to leader board screen
    router.push('/leaderBoardScreen');
  };

  const handleBackToHome = () => {
    router.replace('/'); // Navigate back to the home screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Image source={images.left} style={styles.leftImg} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}></Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <View style={styles.scoreSummaryContainer}>
        <View style={styles.scoreCircleMain}>
          <View style={styles.scoreCircleOuter}>
            <View style={styles.scoreCircleInner}>
            <Text style={styles.totalText}>Total Score</Text>
              <Text style={styles.scoreText}>{score < 10 ? `0${score}` : score}</Text>
              <Text style={styles.scoreOutOfText}>Out of {totalQuestions}</Text>
            </View>
          </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <StatItem label="Completion" value={`${completionPercentage}%`} color="#4285F4" />
            <StatItem label="Total Questions" value={totalQuestions} color="#4285F4" />
          </View>
          <View style={styles.statsRow}>
            <StatItem label="Correct" value={correctAnswers} color="#34A853" />
            <StatItem label="Wrong" value={wrongAnswers} color="#EA4335" />
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <ActionButton icon={<Eye size={24} color="#FFFFFF" />} label="Review Test" onPress={handleReviewTest} backgroundColor="#673AB7" />
          <ActionButton icon={<RotateCcw size={24} color="#FFFFFF" />} label="Reattempt Test" onPress={handleReattemptTest} backgroundColor="#4CAF50" />
          <ActionButton icon={<Share2 size={24} color="#FFFFFF" />} label="Share Score" onPress={handleShareScore} backgroundColor="#2196F3" />
          <ActionButton icon={<Award size={24} color="#FFFFFF" />} label="Leader Board" onPress={handleLeaderBoard} backgroundColor="#757575" />
        </View>

        <TouchableOpacity style={styles.backToHomeButton} onPress={handleBackToHome}>
          <Text style={styles.backToHomeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
  
    width: 24,
    height: 24,
   
    zIndex: 9999,
  },
  leftImg:{
    width:24,
    height:24
  },
  headerTitle: {
    fontFamily: 'DMSans_BD',
    fontSize: 18,
    color: '#1F1F39',
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // Adjust for back button space
  },
  headerRightPlaceholder: {
    width: 24, // To balance the back button
  },
  scoreSummaryContainer: {
    backgroundColor: '#FF731F',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:16,
    borderRadius:10,
    marginBottom: 24,
  },
  scoreCircleMain: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircleOuter: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'#8A8A8E'
  },
  scoreCircleInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalText:{
    fontFamily: 'DMSans_RG',
    fontSize: 14,
    color: '#6A6A85',
  },
  scoreText: {
    fontFamily: 'DMSans_BD',
    fontSize: 24,
    color: '#1F1F39',
  },
  scoreOutOfText: {
    fontFamily: 'DMSans_RG',
    fontSize: 14,
    color: '#6A6A85',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    gap: 20,
  },
  statItem: {
    width:'50%',
    alignItems: 'flex-start',
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statValue: {
    fontFamily: 'DMSans_BD',
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'center',
  },
  statLabel: {
    fontFamily: 'DMSans_MD',
    fontSize: 12,
    color: '#585858',
    textAlign: 'center',
    marginLeft:15
  },
  statValueRow: { // New style for the row containing dot and value
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 24,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
    width: '25%', // 4 buttons per row
    marginBottom: 16,
  },
  actionButtonIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    fontFamily: 'Roboto_RG',
    fontSize: 12,
    color: '#000000CC',
    textAlign: 'center',
  },
  backToHomeButton: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    marginHorizontal: 24,
    paddingVertical: 0,
    alignItems: 'center',
  },
  backToHomeButtonText: {
    fontFamily: 'DMSans_BD',
    fontSize: 16,
    color: '#FF731F',
  },
});

export default ScoreScreen; 