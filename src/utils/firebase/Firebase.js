import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/database'
import '@react-native-firebase/storage'

export const auth = firebase.auth()
export const database = firebase.database()
export const storage = firebase.storage()
export const currentUser = firebase.auth().currentUser
export default firebase