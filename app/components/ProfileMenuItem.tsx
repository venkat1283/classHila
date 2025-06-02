import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import images from '@/assets/images';

interface ProfileMenuItemProps {
    title: string;
    value?: string | number;
    onPress?: () => void;
}

const ProfileMenuItem = ({ title, value, onPress }: ProfileMenuItemProps) => {
    return (
        <TouchableOpacity style={styles.menuItemContainer} onPress={onPress}>
            {/* Icon Placeholder (if needed in the future) */}
            {/* <View style={styles.iconPlaceholder} /> */}
            <Image source={images.emptyProfileImg} style={styles.iconPlaceholder} />
            
            <Text style={styles.menuItemTitle}>{title}</Text>
            
            <View style={styles.rightContent}>
                {value !== undefined && <Text style={styles.menuItemValue}>{value}</Text>}
                <Image source={images.right} style={styles.rightImg} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 13,
        paddingBottom:10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#B9B9BB',
        backgroundColor: '#FFFFFF', // Ensure background is white
    },
    iconPlaceholder: {
        width: 24, // Placeholder size for an icon
        height: 24,
        backgroundColor: '#F4F4F5', // Grey placeholder
        borderRadius: 2,
        marginRight: 12,
    },
    menuItemTitle: {
        flex: 1, // Allow title to take up available space
        fontFamily: 'DMSans_RG',
        fontSize: 14,
        color: '#000',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemValue: {
        fontFamily: 'DMSans_RG',
        fontSize: 14,
        color: '#000',
        marginRight: 8,
    },
    rightImg:{
        width:16,
        height:16
    }
});

export default ProfileMenuItem; 