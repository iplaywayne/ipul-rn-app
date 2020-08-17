import React from 'react'
import {
  View, SafeAreaView, ScrollView, StyleSheet, Image,
  Dimensions, TouchableOpacity, StatusBar, Animated, ActivityIndicator
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-paper'
import { Text } from 'galio-framework'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider, TextInput } from 'react-native-paper'
import TrackPlayer from 'react-native-track-player'
import Button from 'react-native-button'
import FastImage from 'react-native-fast-image'
import Spinner from 'react-native-spinkit'
import BottomSheet from 'reanimated-bottom-sheet'

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


const BUTTON_WIDTH = 100

function Profile({ route, navigation }) {
  const [storeState, storeDispatch] = useStore()
  const { user } = storeState
  const { name, website, avatar, bio, occupation, mood } = user ?? { name: '', website: '', avatar: '', bio: '' }
  const { queued, isAdmin, isPlaying, isLoading } = storeState
  const [tracks, setTracks] = React.useState({})
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
  }, [route])

  React.useEffect(() => {
    setTimeout(() => {
      if (tracks.length) {
        setLoading(false)
        storeDispatch.setLoading(false)
      }
    }, 250)
  }, [tracks])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: user && user.name || 'iPlayuListen',
      headerShown: false,
    })

    PostService.getUserPosts(user.uid,
      posts => setUserPosts(posts))

    trackService.setup()
    trackService.getTracks(result => setTracks(result))

    return () => { }
  }, [navigation])


  const playNowTapped = async () => {
    if (!queued.length) {
      console.log('Select a song to start playlist')
      return
    }
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

  if (!user.name) return <Center><Text>Let's finish the setup</Text></Center>
  if (loading || !tracks.length) return <Center><Spinner type='Wave' /></Center>

  const ProfileHeader = () => (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 10, marginLeft: 20, flexDirection: 'row' }}>

        {avatar ?
          <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile', {
            test: () => console.log('Passing Function From Profile Works!')
          })}>

            <FastImage
              style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
              source={{
                uri: avatar,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
          :
          <Avatar.Text size={100} label={name.substring(0, 2)}
            style={{ backgroundColor: '#444' }} />}

        <View style={{ marginLeft: 15, justifyContent: 'center', marginTop: 5 }}>
          <Text h6 style={{ fontWeight: 'bold' }}>{name}</Text>
          <Text h7 style={{ color: 'gray' }}>{occupation}</Text>
          <View>
            {mood && 'id' in mood ?
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '700', marginRight: 2 }}>Mood</Text>
                <Text>{mood.title}</Text>
              </View>
              :
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '700', marginRight: 2 }}>Mood</Text><Text>not set</Text>
              </View>}
          </View>

          <Text>{bio}</Text>
        </View>
      </View>

      <View style={{
        justifyContent: 'center',
        paddingHorizontal: 5, paddingTop: 5, paddingBottom: 10, flexDirection: 'row'
      }}>
        <Btn
          title='Update Profile'
          onPress={() => navigation.push('UpdateProfile')}
        />
        <Btn
          title='Set Your Mood'
          onPress={() => navigation.push('UpdateMood')}
        />
        <Btn
          color='#350DB6'
          title={isLoading ? <ActivityIndicator /> : `${isPlaying ? 'Pause Now' : 'Play Now'}`}
          onPress={() => playNowTapped()}
        />
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
        </View>
        :
        <View>
          <Text style={styles.title}>You have nothing queued</Text>
        </View>
      }
    </View>
  )

  const ProfileFavorites = () => (
    <View style={{ marginBottom: 0 }}>
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
    <>
      <AppHeader navigation={navigation} user={user} />


      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

        <PendingPost
          user={user}
          postDetails={postDetailsPending}
          onChange={val => setPostDetailsPending(val)}
          onComplete={() => setPostDetailsPending(null)}
        />

        <ProfileHeader />

        <Divider />

        <ProfileRecent />

        <Divider />

        <ProfileQueued />

        <Divider />

        <ProfileFavorites />

        <Divider />

        <View style={{
          paddingTop: 20,
          paddingBottom: 50, justifyContent: 'center', alignItems: 'center'
        }}>
          {userPosts.map((itm, idx) => (
            <PostCard navigation={navigation} key={idx} item={itm} />
          ))}
        </View>

        <View style={{ marginBottom: 40 }}></View>
      </ScrollView >

      {/* <Text>{JSON.stringify(user.occupation, null, 2)}</Text> */}
    </>
  )
}


export default Profile