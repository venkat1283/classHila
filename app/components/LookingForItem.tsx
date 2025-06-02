import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface LookingForItemProps {
    label: string;
    isSelected: boolean;
    onPress: () => void;
}

const LookingForItem: React.FC<LookingForItemProps> = ({
    label,
    isSelected,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, isSelected && styles.selectedContainer]}
            onPress={onPress}
        >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>{label}</Text>
            {isSelected && (
                <View style={styles.checkmarkContainer}> 
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2', // Light grey background
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginBottom: 12,
        flexDirection: 'row', // To align label and checkmark
        justifyContent: 'space-between', // Space out label and checkmark
        alignItems: 'center', // Vertically center items
    },
    selectedContainer: {
        borderColor: '#FF731F', // Orange border
        borderWidth: 1,
        backgroundColor: '#FFFFFF', // White background when selected
    },
    label: {
        fontFamily: 'Roboto_RG', // Example font, adjust if needed
        fontSize: 16,
        color: '#858597', // Grey text color
    },
    selectedLabel: {
        color: '#1F1F39', // Darker text color when selected
        fontFamily: 'Roboto_MD', // Example font, adjust if needed
    },
    checkmarkContainer: {
        width: 24, // Placeholder size for checkmark
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        // Add styling for the actual checkmark icon if used
    },
});

export default LookingForItem; 