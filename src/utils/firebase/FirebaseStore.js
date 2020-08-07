import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'

export const auth = firebase.auth()
export const currentUser = firebase.auth().currentUser
export default firebase