import React from 'react'
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, Image, StatusBar } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'

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

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

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

export default Home
