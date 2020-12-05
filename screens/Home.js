import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import Header from '../components/Header'
import LocationHeader from '../components/LocationHeader'
import CurrentWeatherDetails from '../components/CurrentWeatherDetails'
import Location from '../services/locationService'
import weatherDataForCoords from '../services/weatherService'
import AsyncStorage from '../services/asyncStorageService'
import { MaterialIcons } from '@expo/vector-icons';

import { useCoordsData } from '../context/CoordsData'

export default function Home({navigation}) {

    const [visible, setVisible] = useState()
    const { homeData, setHomeData, citiesDataList, permissionStatus } = useCoordsData()

    // useEffect(()=>{
    //     console.log('log from homescreen for citiesDataList', citiesDataList)
    //     if(citiesDataList)
    //         setHomeData(citiesDataList[0])
    // },[citiesDataList])

    const handleScroll = (e) => {
        const inset = e.nativeEvent.contentInset
        const offset = e.nativeEvent.contentOffset
        const contentSize = e.nativeEvent.contentSize
        const layoutMeasurement = e.nativeEvent.layoutMeasurement
        // console.log(inset.top, inset.bottom, inset.right, inset.left)
        console.log(offset.x, offset.y)
        // console.log(contentSize.height, contentSize.width)
        // console.log(layoutMeasurement.height, layoutMeasurement.width)
        !offset.y && setVisible()
    }

    return (
        <View style={styles.home}>
            <Header
                onPressLocation={() => navigation.push('Locations')}
                onPressSearch={() => navigation.push('Search')}
            />
            
            {homeData && <React.Fragment>
                <LocationHeader isDefault={homeData.isDefault} permissionGiven={permissionStatus} city={homeData.cityName}/>
                <Text style={
                    [
                        { color: 'darkgrey', zIndex: 3, fontSize: 18 },
                        visible === 'none' ? { display: 'none' } : { display: 'flex' }
                        // { display: 'flex' }
                    ]
                } > { homeData.weatherData.currentWeatherData.dateTimeString } </Text>
                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}
                    onScrollBeginDrag={() => setVisible('none')}
                    onScrollEndDrag={handleScroll}>
                    <CurrentWeatherDetails
                        currentWeatherData = {homeData.weatherData.currentWeatherData}
                        dailyWeatherData = {homeData.weatherData.dailyWeatherData}
                        hourlyWeatherData = {homeData.weatherData.hourlyWeatherData}
                    />
                </ScrollView>
            </React.Fragment>}
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        marginTop: '3%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        width: '100%',
        paddingVertical: '4%',
    },
    icon: {
        marginHorizontal: 7,
    },
    title: {
        fontSize: 20,
        color: 'white',
        paddingTop: 5,
    },
})
