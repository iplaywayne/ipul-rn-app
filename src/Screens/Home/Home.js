import React from 'react'
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'

import { Center } from '../../components/Center'
import { useAuth } from '../../contexts/AuthContext'
import MiniCard from '../../components/Media/MiniCard'

function Home({ navigation }) {
  const auth = useAuth()
  const [{ user }, authDispatch] = useAuth()
  const name = (user && user.name) ?? null

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Welcome, {name}</Text>
        </View>

        <MiniCard />

        <View>
          {/* <Text>{JSON.stringify(user, null, 2)}{name}</Text> */}
          {/* <Button title='Sign Out' onPress={() => authDispatch.signOut()} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 20,
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 200,
    width: 200,
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
