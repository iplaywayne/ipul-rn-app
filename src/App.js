import 'react-native-gesture-handler';
import React from 'react';
import {
  View, Text, TextInput, Button, TouchableOpacity, Image, ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen/SplashScreen'
import { SignIn as SignInScreen } from './screens/SignIn'
import { SignUp as SignUpScreen } from './screens/SignUp'
import TabNavigator from './components/Navigation/TabNavigator'

import { Store, useStore } from './utils/store'
import { Center } from './components/Center'
import AuthProvider, { useAuth } from './contexts/AuthContext'


const AuthStack = createStackNavigator();


export default function () {
  const [authState, authDispatch] = useAuth()
  const { isLoading, userToken } = authState
  if (isLoading) return <Center><ActivityIndicator color='darkgray' /></Center>

  return (
    <NavigationContainer>

      {userToken == null ?
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
        </AuthStack.Navigator> :

        <TabNavigator />

      }
    </NavigationContainer>
  )
}