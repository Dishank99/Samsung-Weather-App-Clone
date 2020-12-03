/**
 * get api current details
 * get hourly details
 * get daily details
 */

const APIKEY = '50e1c7a484b69e920467b0ea866e1a9c'

var data = null

function getDateTimeFromDt(dt){
    dt = dt * 1000
    // console.log('converted for datetime')
    const dateTime = new Date(dt)
    return {
        getOnlyDate: () => {
            const date = dateTime.toDateString()
            return date
        },
        getOnlyTime: () => {
            let time = dateTime.toLocaleTimeString()
            let [hr, min, _] = time.split(':')
            let meri = 'AM'
            if(hr>=12){
                meri = 'PM'
            }
            if(hr>12){
                hr = hr - 12
            }

            time = `${hr}:${min} ${meri}`
            return time
        }
    }
}

async function fetchWeatherData ({latitude, longitude}){
   // fetches weather data from api
   const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${APIKEY}`
   const response = await fetch(URL)
   const data = await response.json()
   console.log('called')
   // console.log(data)
   return data
}

function getCurrentWeatherData(data){
    const {current} = data
    // console.log(current)
    let { dt, temp, feels_like, uvi, clouds, weather } = current
    const { main } = weather[0]

    const dateTime = getDateTimeFromDt(dt)
    const date = dateTime.getOnlyDate()
    const time = dateTime.getOnlyTime()
    const dateTimeString = date+' '+ time
    // console.log(dateTimeString)
    temp = Math.round(temp - 273.15)
    feels_like = Math.round(feels_like - 273.15)
    uvi = uvi>=3&&uvi<=11?'Moderate':uvi>11?'High':'Low'
    const precipitation = `${clouds}%`
    const description = main
    
    // console.log('current data',{dateTimeString, temp, feels_like, uvi, precipitation, description})
    return {dateTimeString, temp, feels_like, uvi, precipitation, description}
}

function getHourlyWeatherData(data){
    const { hourly } = data
    // console.log(hourly)

    const hourlyData =  hourly.map((forEachHour, index) => {
        let { dt, temp, weather } = forEachHour
        const { main } = weather[0]
        const description = main
        const dateTime = getDateTimeFromDt(dt)
        const timeString = dateTime.getOnlyTime()
        const dateTimeString = dateTime.getOnlyDate() + ' ' + dateTime.getOnlyTime()
        return { dateTimeString, timeString, description, temp:Math.round(temp-273.15), key: index.toString() }
    })
    // console.log(hourlyData)
    return hourlyData

}

function getDailyWeatherData(data){
    const { daily } = data
    const dailyData =  daily.map((forEachDay, index) => {
        let { dt, temp, weather } = forEachDay
        const { main } = weather[0]
        const description = main
        const dateTime = getDateTimeFromDt(dt)
        const dayString = dateTime.getOnlyDate().split(' ')[0]
        const dateTimeString = dateTime.getOnlyDate() + ' ' + dateTime.getOnlyTime()
        const {max, min} = temp
        temp = new Array(Math.round(max-273.15), Math.round(min-273.15))
        return { dateTimeString, dayString, description, temp, key: index.toString() }
    })
    // console.log(hourlyData)
    return dailyData
}

export default async function weatherDataForCoords(coords){
    const data = await fetchWeatherData(coords)
    return {
        currentWeatherData: getCurrentWeatherData(data),
        hourlyWeatherData: getHourlyWeatherData(data),
        dailyWeatherData: getDailyWeatherData(data),
    }
    // return {
    //     getCurrentWeatherData, getHourlyWeatherData, getDailyWeatherData
    // }
}

// export {fetchWeatherData, getCurrentWeatherData, getHourlyWeatherData, getDailyWeatherData}