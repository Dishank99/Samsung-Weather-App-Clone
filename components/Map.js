import React, { useState, useEffect } from 'react'
import MapView from 'react-native-maps'

function Map({coords}) {

    // const [mapCoords, setMapCoords] = useState(coords)

    // console.log('prop', coords)
    // console.log(mapCoords.latitude !== coords.latitude || mapCoords.longitude !== coords.longitude)

    // useEffect(()=>{
    //     if(mapCoords.latitude !== coords.latitude || mapCoords.longitude !== coords.longitude)
    //         setMapCoords(coords)
    // },[coords])

    console.log('map',coords)
    
    return (
        <MapView style={{ flex:1 }} 
            initialRegion={{
            ...coords,
            latitudeDelta: 30,
            longitudeDelta: 30,
            }}
            key={ Date.now()}
        
            >
            <MapView.Marker
                key={ Date.now()}
                coordinate={coords}
                title={'You are Here'}
            />
        </MapView>
    )
}

export default React.memo(Map)