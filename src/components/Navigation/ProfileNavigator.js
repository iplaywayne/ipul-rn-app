import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';

import { Profile as ProfileScreen } from '../../screens/Profile'
import { default as UpdateProfileScreen } from '../../screens/Profile/UpdateProfile'
import { default as UpdateMoodScreen } from '../../screens/Profile/UpdateMood'
import { useAuth ,useStore} from '../../contexts'
import { NavigationDrawerStructure } from './NavigationDrawerStructure'
import { Settings as SettingsScreen } from '../../screens/Settings'
import DrawerContent from './DrawerContent'
import { CreatePost as CreatePostScreen } from '../../screens/Profile/Posts/CreatePost'


const ProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();


const NotifsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Notifications Coming</Text></View>
)
const AdsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Ads Coming</Text></View>
)

export const ProfileNavigator = ({ navigation }) => {
  const [authState] = useAuth()
  const { user } = authState

  return (
    <ProfileStack.Navigator mode='modal'>

      {/* Profile Screen */}
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
        // title: user && user.name || 'iPlayuListen',
        // headerLeft: props => (
        //   <NavigationDrawerStructure
        //     navigationProps={navigation}
        //     onPress={() => navigation.navigate('CreatePost')}
        //     icon={<Icon name='rocket' size={25} style={{ marginLeft: 20 }} />}
        //   />
        // ),
        // headerRight: props => (
        //   <NavigationDrawerStructure
        //     navigationProps={navigation}
        //     onPress={() => navigation.toggleDrawer()}
        //     icon={<Icon name='dots-horizontal' size={25} style={{ marginRight: 20 }} />}
        //   />
        // )
      }} />
      <ProfileStack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{
        title: 'Update Profile',
      }} />
      <ProfileStack.Screen name="UpdateMood" component={UpdateMoodScreen} options={{
        title: 'Update Mood',
      }} />

      
      <ProfileStack.Screen name="CreatePost" component={CreatePostScreen} options={{
        title: 'Create Post',
      }} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{
        title: 'Settings',
      }} />
      <ProfileStack.Screen name="Notifications" component={NotifsScreen} options={{
        title: 'Notifications',
      }} />
      <ProfileStack.Screen name="Ads" component={AdsScreen} options={{
        title: 'Advertisements',
      }} />
    </ProfileStack.Navigator>
  )
}

export const ProfileDrawerNavigator = () => {
  const [storeState] = useStore()
  const [authState] = useAuth()
  const { user } = authState

  return (
    <Drawer.Navigator drawerType='back' drawerContent={(props) => <DrawerContent {...props} user={user} />}>
      <Drawer.Screen name="Profile" component={ProfileNavigator} />
    </Drawer.Navigator >
  )
}