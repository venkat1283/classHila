import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SegmentedControlProps {
    options: string[];
    selectedIndex: number;
    onPress: (index: number) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
    options,
    selectedIndex,
    onPress,
}) => {
    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.optionButton,
                        selectedIndex === index && styles.selectedOptionButton,
                    ]}
                    onPress={() => onPress(index)}
                >
                    <Text
                        style={[
                            styles.optionText,
                            selectedIndex === index && styles.selectedOptionText,
                        ]}
                    >
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF', // Light grey background for the control
        borderRadius: 8,
        overflow: 'hidden', // Clip the selected indicator
        marginBottom: 24, // Space below the segmented control
    },
    optionButton: {
        flex: 1, // Distribute space evenly
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedOptionButton: {
        // backgroundColor: '#FFFFFF', // White background for selected option
        // Add shadow/elevation if needed to match the raised look in the image
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // elevation: 3,
    },
    optionText: {
        fontFamily: 'DMSans_BD', // Example font
        fontSize: 14,
        color: '#6D6D6D', // Grey text color for unselected
    },
    selectedOptionText: {
        fontFamily: 'Roboto_MD', // Example font for selected
        color: '#FF731F', // Orange color for selected text
    },
});

export default SegmentedControl; 