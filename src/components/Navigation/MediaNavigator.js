import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';
import {
  HeaderSearchBar,
  HeaderClassicSearchBar
} from "react-native-header-search-bar";

import { Profile as ProfileScreen } from '../../screens/Profile'
import { default as UpdateProfileScreen } from '../../screens/Profile/UpdateProfile'
import { default as UpdateMoodScreen } from '../../screens/Profile/UpdateMood'
import { useAuth ,useStore} from '../../contexts'
import { NavigationDrawerStructure } from './NavigationDrawerStructure'
import { Settings as SettingsScreen } from '../../screens/Settings'
import DrawerContent from './DrawerContent'
import { Media as MediaScreen } from '../../screens/Media'


const MediaStack = createStackNavigator();
const Drawer = createDrawerNavigator();


const NotifsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Notifications Coming</Text></View>
)
const AdsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Ads Coming</Text></View>
)

export const MediaNavigator = ({ navigation }) => {
  const [authState] = useAuth()
  const { user } = authState

  return (
    <MediaStack.Navigator mode='modal'>

      {/* Profile Screen */}
      <MediaStack.Screen name="Media" component={MediaScreen} options={{
        title: 'Media',
      }} />
      <MediaStack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{
        title: 'Update Profile',
      }} />
      <MediaStack.Screen name="UpdateMood" component={UpdateMoodScreen} options={{
        title: 'Update Mood',
      }} />

      
      <MediaStack.Screen name="Settings" component={SettingsScreen} options={{
        title: 'Settings',
      }} />
      <MediaStack.Screen name="Notifications" component={NotifsScreen} options={{
        title: 'Notifications',
      }} />
      <MediaStack.Screen name="Ads" component={AdsScreen} options={{
        title: 'Advertisements',
      }} />
    </MediaStack.Navigator>
  )
}

export const MediaDrawerNavigator = () => {
  const [storeState] = useStore()
  const [authState] = useAuth()
  const { user } = authState

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} user={user} />}>
      <Drawer.Screen name="Profile" component={MediaNavigator} />
    </Drawer.Navigator >
  )
}