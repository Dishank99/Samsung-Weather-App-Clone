import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import WeatherIcon from './WeatherIcon'

export default function TimelyWeatherDetails({ item }) {
    let temp = ''
    if(item.temp instanceof Array){
        // console.log('reacher here')
        temp = `${item.temp[0]}°/${item.temp[1]}°`
    }
    else
        temp = item.temp + '°'
    return (
        <View style={styles.container}>
            <Text style={{ color: 'white', fontSize: 18 }} >{item.dateTimeString}</Text>
            <WeatherIcon
                size={30}
                code = {item.icon}
            />
            {/* <Text style={{ color: 'white', fontSize: 10, marginVertical: '5%' }} >5%</Text> */}
            <View>
                <Text style={{ color: 'white', fontSize: 16 }} >{temp}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'black',
        // paddingHorizontal: 5,
        marginHorizontal: 10,
    },
})

/*
<View style={{ marginVertical: '15%', justifyContent: 'center' }}>
                <MaterialCommunityIcons
                    name="weather-night-partly-cloudy"
                    size={30} color="white"
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", marginVertical: '5%' }} >
                    <Feather name='droplet' size={10} color="white" />
                    <Text style={{ color: 'white', fontSize: 10 }} >5%</Text>
                </View>
            </View>
            <View>
                <Text style={{ color: 'white', fontSize: 16 }} >27°</Text>
            </View>
*/