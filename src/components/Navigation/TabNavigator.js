import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';

import { SignIn as SignInScreen } from '../../screens/SignIn'
import { SignUp as SignUpScreen } from '../../screens/SignUp'
import { Home as HomeScreen } from '../../screens/Home'
import { Explore as ExploreScreen } from '../../screens/Explore'
import { Media as MediaScreen } from '../../screens/Media'
import { HomeNavigator, HomeDrawerNavigator } from '../../components/Navigation/HomeNavigator'
import { MediaNavigator, MediaDrawerNavigator } from '../../components/Navigation/MediaNavigator'
import { Profile as ProfileScreen } from '../../screens/Profile'
import { ProfileNavigator, ProfileDrawerNavigator } from '../../components/Navigation/ProfileNavigator'
import SplashScreen from '../../screens/SplashScreen/SplashScreen'
import { useAuth, useStore } from '../../utils'


const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const [storeState] = useStore()
  const [authState] = useAuth()
  const { user } = authState


  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{ backgroundColor: '#121212' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
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
}

export default TabNavigator