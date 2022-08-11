import AsyncStorage from '@react-native-community/async-storage'

export const saveTasks = async map => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(Array.from(map)))
  } catch (error) {
    console.log('error occurred from saveTasks:', JSON.stringify(error))
  }
}

export const getTasks = async () => {
  try {
    return await AsyncStorage.getItem('tasks')
  } catch (err) {
    console.log('error occurred from getTasks: ', JSON.stringify(err))
  }
}

export const getImage = async () => {
  try {
    return await AsyncStorage.getItem('profilePic')
  } catch (err) {
    console.log('error occurred from getImage: ', JSON.stringify(err))
  }
}

export const saveImage = async source => {
  try {
    return await AsyncStorage.setItem('profilePic', JSON.stringify(source))
  } catch (err) {
    console.log('error occurred from getImage: ', JSON.stringify(err))
  }
}
