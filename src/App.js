import 'react-native-gesture-handler';
import React from 'react';
import {
  LogBox,
  View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Spinner from 'react-native-spinkit'
import PropTypes from 'prop-types'
import { Input, Block } from 'galio-framework';


import Button from 'react-native-button'
import { firebase } from './utils/firebase'
import SplashScreen from './screens/SplashScreen/SplashScreen'
import { SignIn as SignInScreen } from './screens/SignIn'
import { SignUp as SignUpScreen } from './screens/SignUp'
import { Store, useStore } from './utils/store'
import { Center } from './components/Center'
import AuthProvider, { useAuth } from './contexts/AuthContext'
import AuthStack from './components/Navigation/AuthStack'
import AppNavigator from './components/Navigation/AppNavigator'
import ExploreNavigator from './components/Navigation/ExploreNavigator'


const DopeStack = createStackNavigator()


App.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  })
}

function App() {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { user, isLoading, userToken } = authState
  const [newUserName, setNewUserName] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  if (isLoading) return <Center><Spinner type='Wave' /></Center>

  const handleCreateName = () => {
    const isValid = /^(?:[A-Za-z]+|\d+)$/.test(newUserName);

    if (!isValid) {
      Alert.alert('Incorrect Username characters, try again')
      return
    }
    if (!newUserName) {
      Alert.alert('Please complete the form to continue')
      return
    }

    const usrRef = firebase.database().ref(`users/`)
    usrRef.once('value', snap => {
      let list = []
      snap.forEach(child => {
        if (child.val().name === newUserName) {
          list.push(child.val())
          setTimeout(() => {
            Alert.alert('This Username exists. Try again')
          }, 1000)
        }
      })
      if (!list.length) {
        setTimeout(() => {
          Alert.alert('This username is available')
          const usrRef = firebase.database().ref(`users/${user.uid}`)
          usrRef.update({
            name: newUserName
          })
          storeDispatch.setUser({ ...user, name: newUserName })
        }, 1000)
      }
    })
  }

  const DopeStackNavigator = () => (
    <DopeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <DopeStack.Screen name='Profile' component={AppNavigator} />
      <DopeStack.Screen name='DEMO' component={SplashScreen} />
    </DopeStack.Navigator>
  )

  return (
    <NavigationContainer>

      {userToken === null ?
        <AuthStack userToken={userToken} />
        :
        <AppNavigator />}

    </NavigationContainer>
  )
}

export default App