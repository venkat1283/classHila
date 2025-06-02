import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CheckCheckIcon, Star } from 'lucide-react-native';
import images from '@/assets/images';

interface Topic {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  courses: number;
  college: string;
}

interface TopicItemProps {
  item: Topic;
  onPress?: () => void;
  showCollege?: boolean;
}

const TopicItem = ({ item, onPress, showCollege = true }: TopicItemProps) => {
  return (
    <TouchableOpacity style={styles.topicView} onPress={onPress} disabled={!onPress}>
      <Image
        // source={{ uri: item.avatar }}
        source={images.emptyProfileImg}
        style={styles.topicImage}
        resizeMode='cover'
      />
      <View style={styles.topicSubView}>
        <Text style={styles.topicName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.subview}>
          {/* <CheckCheckIcon size={16} color="#6A6A85" /> */}
          <Image source={images.emptyProfileImg} style={styles.clgImg} />
          {showCollege && <Text style={styles.college}> {item.college}</Text>}
        </View>
        <View style={styles.subview}>
          <Star size={12} color="#FF731F" fill="#FF731F" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews} reviews)</Text>
        </View>
        <Text style={styles.courses}>{item.courses} courses</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topicView: {
    // padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  topicImage: {
    width: '32%',
    aspectRatio:0.9090,
    backgroundColor:'#F2F2F7',
    resizeMode:'center',
    // borderRadius: 8,
    // alignSelf: 'stretch',
  },
  topicSubView: {
    marginLeft: 10,
    justifyContent: 'flex-start',
    flex: 1,
  },
  subview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  topicName: {
    fontFamily: 'DMSans_MD',
    fontSize: 12,
    color: '#000',
  },
  clgImg:{
    width:16,
    height:16
  },
  college: {
    fontFamily: 'DMSans_RG',
    fontSize: 9,
    color: '#AEAEB2',
  },
  reviews: {
    fontFamily: 'DMSans_RG',
    fontSize: 9,
    color: '#AEAEB2',
  },
  rating: {
    fontFamily: 'DMSans_MD',
    fontSize: 9,
    color: '#AEAEB2',
    marginRight: 4,
  },
  courses: {
    fontFamily: 'DMSans_MD',
    fontSize: 12,
    color: '#FF731F',
    marginTop: 10,
  },
});

export default TopicItem; 