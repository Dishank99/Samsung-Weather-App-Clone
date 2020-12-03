import React, { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { useCoordsData } from '../context/CoordsData'

export default function RefreshBar() {

    const {computeCitiesData, setCitiesDataList} = useCoordsData()

    const [loading, setLoading] = useState(false)

    const handleRefresh = () => {
        setLoading(true)
        computeCitiesData()
        .then(updatedData=>{
            setCitiesDataList(updatedData)
            setLoading(false)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Weather App</Text>
            {loading?<ActivityIndicator size='small' color='white' />:
            <Ionicons name="md-refresh" size={26} color="white" onPress={handleRefresh} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        bottom:0,
        zIndex:3,
        backgroundColor:'lightgrey',
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:50,
        paddingVertical:7,
    },
    title:{
        width:'100%',
        textAlign:'center',
        fontSize:16,
        color:'white',
    }
})
