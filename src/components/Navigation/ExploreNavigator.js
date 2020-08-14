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
import { Explore as ExploreScreen } from '../../screens/Explore'
import { MediaDetails } from '../../screens/Media/MediaDetails'


const ExploreStack = createStackNavigator();
const Drawer = createDrawerNavigator();


export const ExploreNavigator = ({ navigation }) => {
  const [authState] = useAuth()
  const { user } = authState

  return (
    <ExploreStack.Navigator mode='modal'>

      {/* Media Screen */}
      <ExploreStack.Screen name="Explore" component={ExploreScreen} options={{
        headerShown: false
      }} />
      <ExploreStack.Screen name="MediaDetails" component={MediaDetails} options={{
        title: 'Media Details',
      }} />

    </ExploreStack.Navigator>
  )
}

export const ExploreDrawerNavigator = () => {
  const [storeState] = useStore()
  const [authState] = useAuth()
  const { user } = authState

  return (
    <Drawer.Navigator drawerType='slide'>
      <Drawer.Screen name="Media" component={ExploreNavigator} />
      <Drawer.Screen name="Request" component={ExploreNavigator} />
      <Drawer.Screen name="History" component={ExploreNavigator} />
      <Drawer.Screen name="FAQ" component={ExploreNavigator} />
    </Drawer.Navigator >
  )
}