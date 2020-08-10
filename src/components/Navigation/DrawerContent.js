import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { DrawerItem, SafeAreaView } from '@react-navigation/drawer';


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
