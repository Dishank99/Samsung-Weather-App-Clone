import React, { useState, useEffect, createContext, useContext } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '../services/asyncStorageService'
import Location from '../services/locationService'
import weatherDataForCoords from '../services/weatherService'

const CoordsData = createContext()
export function useCoordsData(){
    return useContext(CoordsData)
}

export default function CoordsDataProvider({children}){

    const [defaultCoords, setDefaultCoords] = useState()
    const [permissionStatus, setPermissionStatus] = useState()
    const [citiesDataList, setCitiesDataList] = useState([])

    useEffect(()=>{
        // AsyncStorage.removeData('cities')
        // .then(()=>console.log('cleared'))

        AsyncStorage.getData('citiesData')
        .then(data=>{
            console.log('datalist retrieved from ansycstorage')
            setCitiesDataList(data)
            console.log(citiesDataList)
            return computeCitiesData()
        })
        .then(updatedData=>{
            console.log('datalist updated')
            updatedData && setCitiesDataList(updatedData)
        })
        .catch(err=>{
            console.error(err.message)
        })
    },[])

    // useEffect(()=>{
    //     AsyncStorage.putData('citiesData',citiesDataList)
    //     .then(()=>{
    //         console.log('list updated in ansycstorage')
    //         console.log(citiesDataList)
    //     })
    //     .catch(err=>{
    //         console.error(err.message)
    //     })
    // },[citiesList])

    const computeDataForCity = async (cityName) => {
        try {
            console.log('returning promise for',cityName)
            const coordsFromCity = await Location.getCoordsFromCityName(cityName)
            console.log('reached here after retreiving locationdata for',cityName)
            const weatherData = await weatherDataForCoords(coordsFromCity)
            console.log('reached here after retreiving weatherdata for',cityName)
            const {temp, dateTimeString, icon} = weatherData.currentWeatherData
            const { temp:maxMintemp } = weatherData.dailyWeatherData[0]
            const data = {cityName, dateTimeString, icon, temp, maxTemp:maxMintemp[0], minTemp:maxMintemp[1]}
            return data
        }catch(err){throw new Error(err)}
    }

    const computeCitiesData = async () => {
        let arrOfResponses = []
        if(!citiesDataList)
            return
        for(let i=0;i<citiesDataList.length;i++){
            const data = await computeDataForCity(citiesDataList[i].cityName)
            arrOfResponses.push(data)
        }
        return arrOfResponses
    }

    const values = {
        defaultCoords,
        setDefaultCoords,
        permissionStatus,
        setPermissionStatus,
        citiesDataList, setCitiesDataList,
        computeCitiesData,
    }

    return(
        <CoordsData.Provider value={values}>
            {children}
        </CoordsData.Provider>
    )
} 
