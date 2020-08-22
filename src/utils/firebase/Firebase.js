import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/database'
import '@react-native-firebase/storage'
import '@react-native-firebase/messaging'

export const auth = firebase.auth()
export const database = firebase.database()
export const storage = firebase.storage()
export const messaging = firebase.messaging
export const currentUser = firebase.auth().currentUser
export default firebase