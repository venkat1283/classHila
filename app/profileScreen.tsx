import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import ProfileMenuItem from './components/ProfileMenuItem';
import SubscriptionOptionsModal from './components/SubscriptionOptionsModal';
import SignOutConfirmationPopup from './components/SignOutConfirmationPopup';
import { useState } from 'react';
import images from '@/assets/images';
import { StatusBar } from 'expo-status-bar';

const ProfileScreen = () => {
    const router = useRouter();
    const [isSubscriptionModalVisible, setIsSubscriptionModalVisible] = useState(false);
    const [isSignOutPopupVisible, setIsSignOutPopupVisible] = useState(false);

    const handleBackPress = () => {
        router.back();
    };

    const handleMenuPress = () => {
        // Handle menu action
        console.log('Menu button pressed');
    };

    const handleManageSubscription = () => {
        setIsSubscriptionModalVisible(true);
    };

    const handleSignOutPress = () => {
        setIsSignOutPopupVisible(true);
    };

    const handleConfirmSignOut = () => {
        console.log('User confirmed sign out. Implementing sign out logic and navigating.');
        setIsSignOutPopupVisible(false);
        router.replace('/welcomeScreen');
    };

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            <StatusBar style="dark" />
            <View style={styles.statusBarBackground} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={images.left} style={styles.backImg} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                    <Image source={images.more} style={styles.backImg} />
                </TouchableOpacity>
            </View>

            <View style={styles.profileInfoSection}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={images.emptyProfileImg}
                        style={styles.profileImage}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.profileTextContainer}>
                    <Text style={styles.profileName}>Mahesh Chari</Text>
                    <Text style={styles.profileTitle}>Digital Human Experts</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.menuItemsContainer}>
                <View style={styles.menuCard}>
                    <ProfileMenuItem title="Notifications" value={12} />
                    <ProfileMenuItem title="My Course" value={12} onPress={() => router.push('/myCoursesScreen')} />
                    <ProfileMenuItem title="My Certificates" onPress={() => router.push('/myCertificatesScreen')} />
                    <ProfileMenuItem title="Likes" value={3} onPress={() => router.push('/myFavouritesScreen')} />
                    <ProfileMenuItem title="History" />
                    <ProfileMenuItem title="Downloads" />
                    <ProfileMenuItem title="Manage my Subscription" onPress={handleManageSubscription} />
                </View>

                <View style={styles.menuCard}>
                    <ProfileMenuItem title="Privacy & policy" />
                    <ProfileMenuItem title="Help & Support" />
                    <ProfileMenuItem title="Terms & Condition" />
                </View>

                <View style={styles.menuCard}>
                    <ProfileMenuItem title="Sign Out" onPress={handleSignOutPress} />
                </View>
            </ScrollView>

            <SubscriptionOptionsModal
                isVisible={isSubscriptionModalVisible}
                onClose={() => setIsSubscriptionModalVisible(false)}
                onContinue={(selectedOptionId) => {
                    console.log('Selected Subscription Option:', selectedOptionId);
                    setIsSubscriptionModalVisible(false);
                }}
                router={router}
            />

            <SignOutConfirmationPopup
                isVisible={isSignOutPopupVisible}
                onClose={handleConfirmSignOut}
                onConfirmSignOut={handleConfirmSignOut}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    statusBarBackground:{
        backgroundColor:'#fff'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor:'#fff',
    },
    backButton: {
        marginRight: 8,
    },
    backImg:{
        width:24,
        height:24
    },
    headerTitle: {
        flex: 1,
        fontFamily: 'DMSans_SBD',
        fontSize: 18,
        color: '#1F1F39',
        textAlign: 'center',
    },
    menuButton: {
        padding: 8,
        marginLeft: 8,
    },
    profileInfoSection: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#fff',
    },
    profileImageContainer: {
        marginRight: 16,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#F2F2F7',
    },
    profileTextContainer: {
        justifyContent: 'center',
    },
    profileName: {
        fontFamily: 'Raleway_BD',
        fontSize: 17,
        color: '#000',
        marginBottom: 8,
    },
    profileTitle: {
        fontFamily: 'DMSans_RG',
        fontSize: 10,
        color: '#8A8A8E',
    },
    menuItemsContainer: {
        marginTop:20,
        paddingBottom: 32,
    },
    menuCard: {
        backgroundColor: '#FFFFFF',
        marginBottom: 16,
        overflow: 'hidden',
    },
});

export default ProfileScreen; 