import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import WeatherIcon from '../components/WeatherIcon'
import { useCoordsData } from '../context/CoordsData'

export default function CityDetailBlock({city, coords, weatherData, navigation}){

    const { citiesDataList, setCitiesDataList, setHomeData } = useCoordsData()

    // const [data, setData] = useState()

    // useEffect(() => {
    //     if(weatherData){
    //         const {dateTimeString, temp, icon} = weatherData.currentWeatherData
    //         const { maxMintemp } = weatherData.dailyWeatherData[0]
    //         setData({dateTimeString, temp, icon, maxTemp:maxMintemp[0], minTemp:maxMintemp[1]})
    //     }
    // }, [weatherData])

    const isCityPresentInList = (cityName) => {
        const result = citiesDataList.find(cityData=> cityData.cityName === cityName)
        return result?true:false
    }

    const handleAdd = () => {
        setCitiesDataList(currCityDataList=>{
            const newData = {
                cityName:city,
                coords,
                weatherData,
                isDefault:false,
            }
            return [...currCityDataList, newData]
        })
    }

    const handleDetails = () => {
        // const cityDataObject = citiesDataList.find(cityData => cityData.cityName === city)
        setHomeData(citiesDataList[citiesDataList.length-1])
        navigation.navigate('Home')
    }

    // console.log(citiesDataList)

    const {dateTimeString, temp, icon} = weatherData.currentWeatherData
    const { temp:maxMintemp } = weatherData.dailyWeatherData[0]
    const [maxTemp, minTemp] = [maxMintemp[0],maxMintemp[1]]

    return (
        <View style={styles.container}>
            <View style={styles.cityData}>
                <View>
                    <Text style={{fontSize:22, textTransform:'capitalize'}}>{city}</Text>
                    <Text style={styles.smallText}>Info</Text>
                    <Text style={styles.smallText}>{dateTimeString}</Text>
                </View>
                <View style={{paddingVertical:10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} >
                        <WeatherIcon size={40} code={icon} />
                        <Text style={{fontSize:28}}>{temp}°</Text>
                    </View>
                    <Text style={{...styles.smallText, textAlign:'right'}}>{maxTemp}°/{minTemp}°</Text>
                </View>
            </View>
            <View style={styles.options}>
                {citiesDataList && isCityPresentInList(city)?
                    <Text style={{fontSize:20, color:'blue', fontWeight:'bold'}} onPress={handleDetails} >Details</Text>:
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
