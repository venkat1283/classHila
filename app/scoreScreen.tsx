import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye, RotateCcw, Share2, Award } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface StatItemProps {
  label: string;
  value: string | number;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, color }) => (
  <View style={styles.statItem}>
    <View style={[styles.statDot, { backgroundColor: color }]} />
    <View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <View style={styles.actionButtonIconContainer}>
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
  };

  const handleBackToHome = () => {
    router.replace('/'); // Navigate back to the home screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#1F1F39" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Test</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <View style={styles.scoreSummaryContainer}>
          <View style={styles.scoreCircleOuter}>
            <View style={styles.scoreCircleInner}>
              <Text style={styles.scoreText}>{score < 10 ? `0${score}` : score}</Text>
              <Text style={styles.scoreOutOfText}>Out of {totalQuestions}</Text>
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
          <ActionButton icon={<Eye size={24} color="#673AB7" />} label="Review Test" onPress={handleReviewTest} />
          <ActionButton icon={<RotateCcw size={24} color="#4CAF50" />} label="Reattempt Test" onPress={handleReattemptTest} />
          <ActionButton icon={<Share2 size={24} color="#2196F3" />} label="Share Score" onPress={handleShareScore} />
          <ActionButton icon={<Award size={24} color="#757575" />} label="Leader Board" onPress={handleLeaderBoard} />
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
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'DMSans_SBD',
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
    marginBottom: 24,
  },
  scoreCircleOuter: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircleInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontFamily: 'DMSans_BD',
    fontSize: 48,
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
    marginHorizontal: 24,
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
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statValue: {
    fontFamily: 'DMSans_BD',
    fontSize: 20,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'DMSans_RG',
    fontSize: 14,
    color: '#6A6A85',
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    fontFamily: 'DMSans_MD',
    fontSize: 12,
    color: '#1F1F39',
    textAlign: 'center',
  },
  backToHomeButton: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    marginHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF731F',
  },
  backToHomeButtonText: {
    fontFamily: 'DMSans_BD',
    fontSize: 16,
    color: '#FF731F',
  },
});

export default ScoreScreen; 