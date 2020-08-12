import React from 'react'
import {
  View, Button as Btn, SafeAreaView, ScrollView, StyleSheet, Image,
  Dimensions, TouchableOpacity, StatusBar, Animated, ActivityIndicator
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-paper'
import { Text } from 'galio-framework'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'react-native-paper'
import TrackPlayer from 'react-native-track-player'
import Button from 'react-native-button'
import FastImage from 'react-native-fast-image'

import { Center, MiniCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import MediaService from '../../utils/media/MediaService'
import { logo, width, height } from '../../constants'
import { styles } from './styles'

function Explore({ navigation }) {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { user } = authState
  const { name, website, avatar, bio } = user ?? { name: '', website: '', avatar: '', bio: '' }
  const { queued, isPlaying, isLoading } = storeState
  const [tracks, setTracks] = React.useState({})
  const [favorites, setFavorites] = React.useState({})
  const mediaService = MediaService()
  const spinner = React.useRef(new Animated.Value(0)).current
  const [ready, setReady] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState('You can add tracks to your Queue')


  React.useEffect(() => {
    mediaService.setup()
    mediaService.getTracks(result => setTracks(result))
    mediaService.getFavorites(user.uid, result => {
      console.log('[FAVORITES] Loaded', result.length)
    })
    if (tracks.length > 0) setReady(true)
    storeDispatch.setLoading(false)
    return () => { }
  }, [])


  const playNowTapped = async () => {
    setTimeout(() => {
      if (!isPlaying) {
        TrackPlayer.play()
        storeDispatch.setPlaying(true)
      } else {
        TrackPlayer.pause()
        storeDispatch.setPlaying(false)
      }
    }, 500)
  }

  if (!tracks.length) return null

  
  const ProfileHeader = () => (
    <View style={{ flex: 2 }}>
      <View style={{ marginBottom: 20, marginLeft: 20, flexDirection: 'row' }}>
        {avatar ?
          <FastImage
            style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
            source={{
              uri: avatar,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          :
          <Avatar.Text size={100} label={name.substring(0, 2)}
            style={{ backgroundColor: '#444' }} />}

        <View style={{ marginLeft: 15, marginTop: 25 }}>
          <Text h6 style={{ fontWeight: 'bold' }}>{name}</Text>
          <Text>{bio || 'Brand'}</Text>
        </View>
      </View>
    </View>
  )

  const ProfileQueued = () => (
    <View>
      {queued && queued.length > 0 ?
        <View>
          <Text style={styles.title}>You have {queued.length} queued</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
            style={{ flexDirection: 'row', marginTop: -15 }}>
            {queued.map((itm, idx) => (
              <MiniCard key={idx} item={itm} removeControl />
            ))}
          </ScrollView>
          <Button
            style={{ fontSize: 15, color: 'white' }}
            styleDisabled={{ color: 'white' }}
            disabled={isLoading}
            containerStyle={{ padding: 10, margin: 10, height: 40, overflow: 'hidden', borderRadius: 5, backgroundColor: '#121212' }}
            disabledContainerStyle={{ backgroundColor: '#ddd' }}
            onPress={() => playNowTapped()}
          >
            {isLoading ? <ActivityIndicator /> : `${isPlaying ? 'Pause Now' : 'Play Now'}`}
          </Button>
        </View>
        :
        <View>
          <Text style={styles.title}>You have nothing queued</Text>
        </View>
      }
    </View>
  )

  const ProfileFavorites = () => (
    <View style={{ marginBottom: 50 }}>
      {favorites && favorites.length > 0 ?
        <View>
          <Text style={styles.title}>Your favorites</Text>
          <Text style={styles.title}>You have {favorites.length} favorites</Text>
        </View>
        :
        <View>
          <Text style={styles.title}>You have no favorites</Text>
        </View>
      }
    </View>
  )

  const ProfileRecent = () => (
    <View>
      <View>
        <Text style={styles.title}>Recent Releases</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 25, flexDirection: 'row' }}>
        {tracks.slice(0, 5).map((itm, idx) => (
          <MiniCard key={idx} item={itm} idx={idx} />
        ))}
      </ScrollView>
    </View>
  )

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      <ProfileHeader />

      <Divider />

      <ProfileRecent />

      <Divider />

      <ProfileQueued />

      <Divider />

      <ProfileFavorites />

    </ScrollView >
  )
}


export default Explore