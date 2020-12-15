import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import DetailsCard from './DetailsCard';
import TimelyWeatherDetails from './TimelyWeatherDetails'
import WeatherIcon from './WeatherIcon'

export default function CurrentWeatherDetails({ currentWeatherData, dailyWeatherData, hourlyWeatherData }) {

    const DATA = [
        { dateTimeString: '12:30am', percent: '5', temp: '27', key: '1' },
        { dateTimeString: '12:30am', percent: '5', temp: '27', key: '2' },
        { dateTimeString: '12:30am', percent: '5', temp: '27', key: '3' },
        { dateTimeString: '12:30am', percent: '5', temp: '27', key: '4' },
        { dateTimeString: '12:30am', percent: '5', temp: '27', key: '5' },
        { dateTimeString: '12:30am', percent: '5', temp: '27', key: '6' },
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

    const DetailsBlock = (props) => (
        <View style={{ marginTop: '1.5%' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginHorizontal: '5%', marginVertical: '2%' }}>{props.type}</Text>
            <DetailsCard>
                <FlatList
                    data={props.data}
                    renderItem={TimelyWeatherDetails}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </DetailsCard>
        </View>
    )

    // const [temp, setTemp] = useState(24)
    // const [feels_like, setFeels_like] = useState(25)
    // const [description, setDescription] = useState('Low')
    // const [precipitation, setPrecipitation] = useState('0%')
    // const [uvi, setUvi] = useState(0)

    // useState(()=>{
    //     if(details){
    //         setTemp(details.currentWeatherData.temp)
    //         setFeels_like(details.currentWeatherData.feels_like)
    //         setDescription(details.currentWeatherData.description)
    //         setPrecipitation(details.currentWeatherData.precipitation)
    //         setUvi(details.currentWeatherData.uvi)
    //     }
    // },[details])

    return (
        <View style={styles.container} >
            <View style={styles.temperature__container}>
                <WeatherIcon
                    size = {120}
                    code = { currentWeatherData.icon } 
                />
                <Text style={styles.temperature__text}>{currentWeatherData.temp}°</Text>
            </View>
            <Text style={[styles.moreDetails__feels, { color: 'darkgrey' }]}>
                {dailyWeatherData[0].temp[0]}°/{dailyWeatherData[0].temp[1]}° Feels like {currentWeatherData.feels_like}°
            </Text>
            <Text style={[styles.moreDetails__feels, { color: 'white' }]}>{currentWeatherData.description}</Text>

            <View style={{ marginTop: '8%' }}>
                <Text style={{ color: 'white', fontSize: 16, alignSelf: 'flex-end', marginHorizontal: '9%', marginBottom: 5 }}>
                    Yesterday: 33°/26°
                </Text>
                <DetailsCard>
                    <SomeMoreDetails type='Precipitation' value={currentWeatherData.precipitation} />
                    <SomeMoreDetails seperator={true} type='UV Index' value={currentWeatherData.uvi} />
                </DetailsCard>
            </View>

            <DetailsBlock type = 'Hourly' data = {hourlyWeatherData} />
            <DetailsBlock type= 'Daily' data = {dailyWeatherData} />



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
        // justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    temperature__text: {
        color: 'white',
        fontSize: 93,
        fontFamily:'Roboto-Light'
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