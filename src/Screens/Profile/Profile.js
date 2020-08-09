import React from 'react'
import {
  View, Button, SafeAreaView, ScrollView, StyleSheet, Image,
  Dimensions, TouchableOpacity, StatusBar, Animated
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-paper'
import { Text } from 'galio-framework'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'react-native-paper'

import { Center, MiniCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import { MediaService } from '../../utils'
import { logo, width, height } from '../../constants'


function Explore({ navigation }) {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { user } = authState
  const { name, website, avatar } = user ?? { name: '', website: '', avatar: '' }
  const [tracks, setTracks] = React.useState({})
  const [favorites, setFavorites] = React.useState({})
  const mediaService = MediaService()
  const spinner = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    mediaService.getTracks(result => setTracks(result))
    mediaService.getFavorites(user.uid, result => {
      console.log('[FAVORITES]', user.uid, result)
    })
  }, [])

  const getEm = () => {
    // mediaService.debug()
    growIn()
  }

  const growIn = () => {
    Animated.timing(spinner, {
      toValue: 1,
      duration: 5000
    }).start()
  }

  if (!tracks.length) return null

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      <TouchableOpacity onPress={() => navigation.toggleDrawer()}
        style={{ alignItems: 'flex-end', margin: 30 }}>
        <Text style={{ padding: 10 }}><Icon name='dots-horizontal' size={35} /></Text>
      </TouchableOpacity>

      <View style={{ flex: 2, marginTop: -40 }}>
        <View style={{ marginBottom: 30, marginLeft: 20, flexDirection: 'row' }}>
          {avatar ?
            <Avatar.Image size={100} source={{ uri: avatar }}
              style={{ backgroundColor: '#444' }} />
            :
            <Avatar.Text size={100} label={name.substring(0, 2)}
              style={{ backgroundColor: '#444' }} />}

          <View style={{ marginLeft: 15, marginTop: 25 }}>
            <Text h6 style={{ fontWeight: 'bold' }}>{name}</Text>
            <Text>{website || 'Brand'}</Text>
          </View>
        </View>
      </View>

      <Divider />

      <View>
        <Text style={styles.title}>Recent Releases</Text>
      </View>


      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginTop: 15, marginBottom: 25, flexDirection: 'row' }}>
        {tracks.slice(0, 5).map((itm, idx) => (
          <MiniCard key={idx} item={itm} />
        ))}
      </ScrollView>

      <Divider />

      {favorites && favorites.length > 0 ?
        <View>
          <Text style={styles.title}>Your favorites</Text>
          <Text style={{ fontSize: 20, paddingLeft: 25 }}>You have {tracks.length} favorites</Text>
        </View> :
        <Button title='Ready' onPress={() => getEm()} />}

      {/* <View>
        <Text>{JSON.stringify(storeState, null, 2)}</Text>
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
    fontSize: 20,
    paddingTop: 25,
    paddingLeft: 20,
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
