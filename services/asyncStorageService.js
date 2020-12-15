import AsyncStorage from '@react-native-async-storage/async-storage';

async function getData(key){
    return AsyncStorage.getItem(key)
    .then((result) => {
        if (result) {
            try {
                console.log('logging from asyncstorage',result)
                result = JSON.parse(result);
                return result;
            } catch (e) {
                throw new Error(e)
            }
        }
        // else{
        //     result = null
        // }
        // return result;
    })
    .catch(err=>{
        console.error(err.message)
        err.name = 'StorageGetError'
        err.message = 'Could not retrieve data'
        throw err
    })
        
}

function putData(key, data){
    try{
        return AsyncStorage.setItem(key, JSON.stringify(data))
    }catch(err){
        console.error('AS set',err.message)
        err.name = 'StoragePutError'
        err.message = 'Could not update Storage'
        throw err
    }
}

function removeData(key){
    try{
        return AsyncStorage.removeItem(key)
    }catch(err){
        console.error('AS remove',err.message)
    }
}

export default { getData, putData, removeData }