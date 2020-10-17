import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

export default function MenuModal(props) {
    return (

        <View style={styles.menu__container}>
            {props.items.map(item => <Text key={Date.now()} style={styles.menu__item} >{item.title}</Text>)}
        </View>

    )
}

const styles = StyleSheet.create({
    menu__container: { width: 'auto', zIndex: 3, alignSelf: 'flex-end', marginTop: StatusBar.currentHeight + 2, paddingHorizontal: '6%', paddingVertical: '2%', backgroundColor: 'white', elevation: 3, borderRadius: 20 },
    menu__item: { marginVertical: '3%', fontSize: 17 },
})
