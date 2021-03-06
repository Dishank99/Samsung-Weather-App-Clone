import React, { useState, useEffect, createContext, useContext } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '../services/asyncStorageService'
import Location from '../services/locationService'
import weatherDataForCoords from '../services/weatherService'


import {AppLoading} from 'expo'

const CoordsData = createContext()
export function useCoordsData(){
    return useContext(CoordsData)
}

export default function CoordsDataProvider({children}){

    /**
     * CitiesDataList pattern
     * CitiesDataList = [
     *      {
     *          cityName:'',
     *          weatherData:{
     *                          currentWeatherData:<data>,
     *                          dailyWeatherData:<data>,
     *                          hourlyWeatherData:<data>,
     *                      }
     *      }
     * ]
     */

    // const [currCoords, setCurrCoords] = useState()
    // const [currCityName, setCurrCityName] = useState()
    // const [currWeatherData, setCurrWeatherData] = useState()
    const [permissionStatus, setPermissionStatus] = useState()
    const [citiesDataList, setCitiesDataList] = useState([])
    const [loading, setLoading] = useState(true)

    /* since i am not able to implement horizontal sliding view on home screen, i am defining a state that will hold the data to be displayed
       on home page and which can be manipulated from different screens so that user can choose a particular city's data to be displayed */
    const [homeData, setHomeData] = useState()

    

    

    const computeAppData = () => {
        let tempData = []
        let currCityName = ''
        let currCoords = {}
        let currWeatherData = {}
        
        setLoading(true)
        // AsyncStorage.removeData('citiesData')
        // .then(()=>{
        //     console.log('cleared')
        //     return AsyncStorage.getData('citiesData')
        // })
        AsyncStorage.getData('citiesData')
        .then(data=>{
            // getting data from storage
            console.log('datalist retrieved from ansycstorage')
            const dataToBeLogged = data.map((currItem)=>currItem.cityName)
            console.log('loggging from storage getdata',dataToBeLogged)
            setHomeData(data[0])
            tempData = data
            if(citiesDataList) return computeCitiesData(data)
        })
        .then(updatedData=>{
            // updating the weather data and replacing
            if(updatedData){
                console.log('datalist updated',updatedData.map(data=>data.cityName)) 
                tempData = updatedData
            }
            return Location.checkForPermission()
        })
        .then(gotPermission=>{
            //getting location permission
            setPermissionStatus(gotPermission)
            if(gotPermission){
                return Location.getCurrentPositionCoords()
            }
        })
        .then(coords=>{
            // getting city from location
            currCoords = coords
            console.log(coords)
            console.log('currCoords value',currCoords)
            return Location.getCityNameFromCoords(coords)
        })
        .then(cityName=>{
            //main logic
            console.log(cityName)
            currCityName = cityName.trim().toLowerCase()
            console.log('currCityName value',currCityName)
            // make default cond false for each entry so that when current location is accessed then new default will be marked
            tempData.forEach(eachData=>{
                eachData.isDefault=false
            })
            console.log('tempData from checking present city block 2', tempData.map(data=>[data.cityName, data.isDefault]))
            const resultIndex = tempData.length>0?tempData.findIndex(cityData => cityData.cityName === currCityName):-1
            console.log('resultIndex',resultIndex)
            if(resultIndex>=0){
                // if city already present then replace it and more to top
                const dataToBePushed = tempData[resultIndex]
                tempData.splice(resultIndex,1)
                tempData.unshift(dataToBePushed)
                tempData[0].isDefault = true
                setHomeData(tempData[0])
                setCitiesDataList(tempData)

            }
            else{
                // if city not present in list
                weatherDataForCoords(currCoords)
                .then(data=>{
                    // setCurrWeatherData(data)
                    currWeatherData = data
                    const dataToBePushed = {cityName: currCityName, coords: currCoords, weatherData: currWeatherData, isDefault:true}
                    console.log('tempData in last then block', tempData.map(data=>[data.cityName, data.isDefault]))
                    if(tempData){
                        tempData.unshift(dataToBePushed)
                    }
                    else{
                        tempData = [dataToBePushed]
                    }
                    
                    setHomeData(tempData[0])
                    setCitiesDataList(tempData)
                    
                    console.log('reached here after updating default in list')
                })
                .catch(err=>{
                    throw new Error(err)
                })
            }
        })
        .catch(err=>{
            Alert.alert('Error', err.message)
            console.error('err in location code of useEffect of coordsdata.js',err)
        })
        .finally(()=>{
            // setHomeData(tempData[0])
            // setCitiesDataList(tempData)
            setLoading(false)
        })
        // if(tempData){
        //     setCitiesDataList(tempData)
        //     setHomeData(tempData[0])
        // }
    }

    

    useEffect(()=>{
        // for updating storage evey time list is changed
        if(citiesDataList){
            console.log('citiesDataList CHANGED')
            AsyncStorage.putData('citiesData',citiesDataList)
            .then(()=>{
                console.log('list updated in ansycstorage')
                AsyncStorage.getData('citiesData')
                .then(data=>{
                    const dataToBeLogged = data.map((currItem)=>currItem.cityName)
                    console.log('logging from storage put data',dataToBeLogged)
                })
            })
            .catch(err=>{
                console.error('storage putdata error',err.message)
            })
        }
    },[citiesDataList])

    const computeDataForCity = async (cityName) => {
        try {
            console.log('returning promise for',cityName)
            const coordsFromCity = await Location.getCoordsFromCityName(cityName)
            console.log('reached here after retreiving locationdata for',cityName)
            const weatherData = await weatherDataForCoords(coordsFromCity)
            console.log('reached here after retreiving weatherdata for',cityName)
            // const {temp, dateTimeString, icon} = weatherData.currentWeatherData
            // const { temp:maxMintemp } = weatherData.dailyWeatherData[0]
            // const data = {cityName, dateTimeString, icon, temp, maxTemp:maxMintemp[0], minTemp:maxMintemp[1]}
            // return data
            // console.log({cityName, weatherData})
            return weatherData
        }catch(err){throw new Error(err)}
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

    const values = {
        permissionStatus,
        setPermissionStatus,
        citiesDataList, setCitiesDataList,
        computeCitiesData,
        homeData, setHomeData,
        computeAppData,
        loading,
    }

    return (
        <CoordsData.Provider value={values}>
            { citiesDataList && children}
        </CoordsData.Provider>
    )
} 
