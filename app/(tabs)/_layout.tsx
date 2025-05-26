import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Chrome as Home, Search, BookOpen, User, PhoneIncoming as HomeIcon, Search as SearchIcon, BookOpen as BookOpenIcon, User as UserIcon } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#3D5CFF',
        tabBarInactiveTintColor: '#BBBFD0',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size, focused }) => {
          const routeName = route.name;
          
          if (routeName === 'index') {
            return focused ? 
              <Home size={24} color={color} /> : 
              <HomeIcon size={24} color={color} />;
          } else if (routeName === 'search') {
            return focused ? 
              <Search size={24} color={color} /> : 
              <SearchIcon size={24} color={color} />;
          } else if (routeName === 'courses') {
            return focused ? 
              <BookOpen size={24} color={color} /> : 
              <BookOpenIcon size={24} color={color} />;
          } else if (routeName === 'profile') {
            return focused ? 
              <User size={24} color={color} /> : 
              <UserIcon size={24} color={color} />;
          }
          
          return null;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 90 : 70,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F3F3',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 2,
  },
});