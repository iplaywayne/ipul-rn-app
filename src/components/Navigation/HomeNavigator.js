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
import { Media as MediaScreen } from '../../screens/Media'


const MediaStack = createStackNavigator();

const Drawer = createDrawerNavigator();


export const HomeNavigator = ({ navigation }) => (
  <MediaStack.Navigator mode='card'>

    <MediaStack.Screen name="Home" component={HomeScreen} options={{
      headerShown: false
    }} />
    <MediaStack.Screen name="MediaDetails" component={MediaDetails} options={{
      title: 'Media Details',
    }} />

  </MediaStack.Navigator>
)

export const HomeDrawerNavigator = () => (
  <Drawer.Navigator drawerType='slide'>
    <Drawer.Screen name="Media" component={HomeNavigator} />
    <Drawer.Screen name="Request" component={HomeNavigator} />
    <Drawer.Screen name="History" component={HomeNavigator} />
    <Drawer.Screen name="FAQ" component={HomeNavigator} />
  </Drawer.Navigator >
)