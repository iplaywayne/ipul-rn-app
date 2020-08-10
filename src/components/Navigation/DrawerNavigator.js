import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SignIn as SignInScreen } from '../../screens/SignIn'
import { SignUp as SignUpScreen } from '../../screens/SignUp'
import { Home as HomeScreen } from '../../screens/Home'
import { Explore as ExploreScreen } from '../../screens/Explore'
import { Profile as ProfileScreen } from '../../screens/Profile'
import SplashScreen from '../../screens/SplashScreen/SplashScreen'
import DrawerContent from './DrawerContent'
import AppStackNavigator from './AppNavigator'
import { useAuth, useStore } from '../../utils'


const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  const [storeState] = useStore()
  const [authState] = useAuth()
  const { user } = authState

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} user={user} />}>
      <Drawer.Screen name="Profile" component={AppStackNavigator}/>
    </Drawer.Navigator >
  )
}

export default DrawerNavigator
