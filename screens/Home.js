import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header'
import LocationHeader from '../components/LocationHeader'
import CurrentWeatherDetails from '../components/CurrentWeatherDetails'

export default function Home() {
    return (
        <View style={styles.home}>
            <Header />
            <LocationHeader />

            <ScrollView style={{ width: '100%' }}>
                <CurrentWeatherDetails />
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
    }
})
