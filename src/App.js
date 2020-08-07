import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SignIn as SignInScreen } from './screens/SignIn'
import { SignUp as SignUpScreen } from './screens/SignUp'
import { Home as HomeScreen } from './screens/Home'
import { Explore as ExploreScreen } from './screens/Explore'
import SplashScreen from './screens/SplashScreen/SplashScreen'


import { Store, useStore } from './utils/store'
import { Center } from './components/Center'
import AuthProvider, { useAuth } from './contexts/AuthContext'


const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="Dashboard" component={HomeScreen} />
    <Drawer.Screen name="Explore" component={ExploreScreen} />
    <Drawer.Screen name="Media" component={ExploreScreen} />
    <Drawer.Screen name="Notifications" component={ExploreScreen} />
  </Drawer.Navigator>
)

const AppStackNavigator = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home" component={HomeScreen} options={{
      headerShown: false
    }} />
    <AppStack.Screen name="Explore" component={ExploreScreen} options={{
      headerShown: false
    }} />
  </AppStack.Navigator>
)

export default function () {
  const [authState, authDispatch] = useAuth()
  const { isLoading, userToken } = authState



  if (isLoading) {
    return <Center><Text>Loading . .</Text></Center>
  }

  return (
    <NavigationContainer>
      {userToken == null ?
        <AuthStack.Navigator>
          <AuthStack.Screen name="SplashScreen" component={SplashScreen} options={{
            title: 'Sign In',
            headerShown: false,
            animationTypeForReplace: userToken ? 'pop' : 'push'
          }} />
          <AuthStack.Screen name="Sign In" component={SignInScreen} options={{
            title: 'Sign In',
            headerShown: false,
            animationTypeForReplace: userToken ? 'pop' : 'push'
          }} />
          <AuthStack.Screen name="Sign Up" component={SignUpScreen} />
        </AuthStack.Navigator> : <AppStackNavigator />}
    </NavigationContainer>
  )
}