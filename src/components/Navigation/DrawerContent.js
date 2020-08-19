import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { DrawerItem, SafeAreaView } from '@react-navigation/drawer';
import { Avatar, Divider } from 'react-native-paper'

import { useAuth, useStore, trimWWWString } from '../../utils'


const DrawerContent = (props) => {
  const { navigation, user } = props
  const [authState, authDispatch] = useAuth()
  const { name, avatar } = user


  return (
    <View>
      <View style={styles.root} >
        {avatar ?
          <Image source={{ uri: avatar }}
            style={{ height: 100, width: 100, borderRadius: 100 / 2 }} />
          :
          <Avatar.Text size={100} label={'iP'}
            style={{ backgroundColor: '#444' }} />}

        <Text style={{ color: '#121212', fontWeight: '700', fontSize: 17, marginTop: 10 }}>
          {name || 'Setup incomplete'}
        </Text>
        <Divider />
        <Text style={{ color: 'blue', fontSize: 15, opacity: .8 }}>
          Free Plan
        </Text>
      </View>

      <Divider style={{ marginBottom: 20 }} />

      <ScrollView style={styles.container}>
        <DrawerItem
          label="Profile"
          onPress={(): void => {
            navigation.navigate('Profile');
          }}
        />
        <DrawerItem
          label="Notifications"
          onPress={(): void => {
            navigation.navigate('Notifications');
          }}
        />
        {/* <DrawerItem
          label="Advertisements"
          onPress={(): void => {
            navigation.navigate('Ads');
          }}
        />
        <DrawerItem
          label="Settings"
          onPress={(): void => {
            navigation.navigate('Settings');
          }}
        /> */}

        <Divider style={{ marginVertical: 20 }} />

        <DrawerItem
          label="Sign Out"
          onPress={(): void => {
            navigation.toggleDrawer()
            setTimeout(() => {
              authDispatch.signOut();
            }, 1000)
          }}
        />
      </ScrollView>
    </View >
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 55,
    paddingBottom: 30,
  }
})
export default DrawerContent
