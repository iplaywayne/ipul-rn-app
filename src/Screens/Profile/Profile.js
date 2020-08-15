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
import { Divider } from 'react-native-paper'
import TrackPlayer from 'react-native-track-player'
import Button from 'react-native-button'
import FastImage from 'react-native-fast-image'
import Spinner from 'react-native-spinkit'
import BottomSheet from 'reanimated-bottom-sheet'

import { Center, MiniCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import MediaService from '../../utils/media/MediaService'
import { logo, width, height } from '../../constants'
import { styles } from './styles'
import Camera from '../../components/Camera/Camera'
import PostService from '../../utils/post/PostService'
import { NavigationDrawerStructure } from '../../components/Navigation/NavigationDrawerStructure'
import Btn from '../../components/Prebuilt/Button'


const BUTTON_WIDTH = 100

function Profile({ route, navigation }) {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { user } = authState
  const { name, website, avatar, bio } = user ?? { name: '', website: '', avatar: '', bio: '' }
  const { queued, isPlaying, isLoading } = storeState
  const [tracks, setTracks] = React.useState({})
  const [favorites, setFavorites] = React.useState({})
  const mediaService = MediaService()
  const postService = PostService()
  const spinner = React.useRef(new Animated.Value(0)).current
  const [ready, setReady] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState('You can add tracks to your Queue')
  const [loading, setLoading] = React.useState(false)
  const [postDetailsPending, setPostDetailsPending] = React.useState(null)
  const [capturedMood, setCapturedMood] = React.useState(false)

  const handlePostTask = details => {
    postService.test(details,
      progress => {
        console.log(`${progress}% complete`)
      })
  }

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
      }
    }, 250)
  }, [tracks])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: user && user.name || 'iPlayuListen',
      headerShown: false,
      // headerLeft: props => (
      //   <NavigationDrawerStructure
      //     navigationProps={navigation}
      //     onPress={() => navigation.navigate('CreatePost')}
      //     icon={<Icon name='rocket' size={25} style={{ marginLeft: 20 }} />}
      //   />
      // ),
      headerRight: props => (
        <NavigationDrawerStructure
          navigationProps={navigation}
          onPress={() => navigation.toggleDrawer()}
          icon={<Icon name='dots-horizontal' size={25} style={{ marginRight: 20 }} />}
        />
      )
    })

    mediaService.setup()
    mediaService.getTracks(result => setTracks(result))
    mediaService.getFavorites(user.uid, result => {
      // console.log('[FAVORITES] Loaded', result.length)
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

  if (!user.name) return <Center><Text>Let's finish the setup</Text></Center>
  if (loading || !tracks.length) return <Center><Spinner type='Wave' /></Center>

  const ProfileHeader = () => (
    <View style={{ flex: 1, paddingBottom: 0 }}>
      <View style={{ marginBottom: 10, marginLeft: 20, flexDirection: 'row' }}>
        {avatar ?
          <TouchableOpacity onPress={() => navigation.push('UpdateProfile')}>
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

        <View style={{ marginLeft: 15, marginTop: 25 }}>
          <Text h6 style={{ fontWeight: 'bold' }}>{name}</Text>
          <Text>{bio || 'Brand'}</Text>
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
      <View style={{
        paddingTop: 45, height: 80, flexDirection: 'row', paddingHorizontal: 5,
        justifyContent: 'space-between', backgroundColor: '#fff', marginTop: 0,
      }}>
        <NavigationDrawerStructure
          navigationProps={navigation}
          onPress={() => navigation.navigate('CreatePost')}
          icon={<Icon name='rocket' size={25} style={{ marginLeft: 20 }} />}
        />
        <Text style={{ fontWeight: '800', fontSize: 20 }}>{user.name}</Text>
        <NavigationDrawerStructure
          navigationProps={navigation}
          onPress={() => navigation.toggleDrawer()}
          icon={<Icon name='dots-horizontal' size={25} style={{ marginRight: 20 }} />}
        />
      </View>
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>


        {postDetailsPending &&
          <View>
            <View style={{ paddingHorizontal: 20 }}>
              {postDetailsPending && <Text style={{ fontSize: 15 }}>You have post details pending post</Text>}
              {/* <Text>{JSON.stringify(postDetailsPending, null, 2)}</Text> */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Image
                  style={{ height: 50, width: 50, borderRadius: 5 }}
                  source={{ uri: postDetailsPending.type === 'image' ? postDetailsPending.image : postDetailsPending.video }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ marginHorizontal: 20 }}>{postDetailsPending.caption}</Text>
                  <Btn title='Post Now' onPress={() => handlePostTask(postDetailsPending)} />
                </View>
              </View>
            </View>
            <Divider style={{ marginVertical: 20 }} />
          </View>}


        <ProfileHeader />

        <Divider />

        <ProfileRecent />

        <Divider />

        <ProfileQueued />

        <Divider />

        {/* <ProfileFavorites /> */}

        <View style={{ marginBottom: 40 }}></View>
      </ScrollView >
    </>
  )
}


export default Profile