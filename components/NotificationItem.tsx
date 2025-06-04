import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationItemProps {
  type: 'star' | 'tag' | 'chat';
  message: string;
  time: string;
  imageUrl?: string; // Optional for chat type notifications
}

const NotificationItem: React.FC<NotificationItemProps> = ({ type, message, time, imageUrl }) => {
  const renderIcon = () => {
    switch (type) {
      case 'star':
        return (
          <View style={[styles.iconContainer, styles.starIconBackground]}>
            <Ionicons name="star" size={24} color="#fff" />
          </View>
        );
      case 'tag':
        return (
          <View style={[styles.iconContainer, styles.tagIconBackground]}>
            <Ionicons name="pricetag" size={24} color="#fff" />
          </View>
        );
      case 'chat':
        return (
          <View style={styles.chatImageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.chatImage} />
            <View style={styles.chatDot}>
              <Ionicons name="chatbubble" size={12} color="#fff" />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      {renderIcon()}
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8E8E93',
    marginRight: 10,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  starIconBackground: {
    backgroundColor: '#FFD700',
  },
  tagIconBackground: {
    backgroundColor: '#FF4500',
  },
  chatImageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  chatImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  chatDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3A3A3C',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#8E8E93',
  },
});

export default NotificationItem; 