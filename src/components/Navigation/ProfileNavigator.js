import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';

import { Profile as ProfileScreen } from '../../screens/Profile'
import { default as PublicProfileScreen } from '../../screens/Profile/PublicProfile'
import { default as UpdateProfileScreen } from '../../screens/Profile/UpdateProfile'
import { default as UpdateMoodScreen } from '../../screens/Profile/UpdateMood'
import { default as PostScreen } from '../../screens/Post/Post'
import { useAuth, useStore } from '../../contexts'
import { NavigationDrawerStructure } from './NavigationDrawerStructure'
import { Settings as SettingsScreen } from '../../screens/Settings'
import DrawerContent from './DrawerContent'
import { CreatePost as CreatePostScreen } from '../../screens/Profile/Posts/CreatePost'
import { CreateCaption as CreateCaptionScreen } from '../../screens/Profile/Posts/CreateCaption'
import PendingPost from '../../screens/Profile/Posts/PendingPost'
import { default as NotifsScreen } from '../../screens/Profile/Notifs/Notifs'


const ProfileStack = createStackNavigator();
const NotifsStack = createStackNavigator();
const Drawer = createDrawerNavigator();


const AdsScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Ads Coming</Text></View>
)


export const ProfileNavigator = ({ navigation }) => {
  const [authState] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { user } = storeState

  return (
    <ProfileStack.Navigator mode='modal'>

      <ProfileStack.Screen name="Profile" component={ProfileScreen} />

      <ProfileStack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{
        title: 'Update Profile',
        headerShown: false,
      }} />

      <ProfileStack.Screen name="PublicProfile" component={PublicProfileScreen} options={{
        headerShown: false
      }} />

      <ProfileStack.Screen name="UpdateMood" component={UpdateMoodScreen} options={{
        title: 'Update Mood',
      }} />

      <ProfileStack.Screen name="CreatePost" component={CreatePostScreen} options={{
        title: 'Create Post',
      }} />

      <ProfileStack.Screen name="CreateCaption" component={CreateCaptionScreen} options={{
        title: 'Your Caption',
      }} />

      <ProfileStack.Screen name="PostView" component={PostScreen} options={{
        title: 'Post',
      }} />

      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{
        title: 'Settings',
      }} />

      <ProfileStack.Screen name="Ads" component={AdsScreen} options={{
        title: 'Advertisements',
      }} />
    </ProfileStack.Navigator>
  )
}


export const NotifsNavigator = () => (
  <NotifsStack.Navigator>
    <NotifsStack.Screen name="Notifications" component={NotifsScreen} />
    <NotifsStack.Screen name="PostView" component={PostScreen} options={{
      title: 'Post',
    }} />
  </NotifsStack.Navigator>)


export const ProfileDrawerNavigator = () => {
  const [authState] = useAuth()
  const [storeState] = useStore()
  const { user } = authState

  return (
    <Drawer.Navigator
      drawerType='back'
      drawerContent={(props) => <DrawerContent {...props} user={user} />}>
      <Drawer.Screen name="Profile" component={ProfileNavigator} />
      <Drawer.Screen name="Notifications" component={NotifsNavigator} />
    </Drawer.Navigator >
  )
}