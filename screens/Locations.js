import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, StatusBar, FlatList } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import MenuModal from '../shared/MenuModal'
import { MaterialIcons } from '@expo/vector-icons';


export function LocationScreenHeader(props) {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <View style={styles.header}>
            <Ionicons name="ios-arrow-back" size={24} color="black" style={styles.icon} onPress={() => props.navigation.goBack()} />
            <Text style={{ flexGrow: 2, fontSize: 20 }} >Locations</Text>
            <Ionicons name="ios-add" size={35} color="black" style={styles.icon} />
            <SimpleLineIcons name="options-vertical" size={16} color="black" style={styles.icon} onPress={() => setMenuVisible(true)} />
            <Modal transparent={true} visible={menuVisible} animationType='fade' presentationStyle='overFullScreen' >
                <TouchableWithoutFeedback style={{ flex: 1, height: '100%', width: '100%' }} onPress={() => setMenuVisible(false)}>
                    <View style={{ backfaceVisibility: 'hidden', flex: 1 }} >
                        <MenuModal items={[{ title: 'Edit' }, { title: 'Settings' }, { title: 'Contact Us' }]} />
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    )
}

export default function Location() {
    const DetailsCard = (props) => (
        <View style={styles.details__container}>
            <View style={styles.placeAndTime}>
                <Text style={styles.mainText}><MaterialIcons name="location-on" size={16} color="black" style={styles.icon} />Dombivli</Text>
                <Text style={styles.subText}>Maharashtra, India</Text>
                <Text style={styles.subText}>Sun 18 October 3:03 pm</Text>
            </View>
            <View style={styles.temp}>
                <Text style={styles.mainText}>32°</Text>
                <Text style={styles.subText}>33° / 25°</Text>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={[{ key: '1' }, { key: '2' }, { key: '3' }]}//data
                renderItem={DetailsCard}
                ItemSeparatorComponent={() => (
                    <View style={{ width: '100%', height: '0.5%', backgroundColor: 'grey' }} >
                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingLeft: '8%',
        paddingTop: StatusBar.currentHeight + 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    icon: {
        flexGrow: 0.3,
        // borderWidth: 1,
        // borderColor: 'black',
    },
    container: {
        marginVertical: '3%',
        borderWidth: 0.5,
        borderColor: 'grey',
        height: 'auto',
        borderRadius: 20,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        // paddingVertical: '8%',
    },
    details__container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '1%',
        paddingVertical: '3%',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    placeAndTime: {
        width: 'auto',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    temp: {
        width: 'auto',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'black',
    },
    mainText: {
        fontSize: 20
    },
    subText: {
        color: 'grey'
    }
})