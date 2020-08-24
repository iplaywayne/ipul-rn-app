import React from 'react'
import {
  View, Button as Btn, SafeAreaView, ScrollView, StyleSheet, Image, StatusBar, Linking,
  Alert, TouchableOpacity, AppState, DeviceEventEmitter
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
import { Divider } from 'react-native-paper'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { Shadow } from 'react-native-neomorph-shadows';
import Popover from 'react-native-popover-view';
import Spinner from 'react-native-spinkit'
import Button from 'react-native-button'
import Snackbar from 'react-native-snackbar'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import axios from 'axios'


import { Center, MiniCard, ExploreCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import TrackService from '../../utils/media/TrackService'
import SponsoredCard from '../../components/Ads/SponsoredCard'
import { openLink } from '../../utils/functions'
import Camera from '../../components/Camera/Camera'
import { ErrorBoundary } from '../../components'
import PostService from '../../utils/post/PostService'
import PostCard from '../../components/Post/PostCard'
import { messaging } from '../../utils/firebase'
import FCMService from '../../utils/notifs/FCMService'
import LocalAlert from '../../utils/notifs/LocalAlert'
import MediaRow from '../../components/Media/MediaRow'
import HomeHeader from './HomeHeader'


function Home(props) {
  const { navigation } = props
  const [storeState, storeDispatch] = useStore()
  const { user, isAdmin, tracks } = storeState
  const name = user?.name
  const trackService = TrackService()
  const topRemixes = tracks && tracks.filter(trk => JSON.stringify(trk).toLowerCase().includes('s')).slice(0, 11)
  const [loading, setLoading] = React.useState(true)
  const [globalPosts, setGlobalPosts] = React.useState(null)
  const [alertMessage, setAlertMessage] = React.useState()
  const fcmService = FCMService


  let myDevice = 'cfSMiDPpZ7qFcf3HAbRj6r:APA91bGACMFr0PAH_UOL_UsbbiKjAxiwg20E012Cs1Ikq_fiZ9PlVSGOeEyFVlGi8zHrvaygqDBfqBbie5g8rN_RVGoI949b1_ktb2sI61XOYD9_AD3PZj3dVGUF4stibrdpsUZt-KSz'


  React.useLayoutEffect(() => {
    PostService.getGlobalPosts(posts => {
      setGlobalPosts(posts)
    })
    trackService.setup()

    setTimeout(() => setLoading(false), 1000)
    PushNotificationIOS.cancelAllLocalNotifications()
    return () => { }
  }, [tracks])


  if (loading) return <Center><Spinner type='Wave' /></Center>


  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      <ErrorBoundary caller='Home Header'>
        <HomeHeader name={user.name} isAdmin={isAdmin} />
      </ErrorBoundary>

      <Divider style={{ marginBottom: 20 }} />

      <ErrorBoundary caller='Home Media Row'>
        <MediaRow title='Top Remixes' query='rem' tracks={tracks} />
        <MediaRow title='Top Hip Hop' query='hip' tracks={tracks} />
        <MediaRow title='Top R & B' query='r&' tracks={tracks} />
        <MediaRow title='Top Reggae' query='regg' tracks={tracks} />
      </ErrorBoundary>


      <Divider style={{ marginTop: 15, marginBottom: 30 }} />


      <ErrorBoundary caller='Home Sponsored Card'>
        <View style={{
          flex: 1, marginBottom: 20,
          justifyContent: 'center', alignItems: 'center'
        }}>
          <SponsoredCard
            title={'Stock up on your travel essentials!'}
            caption={'Shop Zorei'}
            location={'Zorei.co'}
            image={'https://iplayulisten.com/zorei-logo.png'}
            avatar={'https://iplayulisten.com/zorei-logo.png'}
            onOpen={() => openLink('https://www.zorei.co')} />
        </View>
      </ErrorBoundary>

      <ErrorBoundary caller='Home Explore Cards'>
        <View style={{ flex: 1, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>

          {topRemixes.slice(0, 2).map((itm, idx) => (
            <ExploreCard {...props} key={itm?.acid} item={itm} />
          ))}

          {globalPosts && globalPosts.slice(0, 2).map((itm, idx) => (
            <PostCard navigation={navigation} key={itm.key} item={itm}
              isAuthor={itm.uid === user.uid} />
          ))}

          {topRemixes.slice(3, 6).map((itm, idx) => (
            <ExploreCard {...props} key={itm.acid} item={itm} />
          ))}

          {globalPosts && globalPosts.slice(3, 6).map((itm, idx) => (
            <PostCard navigation={navigation} key={itm.key} item={itm}
              isAuthor={itm.uid === user.uid} />
          ))}

        </View>
      </ErrorBoundary>


      <View style={{ height: 50 }}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {

  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 50,
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 150,
    width: 150,
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

export default Home
