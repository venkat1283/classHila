import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AccordionItem from '../components/AccordionItem';

const HelpSupportScreen = () => {
  const params = useLocalSearchParams();
  const initialTab = typeof params.initialTab === 'string' ? parseInt(params.initialTab) : 0;
  const [selectedIndex, setSelectedIndex] = useState(initialTab);
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();

  const sections = ['FAQ\'s', 'Contact Us'];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => {}} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <TouchableOpacity onPress={() => {}} style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.segmentControlContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={section}
            style={[
              styles.segmentButton,
              selectedIndex === index && styles.segmentButtonActive,
            ]}
            onPress={() => setSelectedIndex(index)}
          >
            <Text
              style={[
                styles.segmentButtonText,
                selectedIndex === index && styles.segmentButtonTextActive,
              ]}
            >
              {section}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedIndex === 0 && (
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="search for help"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      )}

      <ScrollView style={styles.content}>
        {selectedIndex === 0 ? (
          <View>
            <AccordionItem
              title="How do I manage my notifications?"
              content={'To manage notifications, go to "Settings," select "Notification Settings," and customize your preferences.'}
            />
            <AccordionItem
              title="How do I start a guided meditation session?"
              content={'You can start a guided meditation session by navigating to the \'Meditate\' tab and choosing from the available sessions.'}
            />
            <AccordionItem
              title="How do I join a support group?"
              content={'To join a support group, go to the \'Community\' section and browse the available groups. You can request to join any group that aligns with your interests.'}
            />
            <AccordionItem
              title="How do I manage my notifications?"
              content={'To manage notifications, go to "Settings," select "Notification Settings," and customize your preferences.'}
            />
            <AccordionItem
              title="Is my data safe and private?"
              content={'We prioritize your data\'s safety and privacy. All your information is encrypted and stored securely. Please refer to our privacy policy for more details.'}
            />
          </View>
        ) : (
          <View style={styles.contactUsContainer}>
            <Text style={styles.contactUsText}>
              For any inquiries or support, please contact us via:
            </Text>
            <Text style={styles.contactUsInfo}>
              Email: support@example.com
            </Text>
            <Text style={styles.contactUsInfo}>
              Phone: +1 (123) 456-7890
            </Text>
            <Text style={styles.contactUsInfo}>
              Address: 123 Help Street, Support City, 45678
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreButton: {
    padding: 5,
  },
  segmentControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  segmentButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  segmentButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF9800',
  },
  segmentButtonText: {
    fontSize: 16,
    color: '#888',
  },
  segmentButtonTextActive: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  contactUsContainer: {
    padding: 16,
  },
  contactUsText: {
    fontSize: 16,
    marginBottom: 10,
  },
  contactUsInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default HelpSupportScreen; 