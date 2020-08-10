import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { DrawerItem, SafeAreaView } from '@react-navigation/drawer';
import { Divider } from 'react-native-paper'


const DrawerContent = (props) => {
  const { navigation, user } = props
  const { name, avatar } = user

  return (
    <View>
      <View style={styles.root} >
        <Image source={{ uri: avatar }} style={{ height: 70, width: 70, borderRadius: 70 / 2, marginTop: 35 }} />
        <Text style={{ color: 'white', fontSize: 15, marginTop: 10 }}>
          {name}
        </Text>
        <Divider />
        <Text style={{ color: '#ddd', fontSize: 15, marginTop: 10 }}>
          FREE PLAN
        </Text>
      </View>

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
          label="Close"
          onPress={(): void => {
            navigation.closeDrawer();
          }}
        />
      </ScrollView>
    </View >
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f50057',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  }
})
export default DrawerContent
