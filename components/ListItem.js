import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Location from '../services/locationService'
import weatherDataForCoords from '../services/weatherService'
import { MaterialIcons } from '@expo/vector-icons';
import WeatherIcon from '../components/WeatherIcon'
import { useCoordsData } from '../context/CoordsData'
import CheckBox from '@react-native-community/checkbox';

export default function ListItem({item, permissionStatus, onPressedHandler, onLongPressHandler, isDeleting, selectionHandler}){

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

    const iconString = permissionStatus?'location-on':'location-off'

    const [checkBoxCurrentValue, setCheckBoxCurrentValue] = useState()

    const onMarkedHandler = (newMarkingValue) => {
        selectionHandler(item.index, newMarkingValue)
        console.log('newMarkingValue',newMarkingValue)
        setCheckBoxCurrentValue(newMarkingValue)
    }
    
    return (
        <TouchableOpacity onLongPress={()=>onLongPressHandler()} disabled={isDeleting} onPress={()=>onPressedHandler(item.index)}>
        <View style={styles.details__container}>
            {isDeleting && <CheckBox
                disabled={item.isDefault?true:false}
                value={checkBoxCurrentValue}
                onValueChange={onMarkedHandler}
                tintColors={{true:'#0CAFFF'}}
            />}
            <View style={styles.placeAndTime}>
                <Text style={styles.mainText}>
                    {item.isDefault && <MaterialIcons name={iconString} size={16} color="black" style={styles.icon} />}
                    {item.cityName}
                </Text>
                <Text style={styles.subText}>{item.description}</Text>
                <Text style={styles.subText}>{item.dateTimeString}</Text>
            </View>
            <View style={styles.temp}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                    <WeatherIcon size={40} code={item.icon} />
                    <Text style={styles.mainText}>{item.temp}°</Text>
                </View>
                <Text style={styles.subText}>{item.maxTemp}° / {item.minTemp}°</Text>
            </View>
        </View>
        </TouchableOpacity>
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
