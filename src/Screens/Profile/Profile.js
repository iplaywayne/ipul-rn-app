import React from 'react'
import {
  View, SafeAreaView, ScrollView, StyleSheet, Image, Alert, TouchableOpacity,
  Dimensions, StatusBar, Animated, ActivityIndicator, ActionSheetIOS
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'
import { Text } from 'galio-framework'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider, TextInput } from 'react-native-paper'
import TrackPlayer from 'react-native-track-player'
import Button from 'react-native-button'
import FastImage from 'react-native-fast-image'
import Spinner from 'react-native-spinkit'
import BottomSheet from 'reanimated-bottom-sheet'
import axios from 'axios'


import { ExploreCard, Center, MiniCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import MediaService from '../../utils/media/MediaService'
import TrackService from '../../utils/media/TrackService'
import { logo, width, height } from '../../constants'
import { styles } from './styles'
import Camera from '../../components/Camera/Camera'
import PostService from '../../utils/post/PostService'
import { NavigationDrawerStructure } from '../../components/Navigation/NavigationDrawerStructure'
import Btn from '../../components/Prebuilt/Button'
import PendingPost from './Posts/PendingPost'
import AppHeader from '../../components/Header/AppHeader'
import PostCard from '../../components/Post/PostCard'
import { ErrorBoundary } from '../../components'
import ProfileHeader from './ProfileHeader'
import ProfileCards from './ProfileCards'
import FetchTracks from '../../utils/media/functions/FetchTracks'
import { TrackPlayerStructure } from '../../utils/media/functions'
import LocalAlert from '../../utils/notifs/LocalAlert'
import { wait } from '../../utils'


const BUTTON_WIDTH = 100

function Profile({ route, navigation }) {
  const [storeState, storeDispatch] = useStore()
  const { user } = storeState
  const { name, website, avatar, bio, occupation, mood } = storeState?.user
  const { queued, isAdmin, isPlaying, isLoading, tracks } = storeState
  // const [tracks, setTracks] = React.useState({})
  const [favorites, setFavorites] = React.useState({})
  const mediaService = MediaService()
  const trackService = TrackService()
  const [ready, setReady] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState('You can add tracks to your Queue')
  const [loading, setLoading] = React.useState(false)
  const [postDetailsPending, setPostDetailsPending] = React.useState(null)
  const [userPosts, setUserPosts] = React.useState([])


  React.useEffect(() => {
    if ('params' in route) {
      let params = route.params
      if (params && 'details' in params)
        setPostDetailsPending(params.details)
    }
    // mediaService.getTracks(res => console.log(res.length))
    // (async () => {
    //   console.log(await FetchTracks())
    // })()
  }, [route])

  React.useEffect(() => {
    setTimeout(async () => {
      if (tracks.length) {
        setLoading(false)
        storeDispatch.setLoading(false)
      }
    }, 250)
  }, [tracks])

  React.useEffect(() => {
    navigation.setOptions({
      title: user && user.name || 'iPlayuListen',
      headerShown: false,
    })

    PostService.getUserPosts(user.uid,
      posts => setUserPosts(posts))

    trackService.setup()
    return () => { }
  }, [])

  const readApi = async () => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/media`)
      console.log(data)
    } catch (e) {
      console.log('Could not read media')
    }
  }

  const playNowTapped = async () => {
    let nowQueued = await TrackPlayer.getQueue()

    if (isPlaying) {
      await TrackPlayer.pause()
      storeDispatch.setPlaying(false)
    } else {
      TrackPlayer.reset()

      if (!nowQueued.length) {
        const randoms = tracks.slice(35, 42)
        LocalAlert('Media Player', 'You have nothing queued, adding randoms')
        await TrackPlayer.add(randoms.map(t => TrackPlayerStructure(t)))
        await TrackPlayer.skip(randoms[0].acid)
        await trackService.play(randoms[0])
        storeDispatch.setQueued(randoms.map(t => {
          return { ...t, idx: t.acid * Math.random(177000) }
        }))
      } else {
        LocalAlert('Media Player', `Now playing ${queued.length} songs queued`)
        await TrackPlayer.add(queued.map(t => TrackPlayerStructure(t)))
      }

      await TrackPlayer.play()
      storeDispatch.setPlaying(true)
    }
  }

  if (loading || !tracks.length) return <Center><Spinner type='Wave' /></Center>


  const ProfileQueued = () => (
    <View>
      {queued && queued.length > 0 ?
        <View>
          <Text style={styles.title}>You have {queued.length} queued</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 25, flexDirection: 'row', marginTop: -15 }}>
            {queued.map((itm, idx) => (
              <MiniCard key={idx} item={itm} removeControl />
            ))}
          </ScrollView>
        </View>
        :
        <View>
          <Text style={styles.title}>You have nothing queued</Text>
        </View>
      }
    </View>
  )

  const ProfileFavorites = () => (
    <View>
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
    <View style={{ flex: 1 }}>
      <ErrorBoundary caller='Profile'>
        <ErrorBoundary caller='Profile App Header'>
          <AppHeader navigation={navigation} user={user} />
        </ErrorBoundary>

        <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

          <ErrorBoundary caller='Profile Header'>
            <ProfileHeader
              user={user}
              navigation={navigation}
              playNowTapped={playNowTapped}
              isPlaying={isPlaying}
              showButtons
            />
          </ErrorBoundary>

          <Divider />

          <ErrorBoundary caller='Profile Recent'>
            <ProfileRecent />
          </ErrorBoundary>

          <Divider />

          <ErrorBoundary caller='Profile Queued'>
            <ProfileQueued />
          </ErrorBoundary>

          <Divider />

          {/* <ErrorBoundary caller='Profile Favorites'>
            <ProfileFavorites />
          </ErrorBoundary>

          <Divider /> */}

          <ErrorBoundary caller='Profile Post Cards'>
            <ProfileCards
              user={user}
              navigation={navigation}
              userPosts={userPosts} />
          </ErrorBoundary>

          <View style={{ marginBottom: 40 }}></View>
        </ScrollView >

        {/* <Text>{JSON.stringify(user.occupation, null, 2)}</Text> */}
      </ErrorBoundary>
    </View>
  )
}


export default Profile