import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
// import { Search as SearchIcon, X, Star } from 'lucide-react-native';
import { popularCourses } from '@/data/homeData';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'UI/UX Design', 'Flutter', 'Digital Marketing'
  ]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.length > 2) {
      const results = popularCourses.filter(course => 
        course.title.toLowerCase().includes(text.toLowerCase()) ||
        course.category.toLowerCase().includes(text.toLowerCase()) ||
        course.instructor.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderResultItem = ({ item }) => (
    <Link href={`/course/${item.id}`} asChild>
      <TouchableOpacity style={styles.resultItem}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.resultImage}
          resizeMode="cover"
        />
        <View style={styles.resultInfo}>
          <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.resultInstructor}>{item.instructor}</Text>
          <View style={styles.resultBottom}>
            <View style={styles.ratingContainer}>
              {/* <Star size={12} color="#FF731F" fill="#FF731F" /> */}
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.resultPrice}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}  edges={['top','bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          {/* <SearchIcon size={20} color="#858597" /> */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search for courses, instructors..."
            placeholderTextColor="#858597"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              {/* <X size={16} color="#858597" /> */}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchQuery.length > 0 ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            {searchResults.length} Results Found
          </Text>
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={renderResultItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultsList}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No courses found for "{searchQuery}"
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.recentSearchesContainer}>
          <View style={styles.recentSearchesHeader}>
            <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
            <TouchableOpacity>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentSearchesList}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recentSearchItem}
                onPress={() => handleSearch(search)}
              >
                {/* <SearchIcon size={16} color="#858597" /> */}
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'DMSans_SBD',
    fontSize: 24,
    color: '#1F1F39',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F3FD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Roboto_RG',
    fontSize: 14,
    color: '#1F1F39',
  },
  clearButton: {
    padding: 4,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  resultsTitle: {
    fontFamily: 'Roboto_MD',
    fontSize: 16,
    color: '#1F1F39',
    marginBottom: 16,
  },
  resultsList: {
    paddingBottom: 100,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resultTitle: {
    fontFamily: 'DMSans_SBD',
    fontSize: 14,
    color: '#1F1F39',
    marginBottom: 4,
  },
  resultInstructor: {
    fontFamily: 'Roboto_RG',
    fontSize: 12,
    color: '#858597',
    marginBottom: 8,
  },
  resultBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Roboto_MD',
    fontSize: 12,
    color: '#1F1F39',
    marginLeft: 4,
  },
  resultPrice: {
    fontFamily: 'Roboto_BD',
    fontSize: 14,
    color: '#3D5CFF',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontFamily: 'Roboto_MD',
    fontSize: 16,
    color: '#858597',
    textAlign: 'center',
  },
  recentSearchesContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  recentSearchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentSearchesTitle: {
    fontFamily: 'Roboto_MD',
    fontSize: 16,
    color: '#1F1F39',
  },
  clearAllText: {
    fontFamily: 'Roboto_MD',
    fontSize: 14,
    color: '#3D5CFF',
  },
  recentSearchesList: {
    paddingTop: 8,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F3FD',
  },
  recentSearchText: {
    fontFamily: 'Roboto_RG',
    fontSize: 14,
    color: '#1F1F39',
    marginLeft: 12,
  },
});