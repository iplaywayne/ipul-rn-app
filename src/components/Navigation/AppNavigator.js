import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';

import { Profile as ProfileScreen } from '../../screens/Profile'
import { default as UpdateProfileScreen } from '../../screens/Profile/UpdateProfile'
import { default as UpdateMoodScreen } from '../../screens/Profile/UpdateMood'
import { useAuth } from '../../contexts'
import { NavigationDrawerStructure } from './NavigationDrawerStructure'
import { Settings as SettingsScreen } from '../../screens/Settings'


const AppStack = createStackNavigator();


const NotifsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Notifications Coming</Text></View>
)
const AdsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Ads Coming</Text></View>
)

const AppStackNavigator = ({ navigation }) => {
  const [authState] = useAuth()
  const { user } = authState

  return (
    <AppStack.Navigator mode='modal'>

      {/* Profile Screen */}
      <AppStack.Screen name="Profile" component={ProfileScreen} options={{
        title: user.name || 'iPlayuListen',
        headerShown: true,
        headerTransparent: false, 
        headerLeft: props => (
          <NavigationDrawerStructure
            navigationProps={navigation}
            icon={<Icon name='view-dashboard' size={25} style={{ marginLeft: 20 }} />}
          />
        ),
        headerRight: props => (
          <NavigationDrawerStructure
            navigationProps={navigation}
            icon={<Icon name='dots-horizontal' size={25} style={{ marginRight: 20 }} />}
          />
        )
      }} />
      <AppStack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{
        title: 'Update Profile',
      }} />
      <AppStack.Screen name="UpdateMood" component={UpdateMoodScreen} options={{
        title: 'Update Mood',
      }} />

      
      <AppStack.Screen name="Settings" component={SettingsScreen} options={{
        title: 'Settings',
      }} />
      <AppStack.Screen name="Notifications" component={NotifsScreen} options={{
        title: 'Notifications',
      }} />
      <AppStack.Screen name="Ads" component={AdsScreen} options={{
        title: 'Advertisements',
      }} />
    </AppStack.Navigator>
  )
}

export default AppStackNavigator