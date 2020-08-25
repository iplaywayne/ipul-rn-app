import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SignIn as SignInScreen } from '../../screens/SignIn'
import { SignUp as SignUpScreen } from '../../screens/SignUp'
import { ExploreNavigator, ExploreDrawerNavigator } from '../../components/Navigation/ExploreNavigator'
import { HomeNavigator, HomeDrawerNavigator } from '../../components/Navigation/HomeNavigator'
import { MediaNavigator, MediaDrawerNavigator } from '../../components/Navigation/MediaNavigator'
import { ProfileNavigator, ProfileDrawerNavigator } from '../../components/Navigation/ProfileNavigator'

import SplashScreen from '../../screens/SplashScreen/SplashScreen'


const AppTab = createMaterialBottomTabNavigator();

const AppNavigator = () => (
  <AppTab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{ backgroundColor: '#121212' }}>
    
    <AppTab.Screen
      name="Home"
      component={HomeDrawerNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <AppTab.Screen
      name="Explore"
      component={ExploreDrawerNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="airplane-takeoff" color={color} size={26} />
        ),
      }}
    />
    <AppTab.Screen
      name="Media"
      component={MediaDrawerNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="theater" color={color} size={26} />
        ),
      }}
    />
    <AppTab.Screen
      name="Profile"
      component={ProfileDrawerNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
  </AppTab.Navigator>
)

export default AppNavigator