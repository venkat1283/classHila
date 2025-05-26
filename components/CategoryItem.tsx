import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

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
        <ChevronRight size={20} color="#858597" />
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
    paddingVertical: 12,
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
    width: 30,
    height: 30,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    marginRight: 12,
  },
  categoryListItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1F1F39',
  },
});

export default CategoryItem; 