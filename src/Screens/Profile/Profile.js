import React from 'react'
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'

import { Center } from '../../components/Center'
import { useAuth } from '../../contexts/AuthContext'
import MiniCard from '../../components/Media/MiniCard'


function Explore() {
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Profile</Text>
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


export default Explore
