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
import FireService from '../../utils/firebase/FireService'


function Profile({ route, navigation }) {
  const [storeState, storeDispatch] = useStore()
  const { user, isPlaying } = storeState
  const { authorId } = route.params
  const [author, setAuthor] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useLayoutEffect(() => {
    getAuthor()
    return () => { }
  }, [navigation])

  const getAuthor = async () => {
    const user = await FireService.readUserByIdSync(authorId)
    setAuthor(user)
    setLoading(false)
  }

  if (loading || !author) return <Center><Spinner type='Wave' /></Center>


  return (
    <View style={{ flex: 1 }}>
      <ErrorBoundary caller='Profile'>
        <ErrorBoundary caller='Profile App Header'>
          <AppHeader
            title={`${user.name} Profile`}
            navigation={navigation}
            user={user}
            leftIcon={'arrow-left'}
            leftPress={() => navigation.goBack()}
          />
        </ErrorBoundary>

        <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
          <ErrorBoundary caller='Profile Header'>
            <ProfileHeader
              user={author}
              navigation={navigation}
              isPlaying={isPlaying}
              isAuthor={author.uid === user.uid}
            />
          </ErrorBoundary>

          <Divider />

          <Center style={{ marginTop: 30 }}>
            <Text>We're almost there . .</Text>
          </Center>

          <View style={{ marginBottom: 40 }}></View>
        </ScrollView >
      </ErrorBoundary>
    </View>
  )
}


export default Profile