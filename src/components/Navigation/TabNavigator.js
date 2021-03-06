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


const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{ backgroundColor: '#121212' }}>
    <Tab.Screen
      name="Home"
      component={HomeDrawerNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreDrawerNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="airplane-takeoff" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Media"
      component={MediaDrawerNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="theater" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileDrawerNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default TabNavigator