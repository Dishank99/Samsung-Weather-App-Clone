import React, {useState} from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchInput({navigation, handleSubmitEditting}) {

    const [inputText, setInputText] = useState()

    return (
        <View style={styles.container} >
            <Ionicons name="ios-arrow-back" size={24} color="black" style={styles.icon} onPress={() => navigation.goBack()} />
            <TextInput
                placeholder='Search'
                style={styles.input}
                value={inputText}
                onChangeText={text=>setInputText(text)}
                onSubmitEditing={()=>handleSubmitEditting(inputText)}
            />
            {inputText?<MaterialIcons name="clear" size={24} color="black" onPress={() => setInputText()} />:<FontAwesome name="microphone" size={24} color="black" />}
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // borderWidth:1,
        // borderColor:'black',
        borderRadius:30,
        backgroundColor:'#E8E8E8',
        paddingHorizontal:'7%',
        paddingVertical:'2%',
    },
    input: {
        flex:1,
        marginHorizontal:'6%',
        fontSize:16,
    }
})
