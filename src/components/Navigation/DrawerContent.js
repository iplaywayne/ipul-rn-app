import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { DrawerItem, SafeAreaView } from '@react-navigation/drawer';
import { Divider } from 'react-native-paper'

import { useAuth, useStore } from '../../utils'


const DrawerContent = (props) => {
  const { navigation, user } = props
  const [authState, authDispatch] = useAuth()
  const { name, avatar } = authState


  return (
    <View>
      <View style={styles.root} >
        <Image source={{ uri: avatar }} style={{ height: 70, width: 70, borderRadius: 70 / 2, marginTop: 35 }} />
        <Text style={{ color: '#121212', fontWeight: '700', fontSize: 22, marginTop: 10 }}>
          {name}
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
        <DrawerItem
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
        />
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
    paddingVertical: 30
  }
})
export default DrawerContent
