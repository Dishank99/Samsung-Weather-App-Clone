import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import MenuModal from './MenuModal'

export default function Header(props) {
    const [menuVisible, setMenuVisible] = useState(false)
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={props.onPressLocation}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 17, marginRight: 5 }}>
                    Locations
                </Text>
            </TouchableOpacity>
            <AntDesign name='search1' size={20} color='white' style={styles.icon} onPress={props.onPressSearch} />
            <SimpleLineIcons name="options-vertical" size={16} color="white" style={[styles.icon, { marginBottom: 1 }]} onPress={() => setMenuVisible(true)} />
            <Modal transparent={true} visible={menuVisible} animationType='fade' presentationStyle='overFullScreen' >
                <TouchableWithoutFeedback style={{ flex: 1, height: '100%', width: '100%' }} onPress={() => setMenuVisible(false)}>
                    <View style={{ backfaceVisibility: 'hidden', flex: 1 }} >
                        <MenuModal items={[{ title: 'Settings' }, { title: 'Report wrong city name' }, { title: 'Contact Us' }]} />
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        height: '5%',
        // height: '9%',
        width: '100%',
    },
    icon: {
        marginLeft: 20,
    }
})