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
import { Media as MediaScreen } from '../../screens/Media'
import { MediaDetails } from '../../screens/Media/MediaDetails'


const MediaStack = createStackNavigator();
const Drawer = createDrawerNavigator();


export const MediaNavigator = ({ navigation }) => {
  const [authState] = useAuth()
  const { user } = authState

  return (
    <MediaStack.Navigator mode='modal'>

      {/* Media Screen */}
      <MediaStack.Screen name="Media" component={MediaScreen} options={{
        title: 'Media',
      }} />
      <MediaStack.Screen name="MediaDetails" component={MediaDetails} options={{
        title: 'Media Details',
      }} />

    </MediaStack.Navigator>
  )
}

export const MediaDrawerNavigator = () => {
  const [storeState] = useStore()
  const [authState] = useAuth()
  const { user } = authState

  return (
    <Drawer.Navigator drawerType='slide'>
      <Drawer.Screen name="Media" component={MediaNavigator} />
      <Drawer.Screen name="Request" component={MediaNavigator} />
      <Drawer.Screen name="History" component={MediaNavigator} />
      <Drawer.Screen name="FAQ" component={MediaNavigator} />
    </Drawer.Navigator >
  )
}