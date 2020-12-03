import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, StatusBar, FlatList } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';

import SearchInput from '../components/SearchInput'
import CityDetailBlock from '../components/CityDetailBlock'
import Map from '../components/Map'

import { useCoordsData } from '../context/CoordsData'
import Location from '../services/locationService'
import weatherDataForCoords from '../services/weatherService'
import { Children } from 'react';

// import cityList from '../city_list.json'

const getCities = () => {
    let data = null
    return new Promise((resolve, reject)=>{
        try{
            data = JSON.parse(cityList)
            resolve(data)
        } catch (err){
            reject(err.message)
        }
    })
}

export function SearchScreenHeader(props) {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <View style={styles.header}>
            <SearchInput navigation={props.navigation}/>
            <MaterialIcons name="gps-fixed" size={24} color="black" style={styles.icon} />
        </View>
    )
}

function SuggestionList(props){

    // const suggestions = [
    //     {title:'Dombivli',key:'1'},
    //     {title:'Dombivli',key:'2'},
    //     {title:'Dombivli',key:'3'},
    //     {title:'Dombivli',key:'4'},
    //     {title:'Dombivli',key:'5'},
    //     {title:'Dombivli',key:'6'},
    //     {title:'Dombivli',key:'7'},
    //     {title:'Dombivli',key:'8'},
    //     {title:'Dombivli',key:'9'},
    //     {title:'Dombivli',key:'10'},
    //     {title:'Dombivli',key:'11'},
    //     {title:'Dombivli',key:'12'},
    //     {title:'Dombivli',key:'13'},
    //     {title:'Dombivli',key:'14'},
    //     {title:'Dombivli',key:'15'},
    // ]
    return(
        <View style={{flex:1, paddingHorizontal:'5%'}}>
            <View style={{flex:1}}>
                <FlatList
                    data = {props.suggestions}
                    renderItem={({item})=>(
                        <View style={{paddingVertical:'5%', paddingLeft:'2%'}}>
                            <Text style={{fontSize:18}} >{item.name}</Text>
                        </View>        
                    )}
                    keyExtractor={(item)=>item.id}
                    ItemSeparatorComponent={()=>(
                        <View style={{alignSelf:'center', width:'95%', backgroundColor:'lightgrey', height:'1%'}}></View>
                    )}
                />
            </View>
        </View>
    )
}

export default function Search(props) {

    // const [cities, setCities] = useState()
    // const [suggestions, setSuggestions] = useState()

    // useEffect(()=>{
    //     getCities()
    //     .then(data=>{
    //         setCities(data)
    //     })
    //     .catch(errMessage=>{
    //         console.log(errMessage)
    //     })
    // },[])

    // useEffect(()=>{
    //     setSuggestions(cities.filter(city => city.name.indexOf(inputText)>=0))
    // },[inputText])

    const {defaultCoords} = useCoordsData()
    const [coords, setCoords] = useState({latitude:19.2094, longitude:73.0939})
    const [weatherData, setWeatherData] = useState()
    const [city, setCity] = useState()

    useEffect(()=>{
        console.log(coords.latitude, coords.longitude)
    },[coords])

    useEffect(()=>{
        console.log('component rendered')
    })

    const handleSubmitEditting = (inputText) => {
        let tempCoords = null
        let tempCity = null
        console.log(inputText)
        Location.getCoordsFromCityName(inputText)
        .then(coordsFromCity=>{
            // console.log(coordsFromCity)
            // setCoords(coordsFromCity)
            // tempCoords = coordsFromCity
            // tempCity = inputText
            setCity(inputText.trim().toLowerCase())
            setCoords(coordsFromCity)
            return weatherDataForCoords(coords)
        })
        .then(data=>{
            const { dateTimeString, temp} = data.currentWeatherData
            const { temp:maxMintemp } = data.dailyWeatherData[0]
            setWeatherData({dateTimeString, temp, maxTemp:maxMintemp[0], minTemp:maxMintemp[1]})
            // setCoords(tempCoords)
            // setCity(tempCity)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // useEffect(()=>{
    //     if(inputText)
    //         getCoords(inputText)
    // },[inputText])


    return (
        <View style={{flex:1}}>
            <View style={styles.header}>
                <SearchInput
                    navigation={props.navigation}
                    // value={inputText}
                    // onChangeText={text=>inputTextOnChangeHandler(text)}
                    handleSubmitEditting={handleSubmitEditting}
                />
                <MaterialIcons name="gps-fixed" size={24} color="black" style={styles.icon} />
            </View>
            <View style={styles.container}>
                {/*inputText?<SuggestionList suggestions={suggestions}/>:
        <Map coords={{latitude: 19.219575,longitude: 73.089757}} />*/}
                <Map coords={coords} />
                {city && weatherData && <CityDetailBlock city={city} weatherData={weatherData}/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight + 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    icon: {
        flexGrow:0.1,
        // paddingHorizontal:'3%',
        textAlign:'center',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    container: {
        marginTop: '2%',
        // borderWidth: 0.5,
        // borderColor: 'grey',
        // height: 'auto',
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        backgroundColor: 'white',
        flex:1,
        overflow:'hidden',
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
        fontSize: 20
    },
    subText: {
        color: 'grey'
    }
})