/**
 * gets the coords
 * gets the reverse geocode for coords
 * ! only city is important
 */

import * as Location from 'expo-location'

async function checkForPermission (){
    //checks for permission if not then gets it
    const { status } = await Location.requestPermissionsAsync()
    return status === 'granted' ? true : false
}

async function getCurrentPositionCoords () {
    //get the latitude and longitude for current location
    const loc = await Location.getCurrentPositionAsync()
    return { latitude: loc.coords.latitude, longitude: loc.coords.longitude }
}

async function getCityNameFromCoords(coords) {
    const reverseGeoCode = await Location.reverseGeocodeAsync(coords)
    const { city } = reverseGeoCode[0]
    return city
}

async function getCoordsFromCityName(city){
    try{
        const geocode = await Location.geocodeAsync(city)
        const {latitude, longitude} = geocode[0]
        return {latitude, longitude}
    }catch(err){
        throw new Error('City not Present')
    }
}

export default { checkForPermission, getCurrentPositionCoords, getCityNameFromCoords,getCoordsFromCityName }