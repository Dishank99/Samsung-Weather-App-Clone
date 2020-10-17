import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import DetailsCard from './DetailsCard';
import TimelyWeatherDetails from './TimelyWeatherDetails'

export default function CurrentWeatherDetails() {

    const DATA = [
        { time: '12:30am', percent: '5', temp: '27', key: '1' },
        { time: '12:30am', percent: '5', temp: '27', key: '2' },
        { time: '12:30am', percent: '5', temp: '27', key: '3' },
        { time: '12:30am', percent: '5', temp: '27', key: '4' },
        { time: '12:30am', percent: '5', temp: '27', key: '5' },
        { time: '12:30am', percent: '5', temp: '27', key: '6' },
    ]

    const SomeMoreDetails = ({ seperator, type, value }) => (
        <View style={[styles.someMoreDetails__container, seperator && { borderLeftColor: 'white', borderLeftWidth: 1, }]}>
            <Feather name={type === 'Precipitation' ? 'droplet' : 'sun'} size={24} color="white" />
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', color: 'white', marginLeft: 15 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>{type}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{value}</Text>
            </View>
        </View>
    )

    const DetailsBlock = () => (
        <View style={{ marginTop: '1.5%' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginHorizontal: '5%', marginVertical: '2%' }}>Hourly</Text>
            <DetailsCard>
                <FlatList
                    data={DATA}
                    renderItem={TimelyWeatherDetails}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </DetailsCard>
        </View>
    )

    return (
        <View style={styles.container} >
            <View style={styles.temperature__container}>
                <MaterialCommunityIcons
                    name="weather-night-partly-cloudy"
                    size={60} color="white"
                />
                <Text style={styles.temperature__text}>28°</Text>
            </View>
            <Text style={[styles.moreDetails__feels, { color: 'darkgrey' }]}>33°/25° Feels like 31°</Text>
            <Text style={[styles.moreDetails__feels, { color: 'white' }]}>Haze</Text>

            <View style={{ marginTop: '8%' }}>
                <Text style={{ color: 'white', fontSize: 16, alignSelf: 'flex-end', marginHorizontal: '9%', marginBottom: 5 }}>Yesterday: 33°/26°</Text>
                <DetailsCard>
                    <SomeMoreDetails type='Precipitation' value='10%' />
                    <SomeMoreDetails seperator={true} type='UV Index' value='Low' />
                </DetailsCard>
            </View>

            <DetailsBlock />
            <DetailsBlock />
            <DetailsBlock />



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: '2.5%',//10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    temperature__container: {
        width: '60%',
        paddingTop: '4.5%',//18,
        paddingBottom: '1%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    temperature__text: {
        color: 'white',
        fontSize: 93,
    },
    moreDetails__feels: {
        fontSize: 20,
        marginBottom: '2%',
    },
    someMoreDetails__container: {
        flexGrow: 0.5,
        paddingVertical: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'black',
    },
})
/*
<View style={{ marginTop: '8%' }}>
                <Text style={{ color: 'white', fontSize: 16, alignSelf: 'flex-end', marginHorizontal: '9%', marginBottom: 5 }}>Yesterday: 33°/26°</Text>
                <DetailsCard>
                    <SomeMoreDetails type='Precipitation' value='10%' />
                    <SomeMoreDetails seperator={true} type='UV Index' value='Low' />
                </DetailsCard>
            </View>
*/