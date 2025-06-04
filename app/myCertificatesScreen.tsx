import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import images from '@/assets/images';

// Dummy data or components for certificates will go here later

const MyCertificatesScreen = () => {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
    };

    const handleMenuPress = () => {
        // Handle menu action
        console.log('Menu button pressed');
    };

    return (
        <SafeAreaView style={styles.container}  edges={['top','bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={images.left} style={styles.leftImg} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Certificates</Text>
                <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                    <MoreVertical size={24} color="#1F1F39" />
                </TouchableOpacity>
            </View>

            {/* Certificates List Placeholder */}
            <View style={styles.content}>
                <Text>My Certificates List will go here</Text>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
    },
    backButton: {
        marginRight: 8,
    },
    leftImg:{
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyCertificatesScreen; 