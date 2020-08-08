import React from 'react'
import { View, Button, SafeAreaView, ScrollView, StyleSheet, Image } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-paper'
import { Text } from 'galio-framework'

import { Center } from '../../components/Center'
import { useAuth } from '../../contexts/AuthContext'
import MiniCard from '../../components/Media/MiniCard'

const logo = require('../../assets/images/iPlay2020Logo.png')

function Explore() {
  const auth = useAuth()

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        {/* <Text style={styles.title}>Profile</Text> */}

        <View style={{ marginTop: 30, marginLeft: 20, flexDirection: 'row' }}>
          <Avatar.Image size={100} source={logo} />
          <View style={{ marginLeft: 15, marginTop: 21 }}>
            <Text h5>Name</Text>
            <Text h6>Website</Text>
          </View>
        </View>

        {/* <View>
          <Text>{JSON.stringify(auth, null, 2)}</Text>
        </View> */}
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
