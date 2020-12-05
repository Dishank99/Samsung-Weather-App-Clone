import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LocationHeader({isDefault, permissionGiven, city}) {
    const iconString = permissionGiven?'location-on':'location-off'
    return (
        <View style={styles.header}>
            {isDefault && <MaterialIcons name={iconString} size={20} color="white" style={styles.icon} />}
            <Text style={styles.title}>
                {city}
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
        textTransform:'capitalize',
    },
})