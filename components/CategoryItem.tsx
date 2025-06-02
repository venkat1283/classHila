import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import images from '@/assets/images';

interface CategoryItemProps {
  item: string;
}

const CategoryItem = ({ item }: CategoryItemProps) => (
  <Link href={{ pathname: "/categoryDetails", params: { category: item } }} asChild>
    <TouchableOpacity style={styles.categoryListItem}>
      <View style={styles.categoryItemContentWrapper}>
        <View style={styles.categoryListItemContent}>
          {/* Placeholder for category icon/image - matching image style */}
          <View style={styles.categoryIconPlaceholder} />
          <Text style={styles.categoryListItemText}>{item}</Text>
        </View>
        <Image source={images.right} style={styles.rightImg} />
      </View>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  categoryListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom:10,
    backgroundColor: '#FFFFFF',
  },
  categoryItemContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryListItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIconPlaceholder: {
    width: 32,
    height: 32,
    backgroundColor: '#F4F4F5',
    borderRadius: 4,
    marginRight: 12,
  },
  categoryListItemText: {
    fontFamily: 'DMSans_RG',
    fontSize: 14,
    color: '#000',
  },
  rightImg:{
    width:16,
    height:16
  }
});

export default CategoryItem; 