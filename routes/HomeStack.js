import React from 'react'

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Home from '../screens/Home'
import Locations, { LocationScreenHeader } from '../screens/Locations'
import Search from '../screens/Search'

const Screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
            // gestureEnabled: false,
            cardStyle: { backgroundColor: 'transparent' }
        },
    },
    Locations: {
        screen: Locations,
        navigationOptions: ({ navigation }) => {
            return {
                header: () => <LocationScreenHeader navigation={navigation} />
            }
        }

    },
    Search: {
        screen: Search
    }
}

const StackNavigator = createStackNavigator(Screens)

export default createAppContainer(StackNavigator)
