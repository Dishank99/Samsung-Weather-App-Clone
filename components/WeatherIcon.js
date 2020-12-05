import React from 'react'
import { Image } from 'react-native'

export default function WeatherIcon({size, code}) {
    
    return (
        <Image
            style={{ width:size, height:size }}
            source={{
                uri: `https://openweathermap.org/img/wn/${code}@2x.png`
            }}
        />
    )
}
