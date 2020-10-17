import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsCard({ children }) {
    return (
        <View style={styles.card__container}>
            { children}
        </View>
    );
}

const styles = StyleSheet.create({
    card__container: {
        width: '100%',
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        // opacity: 0.3,
        paddingVertical: '8%',
        paddingHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})