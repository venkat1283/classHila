import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

interface StudyTargetCardProps {
  title: string;
  subject: string;
  estimationTime: string;
  dueDate: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const StudyTargetCard: React.FC<StudyTargetCardProps> = ({ title, subject, estimationTime, dueDate, onEdit, onDelete }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
            <Feather name="edit" size={20} color="#3D5CFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
            <Feather name="trash-2" size={20} color="#FF4500" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Subject</Text>
          <Text style={[styles.detailValue, styles.subjectText]}>{subject}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Estimation Time</Text>
          <Text style={styles.detailValue}>{estimationTime}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Due</Text>
          <Text style={[styles.detailValue, styles.dueDateText]}>{dueDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F1F39',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  detailItem: {
    alignItems: 'flex-start',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#858597',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F1F39',
  },
  subjectText: {
    color: '#3D5CFF',
  },
  dueDateText: {
    color: '#FF4500',
  },
  separator: {
    width: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
  },
});

export default StudyTargetCard; 