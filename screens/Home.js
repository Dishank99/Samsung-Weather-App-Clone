import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header'
import LocationHeader from '../components/LocationHeader'
import CurrentWeatherDetails from '../components/CurrentWeatherDetails'

export default function Home() {
    return (
        <View style={styles.home}>
            <Header />
            <LocationHeader />
            <CurrentWeatherDetails />
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
    }
})
