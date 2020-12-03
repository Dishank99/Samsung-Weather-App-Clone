import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Location from '../services/locationService'
import weatherDataForCoords from '../services/weatherService'
import { MaterialIcons } from '@expo/vector-icons';

export default function ListItem({item}){

    // const [cityData, setCityData] = useState({dateTimeString:'d', temp:1, maxTemp:1, minTemp:1})

    // useEffect(()=>{
    //     console.log('bkp1')
    //     Location.getCoordsFromCityName(cityName)
    //     .then(coordsFromCity=>{
    //         console.log('bkp2')
    //         return weatherDataForCoords(coordsFromCity)
    //     })
    //     .then(weatherData=>{
    //         console.log('bkp3')
    //         const {dateTimeString, temp} = weatherData.currentWeatherData
    //         const { temp:maxMintemp } = weatherData.dailyWeatherData[0]
    //         setCityData({dateTimeString, temp, maxTemp:maxMintemp[0], minTemp:maxMintemp[1]})
    //         console.log('bkp4')
    //     })
    // },[cityName])

    return (
        <View style={styles.details__container}>
            <View style={styles.placeAndTime}>
                <Text style={styles.mainText}><MaterialIcons name="location-on" size={16} color="black" style={styles.icon} />{item.cityName}</Text>
                <Text style={styles.subText}>Maharashtra, India</Text>
                <Text style={styles.subText}>{item.dateTimeString}</Text>
            </View>
            <View style={styles.temp}>
                <Text style={styles.mainText}>{item.temp}°</Text>
                <Text style={styles.subText}>{item.maxTemp}° / {item.minTemp}°</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: 20,
        textTransform:'capitalize',
    },
    subText: {
        color: 'grey'
    },
    details__container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '1%',
        paddingVertical: '3%',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    placeAndTime: {
        width: 'auto',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    temp: {
        width: 'auto',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'black',
    },
})
