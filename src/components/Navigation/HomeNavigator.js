import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from 'react-native-button'

import { useAuth, useStore } from '../../contexts'
import { NavigationDrawerStructure } from './NavigationDrawerStructure'
import { Settings as SettingsScreen } from '../../screens/Settings'
import DrawerContent from './DrawerContent'
import { Home as HomeScreen } from '../../screens/Home'
import { MediaDetails } from '../../screens/Media/MediaDetails'


const MediaStack = createStackNavigator();
const Drawer = createDrawerNavigator();


export const HomeNavigator = ({ navigation }) => {
  const [authState] = useAuth()
  const { user } = authState

  return (
    <MediaStack.Navigator mode='modal'>

      {/* Media Screen */}
      <MediaStack.Screen name="Home" component={HomeScreen} options={{
        headerShown: false
      }} />

    </MediaStack.Navigator>
  )
}

export const HomeDrawerNavigator = () => {
  const [storeState] = useStore()
  const [authState] = useAuth()
  const { user } = authState

  return (
    <Drawer.Navigator drawerType='slide'>
      <Drawer.Screen name="Media" component={HomeNavigator} />
      <Drawer.Screen name="Request" component={HomeNavigator} />
      <Drawer.Screen name="History" component={HomeNavigator} />
      <Drawer.Screen name="FAQ" component={HomeNavigator} />
    </Drawer.Navigator >
  )
}