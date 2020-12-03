import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useCoordsData } from '../context/CoordsData'

export default function CityDetailBlock({city, weatherData}){

    const { citiesDataList, setCitiesDataList } = useCoordsData()

    // const [data, setData] = useState()

    // useEffect(() => {
    //     const {dateTimeString, temp} = weatherData.currentWeatherData
    //     const { maxMintemp } = weatherData.dailyWeatherData
    //     setData({dateTimeString, temp, maxTemp:maxMintemp[0], minTemp:maxMintemp[1]})
    // }, [city, weatherData])

    const isCityPresentInList = (cityName) => {
        const result = citiesDataList.find(cityData=> cityData.cityName === cityName)
        return result?true:false
    }

    const handleAdd = () => {
        setCitiesDataList(currCityDataList=>{
            const newData = {
                cityName:city,
                ...weatherData
            }
            return [...currCityDataList, newData]
        })
    }

    console.log(citiesDataList)

    return (
        <View style={styles.container}>
            <View style={styles.cityData}>
                <View>
                    <Text style={{fontSize:22, textTransform:'capitalize'}}>{city}</Text>
                    <Text style={styles.smallText}>Info</Text>
                    <Text style={styles.smallText}>{weatherData.dateTimeString}</Text>
                </View>
                <View style={{paddingVertical:10}}>
                    {/* icon */}
                    <Text style={{fontSize:28}}>{weatherData.temp}°</Text>
                    <Text style={styles.smallText}>{weatherData.maxTemp}°/{weatherData.minTemp}°</Text>
                </View>
            </View>
            <View style={styles.options}>
                {citiesDataList && isCityPresentInList(city)?
                    <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}}>Details</Text>:
                    <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}} onPress={handleAdd} >Add</Text>}
            </View>
        </View>     
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        zIndex:3,
        bottom:0,
        backgroundColor:'lightgrey',
        borderTopStartRadius:18,
        borderTopEndRadius:18,
        overflow:'hidden',
        width:'100%',

    },
    cityData:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:18,
        paddingHorizontal:'7%',
        paddingVertical:'2%',
        backgroundColor:'white',
    },
    smallText:{
        color:'lightgrey',
        fontSize:15,
    },
    options:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:'3%'
    }
})
