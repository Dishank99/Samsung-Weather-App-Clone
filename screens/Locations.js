import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, StatusBar, FlatList, BackHandler } from 'react-native'
import CheckBox from '@react-native-community/checkbox';

import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import MenuModal from '../shared/MenuModal'
import ListItem from '../components/ListItem'
import RefreshBar from '../components/RefreshBar'
import { AntDesign } from '@expo/vector-icons';

import { useCoordsData } from '../context/CoordsData'
import LocationService from '../services/locationService'
import weatherDataForCoords from '../services/weatherService'
import { TouchableOpacity } from 'react-native-gesture-handler';


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

function DeleteSelectionHeader({areAllSelected}){

    const [checkBoxCurrentValue, setCheckBoxCurrentValue] = useState(false)
    const [noOfItemsSelected, setNoOfItemsSelected] = useState(0)

    useEffect(()=>{
        setCheckBoxCurrentValue(areAllSelected)
    },[areAllSelected])

    useEffect(()=>{
        if(checkBoxCurrentValue === true){
            setNoOfItemsSelected('All')
        }
        else{
            setNoOfItemsSelected(0)
        }
    },[checkBoxCurrentValue])

    const onMarkedHandler = (newMarkingValue) => {
        setCheckBoxCurrentValue(newMarkingValue)
        if(newMarkingValue === true){
            selectAll()
        }
        else{
            // deselectAll()
        }
    }

    return (
        <View style={styles.header}>
            <View style={{alignItems:'center'}}>
                <CheckBox
                    disabled={true}
                    value={checkBoxCurrentValue}
                    onValueChange={onMarkedHandler}
                    tintColors={{true:'#0CAFFF'}}
                    style={{borderWidth:5}}
                />
                <Text style={{fontSize:12}}>{noOfItemsSelected}</Text>
            </View>
            <Text style={{fontSize:20,flexGrow:1, marginLeft:15}}>{noOfItemsSelected} Selected</Text>
        </View>
    )
}

function DeleteFooter({onPress}){
    return (
        <TouchableOpacity onPress={()=>onPress()}>
            <View style={{paddingVertical:10, alignItems:'center'}}>
                <AntDesign name="delete" size={24} color="black" />
                <Text style={{fontSize:12}} >Delete</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function Location({navigation}) {
    
    const {citiesDataList, setCitiesDataList, permissionStatus, setHomeData} = useCoordsData()

    const [data, setData] = useState()

    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(()=>{
            setData(
                citiesDataList.map((eachData, index)=>{
                    const { cityName, weatherData, isDefault } = eachData
                    const {dateTimeString, temp, icon, description} = weatherData.currentWeatherData
                    const { temp:maxMintemp } = weatherData.dailyWeatherData[0]
                    const [maxTemp, minTemp] = [maxMintemp[0],maxMintemp[1]]
    
                    return { index, cityName, isDefault, dateTimeString, temp, icon, maxTemp, minTemp, description, isSelected:false }
                })
            )
    },[citiesDataList])

    const handlePressed = (index) => {
        console.log(citiesDataList[index].weatherData.currentWeatherData.temp)
        setHomeData(citiesDataList[index])
        navigation.navigate('Home')
    }
    
    const handleLongPress = () => {
        setIsDeleting(true)
    }

    const handleSelection = (index, value) => {
        let tempData = data
        tempData[index].isSelected=value
        console.log(tempData.map(eachData=>eachData.isSelected))
        setData(tempData)
    }

    const handleDeletion = () => {
        let indexesOfItemsToBeDeleted = new Set()
        data.forEach(eachDataItem=>{
            if(!eachDataItem.isDefault && eachDataItem.isSelected)
                indexesOfItemsToBeDeleted.add(eachDataItem.index)
        })
        console.log(indexesOfItemsToBeDeleted)

        setCitiesDataList(currentList => currentList.filter((eachListItem,index)=>{
            return !indexesOfItemsToBeDeleted.has(index)
        }))
        
    }

    return (
        <View style={{flex:1}} >
            {<LocationScreenHeader navigation={navigation} />}
            {/*isDeleting && <DeleteSelectionHeader areAllSelected={areAllSelected}/>*/}
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={{paddingBottom:10}}
                    showsVerticalScrollIndicator={false}
                    data={data}//data
                    renderItem={({item})=><ListItem
                                            item={item}
                                            permissionStatus={permissionStatus}
                                            onPressedHandler={handlePressed}
                                            onLongPressHandler={handleLongPress}
                                            isDeleting={isDeleting}
                                            selectionHandler={handleSelection}
                                        />}
                    ItemSeparatorComponent={() => (
                        <View style={{ width: '100%', height: '0.5%', backgroundColor: 'grey' }} >
                        </View>
                    )}
                    keyExtractor={(item)=>(item.index.toString()+item.isSelected.toString())}
                />
                
            </View>
            <View style={{position:'absolute',bottom:0,width:'100%'}} >
                <RefreshBar/>
                {isDeleting && <DeleteFooter onPress={handleDeletion}/>}
            </View>
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
        maxHeight:'92%',
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