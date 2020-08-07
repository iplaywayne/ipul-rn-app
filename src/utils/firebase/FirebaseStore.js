import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/database'

export const auth = firebase.auth()
export const database = firebase.database()
export const currentUser = firebase.auth().currentUser
export default firebase