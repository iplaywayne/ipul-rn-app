import React from 'react'
import {
  View, Button, SafeAreaView, ScrollView, StyleSheet, Image,
  Dimensions, TouchableOpacity, StatusBar
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-paper'
import { Text } from 'galio-framework'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import { Center } from '../../components/Center'
import { useAuth } from '../../contexts/AuthContext'
import MiniCard from '../../components/Media/MiniCard'
import { firebase, database } from '../../utils/firebase'

const logo = require('../../assets/images/iPlay2020Logo.png')
const { width, height } = Dimensions.get('window')

const getTracks = cb => {
  const trkRef = firebase.database().ref(`/mediaTracks`)
  trkRef.on('value', snap => {
    cb(snap.val())
  })
}

function Explore({ navigation }) {
  const [authState, authDispatch] = useAuth()
  const { user } = authState
  const { name, website, avatar } = user ?? { name: '', website: '', avatar: '' }
  const [tracks, setTracks] = React.useState(null)

  React.useEffect(() => {
    getTracks(result => setTracks(result))
    // navigation.toggleDrawer()
  }, [])

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle='dark-content' />

      <TouchableOpacity onPress={() => navigation.toggleDrawer()}
        style={{ alignItems: 'flex-end',margin:40 }}>
        <Text><Icon name='dots-horizontal' size={35} style={{ padding: 5 }}/></Text>
      </TouchableOpacity>

      <View style={{ flex: 2, marginTop: -60 }}>
        <View style={{ marginBottom: 30, marginLeft: 20, flexDirection: 'row' }}>
          <Avatar.Image size={100} source={logo} />
          <View style={{ marginLeft: 15, marginTop: 25 }}>
            <Text h6>{name}</Text>
            <Text>{website || 'Brand'}</Text>
          </View>

        </View>
      </View>

      <View>
        <Text style={styles.title}>Your favorites</Text>
        <Text style={{ fontSize: 20, paddingLeft: 25 }}>is coming . .</Text>
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
