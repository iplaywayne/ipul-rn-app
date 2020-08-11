import React from 'react'
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, Image, StatusBar } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Divider } from 'react-native-paper'

import { ExploreCard, Center } from '../../components'
import { useAuth, useStore } from '../../contexts'
import MediaService from '../../utils/media/MediaService'


function Explore() {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { tracks } = storeState
  const mediaService = MediaService()
  const topRemixes = tracks.filter(trk => trk.genre.toString().toLowerCase() === 'remix')

  return (
    <ScrollView style={styles.root}>

      <View>
        <Text style={styles.title}>Explore iPlayuListen</Text>
      </View>

      <Divider />

      <View style={{ paddingBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
        {topRemixes.map((itm, idx) => (
          <ExploreCard key={idx} item={itm} />
        ))}
      </View>

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
    marginTop: 50,
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
