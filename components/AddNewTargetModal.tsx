import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';

interface AddNewTargetModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (target: { title: string; estimationTime: string; dueDate: string; subject: string; notes: string }) => void;
}

const AddNewTargetModal: React.FC<AddNewTargetModalProps> = ({ isVisible, onClose, onSave }) => {
  const [targetTitle, setTargetTitle] = useState('');
  const [estimationTime, setEstimationTime] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [subject, setSubject] = useState('');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    onSave({ title: targetTitle, estimationTime, dueDate: dueDate.toLocaleDateString(), subject, notes });
    onClose();
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(Platform.OS === 'ios');
    setDueDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || new Date();
    setShowTimePicker(Platform.OS === 'ios');
    setEstimationTime(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add New Target</Text>

        <Text style={styles.label}>Target Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Input your Target Title"
          value={targetTitle}
          onChangeText={setTargetTitle}
        />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Estimation Time</Text>
            <TouchableOpacity onPress={showTimepicker} style={styles.inputWithIcon}>
              <TextInput
                style={styles.halfWidthInput}
                placeholder="00:00"
                value={estimationTime}
                editable={false}
              />
              <Feather name="clock" size={20} color="#858597" />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                testID="timePicker"
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            )}
          </View>

          <View style={styles.halfWidth}>
            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity onPress={showDatepicker} style={styles.inputWithIcon}>
              <TextInput
                style={styles.halfWidthInput}
                placeholder="DD/MM/YYYY"
                value={dueDate.toLocaleDateString()}
                editable={false}
              />
              <Feather name="calendar" size={20} color="#858597" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="datePicker"
                value={dueDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
          </View>
        </View>

        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Input your Subject"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write Here..."
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
            <Text style={[styles.buttonText, styles.closeButtonText]}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F1F39',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: '#1F1F39',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfWidth: {
    width: '48%',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  halfWidthInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F1F39',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: '#E5E5E5',
  },
  saveButton: {
    backgroundColor: '#FF731F',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButtonText: {
    color: '#1F1F39',
  },
});

export default AddNewTargetModal; 