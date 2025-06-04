import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check, X, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import images from '@/assets/images';

interface OptionProps {
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  onPress: () => void;
}

const Option: React.FC<OptionProps> = ({ text, isSelected, isCorrect, isIncorrect, onPress }) => {
  let optionIcon = null;

  const getOptionStyle = () => {
    if (isSelected) {
      if (isCorrect) {
        optionIcon = <Check size={20} color="#FFFFFF" />;
        return styles.optionCorrect;
      } else if (isIncorrect) {
        optionIcon = <X size={20} color="#FFFFFF" />;
        return styles.optionIncorrect;
      } else {
        return styles.optionSelected;
      }
    }
    return {}; // No special style if not selected
  };

  return (
    <TouchableOpacity style={[styles.optionButton, getOptionStyle()]} onPress={onPress} disabled={isCorrect || isIncorrect}>
      <Text style={styles.optionButtonText}>{text}</Text>
      {optionIcon}
    </TouchableOpacity>
  );
};

interface QuestionProps {
  questionNumber: number;
  questionText: string;
  options: { id: string; text: string; }[];
  selectedOptionId: string | null;
  correctOptionId: string | null;
  onOptionSelect: (optionId: string) => void;
}

const QuestionCard: React.FC<QuestionProps> = ({ 
  questionNumber, 
  questionText, 
  options, 
  selectedOptionId,
  correctOptionId,
  onOptionSelect
}) => {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{questionNumber}. {questionText}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = correctOptionId === option.id;
          const isIncorrect = isSelected && correctOptionId !== null && !isCorrect;

          return (
            <Option
              key={option.id}
              text={option.text}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isIncorrect={isIncorrect}
              onPress={() => onOptionSelect(option.id)}
            />
          );
        })}
      </View>
    </View>
  );
};

const TestScreen = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string | null }>({});
  const [correctAnswers, setCorrectAnswers] = useState<{ [key: number]: string }>({}); // Stores correct answer IDs
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      router.replace('/scoreScreen');
      return; // Stop the timer if time is up
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount
  }, [timeLeft, router]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Dummy test data (replace with actual data)
  const testQuestions = [
    {
      id: 'q1',
      question: 'The SI unit of Electric Charge is',
      options: [
        { id: 'o1', text: 'Option 1' },
        { id: 'o2', text: 'Option 2' },
        { id: 'o3', text: 'Option 3' },
        { id: 'o4', text: 'Option 4' },
        { id: 'o5', text: 'Option 5' },
      ],
      correctAnswerId: 'o1', // Example correct answer
    },
    // Add more questions as needed
    {
      id: 'q2',
      question: 'What is the capital of France?',
      options: [
        { id: 'o6', text: 'Berlin' },
        { id: 'o7', text: 'Madrid' },
        { id: 'o8', text: 'Paris' },
        { id: 'o9', text: 'Rome' },
      ],
      correctAnswerId: 'o8',
    },
    {
      id: 'q1',
      question: 'The SI unit of Electric Charge is',
      options: [
        { id: 'o1', text: 'Option 1' },
        { id: 'o2', text: 'Option 2' },
        { id: 'o3', text: 'Option 3' },
        { id: 'o4', text: 'Option 4' },
        { id: 'o5', text: 'Option 5' },
      ],
      correctAnswerId: 'o1', // Example correct answer
    },
    // Add more questions as needed
    {
      id: 'q2',
      question: 'What is the capital of France?',
      options: [
        { id: 'o6', text: 'Berlin' },
        { id: 'o7', text: 'Madrid' },
        { id: 'o8', text: 'Paris' },
        { id: 'o9', text: 'Rome' },
      ],
      correctAnswerId: 'o8',
    },
    {
      id: 'q1',
      question: 'The SI unit of Electric Charge is',
      options: [
        { id: 'o1', text: 'Option 1' },
        { id: 'o2', text: 'Option 2' },
        { id: 'o3', text: 'Option 3' },
        { id: 'o4', text: 'Option 4' },
        { id: 'o5', text: 'Option 5' },
      ],
      correctAnswerId: 'o1', // Example correct answer
    },
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: optionId,
    }));
  };

  const handleSubmitTest = () => {
    // Implement submission logic, e.g., calculate score, navigate to results
    console.log('Test Submitted!', selectedOptions);
    // For demonstration, let's set correct answers for the current question upon submit
    setCorrectAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: testQuestions[currentQuestionIndex].correctAnswerId,
    }));
    router.push('/scoreScreen'); // Navigate to ScoreScreen
  };

  const currentQuestion = testQuestions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image source={images.left} style={styles.leftImg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test</Text>
        <View style={styles.timerContainer}>
          <Clock size={16} color="#FF731F" />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>

      <View style={styles.questionNumbersWrapper}>
        <FlatList
          data={testQuestions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              style={[styles.questionNumberButton, index === currentQuestionIndex && styles.questionNumberButtonActive]}
              onPress={() => setCurrentQuestionIndex(index)}
            >
              <Text style={[
                styles.questionNumberText,
                index === currentQuestionIndex && styles.questionNumberTextActive
              ]}>{index + 1}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.questionNumbersContainer}
          style={{ width: '100%' }}
        />
      </View>

      <QuestionCard
        questionNumber={currentQuestionIndex + 1}
        questionText={currentQuestion.question}
        options={currentQuestion.options}
        selectedOptionId={selectedOptions[currentQuestionIndex] || null}
        correctOptionId={correctAnswers[currentQuestionIndex] || null}
        onOptionSelect={handleOptionSelect}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitTest}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 5,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  leftImg:{
    width:24,
    height:24
  },
  headerTitle: {
    fontFamily:'Raleway_BD',
    fontSize: 17,
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // Adjust for back button space
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FFF8EC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width:80
  },
  timerText: {
    fontFamily: 'DMSans_SBD',
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
  },
  questionNumbersWrapper: {
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    paddingVertical: 16,
  },
  questionNumbersContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  questionNumberButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  questionNumberButtonActive: {
    backgroundColor: '#FF731F',
    borderColor: '#FF731F',
  },
  questionNumberText: {
    fontFamily: 'DMSans_BD',
    fontSize: 14,
    color: '#000',
  },
  questionNumberTextActive: {
    color: '#FFFFFF',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionText: {
    fontFamily: 'DMSans_MD',
    fontSize: 16,
    color: '#1F1F39',
    marginBottom: 24,
  },
  optionsContainer: {
    // No specific style for container, options handle their own margin
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionButtonText: {
    fontFamily: 'DMSans_RG',
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  optionSelected: {
    borderColor: '#FF731F',
    backgroundColor: '#FFF8EC',
  },
  optionCorrect: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  optionIncorrect: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  submitButton: {
    backgroundColor: '#FF731F',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    position:'absolute',
    bottom:60,
    left:16,
    right:16
  },
  submitButtonText: {
    fontFamily: 'DMSans_BD',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default TestScreen; 