import React from 'react'
import {
  View, Button, SafeAreaView, ScrollView, StyleSheet, Image,
  Dimensions
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-paper'
import { Text } from 'galio-framework'

import { Center } from '../../components/Center'
import { useAuth } from '../../contexts/AuthContext'
import MiniCard from '../../components/Media/MiniCard'

const logo = require('../../assets/images/iPlay2020Logo.png')
const { width, height } = Dimensions.get('window')


function Explore() {
  const [authState,authDispatch] = useAuth()
  const { user } = authState
  const { name, website, avatar } = user

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 2, marginTop: 10 }}>
        <View style={{ marginVertical: 30, marginLeft: 20, flexDirection: 'row' }}>
          <Avatar.Image size={100} source={logo} />
          <View style={{ marginLeft: 15, marginTop: 25 }}>
            <Text h6>{name}</Text>
            <Text>{website || 'Brand'}</Text>
          </View>
        </View>
      </View>

      {/* <View>
          <Text>{JSON.stringify(auth, null, 2)}</Text>
        </View> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 30,
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#121212',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    height: height
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
