import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import NotificationItem from '../components/NotificationItem';

const NotificationsScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    router.back();
  };

  const handleEyePress = () => {
    console.log('Eye button pressed');
  };

  const handleChatPress = () => {
    console.log('Chat button pressed');
  };

  const notificationsData = [
    {
      type: 'star',
      message: 'You have 12 Premium books left to read. Remember this!',
      time: 'just now',
    },
    {
      type: 'tag',
      message: 'Get over 20 Premium books on book store with 20%off voucher!!',
      time: 'Wed, January, 2021',
    },
    {
      type: 'chat',
      message: 'Horror or comic?',
      time: 'Wed, January, 2021',
      imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
      type: 'star',
      message: 'You have 12 Premium books left to read. Remember this!',
      time: 'just now',
    },
    {
      type: 'tag',
      message: 'Get over 20 Premium books on book store with 20%off voucher!!',
      time: 'Wed, January, 2021',
    },
    {
      type: 'chat',
      message: 'Horror or comic?',
      time: 'Wed, January, 2021',
      imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
    {
      type: 'chat',
      message: 'Horror or comic?',
      time: 'Wed, January, 2021',
      imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#5A5A5A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Noctifications</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton} onPress={handleEyePress}>
            <Ionicons name="eye-outline" size={24} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleChatPress}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#5A5A5A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.notificationList}>
        {notificationsData.map((notification, index) => (
          <NotificationItem
            key={index}
            type={notification.type as 'star' | 'tag' | 'chat'}
            message={notification.message}
            time={notification.time}
            imageUrl={notification.imageUrl}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
    width:44,
    height:44,
    borderRadius:22,
    backgroundColor:'#E5E5EA',
    justifyContent:'center',
    alignItems:'center'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A3A3C',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
    width:44,
    height:44,
    borderRadius:22,
    backgroundColor:'#E5E5EA',
    justifyContent:'center',
    alignItems:'center'
  },
  notificationList: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});

export default NotificationsScreen; 