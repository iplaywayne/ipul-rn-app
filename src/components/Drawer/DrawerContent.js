import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { DrawerItem, SafeAreaView } from '@react-navigation/drawer';

import { useAuth } from '../../contexts/AuthContext'


const DrawerContent = (props) => {
  const { navigation } = props

  return (
    <View>
      <View style={styles.root} >
        <Text style={{ color: 'white', fontSize: 15 }}>
          Header
      </Text>
      </View>

      <ScrollView style={styles.container}>
        <DrawerItem
          label="Home"
          onPress={(): void => {
            navigation.navigate('Home');
          }}
        />
        <DrawerItem
          label="Explore"
          onPress={(): void => {
            navigation.navigate('Explore');
          }}
        />
        <DrawerItem
          label="Close"
          onPress={(): void => {
            navigation.closeDrawer();
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f50057',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default DrawerContent
