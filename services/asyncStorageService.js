import { AsyncStorage } from 'react-native'

async function getData(key){
    return AsyncStorage.getItem(key)
    .then((result) => {
        if (result) {
            try {
                result = JSON.parse(result);
            } catch (e) {
                throw new Error(e)
            }
        }
        else{
            result = null
        }
        return result;
    })
    .catch(err=>console.error(error.message))
        
}

async function putData(key, data){
    try{
        await AsyncStorage.setItem(key, JSON.stringify(data))
    }catch(err){
        console.error('AS set',err.message)
    }
}

async function removeData(key){
    try{
        await AsyncStorage.removeItem(key)
    }catch(err){
        console.error('AS remove',err.message)
    }
}

export default { getData, putData, removeData }