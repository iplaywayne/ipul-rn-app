import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Profile as ProfileScreen } from '../../screens/Profile'
import { useAuth } from '../../contexts'
import { NavigationDrawerStructure } from './NavigationDrawerStructure'


const AppStack = createStackNavigator();

const SettingsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Settings Coming</Text></View>
)
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
    <AppStack.Navigator>
      <AppStack.Screen name="Profile" component={ProfileScreen} options={{
        title: user.name || 'iPlayuListen',
        headerShown: true,
        headerTransparent: false,
        headerRight: props => (
          <NavigationDrawerStructure
            navigationProps={navigation}
            icon={<Icon name='dots-horizontal' size={25} style={{ marginRight: 20 }} />}
          />
        )
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