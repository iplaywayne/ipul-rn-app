import React from 'react'
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, Image, StatusBar } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'

import { ExploreCard, Center } from '../../components'
import { useAuth, useStore } from '../../contexts'
import { MediaService } from '../../utils'

function Explore() {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { tracks } = storeState
  const mediaService = MediaService()


  return (
    <ScrollView style={styles.root}>
      <StatusBar barStyle='dark-content' />
      <View>
        <Text style={styles.title}>Explore iPlayuListen</Text>
      </View>

      <ExploreCard />

      <View>
        {/* <Text>{JSON.stringify(user, null, 2)}{name}</Text> */}
        {/* <Button title='Sign Out' onPress={() => authDispatch.signOut()} /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 30,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 20,
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 150,
    width: 150,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 5
  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
  },
  miniCardText: {
    flex: 1
  }
})


export default Explore
