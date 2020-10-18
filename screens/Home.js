import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header'
import LocationHeader from '../components/LocationHeader'
import CurrentWeatherDetails from '../components/CurrentWeatherDetails'
import { MaterialIcons } from '@expo/vector-icons';

export default function Home(props) {
    const [visible, setVisible] = useState()

    const handleScroll = (e) => {
        const inset = e.nativeEvent.contentInset
        const offset = e.nativeEvent.contentOffset
        const contentSize = e.nativeEvent.contentSize
        const layoutMeasurement = e.nativeEvent.layoutMeasurement
        // console.log(inset.top, inset.bottom, inset.right, inset.left)
        console.log(offset.x, offset.y)
        // console.log(contentSize.height, contentSize.width)
        // console.log(layoutMeasurement.height, layoutMeasurement.width)
        !offset.y && setVisible()
    }

    // useEffect((),[])

    return (
        <View style={styles.home}>
            <Header
                onPressLocation={() => props.navigation.push('Locations')}
                onPressSearch={() => props.navigation.push('Search')}
            />
            <View style={styles.header}>
                <MaterialIcons name="location-on" size={20} color="white" style={styles.icon} />
                <Text style={styles.title}>
                    Dombivli
            </Text>
            </View>
            <Text style={
                [
                    { color: 'darkgrey', zIndex: 3, fontSize: 18 },
                    visible === 'none' ? { display: 'none' } : { display: 'flex' }
                ]
            } > Sat 17 October 7:12 pm </Text>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}
                onScrollBeginDrag={() => setVisible('none')}
                onScrollEndDrag={handleScroll}>
                <CurrentWeatherDetails />
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        marginTop: '3%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        width: '100%',
        paddingVertical: '4%',
    },
    icon: {
        marginHorizontal: 7,
    },
    title: {
        fontSize: 20,
        color: 'white',
        paddingTop: 5,
    },
})
