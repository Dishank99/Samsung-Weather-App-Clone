import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LocationHeader() {
    return (
        <View style={styles.header}>
            <MaterialIcons name="location-on" size={20} color="white" style={styles.icon} />
            <Text style={styles.title}>
                Dombivli
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: '3%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        width: '100%',
        paddingVertical: '4%',
    },
    icon: {
        marginHorizontal: 7,
    },
    title: {
        fontSize: 20,
        color: 'white',
        paddingTop: 5,
    },
})