import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Header() {
    return (
        <View style={styles.header}>
            <TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17, marginRight: 5 }}>
                    Locations
                </Text>
            </TouchableOpacity>
            <AntDesign name='search1' size={20} color='white' style={styles.icon} />
            <SimpleLineIcons name="options-vertical" size={16} color="white" style={[styles.icon, { marginBottom: 1 }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        paddingTop: StatusBar.currentHeight,
        height: '9%',
        width: '100%',


    },
    icon: {
        marginLeft: 20,
    }
})