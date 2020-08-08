import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SignIn as SignInScreen } from '../../screens/SignIn'
import { SignUp as SignUpScreen } from '../../screens/SignUp'
import { Home as HomeScreen } from '../../screens/Home'
import { Explore as ExploreScreen } from '../../screens/Explore'
import { Media as MediaScreen } from '../../screens/Media'
import { Profile as ProfileScreen } from '../../screens/Profile'
import SplashScreen from '../../screens/SplashScreen/SplashScreen'

const Tab = createMaterialBottomTabNavigator();


const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{ backgroundColor: '#121212' }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: true,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="airplane-takeoff" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Media"
      component={MediaScreen}
      options={{
        tabBarLabel: 'Media',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="theater" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default TabNavigator