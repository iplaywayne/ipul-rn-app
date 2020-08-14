import 'react-native-gesture-handler';
import React from 'react';
import {
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
import TabNavigator from './components/Navigation/TabNavigator'
import { Store, useStore } from './utils/store'
import { Center } from './components/Center'
import AuthProvider, { useAuth } from './contexts/AuthContext'


const AuthStack = createStackNavigator();

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
    const usrRef = firebase.database().ref(`users/`)
    usrRef.on('value', snap => {
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
        }, 1000)
      }
    })
  }

  if (user && !('name' in user)) return <Center>
    <Text style={{ fontWeight: '700', fontSize: 25, marginBottom: 10 }}>Create Username</Text>
    <View style={{ width: 300, alignItems: 'center' }}>
      <Input
        placeholder="Enter your unique Username"
        right
        icon="check"
        family="antdesign"
        iconSize={14}
        iconColor="green"
        placeholderTextColor={'#121212'}
        onChange={e => setNewUserName(e.nativeEvent.text)}
      />
      <Button
        style={{ fontSize: 15, color: 'white', width: '100%' }}
        containerStyle={{
          padding: 10, marginTop: 25, height: 40, width: 150,
          overflow: 'hidden', borderRadius: 5, backgroundColor: '#121212'
        }}
        disabledContainerStyle={{ backgroundColor: '#ddd' }}
        onPress={handleCreateName}
      >
        {loading ? <ActivityIndicator /> : 'Continue'}
      </Button>
    </View>
  </Center>


  return (
    <NavigationContainer>

      {userToken === null ?
        <AuthStack.Navigator>
          <AuthStack.Screen name="SplashScreen" component={SplashScreen} options={{
            headerShown: false,
            animationTypeForReplace: userToken ? 'pop' : 'push'
          }} />
          <AuthStack.Screen name="Sign In" component={SignInScreen} options={{
            headerShown: false,
            animationTypeForReplace: userToken ? 'pop' : 'push'
          }} />
          <AuthStack.Screen name="Sign Up" component={SignUpScreen} options={{
            // headerShown: false,
            animationTypeForReplace: userToken ? 'pop' : 'push'
          }} />
        </AuthStack.Navigator>

        :

        <TabNavigator />

      }
    </NavigationContainer>
  )
}

export default App