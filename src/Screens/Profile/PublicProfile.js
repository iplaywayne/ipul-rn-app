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


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Profile',
      headerShown: false,
    })

    PostService.getUserPosts(user.uid,
      posts => setUserPosts(posts))

    return () => { }
  }, [navigation])


  if (loading) return <Center><Spinner type='Wave' /></Center>


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
              isPlaying={isPlaying}
            />
          </ErrorBoundary>

          <Divider />

          <View style={{ marginBottom: 40 }}></View>
        </ScrollView >

        {/* <Text>{JSON.stringify(user.occupation, null, 2)}</Text> */}
      </ErrorBoundary>
    </View>
  )
}


export default Profile