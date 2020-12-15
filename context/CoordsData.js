import React, { useState, useEffect, createContext, useContext } from 'react'
import { Alert } from 'react-native'
import { ThemeColors } from 'react-navigation'
import AsyncStorage from '../services/asyncStorageService'
import Location from '../services/locationService'
import weatherDataForCoords from '../services/weatherService'
import * as Font from 'expo-font';

const CoordsData = createContext()
export function useCoordsData(){
    return useContext(CoordsData)
}

export default function CoordsDataProvider({children}){

    const [loading, setLoading] = useState(true)

    let customFonts = {
        'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
      };

    async function  _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        setLoading(false)
    }

    useEffect(()=>{
        _loadFontsAsync()
    },[])

    // const [currCoords, setCurrCoords] = useState()
    // const [currCityName, setCurrCityName] = useState()
    // const [currWeatherData, setCurrWeatherData] = useState()
    const [permissionStatus, setPermissionStatus] = useState(false)
    const [citiesDataList, setCitiesDataList] = useState()
    const [citiesList, setCitiesList] = useState()

    /* since i am not able to implement horizontal sliding view on home screen, i am defining a state that will hold the data to be displayed
       on home page and which can be manipulated from different screens so that user can choose a particular city's data to be displayed */
    const [homeData, setHomeData] = useState()

    const storeDataInCache = (citiesList, citiesDataList) => {
        console.log('log from storing block citiesList',citiesList)
        console.log('log from storing block citiesDataList',citiesDataList)
        if(citiesList && citiesDataList){
            AsyncStorage.putData('cachedCitiesList', citiesList)
            .then(()=>{
                return AsyncStorage.putData('cachedCitiesDataList',citiesDataList)
            })
            .then(()=>{
                console.log('data stored')
                AsyncStorage.getData('cachedCitiesDataList')
                .then(cachedCitiesDataList => {
                    console.log('log from storing block cachedCitiesDataList',cachedCitiesDataList)
                    return AsyncStorage.getData('citiesList')
                })
                .then(cachedCitiesList => {
                    console.log('log from storing block cachedCitiesList',cachedCitiesList)
                })
                .catch(err=>{
                    console.log('err is retriving data', err)
                })
            })
            .catch(err=>{
                console.error('err in storing data to storage',err)
            })
        }
    }

    const getCachedData = () => {
        let tempCitiesDataList = []
        let tempCitiesList = []
        AsyncStorage.getData('cachedCitiesDataList')
        .then(cachedCitiesDataList => {
            console.log('cachedCitiesDataList',cachedCitiesDataList)
            tempCitiesDataList = !cachedCitiesDataList?{}:cachedCitiesDataList
            return AsyncStorage.getData('citiesList')
        })
        .then(cachedCitiesList => {
            console.log('cachedCitiesList',cachedCitiesList)
            tempCitiesList = !cachedCitiesList?[]:cachedCitiesList
            setCitiesDataList(tempCitiesDataList)
            setCitiesList(tempCitiesList)
        })
        .catch(err=>{
            console.log('err is retriving data', err)
        })
    }

    const computeAppData = async () => {
        let tempCitiesDataList = []
        let tempCitiesList = []
        setLoading(true)
        computeCurrentLocationData()
        .then(currentLocationData=>{
            console.log('currentLocationData',currentLocationData)
            if(!currentLocationData)
                throw new Error({ name: 'LocationDataNotAccesed' })
            const { cityName } = currentLocationData
            const isCityPresentIndex = tempCitiesList.indexOf(cityName)
            if(isCityPresentIndex >= 0){
                tempCitiesList.splice(isCityPresentIndex)
            }
            tempCitiesList.unshift(cityName)
            return updateCitiesData(tempCitiesList, tempCitiesDataList)
        })
        .then(updatedCitiesDataList => {
            // storeDataInCache(tempCitiesList, updatedCitiesDataList)
            console.log('updatedCitiesDataList type',typeof updatedCitiesDataList)
            // console.log('updatedCitiesDataList',Object.keys(updatedCitiesDataList))
            console.log('updatedCitiesList',tempCitiesList)
            setCitiesDataList(updatedCitiesDataList)
            setCitiesList(tempCitiesList)
            setHomeData({cityName:tempCitiesList[0], ...updatedCitiesDataList[tempCitiesList[0]]})
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    const computeCurrentLocationData = async () => {
        const isPermissionGranted = await Location.checkForPermission()
        if(isPermissionGranted){
            setPermissionStatus(true)
            const coords = await Location.getCurrentPositionCoords()
            const cityName = await Location.getCityNameFromCoords(coords)
            return {coords, cityName}
            
        }
        return null
    }

    const computeDataForCity = async (cityName) => {
        try {
            console.log('returning promise for',cityName)
            const coordsFromCity = await Location.getCoordsFromCityName(cityName)
            console.log('reached here after retreiving locationdata for',cityName)
            const weatherData = await weatherDataForCoords(coordsFromCity)
            console.log('reached here after retreiving weatherdata for',cityName)
            return {coords: coordsFromCity, weatherData}
        }catch(err){throw new Error(err)}
    }

    const updateCitiesData = async (citiesList, citiesDataList) => {
        if(!citiesList || !citiesDataList)
            return []
        for(let i = 0; i < citiesList.length; i++){
            // console.log('cities of citiesDataList',Object.keys(citiesDataList))
            citiesDataList[citiesList[i]] = await computeDataForCity(citiesList[i])
            // console.log('citiesDataList[citiesDataList[i]]',citiesDataList)
        }

        return citiesDataList
    }

    const computeCitiesData = async (citiesDataList) => {
        // method for updating weatherData for cities keeping other params same
        if(!citiesDataList)
            return
        
        let tempList = citiesDataList
        for(let i=0;i<tempList.length;i++){
            const data = await computeDataForCity(tempList[i].cityName)
            console.log(Object.keys(tempList[i]))
            tempList[i].weatherData = data
        }
        return tempList
    }

    useEffect(()=>{
        // AsyncStorage.removeData('cachedCitiesList')
        // .then(()=>{
        //     return AsyncStorage.removeData('cachedCitiesDataList')
        // })
        // .then(()=>{

        // })
        // .catch(err=>{
        //     console.log(err)
        // })
        getCachedData()
    },[])

    // useEffect(()=>{
    //     storeDataInCache(citiesList, citiesDataList)
    // },[citiesList, citiesDataList])

    const values = {
        permissionStatus,
        setPermissionStatus,
        citiesList, setCitiesList,
        citiesDataList, setCitiesDataList,
        computeCitiesData,
        updateCitiesData,
        homeData, setHomeData,
        computeAppData,
        storeDataInCache,
        loading, setLoading,
    }

    return(
        <CoordsData.Provider value={values}>
            {(citiesDataList && citiesList) && children}
        </CoordsData.Provider>
    )
} 
