import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Check, X, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

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
    router.replace('/scoreScreen'); // Navigate to ScoreScreen
  };

  const currentQuestion = testQuestions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1F1F39" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test</Text>
        <View style={styles.timerContainer}>
          <Clock size={16} color="#FF731F" />
          <Text style={styles.timerText}>09:32</Text>
        </View>
      </View>

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
      />

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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8EC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timerText: {
    fontFamily: 'DMSans_SBD',
    fontSize: 14,
    color: '#FF731F',
    marginLeft: 4,
  },
  questionNumbersContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  questionNumberButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 16,
    color: '#1F1F39',
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
    fontFamily: 'DMSans_MD',
    fontSize: 14,
    color: '#1F1F39',
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
    borderRadius: 16,
    marginHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  submitButtonText: {
    fontFamily: 'DMSans_BD',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default TestScreen; 