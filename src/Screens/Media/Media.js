import React from 'react'
import {
  View, Button, SafeAreaView, ScrollView, StyleSheet, Image,
  Dimensions, VirtualizedList, FlatList
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
import { firebase, database } from '../../utils/firebase'
import { Center } from '../../components/Center'
import { useAuth } from '../../contexts/AuthContext'
import MiniCard from '../../components/Media/MiniCard'

const { width, height } = Dimensions.get('window')
const logo = require('../../assets/images/iPlay2020Logo.png')

export const trimWWWString = string => {
  if (!string) return null
  if (!string.includes('www.iplayulisten')) return string
  try {
    let filtered = string.toString().replace(/www\./i, '').toLowerCase()
    if (string.includes('iplayulisten')) {
      filtered = string.toString().replace(/www\./i, '').toLowerCase()
    }
    return filtered
  } catch (e) {
    console.log(e)
  }
}

const getTracks = cb => {
  const trkRef = firebase.database().ref(`/mediaTracks`)
  trkRef.on('value', snap => {
    let list = []
    snap.forEach(child => {
      list.push({
        ...child.val(),
        art_link: trimWWWString(child.val().art_link),
        song: trimWWWString(child.val().song),
      })
    })
    cb(list)
  })
}

const DATA = [];
const getItem = (data, index) => {
  return {
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`
  }
}
const getItemCount = (data) => {
  return 50;
}
const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={{ color: 'white', marginVertical: 5 }}>{title}</Text>
    </View>
  );
}


function Explore() {
  const [authState, authDispatch] = useAuth()
  const [tracks, setTracks] = React.useState(null)

  React.useEffect(() => {

    getTracks(result => {
      setTracks(result)
      console.log('boom!', result.length)
    })
  }, [])

  return (
    <ScrollView style={styles.root}>
      <View style={styles.header}>
        <Image source={logo}
          style={styles.logo} resizeMode='cover' />

        <Text>Playground</Text>
      </View>

      {/* <MiniCard /> */}

      <View style={styles.footer}>
        <Text style={{ color: 'white', marginBottom: 10 }} h5>Playground</Text>
        {/* <Button title='Sign Out' onPress={() => authDispatch.signOut()} /> */}

        <ScrollView style={{ height: 'auto', paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}>
          {tracks && tracks.map((itm, idx) => (
            <View key={idx}
              style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
              <Image source={itm.art_link ? { uri: itm.art_link } : logo}
                style={{ height: 50, width: 50, marginRight: 15, borderRadius: 5 }}
                resizeMode='cover' />
              <Text style={{ color: 'white', marginVertical: 10, marginRight: 10, fontWeight: '700' }}>{itm.artist}</Text>
              <Text style={{ color: 'white', marginVertical: 10 }}>{itm.title}</Text>
            </View>
          ))}

        </ScrollView>
      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    // paddingVertical: 30,
    backgroundColor: '#121212',
    flex: 1,
  },
  logo: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height * .3,
    width: width,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: '#121212',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 120,
    paddingHorizontal: 30,
    height: height - 200,
    marginTop: -40
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
