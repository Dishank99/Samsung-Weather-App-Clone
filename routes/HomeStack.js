import React from 'react'

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Home from '../screens/Home'
import Locations, { LocationScreenHeader } from '../screens/Locations'
import Search, { SearchScreenHeader } from '../screens/Search'

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
        navigationOptions:{headerShown:false},

    },
    Search: {
        screen: Search,
        navigationOptions:{headerShown:false}
        // navigationOptions: ({ navigation }) => {
        //     return {
        //         header: () => <SearchScreenHeader navigation={navigation} />
        //     }
        // }

    }
}

const StackNavigator = createStackNavigator(Screens)

export default createAppContainer(StackNavigator)
