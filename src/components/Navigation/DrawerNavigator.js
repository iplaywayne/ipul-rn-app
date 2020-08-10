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
import { Profile as ProfileScreen } from '../../screens/Profile'
import SplashScreen from '../../screens/SplashScreen/SplashScreen'
import DrawerContent from './DrawerContent'

import { useAuth, useStore } from '../../utils'


const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigation Drawer
  const toggleDrawer = () => props.navigationProps.toggleDrawer();
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {props.icon}
      </TouchableOpacity>
    </View>
  );
}

const AppStackNavigator = ({ navigation }) => (
  <AppStack.Navigator>
    <AppStack.Screen name="Profile" component={ProfileScreen} options={{
      title: 'iPlayuListen',
      headerShown: false,
      headerTransparent: false,
      headerLeft: props => (
        <NavigationDrawerStructure
          navigationProps={navigation}
          icon={<Icon name='dots-horizontal' size={25} style={{ marginLeft: 20 }} />}
        />
      ),
      headerRight: props => (
        <NavigationDrawerStructure
          navigationProps={navigation}
          icon={<Icon name='arrow-right' size={25} style={{ marginRight: 20 }} />}
        />
      )
    }} />
    <AppStack.Screen name="Explore" component={ExploreScreen} />
  </AppStack.Navigator>
)

const SettingsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Settings Coming</Text></View>
)
const NotifsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Notifications Coming</Text></View>
)
const AdsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Ads Coming</Text></View>
)

const DrawerNavigator = () => {
  const [storeState] = useStore()
  const [authState] = useAuth()
  const { user } = authState

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} user={user} />}>
      <Drawer.Screen name="Profile" component={AppStackNavigator} />
      <Drawer.Screen name="Settings" children={props => <SettingsScreen {...props} />} />
      <Drawer.Screen name="Notifications" children={props => <NotifsScreen {...props} />} />
      <Drawer.Screen name="Ads" children={props => <AdsScreen {...props} />} />

    </Drawer.Navigator >
  )
}

export default DrawerNavigator
