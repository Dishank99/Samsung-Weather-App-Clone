import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, StatusBar, FlatList } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import MenuModal from '../shared/MenuModal'
import ListItem from '../components/ListItem'
import RefreshBar from '../components/RefreshBar'

import { useCoordsData } from '../context/CoordsData'
import LocationService from '../services/locationService'
import weatherDataForCoords from '../services/weatherService'


export function LocationScreenHeader(props) {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <View style={styles.header}>
            <Ionicons name="ios-arrow-back" size={24} color="black" style={styles.icon} onPress={() => props.navigation.goBack()} />
            <Text style={{ flexGrow: 2, fontSize: 20 }} >Locations</Text>
            <Ionicons name="ios-add" size={35} color="black" style={styles.icon} onPress={()=> props.navigation.navigate('Search')} />
            <SimpleLineIcons name="options-vertical" size={16} color="black" style={styles.icon} onPress={() => setMenuVisible(true)} />
            <Modal transparent={true} visible={menuVisible} animationType='fade' presentationStyle='overFullScreen' >
                <TouchableWithoutFeedback style={{ flex: 1, height: '100%', width: '100%' }} onPress={() => setMenuVisible(false)}>
                    <View style={{ backfaceVisibility: 'hidden', flex: 1 }} >
                        <MenuModal items={[{ title: 'Edit' }, { title: 'Settings' }, { title: 'Contact Us' }]} />
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    )
}

export default function Location({navigation}) {
    
    const {citiesDataList, permissionStatus, setHomeData} = useCoordsData()

    const [data, setData] = useState()

    useEffect(()=>{
            setData(
                citiesDataList.map((eachData, index)=>{
                    const { cityName, weatherData, isDefault } = eachData
                    const {dateTimeString, temp, icon, description} = weatherData.currentWeatherData
                    const { temp:maxMintemp } = weatherData.dailyWeatherData[0]
                    const [maxTemp, minTemp] = [maxMintemp[0],maxMintemp[1]]
    
                    return { index, cityName, isDefault, dateTimeString, temp, icon, maxTemp, minTemp, description }
                })
            )
    },[citiesDataList])

    const handlePressed = (index) => {
        console.log(citiesDataList[index].weatherData.currentWeatherData.temp)
        setHomeData(citiesDataList[index])
        navigation.navigate('Home')
    }
    
    return (
        <View style={{flex:1}} >
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={{paddingBottom:20,}}
                    showsVerticalScrollIndicator={false}
                    data={data}//data
                    renderItem={({item})=><ListItem item={item} permissionStatus={permissionStatus} onPressedHandler={handlePressed}/>}
                    ItemSeparatorComponent={() => (
                        <View style={{ width: '100%', height: '0.5%', backgroundColor: 'grey' }} >
                        </View>
                    )}
                    keyExtractor={(item)=>item.index.toString()}
                />
                
            </View>
            <RefreshBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingLeft: '8%',
        paddingTop: StatusBar.currentHeight + 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    icon: {
        flexGrow: 0.3,
        // borderWidth: 1,
        // borderColor: 'black',
    },
    container: {
        marginVertical: '3%',
        borderWidth: 0.5,
        borderColor: 'grey',
        height: 'auto',
        borderRadius: 20,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        // paddingVertical: '8%',
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
    mainText: {
        fontSize: 20,
        textTransform:'capitalize',
    },
    subText: {
        color: 'grey'
    }
})