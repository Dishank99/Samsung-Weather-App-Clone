import React, { useState, useEffect, createContext, useContext } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '../services/asyncStorageService'
import Location from '../services/locationService'

const CoordsData = createContext()
export function useCoordsData(){
    return useContext(CoordsData)
}

export default function CoordsDataProvider({children}){

    const [defaultCoords, setDefaultCoords] = useState()
    const [permissionStatus, setPermissionStatus] = useState()
    const [citiesList, setCitiesList] = useState([])

    useEffect(()=>{
        // AsyncStorage.removeData('cities')
        // .then(()=>console.log('cleared'))

        AsyncStorage.getData('cities')
        .then(data=>{
            console.log('list retrieved from ansycstorage')
            setCitiesList(data)
            console.log(citiesList)
        })
        .catch(err=>{
            console.error(err.message)
        })
    },[])

    useEffect(()=>{
        AsyncStorage.putData('cities',citiesList)
        .then(()=>{
            console.log('list updated in ansycstorage')
            console.log(citiesList)
        })
        .catch(err=>{
            console.error(err.message)
        })
    },[citiesList])

    // const getDefaultCoords = async () => {
    //     const permission = await Location.checkForPermission()
    //     if(permission){
    //         setPermissionStatus(true)
    //         // get new coords and save then in storage
    //         const coords = await Location.getCurrentPositionCoords()
    //         if(coords){
    //             setDefaultCoords(coords)
    //             console.log('bkp')
    //             console.log(defaultCoords)
    //             await AsyncStorage.putData('defaultCoords', coords)
    //         }
    //     }
    //     else {
    //         setPermissionStatus(false)
    //         // get coords from storage
    //         const coords = await AsyncStorage.getData('defaultCoords')
    //         if (coords){
    //             setDefaultCoords(coords)
    //         }
    //         else{
    //             Alert.alert('Warning', 'Enable your Location')
    //         }
    //     }
    // }

    // useEffect(()=>{
    //     getDefaultCoords()
    // },[])

    const values = {
        defaultCoords,
        setDefaultCoords,
        permissionStatus,
        setPermissionStatus,
        citiesList, setCitiesList,
    }

    return(
        <CoordsData.Provider value={values}>
            {children}
        </CoordsData.Provider>
    )
} 
