import React from 'react'
import { View, Button, SafeAreaView, ScrollView, StyleSheet, Image, StatusBar } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
import { Divider } from 'react-native-paper'

import { Center, MiniCard, ExploreCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import { MediaService } from '../../utils'

function Home({ navigation }) {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { tracks } = storeState
  const { user } = authState
  const name = (user && user.name) ?? null
  const mediaService = MediaService()

  if (!name) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
    <Text style={{ fontSize: 15 }}>We need to create your username to continue</Text>
  </View>


  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle='dark-content' />

      <View>
        <Text style={styles.title}>Welcome, {name}</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15, flexDirection: 'row' }}>
        {tracks.reverse(tracks).slice(0, 5).map((itm, idx) => (
          <MiniCard key={idx} item={itm} />
        ))}
      </ScrollView>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15, flexDirection: 'row' }}>
        {tracks.reverse(tracks).slice(0, 5).map((itm, idx) => (
          <MiniCard key={idx} item={itm} />
        ))}
      </ScrollView>
      
      <Divider />

      <View>
        <ExploreCard />
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
    paddingVertical: 30,
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

export default Home
